/**
 * state container model
 * (wraps a value with state methods)
 */
export interface State<T> {
    data: T;
    setState(state: T): T;
    patchState(state: Partial<T>): T;
    getState(): T;
}