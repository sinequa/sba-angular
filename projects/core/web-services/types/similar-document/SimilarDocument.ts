import { z } from "zod";

export const SimilarDocumentSchema = z.object({
  id: z.string(),
  documentSimilarity: z.number(),
  doc: z.record(z.string())
});

export type SimilarDocument = z.infer<typeof SimilarDocumentSchema>;
