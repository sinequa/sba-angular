import { z } from "zod";

/**
 * Describes a query intent action
 */
export const QueryIntentActionSchema = z.object({
    type: z.string(),
    data: z.string()
})

export type QueryIntentAction = z.infer<typeof QueryIntentActionSchema>;


