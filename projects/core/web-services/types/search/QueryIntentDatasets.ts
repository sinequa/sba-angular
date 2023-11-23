import { z } from "zod";

/**
 * Describes a set of query intent datasets
 */
export const QueryIntentDatasetsSchema = z.record(z.object({
    attributes: z.array(z.any()),
    rows: z.array(z.any())
}))

export type QueryIntentDatasets = z.infer<typeof QueryIntentDatasetsSchema>;