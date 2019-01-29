import { Injector, ReflectiveInjector, Type } from "injection-js";
import { autoBind } from "../utils/autobind";
import { setInjector } from "../utils/global-injector";
import { env } from "./env.model";

/**
 * initialise a page with any required DI dependencies
 */
export async function initPage<T>(
  Page: Type<T>,
  ...dependencies
): Promise<any> {
  return new Promise(resolve => {
    document.addEventListener("DOMContentLoaded", () => {
      // create all DI deps
      const injector: Injector = ReflectiveInjector.resolveAndCreate([
        Page,
        ...dependencies
      ]);

      // store DI on window object if needed later
      setInjector(injector);

      // get page instance & enforce bindings (+ run any decorator functions that need an initial getter setup for scoping reasons)
      const page = injector.get(Page);
      autoBind<T>(page);

      // store an easy reference to the current page instance for ease of debug
      window[env.WINDOW_DEBUG_CURRENT_PAGE_KEY] = page;

      resolve();
    });
  });
}

/**
 * initialise page state
 */
export function initPageState<T>(state: T): void {
  if (window[env.WINDOW_INITIAL_STATE_KEY]) {
    const initialState: any = window[env.WINDOW_INITIAL_STATE_KEY];
    const stateKeys: ReadonlyArray<string> = Object.keys(initialState);
    stateKeys.map(key => (state[key] = initialState[key]));
  }
}

/**
 * get a slice of page state
 */
export function getPageStateByKey<T>(stateKey: string): T {
  return window[env.WINDOW_INITIAL_STATE_KEY]
    ? window[env.WINDOW_INITIAL_STATE_KEY][stateKey]
    : null;
}
