import { Injector } from "injection-js";

/**
 * local constants
 */
const GLOBAL_INJECTOR_PROPERTY_KEY: string = 'GLOBAL_INJECTOR';

/**
 * get the global DI container injector
 */
export function getInjector(): Injector {
    return window[GLOBAL_INJECTOR_PROPERTY_KEY];
}

/**
 * set the global DI container injector
 */
export function setInjector(injector: Injector): void {
    window[GLOBAL_INJECTOR_PROPERTY_KEY] = injector;
}
