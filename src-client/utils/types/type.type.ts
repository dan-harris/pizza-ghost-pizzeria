/**
 * wrapper for class constructor typings
 * (stolen from Angular default typings)
 */
export interface Type<T> extends Function {
    new(...args: any[]): T;
}