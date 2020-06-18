import {Injectable, Inject} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils, FieldValue} from "@sinequa/core/base";
import {IQuery} from "./query/query";
import {AuditEvents} from "./audit.web.service";
import {CCColumn, SpellingCorrectionMode} from "./config/ccapp";

/**
 * Describes the results of a call to the query web service
 */
export interface Results {
    /**
     * A unique identifier for this set of results - typically used for auditing
     */
    id: string;
    /**
     * The sql queries that were executed on the server to produce these results
     */
    sql: string[];
    /**
     * The page number of these results
     */
    page: number;
    /**
     * The page size or number of document per page
     */
    pageSize: number;
    /**
     * The number of document results in the currently selected tab. If tab search is not active then
     * this will be the same as `totalRowCount`
     */
    rowCount: number;
    /**
     * The number of document results across all tabs. If tab search is not active then
     * this will be the same as `rowCount`
     */
    totalRowCount: number;
    cursorRowCount: number;
    /**
     * The number of attributes in these results
     */
    attributeCount: number;
    /**
     * The number of columns in these results
     */
    columnCount: number;
    /**
     * The name of currently selected tab. See {@link CCTab}
     */
    tab: string;
    /**
     * Information on the tabs for these results. See {@link CCTabSearch}
     */
    tabs: Tab[];
    /**
     * The name of the currently selected scope. See {@link CCScope}
     */
    scope: string;
    /**
     * The name of the currently selected sorting choice. See {@link CCSortingChoice}
     */
    sort: string;
    /**
     * Details of the "did you mean" state for these results
     */
    didYouMean: DidYouMean;
    /**
     * The aggregation results
     */
    aggregations: Aggregation[];
    /**
     * The attributes for these results
     */
    attributes: Attributes;
    /**
     * Any query intents associated with these results
     */
    queryIntents: QueryIntent[];
    /**
     * An analysis of the query associated with these resullts
     */
    queryAnalysis: QueryAnalysis;
    /**
     * The document records
     */
    records: Record[];
    /**
     * A hash of the associated results for use with RFM (relevance feedback model) functionality
     */
    rfmQueryHash: string;
}

/**
 * Describes the results for a particular tab
 */
export interface Tab {
    /**
     * The name of the tab
     */
    name: string;
    /**
     * The display value of the tab
     */
    display: string;
    /**
     * The tab value
     */
    value: string;
    /**
     * The number of document records that would be returned if this tab is selected
     */
    count: number;
}

/**
 * Describes a single "did you mean" item
 */
export interface DidYouMeanItem {
    /**
     * The original search term
     */
    original: string;
    /**
     * The corrected search term
     */
    corrected: string;
}

/**
 * Describes the "did you mean" results
 */
export interface DidYouMean {
    /**
     * The spelling correction mode used for these results
     */
    spellingCorrectionMode: SpellingCorrectionMode;
    /**
     * The `DidYouMeanItem` corresponding to the main fulltext terms
     */
    text: DidYouMeanItem;
    /**
     * The `DidYouMeanItem`s corresponding to any refine fulltext term selections
     */
    refine: DidYouMeanItem[];
}

/**
 * Used to inform whether a query is being executed using original or corrected search terms
 */
export enum DidYouMeanKind {
    Original,
    Corrected
}

/**
 * Various attributes that are returned with a set of search results
 */
export interface  Attributes {
    queryid: string;
    searchid: string;
    processingtime: string;
    rowfetchtime: string;
    cachehit: string;
    matchingrowcount: string;
    internalqueryanalysis: string;
    internalquerylog: string;
}

/**
 * Describes a single query intent item
 */
export interface QueryIntent {
    name: string;
    component: string;
    entities: QueryIntentEntity[];
    words: QueryIntentWord[];
    actions: QueryIntentAction[];
    datasets: QueryIntentDatasets;
}

/**
 * Describes a query intent entity
 */
export interface QueryIntentEntity {
    name: string;
    value: string;
    matched: boolean;
}

