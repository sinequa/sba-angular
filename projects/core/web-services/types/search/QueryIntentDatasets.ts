import { z } from "zod";

/**
 * Describes a set of query intent datasets
 * @deprecated Query Intent v1
 */
export const QueryIntentDatasetsSchema = z.record(z.object({
    attributes: z.array(z.any()),
    rows: z.array(z.any())
}))
/**
 * Describes a set of query intent datasets
 * @deprecated Query Intent v1
 */
export type QueryIntentDatasets = z.infer<typeof QueryIntentDatasetsSchema>;