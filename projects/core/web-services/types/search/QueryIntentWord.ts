import { z } from "zod";

/**
 * Describes a query intent word
 * @deprecated Query Intent v1
 */
export const QueryIntentWordSchema = z.object({
    word: z.string(),
    value: z.string(),
    matched: z.boolean()
})

/**
 * Describes a query intent word
 * @deprecated Query Intent v1
 */
export type QueryIntentWord = z.infer<typeof QueryIntentWordSchema>;
