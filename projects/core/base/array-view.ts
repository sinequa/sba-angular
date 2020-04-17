/**
 * Describes a generic iterable with array functionality
 */
export interface ArrayView<U> extends Iterable<U> {
    /**
     * The number of elements in the array
     */
    length: number;

    /**
     * Returns the element at the passed index
     *
     * @param index The index of an element
     */
    get(index: number): U;

    /**
     * Executes a passed function once for each element
     *
     * @param callback The function to execute on each element
     * @param thisArg The value to use as `this` when executing `callback`
     */
    forEach(callback: (item:U, index?:number, items?:ArrayView<U>) => void, thisArg?:any);

    /**
     * Returns the default iterator for the object
     */
    [Symbol.iterator](): IterableIterator<U>;
}