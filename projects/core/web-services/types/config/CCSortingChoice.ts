import { z } from "zod";

/**
 * Describes a sorting choice which can be selected for a query
 */
export const CCSortingChoiceSchema = z.object({
    /**
     * The name of this sorting choice
     */
    name: z.string(),
    /**
     * The description of this sorting choice
     */
    description: z.string(),
    /**
     * The display value to use when rendering this sorting choice
     */
    display: z.string(),
    /**
     * The `ORDER BY` clause to use when this sorting choice is selected
     */
    orderByClause: z.string(),
    /**
     * Determines whether this sorting choice should be used as the default when
     * the query has no `text contains` clause
     */
    isDefaultNoRelevance: z.boolean(),
    /**
     * Determines whether this sorting choice should be used as the default when
     * the query has a `text contains` clause
     */
    isDefaultWithRelevance: z.boolean()
})
export type CCSortingChoice = z.infer<typeof CCSortingChoiceSchema>;


