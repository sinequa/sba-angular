import { z } from "zod";

import { RFMDisplay } from "./RFMDisplay";

/**
 * Describes the fields of an RFM action
 */
export const RFMActionDisplaySchema = z.object({
    eventCount: z.number(),
    average: z.number(),
    status: z.nativeEnum(RFMDisplay),
    image: z.nativeEnum(RFMDisplay),
    imageAction: z.nativeEnum(RFMDisplay),
    availableActions: z.nativeEnum(RFMDisplay)
})

export type RFMActionDisplay = z.infer<typeof RFMActionDisplaySchema>;