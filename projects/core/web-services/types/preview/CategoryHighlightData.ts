import { HighlightValue } from "./HighlightValue";

/**
 * Describes highlight data for a category
 */

export type CategoryHighlightData = {
    categoryDisplayLabel: string,
    categoryDisplayLabelPlural: string,
    categoryFilterAllLabel: string,
    categoryFilterNoneLabel: string,
    values: HighlightValue[]
}
