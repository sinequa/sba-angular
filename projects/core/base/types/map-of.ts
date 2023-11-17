/**
 * Describes a generic dictionary where the keys are strings
 * @deprecated Use Record<string, T> instead when possible
 */
export interface MapOf<T> {
    [key: string]: T;
}
