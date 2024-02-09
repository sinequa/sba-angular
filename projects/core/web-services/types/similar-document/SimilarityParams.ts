import { z } from "zod";


export const SimilarityParamsSchema = z.object({
  vectorField: z.union([z.literal("passagevectors"), z.literal("sourcevector")]).default("passagevectors"),
  minVectorSimilarity: z.number().default(0.0),
  maxVectorSimilarity: z.number().default(1.0),
  maxDocs: z.number().default(10),
  minDocumentSimilarity: z.number().default(0.0),
  maxDocumentSimilarity: z.number().default(1.0),
  docSimilarityReduction: z.string().optional(),
});

export type SimilarityParams = z.infer<typeof SimilarityParamsSchema>;
