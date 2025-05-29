import { z } from "zod";

/**
 * Describes a scope configuration object. A scope defines a set of conditions which
 * will be added to the query `where clause` when the scope is selected
 */
export const CCScopeSchema =z.object({
    /**
     * The name of the scope
     */
    name: z.string(),
    /**
     * The description of the scope
     */
    description: z.string().optional(),
    /**
     * The display value to be used when rendering the scope
     */
    display: z.string().optional(),
    /**
     * Determines whether the scope is active or not
     */
    isActive: z.boolean().optional(),
    /**
     * Determines whether the scope should be considered the default scope
     * when a scope is not specified in a query
     */
    isDefault: z.boolean().optional()
})

export type CCScope = z.infer<typeof CCScopeSchema>;


