import { StateContext } from "../../models/state-context.model";

/**
 * create a state container for decorated property
 */
export function State<T extends object>(initialState: T = null) {

    // create new state instance
    const stateContext: StateContext<T> = new StateContext<T>(initialState);

    // create getter function for property
    const getter = function () {
        return stateContext;
    }

    return (decoratorTarget: any, propKey: string) => {
        Object.defineProperty(decoratorTarget, propKey, {
            get: getter,
            enumerable: true,
            configurable: true,
        });
    };
}