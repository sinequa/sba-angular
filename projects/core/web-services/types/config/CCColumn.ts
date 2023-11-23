import { z } from "zod";

import { CCColumnInfoSchema } from "./CCColumnInfo";
import { EngineType } from "./EngineType";
import { EngineTypeModifier } from "./EngineTypeModifier";

/**
 * Defines the fields for a column configuration object defined in an index. See {@link CCIndex}
 */
export const CCColumnSchema = CCColumnInfoSchema
    .partial()
    .required({name:true})
    .extend({
        aliases: z.array(z.string()).optional(),
        type: z.string(),
        typeModifier: z.string().optional(),
        eType: z.nativeEnum(EngineType),
        eTypeModifier: z.nativeEnum(EngineTypeModifier)
    })

export type CCColumn = z.infer<typeof CCColumnSchema>;
