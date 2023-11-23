import { z } from "zod";

/**
 * Describes a query intent entity
 */
export const QueryIntentEntitySchema = z.object({
    name: z.string(),
    value: z.string(),
    matched:z.boolean()
})

export type QueryIntentEntity = z.infer<typeof QueryIntentEntitySchema>;

