import { FieldValue } from "@sinequa/core/base";

/**
 * Describes a value item object that includes a {@link FieldValue} and an optional display value
 * to override standard field value formatting
 */
export type ValueItem = {
    value: FieldValue,
    display?: string,
    count?: number // Following ES-11166, the number of occurrence for an entity can be included
}
