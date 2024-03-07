import { z } from "zod";

import { AccessListPrincipalSchema } from "./AccessListPrincipal";

/**
 * Describes the access lists
 */
export const AccessListsSchema = z.array(AccessListPrincipalSchema);
export type AccessLists = z.infer<typeof AccessListsSchema>;
