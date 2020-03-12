/**
 * Describes a generic reference type that can be used to model "pass-by-reference" semantics in function signatures
 */
export interface IRef<T> {
    value: T;
}
