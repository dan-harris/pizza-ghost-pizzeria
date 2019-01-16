import { DataProxy } from "../../models/data-proxy.model";

/**
 * watch a bound data property for changes & execute the decorated function
 */
export function Watch<T extends object>(statePropKey: string) {
    return (decoratorTarget: any, propKey: string, descriptor: any) => {

        // some of the following code for binding tomfoolery is care of;
        // https://github.com/JohnWeisz/BoundMethods/blob/master/src/bound.ts

        // keep track of the original method
        const originalMethod: Function = decoratorTarget[propKey] as Function;

        return {
            get: function (): any {
                // create bound override on object instance. This will hide the original method on the prototype, and instead yield a bound version from the
                // instance itself. The original method will no longer be accessible. Inside a getter, 'this' will refer to the instance.
                const instance: any = this;

                Object.defineProperty(instance, propKey.toString(), {
                    value: function () {
                        // this is effectively a lightweight bind() that skips many (here unnecessary) checks found in native implementations.
                        return originalMethod.apply(instance, arguments);
                    }
                });

                // get data proxy
                const dataProxy: DataProxy<T> = instance[statePropKey] as DataProxy<T>;

                // add method to data proxy on change handlers, then bind decorated method with appropriate 'this'
                dataProxy.onChange((originalMethod.bind(instance) as (data: T) => Promise<any>));

                // the first invocation (per instance) will return the bound method from here. Subsequent calls will never reach this point, due to the way
                // javaScript runtimes look up properties on objects; the bound method, defined on the instance, will effectively hide it.
                return instance[propKey];
            }
        }

    };
}
