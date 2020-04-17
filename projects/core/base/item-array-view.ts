import { ArrayView } from "./array-view";
import { IteratorAdaptor } from "./iterator-adaptor";

/**
 * A generic interface describing a name and associated value
 */
export interface NameValuePair<U, V> {
    name: U;
    value: V;
}

/**
 * An {@link ArrayView} of {@link NameValuePair}
 */
export interface NameValueArrayView<U, V> extends ArrayView<NameValuePair<U, V>> {
    getName(index: number): U;
    getValue(index: number): V;
    items(): IterableIterator<NameValuePair<U, V>>;
    names(): IterableIterator<U>;
    values(): IterableIterator<V>;
}

class ArrayBasedView<T, U, V> implements NameValueArrayView<U, V> {
    constructor(
        private base: T[],
        private nameSelector: (t: T) => U,
        private valueSelector: (t: T) => V
    ) { }

    get length(): number {
        return this.base.length;
    }

    get(index: number): NameValuePair<U, V> {
        return this.toNameValuePair(this.base[index]);
    }

    getName(index: number): U {
        return this.nameSelector(this.base[index]);
    }

    getValue(index: number): V {
        return this.valueSelector(this.base[index]);
    }

    private toNameValuePair(obj: T): NameValuePair<U, V> {
        return { name: this.nameSelector(obj), value: this.valueSelector(obj) };
    }

    /*
        Iterators
    */

    [Symbol.iterator](): IterableIterator<NameValuePair<U, V>> {
        return this.items();
    }

    items(): IterableIterator<NameValuePair<U, V>> {
        return IteratorAdaptor.forIterable(
            this.base,
            (obj) => this.toNameValuePair(obj)
        );
    }

    names(): IterableIterator<U> {
        return IteratorAdaptor.forIterable(this.base, this.nameSelector);
    }

    values(): IterableIterator<V> {
        return IteratorAdaptor.forIterable(this.base, this.valueSelector);
    }

    forEach(callback: (item: NameValuePair<U, V>, index?: number, items?: NameValueArrayView<U, V>) => void, thisArg?: any) {
        for (let idx = 0; idx < this.length; idx++) {
            const r = this.get(idx);
            if (thisArg)
                callback.call(thisArg, r, idx, this);
            else
                callback(r, idx, this);
        }
        return this;
    }
}

/**
 * A helper class for creating {@link NameValueArrayView} instances
 */
// @dynamic
export class NameValueArrayViewHelper {
    /**
     * Creates a {@link NameValueArrayView} from an array of {@link NameValuePair} items
     *
     * @param items An array of `NameValuePair` items
     */
    static fromArray<U, V>(items: NameValuePair<U, V>[]): NameValueArrayView<U, V> {
        return new ArrayBasedView(items || [], p => p.name, p => p.value);
    }

    static fromObjects<T>(items: T[], nameKey: keyof T, valueKey: keyof T): NameValueArrayView<T[keyof T], T[keyof T]> {
        return new ArrayBasedView(items || [], p => p[nameKey], p => p[valueKey]);
    }

    static from<T, U, V>(items: T[], nameSelector: (t: T) => U, valueSelector: (t: T) => V): NameValueArrayView<U, V> {
        return new ArrayBasedView(items || [], nameSelector, valueSelector);
    }
}
