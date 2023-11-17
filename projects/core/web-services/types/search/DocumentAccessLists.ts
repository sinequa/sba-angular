import { z } from "zod";

import { AccessListsSchema } from "./AccessLists";

/**
 * Describes the authorized and denied access lists for a document
 */
export const DocumentAccessListsSchema = z.object({
    accessListIndices: z.array(z.number()),
    authorizedLists: AccessListsSchema,
    deniedLists: AccessListsSchema
})

export type DocumentAccessLists = z.infer<typeof DocumentAccessListsSchema>;
