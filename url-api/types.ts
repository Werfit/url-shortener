export type Expiration = "1t" | "1d" | "3d" | "7d";

export type VisitUrlQuery = {
  hash: string;
};

export type Body = {
  url: string;
  expiration: Expiration;
};

export type UrlRecord = {
  hash: string;
  url: string;
  expirationDate: string;
};
