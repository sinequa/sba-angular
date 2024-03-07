import { z } from "zod"
/**
 * Describes the fields available in all configuration objects. By convention, configuration object
 * interfaces are prefixed by `CC`.
 */
export const CCConfigSchema = z.object({
    /**
     * The name of the configuration object
     */
    name: z.string(),
    /**
     * An optional description of the configuration object
     */
    description: z.string().optional()
})

export type CCConfig = z.infer<typeof CCConfigSchema>;
