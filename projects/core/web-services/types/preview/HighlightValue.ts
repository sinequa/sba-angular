import { Location } from "./Location";

/**
 * Describes a highlight value
 */

export type HighlightValue = {
    value: string,
    displayValue: string,
    locations: Location[]
}
