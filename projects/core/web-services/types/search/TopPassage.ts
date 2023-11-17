import { z } from "zod";

import { RecordSchema } from "./Record";

export const TopPassageSchema = z.object({
    id: z.number(),
    index: z.string(),
    score: z.number(),
    text: z.string(),
    recordId: z.string(),
    location: z.tuple([z.number(), z.number()]),
    answer: z.string().optional(),
    answerScore: z.number().optional(),
    $record: RecordSchema.optional()
})

export type TopPassage = z.infer<typeof TopPassageSchema>;
