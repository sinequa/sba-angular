import { z } from "zod";

import { QueryAnalysisElementSchema } from "./QueryAnalysisElement";

/**
 * Describes an analysis of a query
 */
export const QueryAnalysisSchema = z.object({
    text: z.string(),
    initial: z.boolean(),
    queryLanguage: z.string().optional(),
    elements: z.array(QueryAnalysisElementSchema),
})

export type QueryAnalysis = z.infer<typeof QueryAnalysisSchema>;
