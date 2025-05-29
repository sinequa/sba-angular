import { z } from "zod";

import { AggregationItemSchema } from "./AggregationItem";

/**
 * Describes any fields particular to a tree aggregation node
 */

// export const TreeAggregationNodeSchema: z.ZodSchema<TreeAggregationNode & AggregationItem> = z.lazy(() => AggregationItemSchema.extend({
//     /**
//      * Determines whether this node has any children even if the `items` field is not currently populated
//      */
//     hasChildren: z.boolean(),
//     /**
//      * Contains the child nodes of this node
//      */
//     items: z.array(TreeAggregationNodeSchema).default([]),
//     /**
//      * Trees are limited to string values
//      */
//     value: z.string(),

//     /**
//      * A client-side field that contains the full path of the node
//      */
//     $path: z.string().optional(),
//     /**
//      * A client-side field that indicates whether a parent node is currently open
//      */
//     $opened: z.boolean().optional(),
//     $opening: z.boolean().optional(),
//     /**
//      * The level at which this node is in the Tree aggregation
//      */
//     $level: z.number().optional()
// }));

// export type TreeAggregationNode = AggregationItem & {
//     hasChildren: boolean,
//     items: TreeAggregationNode[],
//     value: string,
//     $path?: string,
//     $opened?: boolean,
//     $opening?: boolean,
//     $level?: number
// }
const baseTreeAggregationNodeSchema = AggregationItemSchema.extend({
    /**
     * Determines whether this node has any children even if the `items` field is not currently populated
     */
    hasChildren: z.boolean().optional(),
    /**
     * Trees are limited to string values
     */
    value: z.string(),

    /**
     * A client-side field that contains the full path of the node
     */
    $path: z.string().optional(),
    /**
     * A client-side field that indicates whether a parent node is currently open
     */
    $opened: z.boolean().optional(),
    $opening: z.boolean().optional(),
    /**
     * The level at which this node is in the Tree aggregation
     */
    $level: z.number().optional()
})

type Item = z.infer<typeof baseTreeAggregationNodeSchema> & {
    items: Item[]
};

export const TreeAggregationNodeSchema: z.ZodType<Item> = baseTreeAggregationNodeSchema.extend({
        items: z.lazy(() => TreeAggregationNodeSchema.array())
    })
    .refine(data => data.hasChildren === undefined && data.items !== undefined, {message: "hasChildren must be defined if items is defined"})
    .refine(data => data.hasChildren !== undefined && data.items === undefined, {message: "items must be defined if hasChildren is defined"})
    .transform(data => {
        if(data.hasChildren === undefined) {
            data.hasChildren = false;
            data.items = [];
            return data;
        }
        if( data.items === undefined) {
            data.hasChildren = false;
            data.items = [];
        }
        return data;
    })

export type TreeAggregationNode = z.infer<typeof TreeAggregationNodeSchema>;
