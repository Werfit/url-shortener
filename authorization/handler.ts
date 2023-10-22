import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { hash, compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

enum HttpStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_ALLOWED = 403,
  INTERNAL = 500,
}

type User = {
  email: string;
  password: string;
};

const dynamoDb = new DynamoDBClient({});

const findUser = async (email: string): Promise<User> => {
  try {
    const getCommand = new GetItemCommand({
      TableName: process.env.USER_TABLE,
      Key: {
        email: {
          S: email,
        },
      },
    });

    const dbResponse = await dynamoDb.send(getCommand);

    if (!dbResponse.Item) {
      return null;
    }

    return {
      email: dbResponse.Item.email.S,
      password: dbResponse.Item.password.S,
    };
  } catch {
    return null;
  }
};

const createUser = async (email: string, password: string) => {
  try {
    const userCreationCommand = new PutItemCommand({
      TableName: process.env.USER_TABLE,
      Item: {
        email: {
          S: email,
        },
        password: {
          S: password,
        },
      },
    });

    await dynamoDb.send(userCreationCommand);
    return { email, password };
  } catch (error) {
    return null;
  }
};

const send = (statusCode: HttpStatus, body: Record<string, any>) => ({
  statusCode,
  body: JSON.stringify(body),
});

export const signUp = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { email, password } = JSON.parse(event.body);

  const existingUser = await findUser(email);
  if (existingUser) {
    return send(HttpStatus.BAD_REQUEST, {
      message: "This email is already taken",
    });
  }

  const rounds = 10;
  const hashedPassword = await hash(password, rounds);

  try {
    const user = await createUser(email, hashedPassword);
    return send(HttpStatus.CREATED, { user });
  } catch {
    return send(HttpStatus.INTERNAL, {
      message: "Internal error",
    });
  }
};

export const login = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { email, password } = JSON.parse(event.body);

  const user = await findUser(email);
  if (!user) {
    return send(HttpStatus.UNAUTHORIZED, {
      message: "Incorrect credentials",
    });
  }

  const passwordValid = await compare(password, user.password);
  if (!passwordValid) {
    return send(HttpStatus.UNAUTHORIZED, {
      message: "Incorrect credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return send(HttpStatus.SUCCESS, { accessToken });
};

export const verify = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const authorization =
    event.headers["Authorization"] ?? event.headers.authorization;
  const token = authorization.split(" ")[1];

  if (!token) {
    return send(HttpStatus.NOT_ALLOWED, {
      message: "Token was not found",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return send(HttpStatus.SUCCESS, {});
  } catch {
    return send(HttpStatus.NOT_ALLOWED, {
      message: "Invalid token",
    });
  }
};
