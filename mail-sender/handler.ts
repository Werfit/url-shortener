import { DynamoDBStreamEvent } from "aws-lambda";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({});

export const sendMail = async (event: DynamoDBStreamEvent) => {
  await Promise.all(
    event.Records.filter((record) => record.eventName === "REMOVE").map(
      (record) => {
        const dbRecord = record.dynamodb.OldImage;
        const sendCommand = new SendEmailCommand({
          Source: process.env.SENDER_EMAIL,
          Destination: {
            ToAddresses: [dbRecord.email.S],
          },
          Message: {
            Subject: {
              Data: "URL Link has expired",
              Charset: "utf-8",
            },
            Body: {
              Html: {
                Data: `<h1>${dbRecord.hash.S} has expired</h1> This hash will redirect to ${dbRecord.url.S} no more. We are sorry!`,
                Charset: "utf-8",
              },
            },
          },
          ReplyToAddresses: [process.env.SENDER_EMAIL],
        });

        return client.send(sendCommand);
      },
    ),
  );
};
