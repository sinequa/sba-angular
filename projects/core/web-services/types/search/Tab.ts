import { z } from "zod";

/**
 * Describes the results for a particular tab
 */
export const TabSchema = z.object({
    /**
     * The name of the tab
     */
    name: z.string(),
    /**
     * The display value of the tab
     */
    display: z.string(),
    /**
     * The tab value
     */
    value: z.string(),
    /**
     * The number of document records that would be returned if this tab is selected
     */
    count: z.number()
})

export type Tab = z.infer<typeof TabSchema>;
