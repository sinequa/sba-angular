import { z } from "zod";

import { PartnameMatchLocationsSchema } from "./PartnameMatchLocations";

/**
 * Describes a set of partname match locations
 */
export const MatchLocationsPerPartnameSchema = z.object({
    matchlocations: z.array(PartnameMatchLocationsSchema)
})

export type MatchLocationsPerPartname = z.infer<typeof MatchLocationsPerPartnameSchema>;

