import { z } from "zod";

/**
 * Describes the fields of a principal item in an access list
 */
export const AccessListPrincipalSchema = z.object({
    /**
     * The Sinequa domain to which the principal belongs
     */
    domain: z.string(),
    /**
     * The identifier of the principal
     */
    id: z.string().describe("The identifier of the principal"),
})
export type AccessListPrincipal = z.infer<typeof AccessListPrincipalSchema>;