import { z } from "zod";

/**
 * Describes an RFM action configuration object
 */
export const CCRFMActionSchema = z.object({
    name: z.string(),
    enabled: z.boolean(),
    actionEnabled: z.boolean(),
    noMenu: z.boolean(),
    displayUnrated: z.boolean(),
    negAvailable: z.boolean()
})

export type CCRFMAction = z.infer<typeof CCRFMActionSchema>;
