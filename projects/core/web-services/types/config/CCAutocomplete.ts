import { CCWebService } from "./CCWebService";

/**
 * Describes the fields in the autocomplete web service configuration object
 */
export interface CCAutocomplete extends CCWebService {
    /**
     * Defines whether this autocomplete service is enabled
     */
    enabled: boolean;
    /**
     * Contains a comma-separated list of suggest queries for this service
     */
    suggestQueries: string;
    /**
     * Defines the minimum number of characters that must be entered before presenting
     * suggestions
     */
    inputLengthTrigger: number;
    /**
     * Defines whether suggestions should be grouped into categories when they are displayed
     */
    groupSuggestionsByCategory: boolean;
    /**
     * Defines whether fielded search should be used when processing suggestions
     */
    useFieldedSearch: boolean;
    /**
     * Defines the number of items per category to display when a category is not collapsed
     */
    uncollapsedItemsPerCategory: number;
}
