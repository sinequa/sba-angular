import { z } from "zod";

import { QueryAnalysisSchema } from "./QueryAnalysis";
import { QueryIntentSchema } from "./QueryIntent";

/**
 * Describes information to be sent to the server when executing a query for server-side query intent processing
 */
export const QueryIntentDataSchema = z.object({
    /**
     * The current results view
     */
    resultsView: z.string().optional(),
    /**
     * The current tab
     */
    tab: z.string().optional(),
    /**
     * Query intents
     */
    queryIntents: z.array(QueryIntentSchema).optional(),
    /**
     * Analysis of the current query
     */
    queryAnalysis: QueryAnalysisSchema.optional()
})

export type QueryIntentData = z.infer<typeof QueryIntentDataSchema>;
