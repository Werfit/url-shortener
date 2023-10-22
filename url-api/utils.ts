import { APIGatewayProxyResult } from "aws-lambda";
import { Expiration } from "./types";

const ExpirationTime = {
  "1d": 60 * 60 * 24 * 1000, // 1d in ms
  "3d": 3 * 60 * 60 * 24 * 1000, // 3d in ms
  "7d": 7 * 60 * 60 * 24 * 1000, // 7d in ms
};

export enum HttpStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL = 500,
}

export const convertExpirationToTTL = (
  expiration: Expiration,
): number | undefined => {
  const date = new Date();
  const expirationTime = ExpirationTime[expiration];
  return expirationTime ? date.getTime() + expirationTime : undefined;
};

export const send = (
  status: HttpStatus,
  body: Object = {},
  headers: Record<string, string | number | boolean> = {},
): APIGatewayProxyResult => ({
  statusCode: status,
  body: JSON.stringify(body),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credential": true,
    ...headers,
  },
});

export const parseUrlRecords = (records) => {
  return records.map((record) => ({
    url: record.url.S,
    hash: record.hash.S,
    expiration: record.ttl ? new Date(record.ttl.N) : null,
    visited: Number(record.visited.N),
  }));
};
