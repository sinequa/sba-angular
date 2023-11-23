import { z } from "zod";

import { CCColumnInfoSchema } from "./CCColumnInfo";

/**
 * Describes a set of `CCColumnInfo` objects
 */
export const CCColumnsInfoSchema = z.object({
    columns: z.array(CCColumnInfoSchema)
})

export type CCColumnsInfo = z.infer<typeof CCColumnsInfoSchema>;
