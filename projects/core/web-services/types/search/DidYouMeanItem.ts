import { z } from "zod";

/**
 * Describes a single "did you mean" item
 */
export const DidYouMeanItemSchema = z.object({
    /**
     * The original search term
     */
    original: z.string(),
    /**
     * The corrected search term
     */
    corrected: z.string(),
})

export type DidYouMeanItem = z.infer<typeof DidYouMeanItemSchema>;
