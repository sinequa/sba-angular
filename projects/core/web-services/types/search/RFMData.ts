import { z } from "zod";

import { RFMActionDisplaySchema } from "./RFMActionDisplay";

/**
 * Describes the RFM data returned with a set of results
 */
export const RFMDataSchema = z.object({
    click: RFMActionDisplaySchema.optional(),
    like: RFMActionDisplaySchema.optional(),
    important: RFMActionDisplaySchema.optional()
})

export type RFMData = z.infer<typeof RFMDataSchema>;