/**
 * Describes a query intent word
 */
export interface QueryIntentWord {
    word: string;
    value: string;
    matched: boolean;
}

/**
 * Describes a query intent action
 */
export interface QueryIntentAction {
    type: string;
    data: string;
}

/**
 * Describes a set of query intent datasets
 */
export interface QueryIntentDatasets {
    [name: string] : {
        attributes : [any];
        rows : [any];
    };
}

/**
 * Describes an analysis of a query
 */
export interface QueryAnalysis {
    text: string;
    initial: boolean;
    elements: QueryAnalysisElement[];
}

/**
 * Describes an element of query analysis
 */
export interface QueryAnalysisElement {
    text: string;
    entity: string;
    weight: number;
    length: number;
    offset: number;
    stopword: boolean;
    root: string;
    normalization: string;
    lemmas: {text: string}[];
    entities: QueryAnalysisElement[];
    synonyms: QueryAnalysisElement[];
    reformulations: QueryAnalysisElement[];
    typos: QueryAnalysisElement[];
    expression: QueryAnalysisElement[];
    adjacency: QueryAnalysisElement[];
    exact: QueryAnalysisElement[];
}

/**
 * Describes the match location information for a particular partname
 */
export interface PartnameMatchLocations {
    partname: string;
    data: string;
}

/**
 * Describes a set of partname match locations
 */
export interface MatchLocationsPerPartname {
    matchlocations: PartnameMatchLocations[];
}

/**
 * Describes the locations of relevant extracts for a partname
 */
export interface PartnameExtracts {
    partname: string;
    data: string;
}

/**
 * Describes a set of partname relevant extracts locations
 */
export interface ExtractsPerPartname {
    highlight: PartnameExtracts[];
}

/**
 * Describes the term presence for a particular search term
 */
export interface TermPresence {
    term: string;
    presence: "found" | "missing";
}

/**
 * Describes an aggregation item. This serves as a base interface for list aggregation items and tree aggregation nodes
 */
export interface AggregationItem {
    /**
     * The value of the item
     */
    value: FieldValue;
    /**
     * The display value of the item, if any
     */
    display?: string;
    /**
     * The number of documents that contain this item in the current results
     */
    count: number;
    /**
     * Identifies any operator with their associated results
     */
    operatorResults?: {
        [key in "min" | "max" | "sum" | "avg" | "stddev" | "variance"]: number | Date
    };

    /**
     * A client-side field that indicates whether this item is currrently selected
     */
    $selected?: boolean;
    /**
     * A client-side field that indicates whether this item is currently excluded
     */
    $excluded?: boolean;
    /**
     * A client-side field that indicates whether this item is currently unselectable
     */
    $unselectable?: boolean;
    /**
     * A client-side field that indicates the column that provided the value for this item.
     * This can be useful when mixing items from different aggregations.
     */
    $column?: CCColumn;
}

/**
 * Describes any fields particular to a list aggregation item
 */
export type ListAggregationItem = AggregationItem;

/**
 * Describes any fields particular to a tree aggregation node
 */
export interface TreeAggregationNode extends AggregationItem {
    /**
     * Determines whether this node has any children even if the `items` field is not currently populated
     */
    hasChildren: boolean;
    /**
     * Contains the child nodes of this node
     */
    items: TreeAggregationNode[];

    /**
     * A client-side field that contains the full path of the node
     */
    $path?: string;
    /**
     * A client-side field that indicates whether a parent node is currently open
     */
    $opened?: boolean;
}

/**
 * Describes the results of an aggregation. This serves as a base interface for list and tree aggregations
 */
