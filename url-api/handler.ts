import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomBytes } from "node:crypto";
import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

import {
  convertExpirationToTTL,
  HttpStatus,
  parseUrlRecords,
  send,
} from "./utils";
import type { Body } from "./types";

const dynamoDb = new DynamoDBClient({});

export const listUrls = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { email } = event.requestContext.authorizer.lambda;
  const queryCommand = new QueryCommand({
    TableName: process.env.URL_HASH_TABLE,
    IndexName: "emailIndex",
    ExpressionAttributeValues: {
      ":email": {
        S: email,
      },
    },
    KeyConditionExpression: "email = :email",
  });

  const response = await dynamoDb.send(queryCommand);
  return send(HttpStatus.SUCCESS, {
    urls: parseUrlRecords(response.Items),
  });
};

export const deactivateUrl = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { hash } = JSON.parse(event.body);

  if (!hash) {
    return send(HttpStatus.BAD_REQUEST, {
      message: "Invalid url",
    });
  }

  const deleteCommand = new DeleteItemCommand({
    TableName: process.env.URL_HASH_TABLE,
    Key: {
      hash: {
        S: hash,
      },
    },
  });

  await dynamoDb.send(deleteCommand);
  return send(HttpStatus.SUCCESS, { hash });
};

export const visitUrl = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { hash } = event.queryStringParameters;

  if (!hash) {
    return send(HttpStatus.BAD_REQUEST, {
      message: "URL was not provided",
    });
  }

  const getCommand = new GetItemCommand({
    TableName: process.env.URL_HASH_TABLE,
    Key: {
      hash: {
        S: hash,
      },
    },
  });

  const record = await dynamoDb.send(getCommand);

  if (!record?.Item) {
    return send(HttpStatus.NOT_FOUND, {
      message: "Could not find this url",
    });
  }

  if (record.Item.ttl) {
    const updateCommand = new UpdateItemCommand({
      TableName: process.env.URL_HASH_TABLE,
      Key: {
        hash: {
          S: hash,
        },
      },
      ExpressionAttributeValues: {
        ":visited": {
          N: `${Number(record.Item.visited.N) + 1}`,
        },
      },
      UpdateExpression: "SET visited = :visited",
    });

    await dynamoDb.send(updateCommand);
  } else {
    const deleteCommand = new DeleteItemCommand({
      TableName: process.env.URL_HASH_TABLE,
      Key: {
        hash: {
          S: hash,
        },
      },
    });

    await dynamoDb.send(deleteCommand);
  }

  return send(HttpStatus.SUCCESS, {
    url: record.Item.url.S,
  });
};

export const createUrl = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { url, expiration } = JSON.parse(event.body) as Body;
  const { email } = event.requestContext.authorizer.lambda;

  const hash = randomBytes(3).toString("hex");
  const expirationTime = convertExpirationToTTL(expiration);

  try {
    const ttl = {
      ttl: {
        N: `${expirationTime}`,
      },
    };

    const putCommand = new PutItemCommand({
      TableName: process.env.URL_HASH_TABLE,
      Item: {
        hash: {
          S: hash,
        },
        url: {
          S: url,
        },
        visited: {
          N: "0",
        },
        email: {
          S: email,
        },
        ...(expirationTime ? ttl : {}),
      },
    });

    await dynamoDb.send(putCommand);

    return send(HttpStatus.CREATED, {
      hash,
      url,
      visited: 0,
      ...(expirationTime ? { expiration: new Date(expirationTime) } : {}),
    });
  } catch (error) {
    return send(HttpStatus.INTERNAL, {
      message: error.message,
    });
  }
};
