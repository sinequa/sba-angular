import { z } from "zod";

/**
 * Describes the fields available in a list item configuration object
 */
export const CCListItemSchema = z.object({
    /**
     * The name is used to display an item
     */
    name: z.string(),
    /**
     * The value holds the underlying value of the item
     */
    value: z.string()
})

export type CCListItem = z.infer<typeof CCListItemSchema>;
