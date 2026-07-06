import { z } from "zod";

/**
 * Describes how the engine applied the corrected term for a "did you mean" item
 *
 * `correction` - the original search term is replaced by the corrected term
 *
 * `expansion` - the original search term is still searched along with the corrected term
 *
 * `suggestion` - only the original search term is searched, the correction is a mere suggestion
 */
export const DidYouMeanActionSchema = z.enum(["correction", "expansion", "suggestion"]);

export type DidYouMeanAction = z.infer<typeof DidYouMeanActionSchema>;

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
    /**
     * How the corrected term was applied by the engine. Not present when the engine version does not provide this information (before 11.14)
     */
    action: DidYouMeanActionSchema.optional(),
})

export type DidYouMeanItem = z.infer<typeof DidYouMeanItemSchema>;
