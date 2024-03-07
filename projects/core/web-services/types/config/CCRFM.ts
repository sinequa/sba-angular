import { z } from "zod";

import { CCRFMActionSchema,} from "./CCRFMAction";

/**
 * Describes an RFM configuration object
 */

export const CCRFMSchema = z.object({
    name: z.string(),
    click: CCRFMActionSchema,
    like: CCRFMActionSchema,
    important: CCRFMActionSchema
})

export type CCRFM = z.infer<typeof CCRFMSchema>;
