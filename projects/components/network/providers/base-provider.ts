import { Utils } from '@sinequa/core/base';
import { Node, Edge, NodeType, EdgeType, NetworkProvider, NetworkDataset, NetworkContext} from '../network-models';
import { Subject } from 'rxjs';
import { Action } from '@sinequa/components/action';


/**
 * Base implementation of the NetworkProvider interface with convenience
 * methods to create nodes and edges, and default features which should apply
 * to all providers.
 */
export class BaseProvider implements NetworkProvider {

    protected readonly provider = new Subject<NetworkDataset>();
    public dataset = new NetworkDataset();
    public active = true;

    public readonly EDGESEPARATOR = "~~~EDGE~~~";

    /** Action to turn the provider on or off */
    public readonly activateAction: Action;
    /** Action to reset the provider */
    public readonly resetAction: Action;

    public context: NetworkContext;

    constructor(
        public name: string
    ) {
        this.activateAction = new Action({
            icon: this.active? "fas fa-toggle-on fa-fw" : "fas fa-toggle-off fa-fw",
            text: this.active? "msg#network.actions.active" : "msg#network.actions.inactive",
            title: "msg#network.actions.toggle",
            action: (action: Action) => {
                this.active = !this.active
                action.icon = this.active? "fas fa-toggle-on fa-fw" : "fas fa-toggle-off fa-fw";
                action.text = this.active? "msg#network.actions.active" : "msg#network.actions.inactive";
                this.getData(this.context);
            }
        });
        this.resetAction = new Action({
            icon: "fas fa-trash-alt fa-fw",
            text: "msg#network.actions.reset",
            title: "msg#network.actions.resetTitle",
            action: () => {
                this.dataset.clear();
                this.getData(this.context);
            }
        });
    }

    /** Returns a standard ID for an edge between two given nodes */
    protected getEdgeId(node1: Node, node2: Node): string {
        return node1.id + this.EDGESEPARATOR + node2.id;
    }
    
    /** Returns a standard ID for a node with a given type and "value" */
    protected getNodeId(type: NodeType, value: string): string {
        return `${type.name}:${value}`;
    }

    /** Retrieves the "value" of the node from its ID */
    protected getNodeValue(node: Node): string {
        return node.id.substr(node.type.name.length+1);
    }

