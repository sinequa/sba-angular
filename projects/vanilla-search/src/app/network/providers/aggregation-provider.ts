import { Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { Node, Edge, EdgeType, NetworkProvider, NetworkDataset, getEdgeId, getNodeId, NodeType } from '../network-models';
import { Subject } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { FacetService } from '@sinequa/components/facet';
import { AppService, Query, Expr } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { Utils } from '@sinequa/core/base';

export interface AggregationEdge extends Edge {
    aggregationItem: AggregationItem;
    aggregation: Aggregation;
}

export interface AggregationData {
    values: string[]; // eg. LARRY PAGE, GOOGLE
    displays: string[]; // eg. Larry Page, Google
    relations?: string[]; // eg. Works At
    directed?: boolean[]; // eg. true
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


export class AggregationProvider implements NetworkProvider {

    protected readonly provider = new Subject<NetworkDataset>();

    protected readonly dataset = new NetworkDataset();

    public active = true;

    constructor(
        protected edgeType: AggregationEdgeType,
        protected facetService: FacetService,
        protected appService: AppService,
        protected searchService: SearchService,
        protected query?: Query) {
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
            const node = this.createAggregationNode(this.edgeType.nodeTypes[i], rawData.values[i], rawData.displays[i], item.count, true);
            data.addNodes(node);
            if(i > 0){
                data.addEdges(this.createAggregationEdge(this.edgeType, [lastNode!, node], aggregation, item, true));
            }
            lastNode = node;
        }
        this.dataset.merge(data);
    }

    /**
     * Create a single aggregation node
     */
    protected createAggregationNode(type: NodeType, value: string, display: string, count: number, visible: boolean): Node {
        const node: Node = {
            id: getNodeId(type, value),
            label: display,
            type: type,
            count: count,
            visible: visible,
            provider: this
        }
        let options;
        if(typeof type.nodeOptions === "function") {
            options = type.nodeOptions(node, type);
        }
        else {
            options = type.nodeOptions;
        }
        return Utils.extend(node, options);
    }

    /**
     * Create a single aggregation edge
     */
    protected createAggregationEdge(type: AggregationEdgeType, nodes: Node[], aggregation: Aggregation, item: AggregationItem, visible: boolean): AggregationEdge {
        const edge : AggregationEdge = {
            id: getEdgeId(nodes[0], nodes[1]),
            from: nodes[0].id,
            to: nodes[1].id,
            type: type,
            provider: this,
            visible: visible,
            count: item.count,
            aggregation: aggregation,
            aggregationItem: item
        };
        let options: {[key: string]: any};
        if(typeof type.edgeOptions === "function") {
            options = type.edgeOptions(nodes, edge, type);
        }
        else {
            options = type.edgeOptions;
        }
        return Utils.extend(edge, options);
    }


    
    getProvider(): Subject<NetworkDataset> {
        return this.provider;
    }

    /** 
     * Retrieves the aggregation data synchronously or asynchronously, and updates the dataset with it.
     */
    getData() {
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

    onDatasetsMerged(dataset: NetworkDataset) {

    }

    onNodesInserted(nodes: Node[]) {

    }

    onNodeClicked(node?: Node) {

    }

    getProviderActions(): Action[] {
        return [];
    }

    getNodeActions(node: Node): Action[] {
        return [];
    }

    onDestroy() {

    }

}