export interface Aggregation {
    /**
     * The name of the aggregation
     */
    name: string;
    /**
     * The name of the index column used to provide aggregation items
     */
    column: string;
    /**
     * Indicates whether the aggregation items are calculated using a distrbution (see App Dependencies in the Sinequa admin interface)
     */
    isDistribution: boolean;
    /**
     * Indicates whether the aggregation items should be handled as tree nodes. This can be set to false for a tree aggregation
     * if the "Load tree as csv" option is checked in the Sinequa configuration
     */
    isTree: boolean;
    /**
     * Indicates whether the values for the items are fielded search expressions. This is the case for aggregations using a
     * distribution (see `isDistribution`) and crossed distributions
     */
    valuesAreExpressions: boolean;
    /**
     * The aggregation items for this aggregation
     */
    items: AggregationItem[];
}

/**
 * Describes the fields specific to a list aggregation
 */
export type ListAggregation = Aggregation;

/**
 * Describes the fields specific to a tree aggregation
 */
export type TreeAggregation = Aggregation;

/**
 * Describes the fields making up an entity in the context of a particular document
 */
export interface EntityItem {
    /**
     * The value
     */
    value: string;
    /**
     * The display
     */
    display: string;
    /**
     * The locations of this item in the document text in the form `row1,col1;row2,col2;...`
     */
    locations: string;
    /**
     * The remapped locations of this item in the original document in the form `row1,col1;row2,col2;...`
     */
    originalLocations: string;
}

/**
 * Display kinds for RFM
 */
export enum RFMDisplay {
    // Must be in par with C# RFMDisplay enum (RFM.cs)
    none          = 0,

    positiveRate  = 1,
    mainlyPosRate = 2,
    unrate        = 4,
    mainlyNegRate = 8,
    negativeRate  = 16,

    all          = 31,
    positiveOnly = 7,
    negativeOnly = 28,

    personalAll = 21,
    personalPosOnly = 5,
    personalNegOnly = 20,
}

/**
 * Describes the fields of an RFM action
 */
export interface RFMActionDisplay {
    eventCount: number;
    average: number;
    status: RFMDisplay;
    image: RFMDisplay;
    imageAction: RFMDisplay;
    availableActions: RFMDisplay;
}

/**
 * Describes the RFM data returned with a set of results
 */
export interface RFMData {
    click?: RFMActionDisplay;
    like?: RFMActionDisplay;
    important?: RFMActionDisplay;
}

/**
 * Describes the standard fields in a document result record
 */
export interface Record {
    /**
     * The zero-based position of this document in the results
     */
    rank: number;
    /**
     * The unique identifier of this document
     */
    id: string;
    /**
     * The name of the index that contains this document
     */
    databasealias: string;
    /**
     * The global relevance of this document in the context of the query
     */
    globalrelevance: number;
    /**
     * Partnames that contain one or more of the search terms
     */
    matchingpartnames: string[];
    /**
     * The locations of the search terms in the document
     */
    matchlocations: string[];
    /**
     * The locations of the search terms in the document grouped by partname
     */
    matchlocationsperpartname: MatchLocationsPerPartname;
    /**
     * The relevant extracts in the document grouped by partname
     */
    extractsperpartname: ExtractsPerPartname;
    /**
     * The languages in the document
     */
    documentlanguages: string[];
    /**
     * The documentweight value of the document
     */
    documentweight: string;
    /**
     * The modified date and time of the document
     */
    modified: string;
    /**
     * The time and date when the document was indexed
     */
    indexationtime: string;
    /**
     * The version of the document
     */
    version: string;
    /**
     * The title of the document
     */
    title: string;
    /**
     * The display title of the document. This can contain HTML highlighting of the search terms
     */
    displayTitle: string;
    /**
     * The size in bytes of the document
     */
    size: number;
    /**
     * The value of the treepath of the document
     */
    treepath: string[];
    /**
     * The filename of the document
     */
    filename: string;
    /**
     * The file extension of the document
     */
    fileext: string;
    /**
     * The document flags
     */
    flags: string[];
    /**
     * The collection that produced the document (only one element will exist)
     */
    collection: string[];
    /**
     * The value of the docformat column
     */
    docformat: string;
    /**
     * The value of the doctype column
     */
    doctype: string;
    /**
     * The value of the url1 column
     */
    url1: string;
    /**
     * The value of the url2 column
     */
    url2: string;
    /**
     * The relevant extracts from the document. This can contain HTML highlighting of the search terms
     */
    relevantExtracts: string;
    /**
     * The text of the document
     */
    text: string;
    /**
     * The document authors
     */
    authors: string[];
    /**
     * The document access lists
     */
    accesslists: DocumentAccessLists;
    /**
     * The URL of the document's thumbnail
     */
    thumbnailUrl: string;
    /**
     * Indicates whether RFM has been enabled for this document
     */
    rfmEnabled: boolean;
    /**
     * Any RFM data for this document
     */
    rfm: RFMData;
    /**
     * Information about the search terms and whether they exist in the document or not
     */
    termspresence: TermPresence[];

