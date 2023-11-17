import { z } from "zod";

/**
 * Describes the match location information for a particular partname
 */
export const PartnameMatchLocationsSchema = z.object({
    partname: z.string(),
    data: z.string(),
})

export type PartnameMatchLocations = z.infer<typeof PartnameMatchLocationsSchema>;
