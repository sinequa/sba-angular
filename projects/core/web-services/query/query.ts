import {MapOf} from "@sinequa/core/base";
import {SpellingCorrectionMode} from "../config/ccapp";

/**
 * Defines the object used to filter an {@link IQuery}. This is typically added to a query
 * as a result of a selection in UI facet component
 */
export interface Select {
    /**
     * The fielded search expression of the filter that should be applied to the query
     */
    expression: string;
    /**
     * The name of the facet where this selection was made
     */
    facet: string;
}

/**
 * Defines the object used to request the children of a tree node in an aggregation
 */
export interface Open {
    /**
     * The fielded search expression of the filter used to request the tree node children. For example: `treepath:/folder1/folder2/*`
     */
    expression: string;
    /**
     * The name of the associated aggregation
     */
    aggregation: string;
}

/**
 * These options can be used to provide pagination of aggregation values
 */
export interface AggregationOptions {
    /**
     * Specifies the starting index of the values to retrieve
     */
    skip?: number;
    /**
     * Specifies the number of aggregation values to retrieve
     */
    count?: number;
}

/**
 * Describes the query object that can be passed to the {@link QueryWebService}
 */
export interface IQuery {
    /**
     * The name of the query web service configuration object
     */
    name: string;
    /**
     * The full text of the query
     */
    text?: string;
    /**
     * Defines the action that can be performed with this query.
     *
     * `search` - This action performs a standard search that returns document results and aggregation values. This is the default action
     *
     * `open` - Processes the objects specified in the `open` member. This is used to expand tree aggregation nodes
     *
     * `aggregate` - Processes the objects specified in the `aggregations` member. This is used to provide pagination of aggregation values
     */
    action?: "" | "search" | "open" | "aggregate";
    /**
     * Specifies selection-based filtering for this query, typically from UI facets
     */
    select?: Select[];
    /**
     * Soecifies the tree aggregation nodes whose children should be returned (using the `open` action)
     */
    open?: Open[];
    /**
     * Specifies the starting page for the document results. Defaults to 1
     */
    page?: number;
    /**
     * Specifies the page size size for the document results
     */
    pageSize?: number;
    /**
     * Specifies the name of the current tab selection for the query. See {@link CCTabSearch}
     */
    tab?: string;
    /**
     * Specifies the name of the current scope selection for the query. See {@link CCScope}
     */
    scope?: string;
    /**
     * Specifies the name of the current sort selection for the query. See {@link CCSortingChoice}
     */
    sort?: string;
    /**
     * Specifies the name of a basket of document results to retrieve. If specified then the search results will be
     * trimmed to only contain documents included in the specified basket
     */
    basket?: string;
    /**
     * If set then no document results will be returned but aggregations results will be returned. This is typically used
     * to provide aggregation results on a home page or to retrieve values to be used in advanced search components
     */
    isFirstPage?: boolean;
    /**
     * Determines results can only include documents that were in the results set prior to the addition of a filter.
     * In some circumstances the addition of a filter can enlarge the set of matching documents.
     * For example, the addition of search terms using the "refine" facet
     */
    strictRefine?: boolean;
    /**
     * Sets the relevance threshold for document to appear in the results. This is a number between 0 and 100.
     */
    globalRelevance?: number;
    /**
     * Sets the language to be used to interpret search terms
     */
    questionLanguage?: string;
    /**
     * Sets the language to be used to interpret search terms if `questionLanguage` is not set and the
     * language cannot be determined automatically
     */
    questionDefaultLanguage?: string;
    /**
     * Sets the spelling correction mode
     */
    spellingCorrectionMode?: SpellingCorrectionMode;
    /**
     * Sets a regular expression filter on which terms to consider for spelling corrections
     */
    spellingCorrectionFilter?: string;
    /**
     * Sets the value for the `DocumentWeight` clause to be added to the query
     */
    documentWeight?: string;
    /**
     * Sets the value for the `TextPartWeights` clause to be added to the query
     */
    textPartWeights?: string;
    /**
     * Sets the value for the `RelevanceTransforms` clause to be added to the query
     */
    relevanceTransforms?: string;
    /**
     * Determines whether duplicate documents should be filtered from the results. Duplicate document detection
     * requires either nearhash or exacthash values to be calculated in the indexes.
     */
    removeDuplicates?: boolean;
    /**
     * Sets the query id for the query. This is used in "strict refine" mode and is normally populated from the
     * results attributes
     */
    queryId?: string;
    /**
     * Specifies the aggregations to include when `action` is set to `aggregate`
     */
    aggregations?: MapOf<AggregationOptions> | string[];
    /**
     * Specifies a value for the `ORDER BY` clause of the query
     */
    orderBy?: string;
    /**
     * Specifies a value for the `GROUP BY` clause of the query
     */
    groupBy?: string;
}