    /**
     * Creates a new Node object
     * @param type The NodeType of the node
     * @param value The "value" of the node (eg. "BILL GATES")
     * @param label (default: display = value) The "display value" of the node (eg. "Bill Gates")
     * @param visible (default: true) Whether the node should be visible or not
     * @param customProps (default: {}) Custom properties to add to the node object
     * @param count (default: 1) A "count" property that can reflect the "size" or "importance" of the node in the network (note that the count property accumulates when nodes are merged)
     */
    protected createNode(type: NodeType, value: string, label?: string, visible = true, customProps = {}, count = 1): Node {
        let node: Node = {
            id: this.getNodeId(type, value),
            label: label || value,
            type,
            provider: this,
            visible,
            count,
            context: this.context
        }
        Utils.extend(node, customProps);
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
     * Creates a new Edge object
     * @param type The EdgeType of that Edge
     * @param fromNode The "from" Node object to which this edge is attached
     * @param toNode The "to" Node object to which this edge is attached
     * @param fieldValue (default: undefined) An optional value, which, if provided, allows to filter the search with a select ("type.field = fieldValue")
     * @param visible (default: true) Whether the edge should be visible or not
     * @param customProps (default: {}) Custom properties to add to this edge
     * @param count (default: 1) A "count" property that can reflect the "size" or "importance" of the edge in the network (note that the count property accumulates when edges are merged)
     * @param directed (default: false) Whether the edge is directed or undirected. If true, an arrow is drawn on the edge.
     * @param relation (default: undefined) If provided, the "relation" is a label displayed in the middle of the edge
     */
    protected createEdge(type: EdgeType, fromNode: Node, toNode: Node, fieldValue: string | undefined = undefined, visible = true, customProps = {}, count = 1, directed = false, relation?: string): Edge {
        const edge: Edge = {
            id: this.getEdgeId(fromNode, toNode),
            from: fromNode.id,
            to: toNode.id,
            fieldValue,
            type,
            visible,
            count,
            provider: this,
            context: this.context
        }
        Utils.extend(edge, customProps);
        if(directed) {
            edge["arrows"] = {middle: {scaleFactor: 0.3, enabled: true}};
        }
        if(relation) {
            edge["label"] = relation;
            edge["labels"] = [relation];
            edge["font"] = {size: 5, color: "#808080"};            
        }
        let options: {[key: string]: any};
        if(typeof type.edgeOptions === "function") {
            options = type.edgeOptions([fromNode, toNode], edge, type);
        }
        else {
            options = type.edgeOptions;
        }
        return Utils.extend(edge, options);
    }
    

    // Implementation of the NetworkProvider interface

    getProvider(): Subject<NetworkDataset> {
        return this.provider;
    }

    getData(context: NetworkContext) {
        this.context = context;
    }

    onDatasetsMerged(dataset: NetworkDataset) {
        
    }

    onNodesInserted(nodes: Node[]) {
        
    }
    
    onNodeClicked(node: Node | undefined) {
        
    }

    onEdgeClicked(edge: Edge | undefined) {
        
    }

    /**
     * By default, the base provider includes an action to turn the provider
     * on or off, and an action to reset the data from this provider
     */
    getProviderActions(): Action[] {
        return [this.activateAction, this.resetAction];
    }

    /**
     * By default the base provider includes an action to filter the search if a clicked
     * node has a "field" property
     * @param node The clicked node
     */
    getNodeActions(node: Node): Action[] {
        const actions: Action[] = []
        if(this.active && node.provider === this && node.type.field) {
            actions.push(new Action({
                icon: "fas fa-filter",
                title: this.context.intlService.formatMessage("msg#network.actions.filterSearch", {label: node.label}),
                action: () => {
                    node.context.searchService.query.addSelect(node.type.field! + "`"+ node.label + "`:`"+this.getNodeValue(node)+"`", node.context.name);
                    node.context.searchService.search();
                }
            }));
        }
        return actions;
    }

    /**
     * By default the base provider includes an action to filter the search if a clicked
     * edge has a "type.field" property and a "fieldValue" (alternatively, an action
     * is created if the 2 adjacent nodes can be filtered, ie they both have a "field"
     * property)
     * @param edge The clicked edge
     */
    getEdgeActions(edge: Edge): Action[] {
        const actions: Action[] = [];
        const nodeFrom = edge.context.nodes.get(edge.from);
        const nodeTo = edge.context.nodes.get(edge.to);
        if(this.active && edge.provider === this) {
            if(edge.type.field && edge.fieldValue) {
                actions.push(new Action({
                    icon: "fas fa-filter",
                    title: this.context.intlService.formatMessage("msg#network.actions.filterSearch", {label: edge.fieldValue}),
                    action: () => {
                        edge.context.searchService.query.addSelect(edge.type.field + ":`"+edge.fieldValue+"`", edge.context.name);
                        edge.context.searchService.search();
                    }
                }));
            }
            else if(nodeFrom && nodeTo && nodeFrom.type.field && nodeTo.type.field) {
                actions.push(new Action({
                    icon: "fas fa-filter",
                    title: this.context.intlService.formatMessage("msg#network.actions.filterSearch2", {label1: nodeFrom.label, label2: nodeTo.label}),
                    action: () => {
                        edge.context.searchService.query.addSelect(nodeFrom.type.field + "`"+ nodeFrom.label + "`:`"+this.getNodeValue(nodeFrom)+"` AND " + nodeTo.type.field + "`"+ nodeTo.label + "`:`"+this.getNodeValue(nodeTo)+"`", edge.context.name);
                        edge.context.searchService.search();
                    }
                }));
            }
            
        }
        return actions;
    }

    onDestroy() {
        
    }

}