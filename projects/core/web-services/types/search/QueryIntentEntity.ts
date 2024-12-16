import { z } from "zod";

/**
 * Describes a query intent entity
 * @deprecated Query Intent v1
 */
export const QueryIntentEntitySchema = z.object({
    name: z.string(),
    value: z.string(),
    matched:z.boolean()
})
/**
 * Describes a query intent entity
 * @deprecated Query Intent v1
 */
export type QueryIntentEntity = z.infer<typeof QueryIntentEntitySchema>;

