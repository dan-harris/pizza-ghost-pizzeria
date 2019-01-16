import { Injector, ReflectiveInjector, Type } from "injection-js";
import { autoBind } from "../utils/autobind";
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

            // get page instance & enforce bindings (+ run any decorator functions that need an initial getter setup for scoping reasons)
            const page = injector.get(Page);
            autoBind<T>(page);

            // store an easy reference to the current page instance for ease of debug
            window['__DEBUG__CURRENT_PAGE_INSTANCE'] = page;

            resolve();
        });
    });
}
