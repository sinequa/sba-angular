import { z } from "zod";

import { AggregationSchema } from "./Aggregation";
import { TreeAggregationNodeSchema } from "./TreeAggregationNode";

/**
 * Describes the fields specific to a tree aggregation
 */
export const TreeAggregationSchema = AggregationSchema.extend({
    hasChildren: z.boolean().optional(),
    items: z.array(TreeAggregationNodeSchema).optional().default([]),
    $filtered: z.array(TreeAggregationNodeSchema).default([])
})

export type TreeAggregation = z.infer<typeof TreeAggregationSchema> & {
    isTree: true
};
