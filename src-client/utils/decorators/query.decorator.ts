/**
 * decorator to query DOM for an element
 * (wraps document.queryselector)
 */
export function Query<T extends Element = Element>(selector: string) {

    // create getter function for property
    const getter = function () {
        return document.querySelector<T>(selector);
    }

    return (decoratorTarget: any, propKey: string) => {
        Object.defineProperty(decoratorTarget, propKey, {
            get: getter,
            enumerable: true,
            configurable: true,
        });
    };
}