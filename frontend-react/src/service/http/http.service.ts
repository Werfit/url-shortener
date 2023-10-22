import { HttpError } from "@/service/http/http-error";

class HttpService {
  async get(url: string, headers: Record<string, string> = {}) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        ...headers,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new HttpError(result);
    }

    return result;
  }

  async post(
    url: string,
    body: object = {},
    headers: Record<string, string> = {},
  ) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        ...headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new HttpError(result);
    }

    return result;
  }
}

const http = new HttpService();
export default http;
