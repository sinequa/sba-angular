import { z } from "zod";

import { CCSortingChoiceSchema } from "./CCSortingChoice";

/**
 * Describes the fields for a tab configuration object
 */

export const CCTabSchema = z.object({
    /**
     * The name of the tab
     */
    name: z.string(),
    /**
     * The display value of the tab
     */
    display: z.string(),
    /**
     * The values in the tab distribution that contribute to this tab
     */
    value: z.string(),
    /**
     * Set if this tab is the default to be used when no tab is specified in a query
     */
    isDefault: z.boolean(),
    /**
     * Indexes to exclude when executing a query with this tab selected
     */
    excludedIndices: z.string(),
    /**
     * Aggregations to exclude when executing a query with this tab selected
     */
    excludedAggregations: z.string(),
    /**
     * Results sorting options that should be available when executing a query with this tab selected
     */
    sortingChoices: z.array(CCSortingChoiceSchema)
})

export type CCTab = z.infer<typeof CCTabSchema>;


