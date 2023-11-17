import { z } from "zod";

import { SpellingCorrectionModeSchema } from "../config/SpellingCorrectionMode";
import { DidYouMeanItemSchema } from "./DidYouMeanItem";


/**
 * Describes the "did you mean" results
 */

export const DidYouMeanSchema = z.object({
    spellingCorrectionMode: SpellingCorrectionModeSchema.describe("The spelling correction mode used for these results"),
    text: DidYouMeanItemSchema.describe("The `DidYouMeanItem` corresponding to the main full text terms")
})

export type DidYouMean = z.infer<typeof DidYouMeanSchema>;
