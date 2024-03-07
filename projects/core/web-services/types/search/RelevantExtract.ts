import { z } from "zod";

/**
 * Relevant Extract computed by the engine for a particular query
 */
export const RelevantExtractSchema = z.object({
    partname: z.string().optional(),
    highlighted: z.string(),
    locations: z.string(),
    originalLocations: z.string(),
    score: z.coerce.number()
})

export type RelevantExtract = z.infer<typeof RelevantExtractSchema>;