    /**
     * A client-side field that indicates whether this document is currrently selected
     */
    $selected: boolean;
}

/**
 * Describes the authorized and denied access lists for a document
 */
export interface DocumentAccessLists {
    accessListIndices: number[];
    authorizedLists: AccessLists;
    deniedLists: AccessLists;
}

/**
 * Describes the access lists
 */
export interface AccessLists {
    /**
     * An array of `AccessListPrincipal` arrays. Each item in the outer array corresponds to column value of the document
     */
    [index: number]: AccessListPrincipal[];
}

/**
 * Describes the fields of a principal item in an access list
 */
export interface AccessListPrincipal {
    /**
     * The Sinequa domain to which the principal belongs
     */
    domain: string;
    /**
     * The identifier of the principal
     */
    id: string;
}

export interface IMulti<T> {
    results: T[];
}

/**
 * Describes information to be sent to the server when executing a query for server-side query intent processing
 */
export interface QueryIntentData {
    /**
     * The current results view
     */
    resultsView?: string;
    /**
     * The current tab
     */
    tab?: string;
    /**
     * Query intents
     */
    queryIntents?: QueryIntent[];
    /**
     * Analysis of the current query
     */
    queryAnalysis?: QueryAnalysis;
}

/**
 * A service to call the query web service
 */
@Injectable({
    providedIn: "root"
})
export class QueryWebService extends HttpService {
    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        public httpClient: SqHttpClient) {
        super(startConfig);
    }

    protected endPoint = "query";

    /**
     * Get the results for the passed query
     *
     * @param query The query to execute
     * @param auditEvents Any audit events to store on the server
     * @param queryIntentData Any accompanying query intent data
     */
    public getResults(query: IQuery, auditEvents?: AuditEvents, queryIntentData?: QueryIntentData): Observable<Results> {
        if (!query) {
            return throwError({ error: "no query" });
        }
        const observable = this.httpClient.post<Results>(this.makeUrl(this.endPoint), {
            app: this.appName,
            query,
            $auditRecord: auditEvents,
            queryIntentData
        });
        Utils.subscribe(observable,
            (response) => {
                console.log("queryService.getResults success - data: ", response);
                return response;
            },
            (error) => {
                console.log("queryService.getResults failure - error: ", error);
            });
        return observable;
    }

    /**
     * Get the results for a set of queries
     *
     * @param queries The queries to execute
     * @param auditEvents Any audit events to store on the server
     */
    public getMultipleResults(queries: IQuery[], auditEvents?: AuditEvents): Observable<IMulti<Results>> {
        if (!queries || queries.length === 0) {
            return throwError({ error: "no queries" });
        }
        const data: {
            methods: {
                method: string;
                app: string;
                query: IQuery
            }[];
            propagateErrors: true;
            $auditRecord?: AuditEvents;
        } = {
            methods: [],
            propagateErrors: true,
            $auditRecord: auditEvents
        };
        for (const query of queries) {
            data.methods.push({
                method: this.endPoint,
                app: this.appName,
                query
            });
        }
        return this.httpClient.post<IMulti<Results>>(this.makeUrl("multi"), data);
    }
}
