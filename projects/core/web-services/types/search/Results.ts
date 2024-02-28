import { z } from "zod";

import { AggregationSchema } from "./Aggregation";
import { AnswerSchema } from "./Answer";
import { AttributesSchema } from "./Attributes";
import { DidYouMeanSchema } from "./DidYouMean";
import { QueryAnalysisSchema } from "./QueryAnalysis";
import { QueryIntentSchema } from "./QueryIntent";
import { RecordSchema } from "./Record";

import { TabSchema } from "./Tab";
import { TopPassageSchema } from "./TopPassage";
import { TreeAggregationSchema } from "./TreeAggregation";

/**
 * Describes the results of a call to the query web service
 */
export const ResultsSchema = z.object({
    /**
     * A unique identifier for this set of results - typically used for auditing
     */
    id: z.string(),
    /**
     * The page number of these results
     */
    page: z.number(),
    /**
     * The page size or number of document per page
     */
    pageSize: z.number(),
    /**
     * The number of document results for the query.
     */
    rowCount: z.number(),
    /**
     * The number of document results for the query. If tab search is active and the `CCTabSearch.totalIsSumOfTabTotals` option is set then
     * the total of counts of all the tabs will be returned. Otherwise this returns the same value as `rowCount`.
     */
    totalRowCount: z.number(),
    /**
     * Returns the number of documents included in these results, as reported by the engine. It will have the same value as `records.length`.
     */
    cursorRowCount: z.number(),
    /**
     * The number of attributes in these results
     */
    attributeCount: z.number().optional(),
    /**
     * The number of columns in these results
     */
    columnCount: z.number(),
    /**
     * The name of currently selected tab. SeeSchema {@link CCTab}
     */
    tab: z.string(),
    /**
     * Information on the tabs for these results. SeeSchema {@link CCTabSearch}
     */
    tabs: z.array(TabSchema),
    /**
     * The name of the currently selected scope. SeeSchema {@link CCScope}
     */
    scope: z.string().optional(),
    /**
     * The name of the currently selected sorting choice. SeeSchema {@link CCSortingChoice}
     */
    sort: z.string(),
    /**
     * Details of the "did you mean" state for these results
     */
    didYouMean: DidYouMeanSchema.optional(),
    /**
     * The aggregation results
     */
    aggregations: z.array(z.union([AggregationSchema, TreeAggregationSchema])).default([]),
    /**
     * The attributes for these results
     */
    attributes: AttributesSchema,
    /**
     * Any query intents associated with these results
     */
    queryIntents: z.array(QueryIntentSchema).default([]),
    /**
     * An analysis of the query associated with these results
     */
    queryAnalysis: QueryAnalysisSchema.optional(),
    /**
     * The document records
     */
    records: z.array(RecordSchema),
    /**
     * A hash of the associated results for use with RFM (relevance feedback model) functionality
     */
    rfmQueryHash: z.string().optional(),
    /**
     * The name of theSchema {@link IQuery} that produced these results
     */
    queryName: z.string(),
    /**
     * SQL statements executed by the query web service
     */
    statements: z.array(z.string()).optional(),
    /**
     * Whether the query that was executed had searched text and associated relevance
     */
    hasRelevance: z.boolean(),
    /**
     * Answers generated by the Answer Finder ML model
     */
    answers: z.object({
        answers: z.array(AnswerSchema)
    }).optional().nullable(),
    /**
     * Top passages generated by the passing ranking ML model
     */
    topPassages: z.object({
        passages: z.array(TopPassageSchema).optional()
    }).optional().nullable(),
})

const computedSchema = z.object({
    /**
     * Map of aggregations by their lower-case name (generated by the front-end)
     */
    $aggregationMap: z.record(z.string(), z.union([AggregationSchema, TreeAggregationSchema])),
});

export type Results = z.infer<typeof ResultsSchema & typeof computedSchema>;