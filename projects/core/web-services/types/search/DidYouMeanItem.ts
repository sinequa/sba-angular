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
 * Describes a single correction applied by the engine to one term of the query
 */
export const DidYouMeanAppliedChangeSchema = z.object({
    /**
     * The original form of this term
     */
    form: z.string(),
    /**
     * The corrected form of this term
     */
    correction: z.string(),
    /**
     * How this term's correction was applied by the engine. Not present when the engine version does not provide this information (before 11.14)
     */
    action: DidYouMeanActionSchema.optional(),
})

export type DidYouMeanAppliedChange = z.infer<typeof DidYouMeanAppliedChangeSchema>;

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
     * The list of per-term corrections applied by the engine to produce `corrected` from `original`. Not present when the engine version does not provide this information (before 11.14)
     */
    appliedChanges: z.array(DidYouMeanAppliedChangeSchema).optional(),
})

export type DidYouMeanItem = z.infer<typeof DidYouMeanItemSchema>;
