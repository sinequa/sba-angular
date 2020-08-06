import { Utils } from '@sinequa/core/base';
import { Record } from '@sinequa/core/web-services';
import { Action } from '@sinequa/components/action';
import { Node, NetworkDataset, NodeType, EdgeType, NetworkContext } from '../network-models';
import { BaseProvider } from './base-provider';

/**
 * Extension of the Node interface, to include the Record object
 * from which the node is generated
 */
export interface RecordNode extends Node {
    record: Record;
}


/**
 * An extension of the EdgeType interface to include properties specific to
 * structural edges (edge between a record and its metadata).
 */
export interface StructuralEdgeType extends EdgeType {
    /** Name of the field in the record */
    field: string;
    /** count limits the number of values displayed and allows for pagination. Use 0 for unlimited values */
    count?: number;
    /** Defines when the edge should be displayed */
    trigger: StructuralTriggerType;
    /** showall: display all values from the field / paginate: display all value with pagination / existingnodes: only link to existing nodes / manual: only show if manual action (activated programmatically) */
    display: StructuralDisplayType;
    /** A function to parse metadata from a record node in a custom way */
    parse?: (value: any, record: Record, type: StructuralEdgeType) => CustomData;
}

export type StructuralTriggerType = "oninsert" | "onclick" | "manual";
export type StructuralDisplayType = "all" | "paginate" | "existingnodes" | ((node: Node, recordNode: RecordNode, index: number) => boolean);

/**
 * Data structure returned by the optional parse() function of a structural edge
 * type. Contains the parsed values of a property that can be turned into one or
 * multiple nodes and edges.
 */
export interface CustomData {
    values: string[]; // eg. LARRY PAGE, GOOGLE
    displays: string[]; // eg. Larry Page, Google
    relations?: string[]; // eg. Works At
    directed?: boolean[]; // eg. true
    fieldValue?: string; // A value on which to filter the data
}

/**
 * Tests whether the given edge type is a structural edge type
 * @param et an edge type
 */
export function isStructuralEdgeType(et: EdgeType): et is StructuralEdgeType {
    return !!(et as StructuralEdgeType).field;
}


/**
 * A network provider generating nodes from records.
 * Additionally, the provider can generate the "structural edges" of that
 * node. Structural edges are edges between a record and the fields of
 * that record (eg. the wikipedia page of Microsoft is a record that probably
 * contains the fields "Microsoft" and "Bill Gates").
 */
export class RecordsProvider extends BaseProvider {

    constructor(
        public name = "Documents",
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected records: Record[],
        protected hideRecordNode = false
    ){
        super(name);
    }

    /**
     * Clears the dataset and generates new record nodes
     * @param records the list of records of this provider
     */
    protected updateDataset(records?: Record[]) {
        this.dataset.clear();
        if(!this.active || !records || records.length === 0) {
            return; 
        }
        this.addRecordNodes(records);
    }
    
    // Record nodes

    /**
     * Generates the nodes for a list of records, including their structural
     * edges, and adds them to the dataset.
     * Returns the list of record nodes.
     * @param records 
     */
    protected addRecordNodes(records: Record[]): RecordNode[] {
        return records.map(record => {
            let node = this.dataset.getNode(this.getNodeId(this.nodeType, record.id));
            if(!node) {
                node = this.createNode(this.nodeType, record.id, record.title, !this.hideRecordNode, {record});
                this.dataset.addNodes(node);
                this.edgeTypes.forEach(type => {
                    this.addStructuralEdges(node as RecordNode, type);
                });
            }
            return node as RecordNode;
        });
    }

    
    // Structural edges

    /**
     * Generates the metadata nodes and structural edges from the given node,
     * and merge them into the dataset.
     * This function will automatically parse the metadata contained in the record,
     * but it is possible to manage custom types of metadata by providing a
     * custom parse() function via the structural edge type.
     * @param node The record node
     * @param type The edge type for which we want to create edges
     */
    protected addStructuralEdges(node: RecordNode, type: StructuralEdgeType) {

        if(type.nodeTypes[0] !== this.nodeType){
            throw new Error(`Inconsistent node type: '${type.nodeTypes[0].name}' instead of '${this.nodeType.name}'`);
        }
        
        const recorddata = node.record[type.field];

        if(recorddata === undefined){
            return;
        }

        // Custom parse for mono or multi valued data
        if(type.parse) {
            if(Utils.isArray(recorddata)) {
                recorddata.forEach((value,i) => { 
                    this.addCustomEdge(node, type, type.parse!(value, node.record, type));
                });
            }
            else {
                this.addCustomEdge(node, type, type.parse!(recorddata, node.record, type));
            }
        }
        // Default handling for standard Sinequa Metadata
        else {
            const data = new NetworkDataset();
            data.addNodes(node);
    
            // sourcestr
            if(Utils.isString(recorddata)) {
                this.addStructuralEdge(data, node, type, recorddata, recorddata, 0);
            }
            else if(Utils.isArray(recorddata)) {
                recorddata.forEach((value,i) => {
                    // sourcecsv
                    if(Utils.isString(value)) {
                        this.addStructuralEdge(data, node, type, value, value, i);
                    }
                    // entity
                    else if(value["value"]) {
                        this.addStructuralEdge(data, node, type, value["value"], value["display"] || value["value"], i);
                    }
                });
            }
    
            this.dataset.merge(data);
        }
    }

