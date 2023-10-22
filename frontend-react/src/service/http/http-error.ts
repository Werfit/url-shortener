export class HttpError extends Error {
  payload: unknown;

  constructor(payload: unknown) {
    super();
    this.payload = payload;
  }
}
