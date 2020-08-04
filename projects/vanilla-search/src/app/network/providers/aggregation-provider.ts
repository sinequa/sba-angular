import { Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { Node, Edge, EdgeType, NetworkDataset, NetworkContext } from '../network-models';
import { Action } from '@sinequa/components/action';
import { FacetService } from '@sinequa/components/facet';
import { AppService, Query, Expr } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { Utils } from '@sinequa/core/base';
import { BaseProvider } from './base-provider';

export interface AggregationEdge extends Edge {
    aggregationItem: AggregationItem;
    aggregation: Aggregation;
}

export interface AggregationData {
    values: string[]; // eg. LARRY PAGE, GOOGLE
    displays: string[]; // eg. Larry Page, Google
    relations?: string[]; // eg. Works At
    directed?: boolean[]; // eg. true
    fieldValue?: string; // A value on which to filter the data
}

export interface AggregationEdgeType extends EdgeType {
    /** Name of the aggregation in the Web Service configuration */
    aggregation: string;
    /** If parse is provided, it is used to get the new nodes and edges. If not, the value is automatically converted into nodes, using nodeTypes[1] */
    parse?: (item: AggregationItem, type: AggregationEdgeType) => AggregationData; // A cooccurrence aggregation might return 3 nodes and 2 edges
    // TODO: add visibility modes ? (eg. existingNodes)
}

export function isAggregationEdgeType(et: EdgeType): et is AggregationEdgeType {
    return !!(et as AggregationEdgeType).aggregation;
}


export class AggregationProvider extends BaseProvider {

    constructor(
        protected edgeType: AggregationEdgeType,
        protected facetService: FacetService,
        protected appService: AppService,
        protected searchService: SearchService,
        public name: string,
        protected query?: Query
    ) {
        super(name || edgeType.aggregation);
    }

    /**
     * Fills the dataset with nodes and edges corresponding to
     * the given aggregation data and emits this new dataset.
     * @param aggregation 
     */
    protected updateDataset(aggregation: Aggregation) {
        this.dataset.clear();

        if(this.active && aggregation.items) {
            aggregation.items.forEach(item => this.addAggregationNodes(item, aggregation));
        }

        this.provider.next(this.dataset);
    }

    /**
     * Create nodes and edges for the given aggregation item and adds them
     * to the dataset.
     */
    addAggregationNodes(item: AggregationItem, aggregation: Aggregation) {

        let rawData: AggregationData;

        if(this.edgeType.parse) {
            rawData = this.edgeType.parse(item, this.edgeType);
        }
        // Default parsing, assuming cross-distribution format ("Apple/Steve Jobs")
        else {
            if(!item.display){
                throw new Error(`Aggregation Item '${item.value}' has no display value`);
            }
            const displays = item.display.split("/");
            const expr = this.appService.parseExpr(item.value.toString()) as Expr;
            const values = expr.operands.map(e => e.value!);
            if(values.length < 2 || displays.length < 2 || this.edgeType.nodeTypes.length < 2 || !values[0] || !values[1]) {
                throw new Error(`Incorrect aggregation item (${item.value}, ${item.display}) or edge type (${this.edgeType.nodeTypes.length})`);
            }
            rawData = {values, displays};
        }

        const data = new NetworkDataset();
        let lastNode: Node;
        for(let i=0; i<rawData.values.length; i++){
            const node = this.createNode(this.edgeType.nodeTypes[i], rawData.values[i], rawData.displays[i], true, {}, item.count);
            data.addNodes(node);
            if(i > 0){
                const relation = rawData.relations? rawData.relations[i-1] : undefined;
                const directed = rawData.directed? rawData.directed[i-1] : false;
                data.addEdges(this.createEdge(this.edgeType, lastNode!, node, rawData.fieldValue, true, {aggregation, aggregationItem: item}, item.count, directed, relation));
            }
            lastNode = node;
        }
        this.dataset.merge(data);
    }


    // NetworkProvider interface

    /** 
     * Retrieves the aggregation data synchronously or asynchronously, and updates the dataset with it.
     */
    getData(context: NetworkContext) {
        this.context = context;

        if(!this.active) {
            this.provider.next();
            return;
        }

        const aggregation = this.facetService.getAggregation(this.edgeType.aggregation);
        if(aggregation) {
            this.updateDataset(aggregation);
        }
        else {
            if(!this.appService.getCCAggregation(this.edgeType.aggregation)) {
                throw new Error(`Aggregation ${this.edgeType.aggregation} does not exist in the Query web service configuration`);
            }
            const query = Utils.copy(this.query || this.searchService.query);
            query.action = "aggregate";
            query.aggregations = [this.edgeType.aggregation];
    
            this.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(
                results => {
                    this.updateDataset(results.aggregations[0]);
                }
            );
        }
    }

    getProviderActions(): Action[] {
        return super.getProviderActions();
    }

    getNodeActions(node: Node): Action[] {
        return super.getNodeActions(node);
    }

}
