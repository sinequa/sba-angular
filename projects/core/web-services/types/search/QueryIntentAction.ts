import { z } from "zod";

/**
 * Describes a query intent action
 * @deprecated Query Intent v1
 */
export const QueryIntentActionSchema = z.object({
    type: z.string(),
    data: z.string()
})

/**
 * Describes a query intent action
 * @deprecated Query Intent v1
 */
export type QueryIntentAction = z.infer<typeof QueryIntentActionSchema>;


