export class IteratorAdaptor<T,B> implements IterableIterator<T> {
    readonly return?: (value?: any) => IteratorResult<T>;
    readonly throw?: (error?: any) => IteratorResult<T>;

    constructor(private base: Iterator<B>, private adaptor: (b: B) => T) {
        this.return = (base.return) ? (v) => this.translate(this.base.return!(v)) : undefined;
        this.throw  = (base.throw)  ? (e) => this.translate(this.base.throw!(e))  : undefined;
    }

    static forIterable<B, T>(iterable: Iterable<B>, adaptor: (b: B) => T): IterableIterator<T> {
        /*if (iterable === undefined) {
            return undefined;
        }*/

        return new IteratorAdaptor<T,B>(
            iterable[Symbol.iterator](),
            adaptor
        );
    }

    private translate(result: IteratorResult<B>): IteratorResult<T> {
        if (result.done) {
            return {
                done: result.done,
                value: (result.done && result.value === undefined) ? undefined : this.adaptor(result.value)
            };
        }
        else {
            return {
                value: this.adaptor(result.value)
            };
        }
    }

    next(value?: any)  { return this.translate(this.base.next(value)); }

    [Symbol.iterator](): IterableIterator<T> { return this; }
}
