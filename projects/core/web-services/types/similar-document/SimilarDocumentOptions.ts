import { Filter } from "../filters";
import { SimilarityParams } from "./SimilarityParams";


export type SimilarDocumentOptions = {
  params?: SimilarityParams,
  expand?: string[],
  filters?: Filter[]
};
