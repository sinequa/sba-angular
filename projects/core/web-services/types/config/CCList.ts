import { z } from "zod";

import { CCConfigSchema } from "./CCConfig";
import { CCListItemSchema } from "./CCListItem";

/**
 * Describes a list configuration object. Lists can be created in `App Dependencies/Lists` in the admin interface.
 */

export const CCListSchema = CCConfigSchema.extend({
    /**
     * The name of the list
     */
    name: z.string(),
    /**
     * The items in the list
     */
    items: z.array(CCListItemSchema)
})

export type CCList = z.infer<typeof CCListSchema>;

