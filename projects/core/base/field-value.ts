/**
 * A union type for the values that can be found in a column of a Sinequa index
 */
export type FieldValue = string | number | Date | boolean | Array<string | {value: string, display?: string}>;