import { Subject } from 'rxjs';
import { Utils } from '@sinequa/core/base';
import { Record } from '@sinequa/core/web-services';
import { Action } from '@sinequa/components/action';
import { Edge, Node, NetworkDataset, NetworkProvider, NodeType, EdgeType, getEdgeId, getNodeId } from '../network-models';


export interface RecordNode extends Node {
    record: Record;
}

export interface StructuralEdge extends Edge {
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
}

export function isStructuralEdgeType(et: EdgeType): et is StructuralEdgeType {
    return !!(et as StructuralEdgeType).field;
}


export class RecordsProvider implements NetworkProvider {

    protected readonly provider = new Subject<NetworkDataset>();

    protected readonly dataset = new NetworkDataset();

    public active = true;

    constructor(
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected records: Record[]
    ){}

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
            const node = this.createRecordNode(record);
            this.dataset.addNodes(node);
            this.edgeTypes.forEach(type => {
                this.addStructuralEdges(node, type);
            });
            return node;
        });
    }

    protected createRecordNode(record: Record): RecordNode {
        let node: RecordNode = {
            id: getNodeId(this.nodeType, record.id),
            label: record.title,
            type: this.nodeType,
            provider: this,
            visible: true,
            count: 1,
            record: record
        }
        let options;
        if(typeof this.nodeType.nodeOptions === "function") {
            options = this.nodeType.nodeOptions(node, this.nodeType);
        }
        else {
            options = this.nodeType.nodeOptions;
        }
        return Utils.extend(node, options);
    }
    


    // Structural edges

    protected addStructuralEdges(node: RecordNode, type: StructuralEdgeType) {
        if(type.nodeTypes[0] !== this.nodeType){
            throw new Error(`Inconsistent node type: '${type.nodeTypes[0].name}' instead of '${this.nodeType.name}'`);
        }
        const recorddata = node.record[type.field];

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

    protected addStructuralEdge(dataset: NetworkDataset, recordNode: RecordNode, type: StructuralEdgeType, value: string, display: string, index: number) {
        const node = this.createMetadataNode(type.nodeTypes[1], value, display, true);
        node.visible = type.trigger === "oninsert" && this.isEdgeVisible(type, node, recordNode, index);
        if(recordNode.id !== node.id){ // Special case of hybrid nodes, where the recordNode might contain itself...!
            dataset.addNodes(node);
            dataset.addEdges(this.createStructuralEdge(type, recordNode, node));
        }
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
    
    protected createStructuralEdge(type: StructuralEdgeType, recordNode: RecordNode, node: Node): StructuralEdge {
        const edge: StructuralEdge = {
            id: getEdgeId(recordNode, node),
            from: recordNode.id,
            to: node.id,
            type: type,
            record: recordNode.record,
            visible: node.visible,
            count: 1,
            provider: this
        }
        let options: {[key: string]: any};
        if(typeof type.edgeOptions === "function") {
            options = type.edgeOptions([recordNode, node], edge, type);
        }
        else {
            options = type.edgeOptions;
        }
        return Utils.extend(edge, options);
    }

    protected createMetadataNode(type: NodeType, value: string, display: string, visible: boolean): Node {
        const node: Node = {
            id: getNodeId(type, value),
            label: display,
            type: type,
            count: 1,
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

    // NetworkProvider interface

    getProvider(): Subject<NetworkDataset> {
        return this.provider;
    }

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

    onNodesInserted(nodes: Node[]) {

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

    onDestroy() {
        
    }

}
    