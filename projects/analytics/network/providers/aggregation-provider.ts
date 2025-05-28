import { Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { Node, Edge, EdgeType, NetworkDataset, NetworkContext } from '../network-models';
import { Action } from '@sinequa/components/action';
import { Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { BaseProvider } from './base-provider';

/**
 * Extension of the Edge interface, to store the aggregation and
 * aggregation items from which the edge is constructed
 */
export interface AggregationEdge extends Edge {
    aggregationItem: AggregationItem;
    aggregation: Aggregation;
}

/**
 * Convenience structure for managing custom metadata types (like
 * cooccurrence entities). AggregationData is returned by the custom
 * parse() function of an AggregationEdgeType.
 */
export interface AggregationData {
    values: string[]; // eg. LARRY PAGE, GOOGLE
    displays: string[]; // eg. Larry Page, Google
    relations?: string[]; // eg. Works At
    directed?: boolean[]; // eg. true
    fieldValue?: string; // A value on which to filter the data
}

/** Mode "source" means node are fetched and added systematically on getData() / other modes allow expanding an existing node*/
export type AggregationTriggerType = "source" | "onclick" | "manual";
// TODO: Add support for "oninsert" (which might required additional complexity)

/**
 * Extension of the EdgeType interface, specifying which aggregation is used
 * to generate the Edges, and additional options.
 */
export interface AggregationEdgeType extends EdgeType {
    /** Name of the aggregation in the Web Service configuration */
    aggregation: string;
    /** If parse is provided, it is used to get the new nodes and edges. If not, the value is automatically converted into nodes, using nodeTypes[1] */
    parse?: (item: AggregationItem, type: AggregationEdgeType) => AggregationData | undefined; // A cooccurrence aggregation might return 3 nodes and 2 edges
    /** A parameter to define when the aggregation is fetched and nodes are added */
    trigger: AggregationTriggerType;
    /** Default number of items to fetch */
    count?: number;
    // TODO: add visibility modes ? (eg. existingNodes)
}

/**
 * Tests whether an EdgeType is an AggregationEdgeType
 * @param et an edge type
 */
export function isAggregationEdgeType(et: EdgeType): et is AggregationEdgeType {
    return !!(et as AggregationEdgeType).aggregation;
}

/**
 * The Aggregation Provider generates nodes and edges from aggregations
 * fetched from the server.
 */
export class AggregationProvider extends BaseProvider {

    /** Stores how many aggregation items have been fetched from the server for a given aggregation */
    readonly skips: {[aggregation: string]: number} = {};

    constructor(
        public override name: string,
        protected edgeTypes: AggregationEdgeType[],
        protected query?: Query
    ) {
        super(name);
    }


    /**
     * Fetches the list of aggregations and updates the dataset
     * @param types list of aggregation edge types
     * @param sourceNode if provided, will compute the aggregation with a select to compute the aggregation for documents referencing that node
     */
    protected fetchAggregations(types: AggregationEdgeType[], sourceNode?: Node) {

        const query = (this.query || this.context.query || this.context.searchService.query).copy();
        query.action = "aggregate";
        query.aggregations = {};
        types.forEach(type => query.aggregations[type.aggregation] = {
            skip: this.skips[type.aggregation+(sourceNode?.id || "")],
            count: type.count || 10
        });

        if(sourceNode && sourceNode.type.field) {
            query.addFilter({field: sourceNode.type.field, value: this.getNodeValue(sourceNode)});
        }

        Object.keys(query.aggregations).forEach(aggregation => {
            if(!this.context.appService.getCCAggregation(aggregation)) {
                // This may not be a mistake if the aggregation belong to a different web service configuration
                console.warn(`Aggregation '${aggregation}' does not exist in the Query web service configuration`);
            }
        });

        this.context.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(
            results => {
                this.updateDataset(results.aggregations, types, sourceNode);
            }
        );

    }

    /**
     * Fills the dataset with nodes and edges corresponding to
     * the given aggregations data, and emits this new dataset.
     * @param aggregations the list of aggregations to process
     * @param types the corresponding edge types for each aggregation
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
     * to the dataset. By default (if the edge does not have a parse() function
     * and there is no sourceNode), the aggregation is assumed to be a cross-
     * distribution, with items formatted as "Bill Gates/Microsoft".
     * @param item the aggregation item to process
     * @param aggregation the aggregation from which the item comes from
     * @param type the type of the edge corresponding to that aggregation
     * @param sourceNode if provided, will assume the distribution is 1-dimensional and attach each new node to that source node
     */
    addAggregationNodes(item: AggregationItem, aggregation: Aggregation, type: AggregationEdgeType, sourceNode?: Node) {

        let rawData: AggregationData | undefined;

        if(type.parse) {
            rawData = type.parse(item, type);
        }
        else {
            // Source distributions are at least two-dimensional
            if(!sourceNode) {
                if(!item.display){
                    throw new Error(`Aggregation Item '${item.value}' has no display value`);
                }
                // Default parsing, assuming cross-distribution format ("Apple/Steve Jobs")
                const displays = item.display.split("/");
                // Expr has following syntax `display`:(column1:`value1` AND column2:`value2`)
                const expr = String(item.value);
                const subExpr = expr.substring((Utils.escapeExpr(item.display)+":(").length, expr.length-1).split(" AND ");
                const values = subExpr.map(v => Utils.unescapeExpr(v.split(':')[1]));
                if(values.length < 2 || displays.length < 2 || type.nodeTypes.length < 2 || !values[0] || !values[1]) {
                    throw new Error(`Incorrect aggregation item (${item.value}, ${item.display}) or edge type (${type.nodeTypes.length})`);
                }
                rawData = {values, displays};
            }
            // We need to exclude trivial aggregation items pointing to themselves
            else if(sourceNode.id !== this.getNodeId(type.nodeTypes[1], String(item.value))) {
                rawData = {
                    values: [this.getNodeValue(sourceNode), String(item.value)],
                    displays: [sourceNode.label, item.display || String(item.value)]
                };
            }
        }

        if(rawData) {
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
    }


    // NetworkProvider interface

    /**
     * Retrieves the aggregation data synchronously or asynchronously, and updates the dataset with it.
     */
    override getData(context: NetworkContext) {
        this.context = context;
        this.dataset.clear();

        // Initialize the counts
        this.edgeTypes.forEach(type => this.skips[type.aggregation] = 0);

        // Fetch the "source" aggregation edges
        const types = this.edgeTypes.filter(type => type.trigger === "source");

        if(this.active && types.length > 0) {
            this.fetchAggregations(types);
        }
        else {
            this.provider.next(this.dataset); // avoid undefined dataset when edge trigger !== source
        }
    }

    /**
     * Called when a node in the network is clicked.
     * If one edge has an "onclick" trigger we potentially expand that
     * clicked node.
     * @param node the clicked node
     */
    override onNodeClicked(node?: Node) {
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

    /**
     * Called to generate the list of actions specific to this provider.
     * We display actions allowing to add additional data for "source" edges
     * (either all the source edges at once, or each individually).
     */
    override getProviderActions(): Action[] {
        const actions = super.getProviderActions();
        const types = this.edgeTypes.filter(type => type.trigger === "source");
        if(types.length > 0) {
            actions.push(new Action({
                icon: "fas fa-plus-circle fa-fw",
                title: "msg#network.actions.fetchMoreAll",
                text: "msg#network.actions.fetchMoreAllText",
                action: () => {
                    this.fetchAggregations(types);
                },
                disabled: !this.active
            }));
            actions.push(new Action({
                separator: true
            }));
            types.forEach(type => {
                const agg =  this.getAggregationLabel(type.aggregation);
                actions.push(new Action({
                    icon: "fas fa-plus-circle fa-fw",
                    title: this.context.intlService.formatMessage("msg#network.actions.fetchMoreAgg", {agg}),
                    text: agg,
                    action: () => {
                        this.fetchAggregations([type]);
                    },
                    disabled: !this.active
                }))
            });
        }
        return actions;
    }

    /**
     * Called to generate the list of actions displayed for a specific node
     * when it is clicked on.
     * We display "expand" actions for the edges with a "manual" trigger.
     * @param node The clicked node
     */
    override getNodeActions(node: Node): Action[] {
        const actions = super.getNodeActions(node);
        if(this.active) {
            const types = this.edgeTypes.filter(type => type.trigger === "manual" && type.nodeTypes[0] === node.type);
            if(types.length === 1){
                actions.push(this.createExpandAction(types[0], node));
            }
            else if(types.length > 1) {
                actions.push(new Action({
                    icon: "fas fa-plus-circle",
                    title: this.context.intlService.formatMessage("msg#network.actions.expandNode", {label: node.label}),
                    children: types.map(type => this.createExpandAction(type, node, true))
                }));
            }
        }
        return actions;
    }

    /**
     * Convenience method to generate an expand action for a given node
     * and given edge type.
     * @param type The edge type for expanding the node
     * @param node The node we wish to expand
     * @param withtext Whether or not the action should have text (or just an icon)
     */
    protected createExpandAction(type: AggregationEdgeType, node: Node, withtext?: boolean): Action {
      const agg =  this.getAggregationLabel(type.aggregation);
      const title = this.context.intlService.formatMessage("msg#network.actions.expandNodeWith", {agg});
      return new Action({
            icon: "fas fa-plus-circle fa-fw",
            title: title,
            text: withtext? title : undefined,
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

    protected getAggregationLabel(aggregation: string) {
      const cc = this.context.appService.getCCAggregation(aggregation);
      return cc?.column.split('/')
        .map(col => this.context.appService.getPluralLabel(col))
        .map(col => this.context.intlService.formatMessage(col))
        .join('/') || aggregation;
    }

}
