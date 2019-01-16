/**
 * represents a bound data proxy
 */
export interface DataProxy<T> {
    [key: string]: any;
    onChange: (handler: (data: T) => Promise<any>) => void;
}


/**
 * factory function for creating proxy around data objects
 */
export function dataProxyFactory<T extends object>(initialData?: T): DataProxy<T> {

    // array of change handler functions
    const onChangeHandlers: Array<(data: T) => Promise<any>> = [];

    // add handlers to on change event
    function onChange(handler: (data: T) => Promise<any>): void {
        onChangeHandlers.push(handler);
    }

    // create data object with on change handler subscriber
    const data: T = (initialData != null && initialData != undefined)
        ? Object.assign({}, initialData, { onChange })
        : { onChange } as T;


    const proxy = new Proxy(data, {
        set: function (target, property, value) {
            target[property] = value
            onChangeHandlers.forEach((callback) => callback(target))
            return true
        }
    })

    return proxy as DataProxy<T>;
}