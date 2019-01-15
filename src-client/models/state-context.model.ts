import { generateRandomID as generateRandomId } from "../utils/random-string";
import { StateChange } from "./state-change.model";

/**
 * an instance of the state container model
 */
export class StateContext<T extends object> {

    /**
     * wrapped data value
     */
    data: T = {} as T;

    /**
     * state change callbacks
     */
    private _onChangeBindings: Array<{ id: string, binding: (stateChange: StateChange<T>) => Promise<any> }> = [];

    /**
     * current bionding change id
     */
    private _currentBindingId: string;

    constructor(initialState?: T) {
        if (initialState != null && initialState != undefined) this.data = initialState;
    }

    /**
     * get the current state object
     */
    getState(): T {
        return this.data;
    }

    /**
     * set current state object - overridding any current state
     * (ensure not to call this method within a state change listener, as it will cause an infinite loop)
     */
    async setState(state: T, id: string = null): Promise<T> {
        this._currentBindingId = id;
        const oldState = this.data;
        this.data = Object.assign({}, state);
        await this.emitStateChange({ state: this.data, oldState })
        return this.data;
    }

    /**
     * patch state object values
     *  (ensure not to call this method within a state change listener, as it will cause an infinite loop)
     */
    async patchState(state: Partial<T>, id?: string): Promise<T> {
        this._currentBindingId = id;
        const oldState = this.data;
        this.data = Object.assign({}, oldState, state);
        await this.emitStateChange({ state: this.data, oldState })
        return this.data;
    }

    /**
     * handler for state changes
     */
    onStateChange(binding: (stateChange: StateChange<T>) => Promise<any>, id?: string): void {
        if (!id) id = generateRandomId(10);
        this._onChangeBindings.push({ id, binding });
    }

    /**
     * call any functions on state change
     */
    private async emitStateChange({ state, oldState }: StateChange<T>): Promise<void> {
        for (let changeBinding of this._onChangeBindings) {
            if (this._currentBindingId !== changeBinding.id) await changeBinding.binding({
                state,
                oldState,
                setState: (state: T) => this.setState(state, changeBinding.id),
                patchState: (state: Partial<T>) => this.patchState(state, changeBinding.id)
            } as any);
        }
    }

}