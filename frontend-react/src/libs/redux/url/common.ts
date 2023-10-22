export const URL_REDUCER_NAME = "url";

export type UrlError = {
  message: string;
};

export type Url = {
  url: string;
  hash: string;
  expiration: string;
  visited: number;
};

export type InitialState = {
  urls: Url[];
  isLoading: boolean;
  error: string | null;
};

export type Expiration = "1t" | "1d" | "3d" | "7d";

export type CreateUrlRequest = {
  url: string;
  expiration: Expiration;
};

export type GetUrlRequest = {
  hash: string;
};