    /**
     * Add a structural edge to a record node and adds that edge
     * (and corresponding metadata node) to the given dataset.
     * @param dataset The target dataset
     * @param recordNode The record node
     * @param type The edge type of the structural edge
     * @param value The "value" property of the metadata node
     * @param display The "display" property of the metadata node
     * @param index The index of the metadata within the record, which may influence its visibility when using display=paginate
     */
    protected addStructuralEdge(dataset: NetworkDataset, recordNode: RecordNode, type: StructuralEdgeType, value: string, display: string, index: number) {
        // Create the metadata node
        const node = this.createNode(type.nodeTypes[1], value, display, true);
        // Sets its visibility
        node.visible = type.trigger === "oninsert" && this.isEdgeVisible(type, node, recordNode, index);
        if(recordNode.id !== node.id){ // Special case of hybrid nodes, where the recordNode might contain itself...!
            dataset.addNodes(node);
            dataset.addEdges(this.createEdge(type, recordNode, node, value, node.visible, {record: recordNode.record}));
        }
    }

    /**
     * Add a custom structural edge to a record node and merges that edge
     * (and corresponding metadata node) into the global dataset.
     * @param recordNode The record node
     * @param type The edge type of the structural edge
     * @param data A CustomData object containing the properties of the metadata nodes we want to created
     */
    protected addCustomEdge(recordNode: RecordNode, type: StructuralEdgeType, data: CustomData) {
        if(type.nodeTypes.length !== data.values.length + 1) {
            throw new Error(`Wrong number of values for this custom edge ${type.nodeTypes.length}, ${data.values.length}`);
        }
        // Create a dataset only for this data, to avoid duplicate conflicts
        const dataset = new NetworkDataset();
        dataset.addNodes(recordNode);
        // For each value contained in "data", create a node, and edges in between them (in addition to the edges between the record and each metadata node)
        let lastNode: Node;
        for(let i=0; i<data.values.length; i++){
            const node = this.createNode(type.nodeTypes[i+1], data.values[i], data.displays[i], true);
            dataset.addNodes(node);
            // Add a structural edge from the record node to the new node
            dataset.addEdges(this.createEdge(type, recordNode, node, data.fieldValue, node.visible, {record: recordNode.record}));
            // If there is more than one node in the custom data, potentially add relations between them (note that the relation edge share the same type as the structural edge)
            if(i > 0){
                const relation = data.relations? data.relations[i-1] : undefined;
                const directed = data.directed? data.directed[i-1] : false;
                dataset.addEdges(this.createEdge(type, lastNode!, node, data.fieldValue, true, {}, 1, directed, relation));
            }
            lastNode = node;
        }
        this.dataset.merge(dataset);
    }

    /**
     * Returns the visibility of a structural edge, depending on the type.display property
     * @param type The structural edge type
     * @param node The metadata node of this edge
     * @param recordNode The record node of this edge
     * @param index The index of the metadata in the list of metadata of the record
     */
    protected isEdgeVisible(type: StructuralEdgeType, node: Node, recordNode: RecordNode, index: number): boolean {
        if(type.display === "all") {
            return true;
        }
        else if(type.display === "existingnodes") {
            return false;
        }
        else if(type.display === "paginate") {
            return index < (type.count || 10);
        }
        else {
            return type.display(node, recordNode, index);
        }
    }
    


    // NetworkProvider interface

    getData(context: NetworkContext) {
        this.context = context;
        // Plain records mode (may be none)
        this.updateDataset(this.records);
        this.provider.next(this.dataset);
    }

