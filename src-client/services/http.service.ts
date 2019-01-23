import { Injectable } from "injection-js";

/**
 * local constants
 */
const defaultFetchOptions: RequestInit = {
  headers: {
    ["Content-Type"]: "application/json",
    ["RequestVerificationToken"]: window["XSRF_TOKEN"]
  }
};

/**
 * default api wrapper
 */
@Injectable()
export class HttpService {
  constructor() {}

  /**
   * get call
   */
  async get<T>(url: string = ""): Promise<T> {
    return fetch(url).then(response =>
      response.bodyUsed && typeof response.body === "object"
        ? response.json()
        : response.text()
    );
  }

  /**
   * put call
   */
  async put<D, R = D>(url: string = "", data: D): Promise<R> {
    return fetch(url, {
      ...defaultFetchOptions,
      method: "PUT",
      body: JSON.stringify(data)
    }).then(response =>
      response.bodyUsed ? response.json() : response.text()
    );
  }
}
