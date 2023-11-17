/**
 * Describes a generic reference type that can be used to model "pass-by-reference" semantics in function signatures
 */
export type IRef<T> = {
    value: T
}
