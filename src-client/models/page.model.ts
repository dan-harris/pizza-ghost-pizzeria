import { Injector, ReflectiveInjector, Type } from "injection-js";
import { setInjector } from "../utils/global-injector";

/**
 * initialise a page with any required DI dependencies
 */
export async function initPage<T>(Page: Type<T>, ...dependencies): Promise<any> {
    return new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', () => {

            // create all DI deps
            const injector: Injector = ReflectiveInjector.resolveAndCreate([Page, ...dependencies]);

            // store DI on window object if needed later
            setInjector(injector);

            // store an easy reference to the current page instance for ease of debug
            window['CURRENT_PAGE_INSTANCE'] = injector.get(Page);

            resolve();
        });
    });
}

