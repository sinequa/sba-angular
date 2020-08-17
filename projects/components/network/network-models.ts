import { Subject } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import { DataSet } from "vis-data/peer/esm/vis-data";
import { SearchService } from '@sinequa/components/search';
import { VisNetworkService } from 'ngx-vis';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';

// TYPES (configuration)

export interface NodeType {
    name: string;
    /** Vis Node options (merged in the Node objects). See https://visjs.github.io/vis-network/docs/network/nodes.html */
    nodeOptions: {[key: string]: any} | ((node: Node, type: NodeType) => {[key: string]: any} );
    /** If a field is provided, it can be used to filter the node value (and access the label, formatter, etc.) */
    field?: string;
}

export interface EdgeType {
    /** Node types attached to this edge type. Should typically be 2 items, but cooccurrence aggregation might return more */
    nodeTypes: NodeType[];
    /** Vis Edge options (merged in the Edge objects). See https://visjs.github.io/vis-network/docs/network/edges.html */
    edgeOptions: {[key: string]: any} | ((nodes: Node[], edge: Edge, type: EdgeType) => {[key: string]: any} );
    /** If a field is provided, it can be used to filter the node value (and access the label, formatter, etc.) */
    field?: string;
}


// DATA

// Nodes (based on Vis Node interface)

export interface Node {
    id: string;
    label: string;

    // Custom properties
    type: NodeType;
    provider: NetworkProvider;
    visible: boolean;
    /** count is a mutable property used to scale the node size in function of the size of adjacent edges*/
    count: number;
    /** the precedence of a node determines which node object is kept when merging two dataset (the highest precedence node is kept) */
    precedence?: number;
    // Context
    context: NetworkContext;
}

// Edge (based on Vis Edge interface)

export interface Edge {
    id: string;
    from: string;
    to: string;

    // Custom properties
    type: EdgeType;
    provider: NetworkProvider;
    visible: boolean;    
    /** count is a property representing the strength of an edge, which scales the count of adjacent nodes*/
    count: number;
    /** A field value may be provided to filter search based on the edge field type */
    fieldValue?: string;
    // Context
    context: NetworkContext;
}


export interface NetworkProvider {
    /** Whether or not the provider is active (if inactive, it will not provide empty datasets of nodes and edges) */
    active: boolean;

    /** Readable name of this provider */
    name: string;

    /** Dataset of this provider */
    dataset: NetworkDataset;

    /** Context (wrapper for general data about the network and services) */
    context: NetworkContext;

    /** Returns the Subject of this provider */
    getProvider(): Subject<NetworkDataset>;

    /** Asynchronously provide data via it's provider Subject */
    getData(context: NetworkContext); // skip/count handled internally

    /** Called after the datasets provided by all providers have been merged into a single dataset */
    onDatasetsMerged(dataset: NetworkDataset);

    /** Called after the dataset is filtered and passed to Vis for rendering */
    onNodesInserted(nodes: Node[]);

    /** Called when ANY node is clicked in the rendered view of the network */
    onNodeClicked(node: Node | undefined);

    /** Called when ANY edge is clicked in the rendered view of the network */
    onEdgeClicked(edge: Edge | undefined);

    /** Retrieve the list of action for this provider. */
    getProviderActions(): Action[];

    /** Retrieve the list of action for a given node, and this provider. */
    getNodeActions(node: Node): Action[];
    
    /** Retrieve the list of action for a given edge, and this provider. */
    getEdgeActions(edge: Edge): Action[];

    /** Called when the providers are discarded. Can be use to cancel subscriptions */
    onDestroy();
}

export interface NetworkContext {
    /** Name of this network, for use in selections */
    name: string;
    /** Vis.js data structures */
    nodes: DataSet<Node>;
    edges: DataSet<Edge>;
    /** Useful services */
    searchService: SearchService;
    networkService: VisNetworkService;
    appService: AppService;
    intlService: IntlService;
    /** Interactions */
    select(node?: Node, edge?: Edge): void;
}


export class NetworkDataset {

    // Node index
    private readonly nodeIdx: Map<string, Node> = new Map<string, Node>();

    // Edge index
    private readonly edgeIdx: Map<string, Edge> = new Map<string, Edge>();


    /** Returns whether this node exists */
    public hasNode(id: string): boolean {
        return this.nodeIdx.has(id);
    }
    
    /** Returns whether this edge exists */
    public hasEdge(id: string): boolean {
        return this.edgeIdx.has(id);
    }

    /** Returns the node with given id */
    public getNode(id: string): Node | undefined {
        return this.nodeIdx.get(id);
    }

    /** Returns the edge with given id */
    public getEdge(id: string): Edge | undefined {
        return this.edgeIdx.get(id);
    }

    /** Get the list of nodes */
    public getNodes(): Node[] {
        return Array.from(this.nodeIdx.values());
    }

    /** Get the list of edges */
    public getEdges(): Edge[] {
        return Array.from(this.edgeIdx.values());
    }    

    /** Get the list of visible nodes */
    public getVisibleNodes(): Node[] {
        return this.getNodes().filter(n => n.visible);
    }

    /** Get the list of visible edges */
    public getVisibleEdges(): Edge[] {
        return this.getEdges().filter(e => e.visible);
    }

    /** Get the list of node ids */
    public getNodeIds(): string[] {
        return Array.from(this.nodeIdx.keys());
    }

    /** Get the list of edge ids */
    public getEdgeIds(): string[] {
        return Array.from(this.edgeIdx.keys());
    }
    
    /** Clears this dataset */
    public clear() {
        this.nodeIdx.clear();
        this.edgeIdx.clear();
    }

    /** Add one or multiple nodes */
    public addNodes(nodes: Node | Node[]) {
        Array.isArray(nodes)? nodes.forEach(node => this.addNode(node)) : this.addNode(nodes);
    }

