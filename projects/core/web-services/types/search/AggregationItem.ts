import { z } from "zod";

import { CCColumnSchema } from "../config/CCColumn";
/**
 * Describes an aggregation item. This serves as a base interface for list aggregation items and tree aggregation nodes
 */

const OperatorResultsEnum = ["min" , "max" , "sum" , "avg" , "stddev" , "variance"] as const

export const AggregationItemSchema = z.object({
    /**
     * The value of the item
     */
    value: z.union([z.string().nullable(), z.number().nullable(), z.boolean().nullable()]),
    /**
     * The display value of the item, if any
     */
    display: z.string().optional(),
    /**
     * The number of documents that contain this item in the current results
     */
    count: z.number(),
    score: z.number().optional(),
    /**
     * Identifies any operator with their associated results
     */
    operatorResults: z.record(z.enum(OperatorResultsEnum), z.union([z.number(), z.date()])).optional(),
    /**
     * A client-side field that indicates whether this item is currently selected
     */
    $selected: z.boolean().optional(),
    /**
     * A client-side field that indicates whether this item is currently excluded
     */
    $excluded: z.boolean().optional(),
    /**
     * A client-side field that indicates whether this item is currently filtered
     */
    $filtered: z.boolean().optional(),
    /**
     * A client-side field that indicates the column that provided the value for this item.
     * This can be useful when mixing items from different aggregations.
     */
    $column: CCColumnSchema.optional()
})

export type AggregationItem = z.infer<typeof AggregationItemSchema>;
