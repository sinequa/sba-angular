import { z } from "zod";

/**
 * Defines modes for the spelling correction of search terms and did-you-mean functionality. Corrections
 * are based on edit and phonetic distance and exist among the searched documents
 *
 * `default | classic` - corrections are sought for terms that are not present in any documents. The original terms
 * and corrections are included in the query
 *
 * `smart` - corrections are sought for terms that are present in less than 10 documents and where the correction
 * is 20 times more frequent than the original term. Only the best corrections are kept. The original terms and corrections
 * are included in the query. The [Results.didYouMean]{@link Results#didYouMean] member is populated allowing for a "We included
 * results for these terms..." feedback to be displayed
 *
 * `correct` - corrections are sought for terms that are present in less than 10 documents and where the correction is
 * 20 times more frequent than the original term. Only the best corrections are kept. The original terms that have corrections
 * are not included in the query. The [Results.didYouMean]{@link Results#didYouMean] member is populated allowing for a "Your query
 * has been corrected to..." feedback to be displayed
 *
 * `dymonly` - corrections are sought for terms that are present in less than 10 documents and where the correction is
 * 20 times more frequent than the original term. The actual query is unaffected but the
 * [Results.didYouMean]{@link Results#didYouMean] member will be populated allowing for a "Did you mean..." feedback to be
 * displayed
 *
 * `force` - corrections are sought for all terms. All terms and corrections are included in the query
 *
 * `false` - no spelling correction processing occurs
 */

export const SpellingCorrectionModeSchema = z.enum(["default", "classic", "smart", "correct", "dymonly", "force", "false"]);

export type SpellingCorrectionMode = z.infer<typeof SpellingCorrectionModeSchema>;
