import { z } from "zod";

import { PatternMatcher } from "@sinequa/core/base";

import { CCAggregationSchema } from "./CCAggregation";
import { CCColumnsInfoSchema } from "./CCColumnsInfo";
import { CCScopeSchema } from "./CCScope";
import { CCSortingChoiceSchema } from "./CCSortingChoice";
import { CCTabSearchSchema } from "./CCTabSearch";
import { CCWebServiceSchema } from "./CCWebService";
import { QueryPrecisionSchema } from "./QueryPrecision";
import { QueryStrategySchema } from "./QueryStrategy";
import { SpellingCorrectionModeSchema } from "./SpellingCorrectionMode";

/**
 * Describes the query web service configuration object
 */


export const CCQuerySchema = CCWebServiceSchema.extend({
    /**
     * Defines the number of records or documents to request when executing the query
     */
    pageSize: z.number(),
    /**
     * Defines the aggregations that should be included in the query
     */
    aggregations: z.array(CCAggregationSchema),
    /**
     * Defines configuration information for the columns in the indexes
     */
    columnsInfo: CCColumnsInfoSchema,
    /**
     * Defines the sorting choices that can be used
     */
    sortingChoices: z.array(CCSortingChoiceSchema),
    /**
     * Defines the scopes that can be used
     */
    scopes: z.array(CCScopeSchema),
    /**
     * Defines whether scopes processing is activated for this query
     */
    scopesActive: z.boolean(),
    /**
     * Defines the spelling correction mode for this query
     */
    sCMode: SpellingCorrectionModeSchema,
    /**
     * Defines the distance to use for the `NEAR` operator when no value is specified
     */
    defaultNearValue: z.number(),
    /**
     * Defines the tab search configuration for this query
     */
    tabSearch: CCTabSearchSchema,
    /**
     * Defines the name of the [CCRFM]{@link CCRFM} configuration for this query
     */
    rFM: z.string(),
    /**
     * Defines the default language to use when parsing the query text
     */
    questionLanguage: z.string(),
    /**
     * Defines the default precision to use for this query
     */
    questionPrecision: QueryPrecisionSchema,
    /**
     * Defines the default strategy to use for this query
     */
    questionStrategy: QueryStrategySchema,
    /**
     * Defines the indexes that the query selects from
     */
    searchIndexes: z.string(),
    /**
     * Determines whether filter-less queries are permitted
     */
    allowEmptySearch: z.boolean(),
    /**
     * Defines the patterns to control which column fields are allowed
     * in fielded search expressions.
     */
    columnFieldsIncluded: z.array(z.string()),
    /**
     * Defines the patterns to control which column fields are disallowed
     * in fielded search expressions.
     */
    columnFieldsExcluded: z.array(z.string()),
    /**
     * The `PatternMatcher` instance created on the client using the `columnFieldsIncluded` and `columnFieldsExcluded` values.
     */
    $columnFieldsPattern: z.instanceof(PatternMatcher),
    /**
     * Defines the patterns to control which part name fields are allowed
     * in fielded search expressions.
     */
    partnameFieldsIncluded: z.array(  z.string()),
    /**
     * Defines the patterns to control which part name fields are disallowed
     * in fielded search expressions.
     */
    partnameFieldsExcluded: z.array(  z.string()),
    /**
     * Query intent configured for this query
     */
    queryIntent: z.string(),
    /**
     * Query intent set configured for this query
     */
    queryIntentSet: z.string(),
    /**
     * Whether Neural Search is available for this query web service
     */
    isNeural: z.boolean(),
    /**
     * The `PatternMatcher` instance created on the client using the `partnameFieldsIncluded` and `partnameFieldsExcluded` values.
     */
    $partnameFieldsPattern: z.instanceof(PatternMatcher),
})

export type CCQuery = z.infer<typeof CCQuerySchema>;
