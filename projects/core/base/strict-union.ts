type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, U> = T extends T
    ? T & Partial<Record<Exclude<UnionKeys<U>, keyof T>, undefined>>
    : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;