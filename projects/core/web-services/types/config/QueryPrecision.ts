import { z } from "zod";

/**
 * Defines different precision operators that can be automatically added to a `text contains` clause
 * when no precision operators are present.
 *
 * `Default` - no operators are added
 *
 * `ExactExpression` - text surrounded by `"..."`
 *
 * `InTheSamePhrase` - text surrounded by `[...]`
 *
 * `EveryWord` - text surrounded by `+(...)`
 */
const VALUES = ["Default" , "ExactExpression" , "InTheSamePhrase" , "EveryWord"] as const;
export const QueryPrecisionSchema = z.enum(VALUES);
export type QueryPrecision = z.infer<typeof QueryPrecisionSchema>;
