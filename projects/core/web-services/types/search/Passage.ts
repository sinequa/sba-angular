
import * as z from 'zod';

export const PassageSchema = z.object({
    id: z.number(),
    location: z.array(z.number()),
    rlocation: z.array(z.number()),
    /** text of the passage with answer highlighted with <b> tags */
    highlightedText: z.string(),
});

export type Passage = z.infer<typeof PassageSchema>;