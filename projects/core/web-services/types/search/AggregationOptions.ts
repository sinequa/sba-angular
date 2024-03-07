import { z } from "zod";
/**
 * These options can be used to provide pagination of aggregation values
 */
export const AggregationOptionsSchema = z.object({
  /**
   * Specifies the starting index of the values to retrieve
   */
  skip: z.number().optional(),
  /**
   * Specifies the number of aggregation values to retrieve
   */
  count: z.number().optional()
})

export type AggregationOptions = z.infer<typeof AggregationOptionsSchema>;
