import { Injectable } from "injection-js";
import { env } from "../models/env.model";

/**
 * local constants
 */

/**
 * default api wrapper
 */
@Injectable()
export class HttpService {
  get defaultFetchOptions(): RequestInit {
    return {
      headers: {
        ["Content-Type"]: "application/json",
        ["RequestVerificationToken"]:
          window[env.WINDOW_GLOBAL_STATE_KEY][env.GLOBAL_STATE_XSRF_KEY]
      }
    };
  }

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
      ...this.defaultFetchOptions,
      method: "PUT",
      body: JSON.stringify(data)
    }).then(response =>
      response.bodyUsed ? response.json() : response.text()
    );
  }
}
