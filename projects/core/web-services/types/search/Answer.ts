import { z } from "zod";

import { PassageSchema } from "./Passage";
import { RecordSchema } from "./Record";

/**
 * An answer returned by the ML Answer Finder model
 */
export const AnswerSchema = z.object({
    text: z.string(),
    score: z.number(),
    passage: PassageSchema,
    /** Record from which this answer was extracted */
    recordId: z.string(),
    $record: RecordSchema.optional(),
    $liked: z.boolean().optional(),
    "af.score": z.number(),
    "rm.score": z.number(),
});

export type Answer = z.infer<typeof AnswerSchema>;
