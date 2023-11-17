import { z } from "zod";

import { CCAggregationSchema } from "../config/CCAggregation";
import { CCColumnSchema } from "../config/CCColumn";
import { AggregationItemSchema } from "./AggregationItem";
import { TreeAggregationNodeSchema } from "./TreeAggregationNode";

/**
 * Describes the results of an aggregation. This serves as a base interface for list and tree aggregations
 */

export const AggregationSchema = z.object({
    /**
     * The name of the aggregation
     */
    name: z.string(),
    /**
     * The name of the index column used to provide aggregation items
     */
    column: z.string(),
    /**
     * Indicates whether the aggregation items are calculated using a distribution (see App Dependencies in the Sinequa admin interface)
     */
    isDistribution: z.boolean().optional(),
    /**
     * Indicates whether the aggregation items should be handled as tree nodes. This can be set to false for a tree aggregation
     * if the "Load tree as csv" option is checked in the Sinequa configuration
     */
    isTree:z.coerce.boolean().optional(),
    /**
     * Indicates whether the values for the items are fielded search expressions. This is the case for aggregations using a
     * distribution (see `isDistribution`) and crossed distributions
     */
    valuesAreExpressions: z.boolean().optional(),
    /**
     * The aggregation items for this aggregation
     */
    items: z.array(z.union([AggregationItemSchema, TreeAggregationNodeSchema])),

    /**
     * The configuration of this aggregation. It should always exists, or else the server could not return the data
     */
    $ccaggregation: CCAggregationSchema.optional(),

    /**
     * The configured or default count parameter of this aggregation
     */
    $cccount: z.number().default(0),

    /**
     * The configuration of the column of this aggregation. It might not exist in the case of composite columns (cross-distributions)
     */
    $cccolumn: CCColumnSchema.optional(),

    /**
     * Indicates that more data can be fetched from the server
     */
    $hasMore: z.boolean().optional(),

    /**
     * All aggregation items that are currently filtered for this aggregation
     */
    $filtered: z.array(AggregationItemSchema).default([]),

    /**
     * Aggregation items that are currently filtered by the query but where not found in the aggregation items
     */
    $remainingFiltered: z.array(AggregationItemSchema).default([]),
})

export type Aggregation = z.infer<typeof AggregationSchema>;