import { Record } from "../search";
import { HighlightDataPerCategory } from "./HighlightDataPerCategory";
import { HighlightDataPerLocation } from "./HighlightDataPerLocation";

/**
 * Describes the data returned by [PreviewWebService.get]{@link PreviewWebService#get}
 */

export type PreviewData = {
    record: Record,
    resultId: string,
    cacheId: string,
    highlightsPerCategory: HighlightDataPerCategory,
    highlightsPerLocation: HighlightDataPerLocation[],
    documentCachedContentUrl: string
}
