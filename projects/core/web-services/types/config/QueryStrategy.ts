/**
 * Defines strategies that can used in the query search parameters. Each strategy defines a pair of word weight (`ww`) and meaning
 * weight (`mw`) values to be used.
 *
 * `Default` - no `ww` and `mw` parameters used
 *
 * `WordsOnly` - `ww=1;mw=0`
 *
 * `WordsFirst` - `ww=0.8;mw=0.2`
 *
 * `WordsAndMeaning` - `ww=0.6;mw=0.4`
 *
 * `MeaningFirst` - `ww=0.3;mw=0.7`
 *
 * `MeaningOnly` - `ww=0;mw=1`
 */

import { z } from "zod";

const VALUES = ["Default" , "WordsOnly" , "WordsFirst" , "WordsAndMeaning" , "MeaningFirst" , "MeaningOnly"] as const;
export const QueryStrategySchema = z.enum(VALUES);
export type QueryStrategy = z.infer<typeof QueryStrategySchema>;

