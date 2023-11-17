/**
 * Describes highlight data for a set of locations
 */

export type HighlightDataPerLocation = {
    start: number,
    length: number,
    values: string[],
    displayValue: string,
    positionInCategories: Record<string, number>
}
