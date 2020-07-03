import { Injectable } from '@angular/core';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { AggregationItem, Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { FacetService } from '@sinequa/components/facet';
import { SelectionService } from '@sinequa/components/selection';
import { NodeType, EdgeType, Node, Edge, NetworkProvider } from '../network-models';
import { StructuralEdgeType, StructuralTriggerType, StructuralDisplayType, RecordsProvider, RecordNode } from './records-provider';
import { AggregationEdgeType, AggregationProvider, AggregationData } from './aggregation-provider';
import { SelectedRecordsProvider } from './selected-records-provider';
import { AsyncRecordsProvider } from './async-records-provider';
import { DynamicNodeProvider, DynamicNodeType } from './dynamic-node-provider';
import { DynamicEdgeProvider, DynamicEdgeType } from './dynamic-edge-provider';


@Injectable({
    providedIn: 'root'
})
export class ProviderFactory {

    constructor(
        protected appService: AppService,
        protected searchService: SearchService,
        protected facetService: FacetService,
        protected selectionService: SelectionService
    ){}


    // Node Types

    /**
     * Create a new NodeType, given a name and node options (static or dynamic)
     * @param name identifier of this node type
     * @param nodeOptions Vis.js display properties of this node (may be a static object or a function returning an object given the node)
     */
    createNodeType(name: string, nodeOptions: {[key: string]: any;} | ((node: Node, type: NodeType) => {[key: string]: any;})): NodeType {
        return {
            name: name,
            nodeOptions
        }
    }

    /**
     * Create a new NodeType, using FontAwesome to render an icon with a given color and size
     * @param name identifier of this node type
     * @param icon Unicode code of the FontAwesome icon (eg. \uf007)
     * @param color Color of the icon (eg. #FF0000)
     * @param size Size of the icon and text (if constant - use createDynamicFontAwesomeNodeType for a dynamic size)
     */
    createFontAwesomeNodeType(name: string, icon: string, color: string, size: number): NodeType {
        return this.createNodeType(name, this.createFontAwesomeNodeOptions(icon, color, size));
    }

    /**
     * Create a new NodeType, using FontAwesome to render an icon with a given color.
     * The size of the icon and label is determined dynamically based on its number of neighbors (node.count).
     * @param name identifier of this node type
     * @param icon Unicode code of the FontAwesome icon (eg. \uf007)
     * @param color Color of the icon (eg. #FF0000)
     */
    createDynamicFontAwesomeNodeType(name: string, icon: string, color: string): NodeType {
        return this.createNodeType(name, this.createDynamicFontAwesomeNodeOptions(icon, color));
    }

    /**
     * Create a DynamicNodeType, for nodes that can mutate into a RecordNode, via a Query.
     * @param name identifier of this node type
     * @param getQuery a function returning a Query, given a Node. The first record in the results will be used to mutate the node
     * @param nodeOptions Vis.js display properties of this node (may be a static object or a function returning an object given the node)
     * @param trigger (default: onclick) Determines when the node should be mutated (oninsert: when the node is created, onclick: when the node is cliked, manual: via a click on a button or link)
     */
    createDynamicNodeType(name: string, getQuery: (node: Node) => Query, nodeOptions: {[key: string]: any;} | ((node: Node, type: NodeType) => {[key: string]: any;}), trigger: "oninsert" | "onclick" | "manual" = "onclick"): DynamicNodeType {
        const nodeType = this.createNodeType(name, nodeOptions) as DynamicNodeType;
        nodeType.getQuery = getQuery;
        nodeType.trigger = trigger;
        return nodeType;
    }

    /**
     * Transform a regular NodeType into a dynamic NodeType (enriched with a record, via a Query)
     * @param nodeType A NodeType to transform into 
     * @param getQuery A function that takes in a Node and returns a Query
     * @param nodeOptions Vis.js display properties of this node (may be a static object or a function returning an object given the node)
     * @param trigger (default: onclick) Determines when the node should be mutated (oninsert: when the node is created, onclick: when the node is cliked, manual: via a click on a button or link)
     */
    makeNodeTypeDynamic(nodeType: NodeType, getQuery: (node: Node) => Query | undefined, nodeOptions?: {[key: string]: any;} | ((node: Node, type: NodeType) => {[key: string]: any;}), trigger: "oninsert" | "onclick" | "manual" = "onclick"): DynamicNodeType {
        const _nodeType = nodeType as DynamicNodeType;
        _nodeType.getQuery = getQuery;
        _nodeType.trigger = trigger;
        if(nodeOptions) {
            const originalNodeOptions = nodeType.nodeOptions;
            _nodeType.nodeOptions = (node: Node, type: NodeType) => {
                let _no = originalNodeOptions; // Use the default node options
                if((node as RecordNode).record) { // If the node has been mutated, take into account the provided nodeOptions
                    _no = nodeOptions;
                }
                if(typeof _no === "function"){
                    return _no(node, type);
                }
                else return _no;
            };
        }
        return _nodeType;
    }


    // Node Options

    /**
     * Create FontAwesome-based node options for rendering a node in Vis.js.
     * @param icon Unicode code of the FontAwesome icon (eg. \uf007)
     * @param color Color of the icon (eg. #FF0000)
     * @param size Size of the icon and text (the actual sizes in pixel are determined with a normalization function)
     */
    createFontAwesomeNodeOptions(icon: string, color: string, size: number) {
        return { 
            shape: "icon", 
            icon: {
                face:"'Font Awesome 5 Free'",
                weight: "bold",
                code: icon,
                color: color,
                size: this.logScale(size, 5, 1.0, 1.7)
            },
            font: {
                size: this.logScale(size, 5)
            }
        }
    }

    /**
     * Create dynamic FontAwesome-based node options for rendering a node in Vis.js.
     * The size of the node is determined for each node, based on its number of neighbors (node.count property)
     * @param icon Unicode code of the FontAwesome icon (eg. \uf007)
     * @param color Color of the icon (eg. #FF0000)
     */
    createDynamicFontAwesomeNodeOptions(icon: string, color: string) {
        return (node: Node, type: NodeType) => {
            return this.createFontAwesomeNodeOptions(icon, color, node.count);
        }
    }
    
    /**
     * Create node options to display a circular image with the given url, size and background as a node.
     * @param imageUrl Path to the image (eg. 'assets/images/...png')
     * @param size Size of the icon and text (the actual sizes in pixel are determined with a normalization function)
     * @param background The background color of the image, displayed while the image is loading
     */
    createImageNodeOptions(imageUrl: string, size: number, background = 'white'): {[key: string]: any;} {
        return { 
            shape: "circularImage", 
            image: imageUrl,
            size: this.logScale(size, 10, 1.0, 1.3),
            color: {
                background
            },
            font: {
                size: this.logScale(size, 5),
                vadjust: -this.logScale(size, 0)
            }
        };
    }

    /**
     * Create dynamic node options to display nodes with circular images.
     * @param getImageUrl A function that takes as input the node and returns the image URL
     */
    createDynamicImageNodeOptions(getImageUrl: (node: Node) => string): ((node: Node, type: NodeType) => {[key: string]: any;}) {
        return (node: Node, type: NodeType) => {
            const image = getImageUrl(node);
            return this.createImageNodeOptions(image, node.count);
        }
    }


    // Standard Node types

    /**
     * Create a standard node type for documents/records.
     * @param icon (default: \uf15c) Unicode code of the FontAwesome icon
     * @param color (default: #15aabf) Color of the icon
     * @param size (default: 50) Size of the node
     * @param name (default: 'document') Name of the node type
     */
    createRecordNodeType(icon = "\uf15c", color = "#15aabf", size = 50, name = 'document'): NodeType {
        return this.createFontAwesomeNodeType(name, icon, color, size);
    }

    /**
     * Create a standard dynamic node type for the geo entity.
     * @param icon (default: \uf57d) Unicode code of the FontAwesome icon
     * @param color (default: #5cb85c) Color of the icon
     * @param name (default: 'geo') Name of the node type
     */
    createGeoNodeType(icon = "\uf57d", color = "#5cb85c", name = 'geo'): NodeType {
        return this.createDynamicFontAwesomeNodeType(name, icon, color);
    }
    
    /**
     * Create a standard dynamic node type for the company entity.
     * @param icon (default: \uf1ad) Unicode code of the FontAwesome icon
     * @param color (default: #f0ad4e) Color of the icon
     * @param name (default: 'company') Name of the node type
     */
    createCompanyNodeType(icon = "\uf1ad", color = "#f0ad4e", name = 'company'): NodeType {
        return this.createDynamicFontAwesomeNodeType(name, icon, color);
    }
    
    /**
     * Create a standard dynamic node type for the person entity.
     * @param icon (default: \uf007) Unicode code of the FontAwesome icon
     * @param color (default: #0275d8) Color of the icon
     * @param name (default: 'person') Name of the node type
     */
    createPersonNodeType(icon = "\uf007", color = "#0275d8", name = 'person'): NodeType {
        return this.createDynamicFontAwesomeNodeType(name, icon, color);
    }

    
    // Edge Types

    /**
     * Create a list of StructuralEdgeType objects given a NodeType for the record and a map of field names to NodeTypes.
     * (For example, a RecordsProvider will create a central node for a record, and then several edges pointing to nodes 
     * for each field contained by that record, such as entities, CSV, or any other type of metadata attached to the record)
     * @param recordType The NodeType of the record node
     * @param fieldTypes A map of field names (eg. 'entity12') to NodeTypes, which will be used to create nodes for each entity12 value
     * @param trigger (default: oninsert) Determines when this edge should be created (oninsert: when the record node is created, onclick: when the record node is cliked, manual: via a click on a button or link)
     * @param display (default: existingnodes) Determines which edges should be visible (all: all the edges are visible; paginate: only a limited number are visible, but more can be shown, using an action; existingnodes: edges will only be created for nodes that already exist in the network; a function take the node as input can also be used to determine visibility dynamically)
     * @param edgeOptions (default: standard edge options as returned by createEdgeOptions()) Edge options for displaying the edge with Vis.js
     */
    createStructuralEdgeTypes(recordType: NodeType, fieldTypes: {[field:string]: NodeType}, trigger: StructuralTriggerType = "oninsert", display: StructuralDisplayType = "existingnodes", edgeOptions?: any): StructuralEdgeType[] {
        return Object.keys(fieldTypes).map(field => {
            return {
                nodeTypes: [recordType, fieldTypes[field]],
                field: field,
                trigger: trigger,
                display: display,
                edgeOptions: edgeOptions || this.createEdgeOptions()
            };
        });
    }

    /**
     * Create an AggregationEdgeType given a pair of NodeType and an aggregation name.
     * The aggregation (configured on the Sinequa server) must return pairs of items,
     * using cross-distribution.
     * @param nodeTypes A pair of NodeType for each "side" of the aggregation
     * @param aggregation The name of an cross-aggregation configured on the server, returning a list of "pairs"
     * @param edgeOptions (default: standard edge options as returned by createAggregationEdgeOptions()) Edge options for displaying the edge with Vis.js
     * @param parse Custom function for parsing each aggregation item into a AggregationData (containing normally two nodes and one edge)
     */
    createAggregationEdgeType(nodeTypes: NodeType[], aggregation: string, edgeOptions?: any, parse?: (item: AggregationItem, type: AggregationEdgeType) => AggregationData): AggregationEdgeType {
        return {
            nodeTypes: nodeTypes,
            aggregation: aggregation,
            edgeOptions: edgeOptions || this.createAggregationEdgeOptions(true),
            parse: parse
        };
    }

    /**
     * Create an AggregationEdgeType given a pair of NodeType and an aggregation name.
     * The aggregation (configured on the Sinequa server) must return pairs of items,
     * using a simple distribution of pre-existing pairs, such as co-occurrences.
     * @param nodeTypes A pair of NodeType for each "side" of the aggregation
     * @param aggregation The name of an aggregation configured on the server, returning a list of cooccurrence "pairs" 
     * @param edgeOptions (default: custom edge options similar to createAggregationEdgeOptions()) Edge options for displaying the edge with Vis.js
     * @param parse Custom function for parsing each aggregation item into a AggregationData (containing normally two nodes and one edge)
     */
    createCoocAggregationEdgeType(nodeTypes: NodeType[], aggregation: string, edgeOptions?: any, parse?: (item: AggregationItem, type: AggregationEdgeType) => AggregationData): AggregationEdgeType {
        
        if(!edgeOptions) {
            edgeOptions = (nodes: Node[], edge: Edge, type: EdgeType) => {
                const count = edge.count;
                const size = this.logScale(count, 1, 0.3);
                const dashes = [Math.min(5*size,20), Math.min(3*size,30)];
                return this.createEdgeOptions(dashes, size, false);
            };
        }

        if(!parse) {
            parse = (item: AggregationItem, type: AggregationEdgeType) => {
                const value = item.value.toString()
                const display = item.display || value;
                const values = value.substr(1, value.length-2).split(")#(");
                const displays = display.substr(1, display.length-2).split(")#(");
                return { values, displays };
            }
        }

        return this.createAggregationEdgeType(nodeTypes, aggregation, edgeOptions, parse);
    }

    /**
     * Create a DynamicEdgeType, to attach RecordNodes to an existing node, via a Query
     * @param nodeTypes The node types for this edge (nodeType[0] should be the source node, onto which the edges will be added, nodeType[1] is the type for the RecordNode that will be attached)
     * @param trigger (default: oninsert) Determines when this edge should be created (oninsert: when the source node is created, onclick: when the source node is cliked, manual: via a click on a button or link)
     * @param getQuery A function returning a Query, given a Node. The first record in the results will be used to mutate the node
     * @param edgeOptions (default: standard edge options as returned by createEdgeOptions()) Edge options for displaying the edge with Vis.js
     */
    createDynamicEdgeType(nodeTypes: NodeType[], trigger: StructuralTriggerType = "oninsert", getQuery: (node: Node, type: DynamicEdgeType) => Query, edgeOptions?: any): DynamicEdgeType {
        return {
            nodeTypes: nodeTypes,
            trigger: trigger,
            getQuery: getQuery,
            edgeOptions: edgeOptions || this.createEdgeOptions(),
        }
    }



    // Edge Options

    /**
     * Create standard Edge options for displaying the network with Vis.js.
     * @param dashes (default: no dashes) standard or custom options for a dashed edge
     * @param width (default: 2) with of the edge
     * @param smooth (default: no) whether the edge is straight or bendy
     */
    createEdgeOptions(dashes?: boolean | number[], width = 2, smooth?: boolean): {[key: string]: any} {
        return {
            smooth: !!smooth,
            dashes: !!dashes && Utils.isBoolean(dashes)? [Math.min(5*width,20), Math.min(5*width,30)]: dashes,
            width: width,
            color: {
                color: "#cccccc", 
                highlight: "#ff0000", 
                hover: "#ee0000", 
                opacity: 0.5
            }
        };
    }

    /**
     * Create standard dynamic Edge options based on createEdgeOptions, but scaling the edge width
     * based on the number of items in the aggregation item (edge.count property).
     * @param dashes (default: no dashes) standard or custom options for a dashed edge
     * @param smooth (default: no) whether the edge is straight or bendy
     */
    createAggregationEdgeOptions(dashes: boolean | number[], smooth?: boolean): (nodes: Node[], edge: Edge, type: EdgeType) => {[key: string]: any} {
        return (nodes: Node[], edge: Edge, type: EdgeType) => {
            const count = edge.count;
            const size = this.logScale(count, 1, 0.3);
            return this.createEdgeOptions(dashes, size, smooth);
        };
    }



    // Network providers

    /**
     * Create a RecordsProvider, given a NodeType for the records, a list of Structural edges and a static list of records.
     * @param nodeType NodeType of the records
     * @param edgeTypes List of StructuralEdgeType for each field of the records
     * @param records Static list of records
     */
    createRecordsProvider(nodeType: NodeType, edgeTypes: StructuralEdgeType[], records: Record[]): RecordsProvider {
        return new RecordsProvider(nodeType, edgeTypes, records);
    }

    /**
     * Create an asynchronous RecordsProvider, meaning that instead of providing the list of records directly,
     * a Query must be provided to retrieve this list of records from the server.
     * @param nodeType  NodeType of the records
     * @param edgeTypes List of StructuralEdgeType for each field of the records
     * @param query A Query object to retrieve the records asynchronously
     */
    createAsyncRecordsProvider(nodeType: NodeType, edgeTypes: StructuralEdgeType[], query: Query): AsyncRecordsProvider {
        return new AsyncRecordsProvider(nodeType, edgeTypes, query, this.searchService);
    }

    /**
     * Create a RecordsProvider which provides data when the list of selected records changes (as managed by the SelectionService).
     * Note that the SelectionService must be configured to keep a list of records rather than just their IDs.
     * @param nodeType NodeType of the records
     * @param structEdges List of StructuralEdgeType for each field of the records
     */
    createSelectedRecordsProvider(nodeType: NodeType, structEdges: StructuralEdgeType[]): SelectedRecordsProvider {
        return new SelectedRecordsProvider(nodeType, structEdges, this.selectionService);
    }

    /**
     * Create an AggregationProvider given an AggregationEdgeType
     * @param edgeType An AggregationEdgeType
     */
    createAggregationProvider(edgeType: AggregationEdgeType): AggregationProvider {
        return new AggregationProvider(edgeType, this.facetService, this.appService, this.searchService);
    }

    /**
     * Create a DynamicNodeProvider which mutates a regular node into a RecordNode (incl. adding structural edges).
     * @param nodeType The NodeType of nodes which should be mutated
     * @param edgeTypes The structural edge types of the mutated node
     * @param permanent Whether this provider should reset its dataset when mutating a new node (if true, a mutated node and its neighbors will never be removed, even if the source node disappears from the source dataset)
     * @param sourceProvider Another provider to monitor for source nodes to mutate (required if nodeType.trigger is oninsert)
     */
    createDynamicNodeProvider(nodeType: DynamicNodeType, edgeTypes: StructuralEdgeType[], permanent: boolean, sourceProviders?: NetworkProvider[]): DynamicNodeProvider {
        return new DynamicNodeProvider(nodeType, edgeTypes, permanent, this.searchService, sourceProviders);
    }

    /**
     * Create a DynamicEdgeProvider which attaches RecordNodes (and their neighbors) onto a regular node, using a given query.
     * @param edgeType The DynamicEdgeType, which specifies which NodeType should be enriched with new nodes, and provides a Query to retrieve these nodes.
     * @param secondaryEdgeTypes The structural edge types of the attached node
     * @param permanent Whether this provider should reset its dataset when retrieving new node (if true, a attached node and its neighbors will never be removed, even if the source node disappears from the source dataset)
     * @param sourceProvider Another provider to monitor for source nodes to mutate (required if nodeType.trigger is oninsert)
     */
    createDynamicEdgeProvider(edgeType: DynamicEdgeType, secondaryEdgeTypes: StructuralEdgeType[], permanent: boolean, sourceProviders?: NetworkProvider[]): DynamicEdgeProvider {
        return new DynamicEdgeProvider(edgeType, secondaryEdgeTypes, permanent, this.searchService, sourceProviders)
    }


    // Misc

    logScale(value: number, min: number, scale = 1.0, pow = 1.0): number {
        return Math.round(min + Math.pow(Math.log2(value) * scale, pow));
    }
}