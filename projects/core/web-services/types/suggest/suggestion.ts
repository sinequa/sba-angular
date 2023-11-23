/**
 * A suggestion returned by either {@link SuggestFieldWebService} or {@link SuggestQueryWebService}
 */
export interface Suggestion {
    category: string;
    display: string;
    frequency?: string;
    id?: string;
    normalized?: string;
}
