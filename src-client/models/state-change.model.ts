/**
 * represents a state change, including old state + new state
 */
export interface StateChange<T> {
    state: T;
    oldState: T;
    setState?: (state: T) => Promise<T>;
    patchState?: (state: Partial<T>) => Promise<T>;
} 