import { Utils } from '@sinequa/core/base';
import { Node, Edge, NodeType, EdgeType, NetworkProvider, NetworkDataset} from '../network-models';
import { Subject } from 'rxjs';

export  class BaseProvider implements NetworkProvider {

    protected readonly provider = new Subject<NetworkDataset>();
    public active = true;

    public readonly EDGESEPARATOR = "~~~EDGE~~~";

    protected getEdgeId(node1: Node, node2: Node): string {
        return node1.id + this.EDGESEPARATOR + node2.id;
    }
    
    protected getNodeId(type: NodeType, value: string): string {
        return `${type.name}:${value}`;
    }

    protected createNode(type: NodeType, id: string, label: string, visible = true, customProps = {}, count = 1): Node {
        let node: Node = {
            id: this.getNodeId(type, id),
            label,
            type,
            provider: this,
            visible,
            count
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
    
    protected createEdge(type: EdgeType, fromNode: Node, toNode: Node, visible = true, customProps = {}, count = 1, directed = false, relation?: string): Edge {
        const edge: Edge = {
            id: this.getEdgeId(fromNode, toNode),
            from: fromNode.id,
            to: toNode.id,
            type: type,
            visible,
            count,
            provider: this
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
    

    getProvider(): Subject<NetworkDataset> {
        return this.provider;
    }

    getData() {
        
    }

    onDatasetsMerged(dataset: NetworkDataset) {
        
    }

    onNodesInserted(nodes: Node[]) {
        
    }
    
    onNodeClicked(node?: Node | undefined) {
        
    }

    getProviderActions(): any[] {
        return [];
    }

    getNodeActions(node: Node): any[] {
        return [];
    }

    onDestroy() {
        
    }

}