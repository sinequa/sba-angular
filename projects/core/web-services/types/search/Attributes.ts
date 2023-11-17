import { z } from "zod";

/**
 * Various attributes that are returned with a set of search results
 */
export const AttributesSchema = z.object({
    queryid: z.string().optional(),
    searchid: z.string().optional(),
    processingtime: z.string(),
    rowfetchtime: z.string(),
    cachehit: z.string(),
    matchingrowcount: z.string(),
    internalqueryanalysis: z.string().optional(),
    internalquerylog: z.string().optional(),
})

export type Attributes = z.infer<typeof AttributesSchema>;
