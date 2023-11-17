import { z } from "zod";

import { PassageSchema } from "./Passage";

/**
 * A passage returned by ML Passage Ranking model
 */

export const MatchingPassageSchema = PassageSchema.extend({
    /** Score of this matching passage */
    score: z.number(),
    /** Front end parameter to store the state of expansion/collapse of this passage */
    $expanded: z.boolean().optional()
})

export type MatchingPassage = z.infer<typeof MatchingPassageSchema>;
