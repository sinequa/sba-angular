import { z } from "zod";

/**
 * Describes the term presence for a particular search term
 */
export const TermPresenceSchema = z.object({
    term: z.string(),
    presence: z.union([z.literal("found") , z.literal("missing")])
})

export type TermPresence = z.infer<typeof TermPresenceSchema>;