    /** Add one or multiple edges. */
    public addEdges(edges: Edge | Edge[]) {
        Array.isArray(edges)? edges.forEach(edge => this.addEdge(edge)) : this.addEdge(edges);
    }

    /** Remove one or multiple nodes. /!\ Connected edges MUST be removed as well (use cleanRemoveNode() to do so) */
    private removeNodes(ids: string | string[]) {
        Array.isArray(ids)? ids.forEach(id => this.removeNode(id)) : this.removeNode(ids);
    }

    /** Remove one or multiple edges. */
    public removeEdges(ids: string | string[]) {
        Array.isArray(ids)? ids.forEach(id => this.removeEdge(id)) : this.removeEdge(ids);
    }

    /** Remove a node and its adjacent edges. keepDanglingNodes = false (default) removes the remaining nodes with no neighbor */
    public cleanRemoveNode(nodeId: string, keepDanglingNodes?: boolean) {
        this.getAdjacentEdges(nodeId).forEach(edge => {
            const neighbor = this.getNode(edge.from === nodeId ? edge.to : edge.from) as Node;
            this.removeEdges(edge.id);
            neighbor.count -= edge.count;
            if(!keepDanglingNodes && this.getAdjacentEdges(neighbor.id).length === 0) {
                this.removeNodes(neighbor.id);
            }
        });
    }

    /** Get the edges adjacent to a node (O(n) method) */
    public getAdjacentEdges(nodeId: string): Edge[] {
        return this.getEdges().filter(e => e.from === nodeId || e.to === nodeId);
    }

    /** Get the nodes connected to a node via a single node (0(n) method) */
    public getConnectedNodes(nodeId: string): Node[] {
        return this.getAdjacentEdges(nodeId)
                    .map(e => this.getNode(e.from === nodeId ? e.to : e.from) as Node);
    }

    /**
     * Merge this dataset with another one. 
     * 
     * When duplicates nodes or edges are found:
     * - The existing item is kept and updated
     * - Their 'count' properties are added
     * - Their 'visible' properties are ORed
     * - Their nodeOptions and edgeOptions are updated
     * 
     * @param dataset 
     */
    public merge(dataset: NetworkDataset): NetworkDataset {

        dataset.getNodes().forEach(node => {
            node = Object.assign({}, node); // Avoid modifying the original datasets
            if(!this.hasNode(node.id)) {
                this.addNode(node);
            }
            else {
                // Merge the new node with the existing one (which takes precedence by default)
                let existingNode = this.getNode(node.id) as Node;
                if((node.precedence || 0) > (existingNode.precedence || 0)) {
                    // Set the new node in the node index
                    this.nodeIdx.set(node.id, node);
                    // swap existingNode and node for the merging of count, visible and node options
                    const temp = node;
                    node = existingNode;
                    existingNode = temp;
                }
                existingNode.count += node.count;
                existingNode.visible = existingNode.visible || node.visible;
                let options: {[key: string]: any};
                if(typeof existingNode.type.nodeOptions === "function") {
                    options = existingNode.type.nodeOptions(existingNode, existingNode.type);
                }
                else {
                    options = existingNode.type.nodeOptions;
                }
                Utils.extend(existingNode, options);
            }
        });

        dataset.getEdges().forEach(edge => {
            edge = Object.assign({}, edge); // Avoid modifying the original datasets
            if(!this.hasEdge(edge.id)) {
                this.addEdge(edge);
            }
            else {
                // Merge the new edge with the existing one (which takes precedence)
                // eg. statistical and semantic edges
                const existingEdge = this.getEdge(edge.id) as Edge;
                existingEdge.count += edge.count;
                existingEdge.visible = existingEdge.visible || edge.visible;
                // Merge edge labels (taking duplicates into account)
                if(!!existingEdge["label"] && !!edge["label"]){
                    edge["labels"].forEach(label => {
                        if(existingEdge["labels"].indexOf(label) === -1) {
                            existingEdge["label"] += ", "+label;
                            existingEdge["labels"].push(label);
                        }
                    });
                }
                let options: {[key: string]: any};
                if(typeof existingEdge.type.edgeOptions === "function") {
                    const nodes = [existingEdge.from, existingEdge.to].map(id => this.nodeIdx[id]);
                    options = existingEdge.type.edgeOptions(nodes, existingEdge, existingEdge.type);
                }
                else {
                    options = existingEdge.type.edgeOptions;
                }
                Utils.extend(existingEdge, options);
            }
        });

        return this;
    }

    /** Transfer nodes and edges to the Vis nodes and edges DataSets */
    updateDatasets(nodes: DataSet<Node>, edges: DataSet<Edge>) {
        nodes.remove(nodes.get().filter(n => !this.getNode(n.id)?.visible));
        edges.remove(edges.get().filter(e => !this.getEdge(e.id)?.visible));
        nodes.update(this.getVisibleNodes());
        edges.update(this.getVisibleEdges());
    }

    
    private addNode(node: Node) {
        if(this.hasNode(node.id)) {
            throw new Error(`Node '${node.id}' already in dataset`);
        }
        this.nodeIdx.set(node.id, node);
    }
    
    private addEdge(edge: Edge) {
        if(this.hasEdge(edge.id)) {
            throw new Error(`Edge '${edge.id}' already in dataset`);
        }
        if(!this.hasNode(edge.from) || !this.hasNode(edge.to)) {
            throw new Error(`Edge '${edge.id}' cannot be added as one of the nodes is missing from the dataset`)
        }
        this.edgeIdx.set(edge.id, edge);
    }

    private removeNode(id: string) {
        this.nodeIdx.delete(id);
    }

    private removeEdge(id: string) {
        this.edgeIdx.delete(id);
    }
}
