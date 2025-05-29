import { z } from "zod";

import { AggregationSchema } from "./Aggregation";

/**
 * Describes the fields specific to a list aggregation
 */
export type ListAggregation = z.infer<typeof AggregationSchema>;