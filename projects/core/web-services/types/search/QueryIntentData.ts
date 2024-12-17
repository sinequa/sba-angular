
import { QueryIntentMatch } from "../../queryintent.service";
import { QueryAnalysis } from "./QueryAnalysis";
import { QueryIntent } from "./QueryIntent";

/**
 * Describes information to be sent to the server when executing a query for server-side query intent processing
 */
export type QueryIntentData = {
    /**
     * The current results view
     */
    resultsView?: string,
    /**
     * The current tab
     */
    tab?:  string,
    /**
     * @deprecated Query intents v1
     */
    queryIntents?: QueryIntent[],
    /**
     * Query intents v2
     */
    queryIntentsV2?: QueryIntentMatch[],
    /**
     * Analysis of the current query
     */
    queryAnalysis?: QueryAnalysis
}
