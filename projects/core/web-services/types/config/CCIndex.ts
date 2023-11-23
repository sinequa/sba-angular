import { z } from "zod";

import { CCColumnSchema } from "./CCColumn";
import { CCConfigSchema } from "./CCConfig";

/**
 * Describes the fields available in the index configuration object
 */

export const CCIndexSchema = CCConfigSchema.extend({
    /**
     * The type of the index
     */
    indexType: z.string(),
    /**
     * The columns in the index
     */
    columns: z.record(z.string(), CCColumnSchema).optional()
})

export type CCIndex = z.infer<typeof CCIndexSchema>;
