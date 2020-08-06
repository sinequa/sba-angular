import { Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { Node, Edge, EdgeType, NetworkDataset, NetworkContext } from '../network-models';
import { Action } from '@sinequa/components/action';
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

/** Mode "source" means node are fetched and added systematically on getData() / other modes allow expanding an existing node*/
export type AggregationTriggerType = "source" | "onclick" | "manual";

export interface AggregationEdgeType extends EdgeType {
    /** Name of the aggregation in the Web Service configuration */
    aggregation: string;
    /** If parse is provided, it is used to get the new nodes and edges. If not, the value is automatically converted into nodes, using nodeTypes[1] */
    parse?: (item: AggregationItem, type: AggregationEdgeType) => AggregationData; // A cooccurrence aggregation might return 3 nodes and 2 edges
    /** A parameter to define when the aggregation is fetched and nodes are added */
    trigger: AggregationTriggerType;
    /** Default number of items to fetch */
    count?: number;
    // TODO: add visibility modes ? (eg. existingNodes)
}

export function isAggregationEdgeType(et: EdgeType): et is AggregationEdgeType {
    return !!(et as AggregationEdgeType).aggregation;
}


export class AggregationProvider extends BaseProvider {

    readonly skips: {[aggregation: string]: number} = {};

    constructor(
        protected edgeTypes: AggregationEdgeType[],
        protected appService: AppService,
        protected searchService: SearchService,
        public name: string,
        protected query?: Query
    ) {
        super(name);
    }


    /**
     * Fetches the list of aggregations and updates the dataset
     * @param types list of aggregation edge types
     */
    protected fetchAggregations(types: AggregationEdgeType[], sourceNode?: Node) {
        
        const query = Utils.copy(this.query || this.searchService.query);
        query.action = "aggregate";
        query.aggregations = {};
        types.forEach(type => query.aggregations[type.aggregation] = {
            skip: this.skips[type.aggregation+(sourceNode?.id || "")], 
            count: type.count || 10
        });

        if(sourceNode && sourceNode.type.field) {
            query.addSelect(sourceNode.type.field + ":=`"+ this.getNodeValue(sourceNode) +"`");
        }

        Object.keys(query.aggregations).forEach(aggregation => {
            if(!this.appService.getCCAggregation(aggregation)) {
                throw new Error(`Aggregation '${aggregation}' does not exist in the Query web service configuration`);
            }
        });

        this.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(
            results => {
                this.updateDataset(results.aggregations, types, sourceNode);
            }
        );
        
    }

    /**
     * Fills the dataset with nodes and edges corresponding to
     * the given aggregation data and emits this new dataset.
     * @param aggregation 
     */
    protected updateDataset(aggregations: Aggregation[], types: AggregationEdgeType[], sourceNode?: Node) {

        aggregations.forEach(aggregation => {
            if(aggregation && aggregation.items) {
                const type = types.find(type => Utils.eqNC(type.aggregation, aggregation.name));
                if(type) {
                    this.skips[type.aggregation+(sourceNode?.id || "")] += aggregation.items.length;
                    aggregation.items.forEach(item => this.addAggregationNodes(item, aggregation, type, sourceNode));
                }
            }
        });

        this.provider.next(this.dataset);
    }

    /**
     * Create nodes and edges for the given aggregation item and adds them
     * to the dataset.
     */
    addAggregationNodes(item: AggregationItem, aggregation: Aggregation, type: AggregationEdgeType, sourceNode?: Node) {

        let rawData: AggregationData;

        if(type.parse) {
            rawData = type.parse(item, type);
        }
        // Default parsing, assuming cross-distribution format ("Apple/Steve Jobs")
        else {
            if(!item.display){
                throw new Error(`Aggregation Item '${item.value}' has no display value`);
            }
            // Source distributions are at least two-dimensional
            if(!sourceNode) {
                const displays = item.display.split("/");
                const expr = this.appService.parseExpr(item.value.toString()) as Expr;
                const values = expr.operands.map(e => e.value!);
                if(values.length < 2 || displays.length < 2 || type.nodeTypes.length < 2 || !values[0] || !values[1]) {
                    throw new Error(`Incorrect aggregation item (${item.value}, ${item.display}) or edge type (${type.nodeTypes.length})`);
                }
                rawData = {values, displays};
            }
            else {
                rawData = {
                    values: [this.getNodeValue(sourceNode), item.value.toString()],
                    displays: [sourceNode.label, item.display]
                };
            }
            
        }

        const data = new NetworkDataset();
        let lastNode: Node;
        for(let i=0; i<rawData.values.length; i++){
            const node = this.createNode(type.nodeTypes[i], rawData.values[i], rawData.displays[i], true, {}, item.count);
            data.addNodes(node);
            if(i > 0){
                const relation = rawData.relations? rawData.relations[i-1] : undefined;
                const directed = rawData.directed? rawData.directed[i-1] : false;
                data.addEdges(this.createEdge(type, lastNode!, node, rawData.fieldValue, true, {aggregation, aggregationItem: item}, item.count, directed, relation));
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
        this.dataset.clear();

        // Initialize the counts
        this.edgeTypes.forEach(type => this.skips[type.aggregation] = 0);

        if(!this.active) {
            this.provider.next();
            return;
        }

        // Fetch the "source" aggregation edges
        const types = this.edgeTypes.filter(type => type.trigger === "source");

        if(types.length > 0) {
            this.fetchAggregations(types);
        }

    }

    onNodeClicked(node?: Node) {
        if(this.active && node) {
            const types = this.edgeTypes.filter(type => type.trigger === "onclick" && type.nodeTypes[0] === node.type);
            if(types.length > 0) {
                types.forEach(type => {
                    if(this.skips[type.aggregation+node.id] === undefined) {
                        // We need to skip the already connected nodes
                        const connectedNodes = this.dataset.getConnectedNodes(node.id)
                            .filter(node => node.type === type.nodeTypes[1]);
                        this.skips[type.aggregation+node.id] = connectedNodes.length;
                    }
                });
                this.fetchAggregations(types, node);
            }
        }
    }

    getProviderActions(): Action[] {
        const actions = super.getProviderActions();
        const types = this.edgeTypes.filter(type => type.trigger === "source");
        if(types.length > 0) {
            actions.push(new Action({
                icon: "fas fa-plus-circle fa-fw",
                title: "Fetch more data for all aggregations",
                text: "Fetch more data",
                action: () => {
                    this.fetchAggregations(types);
                },
                disabled: !this.active
            }));
            actions.push(new Action({
                separator: true
            }));
            types.forEach(type => {
                actions.push(new Action({
                    icon: "fas fa-plus-circle fa-fw",
                    title: "Fetch more data for aggregation "+type.aggregation,
                    text: type.aggregation,
                    action: () => {
                        this.fetchAggregations([type]);
                    },
                    disabled: !this.active
                }))
            });
        }
        return actions;
    }

    getNodeActions(node: Node): Action[] {
        const actions = super.getNodeActions(node);
        if(this.active) {
            const types = this.edgeTypes.filter(type => type.trigger === "manual" && type.nodeTypes[0] === node.type);
            if(types.length === 1){
                actions.push(this.createExpandAction(types[0], node));
            }
            else if(types.length > 1) {
                actions.push(new Action({
                    icon: "fas fa-plus-circle",
                    title: "Expand node...",
                    children: types.map(type => this.createExpandAction(type, node, true))
                }));
            }
        }
        return actions;
    }
    
    protected createExpandAction(type: AggregationEdgeType, node: Node, withtext?: boolean): Action {
        return new Action({
            icon: "fas fa-plus-circle fa-fw",
            title: "Expand node with "+type.aggregation,
            text: withtext? "Expand node with "+type.aggregation : undefined,
            action: () => {
                if(this.skips[type.aggregation+node.id] === undefined) {
                    // We need to skip the already connected nodes
                    const connectedNodes = this.dataset.getConnectedNodes(node.id)
                        .filter(node => node.type === type.nodeTypes[1]);
                    this.skips[type.aggregation+node.id] = connectedNodes.length;
                }
                this.fetchAggregations([type], node);
            },
        })
    }

}
