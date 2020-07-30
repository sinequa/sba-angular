import { Utils } from '@sinequa/core/base';
import { Record } from '@sinequa/core/web-services';
import { Action } from '@sinequa/components/action';
import { Node, NetworkDataset, NodeType, EdgeType } from '../network-models';
import { BaseProvider } from './base-provider';


export interface RecordNode extends Node {
    record: Record;
}


export type StructuralTriggerType = "oninsert" | "onclick" | "manual";
export type StructuralDisplayType = "all" | "paginate" | "existingnodes" | ((node: Node, recordNode: RecordNode, index: number) => boolean);

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

export interface CustomData {
    values: string[]; // eg. LARRY PAGE, GOOGLE
    displays: string[]; // eg. Larry Page, Google
    relations?: string[]; // eg. Works At
    directed?: boolean[]; // eg. true
}

export function isStructuralEdgeType(et: EdgeType): et is StructuralEdgeType {
    return !!(et as StructuralEdgeType).field;
}


export class RecordsProvider extends BaseProvider {

    protected readonly dataset = new NetworkDataset();

    constructor(
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected records: Record[],
        protected hideRecordNode = false
    ){
        super();
    }

    protected updateDataset(records?: Record[]) {
        this.dataset.clear();
        if(!this.active || !records || records.length === 0) {
            return; 
        }
        this.addRecordNodes(records);
    }
    
    // Record nodes

    protected addRecordNodes(records: Record[]): RecordNode[] {
        return records.map(record => {
            const node = this.createNode(this.nodeType, record.id, record.title, !this.hideRecordNode, {record}) as RecordNode;
            this.dataset.addNodes(node);
            this.edgeTypes.forEach(type => {
                this.addStructuralEdges(node, type);
            });
            return node;
        });
    }

    
    // Structural edges

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

    protected addStructuralEdge(dataset: NetworkDataset, recordNode: RecordNode, type: StructuralEdgeType, value: string, display: string, index: number) {
        const node = this.createNode(type.nodeTypes[1], value, display, true);
        node.visible = type.trigger === "oninsert" && this.isEdgeVisible(type, node, recordNode, index);
        if(recordNode.id !== node.id){ // Special case of hybrid nodes, where the recordNode might contain itself...!
            dataset.addNodes(node);
            dataset.addEdges(this.createEdge(type, recordNode, node, node.visible, {record: recordNode.record}));
        }
    }

    protected addCustomEdge(recordNode: RecordNode, type: StructuralEdgeType, data: CustomData) {
        if(type.nodeTypes.length !== data.values.length + 1) {
            throw new Error(`Wrong number of values for this custom edge ${type.nodeTypes.length}, ${data.values.length}`);
        }
        const dataset = new NetworkDataset();
        dataset.addNodes(recordNode);
        let lastNode: Node;
        for(let i=0; i<data.values.length; i++){
            const node = this.createNode(type.nodeTypes[i+1], data.values[i], data.displays[i], true);
            dataset.addNodes(node);
            // Add a structural edge from the record node to the new node
            dataset.addEdges(this.createEdge(type, recordNode, node, node.visible, {record: recordNode.record}));
            // If there is more than one node in the custom data, potentially add relations between them (note that the relation edge share the same type as the structural edge)
            if(i > 0){
                const relation = data.relations? data.relations[i-1] : undefined;
                const directed = data.directed? data.directed[i-1] : false;
                dataset.addEdges(this.createEdge(type, lastNode!, node, true, {}, 1, directed, relation));
            }
            lastNode = node;
        }
        this.dataset.merge(dataset);
    }

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

    getData() {
        // Plain records mode (may be none)
        this.updateDataset(this.records);
        this.provider.next(this.dataset);
    }

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
        // TODO: Actions to expand a node, etc.
        return [];
    }

    getNodeActions(node: Node): Action[] {
        // TODO: Actions to expand a node, etc.
        return [];
    }

}
    