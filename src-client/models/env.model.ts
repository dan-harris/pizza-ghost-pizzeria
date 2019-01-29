import * as localEnv from "../../env.json";

/**
 * environment vars + any app settings keys
 */
export interface Environment {
  URL_ASSETS_IMAGES?: string;
  WINDOW_INITIAL_STATE_KEY: string;
  WINDOW_GLOBAL_STATE_KEY: string;
  WINDOW_DEBUG_CURRENT_PAGE_KEY: string;
  GLOBAL_STATE_XSRF_KEY: string;
}

/**
 * extend any environment settings
 */
export const env: Environment = {
  WINDOW_INITIAL_STATE_KEY: "INITIAL_STATE",
  WINDOW_GLOBAL_STATE_KEY: "GLOBAL_STATE",
  WINDOW_DEBUG_CURRENT_PAGE_KEY: "__DEBUG__CURRENT_PAGE_INSTANCE",
  GLOBAL_STATE_XSRF_KEY: "xsrf",
  ...localEnv
};
