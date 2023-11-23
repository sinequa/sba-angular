import { z } from "zod";

/**
 * Describes a query intent word
 */
export const QueryIntentWordSchema = z.object({
    word: z.string(),
    value: z.string(),
    matched: z.boolean()
})

export type QueryIntentWord = z.infer<typeof QueryIntentWordSchema>;
