import { z } from "zod";

/**
 * Describes an aggregation configuration object
 */

export const CCAggregationSchema = z.object({
    /**
     * The name of the aggregation
     */
    name: z.string(),
    /**
     * The underlying column in the aggregation
     */
    column: z.string(),
    /**
     * Determines whether this aggregation should be included in a regular search
     */
    includeInStandardSearch: z.boolean(),
    /**
     * The maximum number of values to retrieve
     */
    count: z.number(),
    /**
     * The value of the `order` clause
     */
    order: z.string(),
    /**
     * The value of the `mask` clause
     */
    mask: z.string(),
    /**
     * The name of an associated distribution configuration object
     */
    distribution: z.string(),
    /**
     * Determines whether the aggregation is requested in the context of the currently selected tab or globally.
     * The default is to respect the [CCTabSearch.loadAggregationsForSelectedTab]{@link CCTabSearch#loadAggregationsForSelectedTab} setting
     */
    tabBehavior: z.union([z.literal(""), z.literal("Default"), z.literal("LoadForSelectedTab"), z.literal("LoadForAllTabs")]),
    /**
     * The separator used for crossed aggregations
     */
    keySeparator: z.string(),
    /**
     * The display separator used for crossed aggregations
     */
    displayKeySeparator: z.string(),
});

export type CCAggregation = z.infer<typeof CCAggregationSchema>;
