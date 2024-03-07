import { z } from "zod";

/**
 * Describes an element of query analysis
 */
export const QueryAnalysisElementSchema: z.ZodSchema<QueryAnalysisElement> = z.lazy(() => z.object({
    text: z.string(),
    entity: z.string().optional(),
    weight: z.number(),
    length: z.number().optional(),
    offset: z.number().optional(),
    stopword: z.boolean().optional(),
    root: z.string().optional(),
    normalization: z.string().optional(),
    lemmas: z.array(
        z.object({
            text: z.string()
            })
        ).optional(),
    entities: z.array(QueryAnalysisElementSchema).optional(),
    synonyms: z.array(QueryAnalysisElementSchema).optional(),
    reformulations: z.array(QueryAnalysisElementSchema).optional(),
    typos: z.array(QueryAnalysisElementSchema).optional(),
    expression: z.array(QueryAnalysisElementSchema).optional(),
    adjacency: z.array(QueryAnalysisElementSchema).optional(),
    exact: z.array(QueryAnalysisElementSchema).optional()
}))

export type QueryAnalysisElement = {
    text: string,
    entity?: string,
    weight: number,
    length?: number,
    offset?: number,
    stopword?: boolean,
    root?: string,
    normalization?: string,
    lemmas?: { text: string }[],
    entities?: QueryAnalysisElement[],
    synonyms?: QueryAnalysisElement[],
    reformulations?: QueryAnalysisElement[],
    typos?: QueryAnalysisElement[],
    expression?: QueryAnalysisElement[],
    adjacency?: QueryAnalysisElement[],
    exact?: QueryAnalysisElement[]
}


