import { z } from "zod";

import { CCTabSchema } from "./CCTab";

/**
 * Describes the fields for the tab search configuration in a query. A tab search defines a special distribution which is evaluated
 * as a part of query to group the results by a set of tab items. The distribution gives the count of documents
 * associated with each tab item. The values associated with a tab item are used to filter a query when a tab item is selected.
 */

export const CCTabSearchSchema =z.object({
    /**
     * Determines whether this tab search is used in a query
     */
    isActive: z.boolean(),
    /**
     * Defines the column to be used in the tab distribution and for filtering results by a selected tab item
     */
    column: z.string(),
    /**
     * `true` if the associated column is a tree
     */
    columnIsTree: z.boolean(),
    /**
     * Determines whether the overall document total should be calculated from the per-tab item documents totals
     */
    totalIsSumOfTabTotals: z.boolean(),
    /**
     * Determines whether configured aggregations should be evaluated in the context of the selected tab or not.
     * This setting can be overridden at the tab item level using [CCTab.excludedAggregations]{@link CCTab#excludedAggregations}
     */
    loadAggregationsForSelectedTab: z.boolean(),
    /**
     * Determines the `minlevel` value to use when evaluating the tab distribution for a tree column
     */
    valueLevels: z.number(),
    /**
     * Determines whether `post-group-by=true` should be used in the tab distribution
     */
    postGroupBy: z.boolean(),
    /**
     * Determines whether 'merge-groups=true` should be used in the tab distribution. This is only used if `postGroupBy` is set to `true`
     */
    mergeGroups: z.boolean(),
    /**
     * The set of configured tab items
     */
    tabs: z.array(CCTabSchema)
})

export type CCTabSearch = z.infer<typeof CCTabSearchSchema>;