    /**
     * This function adjusts the visibility of nodes for the visibility
     * type "existingnode", so that nodes with only one neighbor (post-merge)
     * are collapsed.
     * @param dataset The dataset resulting of the merge of all the datasets
     */
    onDatasetsMerged(dataset: NetworkDataset) {
        // Once the datasets are merged, we can update the visibility of nodes that should be shown only if they have more than one neighbor
        dataset.getNodes()
            .filter(node => node.type === this.nodeType)
            .forEach(node => {
                dataset.getAdjacentEdges(node.id)
                    .filter(edge => (edge.type as StructuralEdgeType).display === 'existingnodes')
                    .forEach(edge => {
                        const neighbor = dataset.getNode(node.id === edge.to ? edge.from : edge.to);
                        if(!neighbor) {
                            throw new Error(`Missing node from edge ${edge.id}`);
                        }
                        const neighborsneighbors = dataset.getAdjacentEdges(neighbor.id);
                        if(neighborsneighbors.length > 1) {
                            neighbor.visible = true;
                            edge.visible = true;
                        }
                    });
            });
    }

    /**
     * Adjust visibility of nodes and edges, for structural edges with
     * type.trigger = onclick. These nodes will only be shown once their
     * record node is clicked on.
     * @param node A node that was clicked
     */
    onNodeClicked(node?: Node) {
        if(this.active && node && node.type === this.nodeType) { // Note: we cannot test the provider property, since this node might have been merged with one from a different provider. However the node type should be a unique instance
            let update = false;
            this.dataset.getAdjacentEdges(node.id)
                .filter(edge => edge.type['trigger'] === 'onclick')
                .forEach(edge => {
                    const neighbor = this.dataset.getNode(node.id === edge.to ? edge.from : edge.to);
                    if(!neighbor) {
                        throw new Error(`Missing node from edge ${edge.id}`);
                    }
                    if(!neighbor.visible || !edge.visible) {
                        edge.visible = true;
                        neighbor.visible = true;
                        update = true;
                    }
                    // TODO "propagate" visibility (ie. if 2 nodes are visible but an edge in between is invisible, make it visible)
                });
            if(update) {
                this.provider.next(this.dataset);
            }
        }
    }

    getProviderActions(): Action[] {
        return super.getProviderActions();
    }

    /**
     * Creates actions for expanding and/or collapsing a record node that was clicked.
     * expanding and collapsing will act on the visibility of the structural edges
     * attached to this node.
     * Both actions might be displayed at the same time, if the node is in an intermediate
     * state.
     * @param node 
     */
    getNodeActions(node: Node): Action[] {
        const actions = super.getNodeActions(node);
        
        // Actions for exanding / collapsing a record node
        if(this.active && node.type === this.nodeType && this.edgeTypes.length > 0) {
            let hasExpandedEdge = false;
            let hasCollapsedEdge = false;
            this.dataset.getAdjacentEdges(node.id).forEach(e => {
                hasCollapsedEdge = hasCollapsedEdge || !e.visible;
                hasExpandedEdge = hasExpandedEdge || e.visible;
            });

            if(hasCollapsedEdge) {
                actions.push(new Action({
                    icon: "fas fa-expand-arrows-alt",
                    title: "msg#network.actions.expandMeta",
                    action: () => {
                        let update = false;
                        this.dataset.getAdjacentEdges(node.id)
                            .forEach(edge => {
                                const neighbor = this.dataset.getNode(node.id === edge.to ? edge.from : edge.to);
                                if(!neighbor) {
                                    throw new Error(`Missing node from edge ${edge.id}`);
                                }
                                if(!neighbor.visible || !edge.visible) {
                                    edge.visible = true;
                                    neighbor.visible = true;
                                    update = true;
                                }
                                // TODO "propagate" visibility (ie. if 2 nodes are visible but an edge in between is invisible, make it visible)
                            });
                        if(update) {
                            this.provider.next(this.dataset);
                        }
                    }
                }));
            }
            
            if(hasExpandedEdge) {
                actions.push(new Action({
                    icon: "fas fa-compress-arrows-alt",
                    title: "msg#network.actions.collapseMeta",
                    action: () => {
                        let update = false;
                        this.dataset.getAdjacentEdges(node.id)
                            .forEach(edge => {
                                const neighbor = this.dataset.getNode(node.id === edge.to ? edge.from : edge.to);
                                if(!neighbor) {
                                    throw new Error(`Missing node from edge ${edge.id}`);
                                }
                                if((neighbor.visible || edge.visible) && !(neighbor as RecordNode).record) { // Prevent collapsing links between 2 record nodes (alternatively, we could count the number of neighbors of the neighbors, and close only the isoltated ones)
                                    edge.visible = false;
                                    neighbor.visible = false;
                                    update = true;
                                }
                            });
                        if(update) {
                            this.provider.next(this.dataset);
                        }
                    }
                }));
            }
        }
        return actions;
    }

}
    