import { z } from "zod";

import { QueryIntentAction, QueryIntentActionSchema } from "./QueryIntentAction";
import { QueryIntentEntity, QueryIntentEntitySchema } from "./QueryIntentEntity";
import { QueryIntentWord, QueryIntentWordSchema } from "./QueryIntentWord";

/**
 * Describes a single query intent item
 * @deprecated Query Intent v1
 */
export const QueryIntentSchema: z.ZodSchema<QueryIntent> = z.lazy(() => z.object({
    name: z.string(),
    component: z.string(),
    entities: z.array(QueryIntentEntitySchema),
    words: z.array(QueryIntentWordSchema),
    actions: z.array(QueryIntentActionSchema),
    datasets: QueryIntentSchema
}))

/**
 * Describes a single query intent item
 * @deprecated Query Intent v1
 */
export type QueryIntent = {
    name: string,
    component: string,
    entities: QueryIntentEntity[],
    words: QueryIntentWord[],
    actions: QueryIntentAction[],
    datasets: QueryIntent
}