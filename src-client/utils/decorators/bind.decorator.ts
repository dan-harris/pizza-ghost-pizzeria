import { DataProxy, dataProxyFactory } from "../../models/data-proxy.model";

/**
 * bind to decorated properties data changes 
 * (allows use of @Watch or addition of any change handler functions)
 */
export function Bind<T extends object>(initialData: T = null) {

    // create new databind proxy
    const dataProxy: DataProxy<T> = dataProxyFactory(initialData);

    // create getter function for property
    const getter = function () {
        return dataProxy as T;
    }

    return (decoratorTarget: any, propKey: string) => {
        Object.defineProperty(decoratorTarget, propKey, {
            get: getter,
            enumerable: true,
            configurable: true,
        });
    };
}