import { Utils } from '@sinequa/core/base';
import { Node, Edge, NodeType, EdgeType, NetworkProvider, NetworkDataset, NetworkContext} from '../network-models';
import { Subject } from 'rxjs';
import { Action } from '@sinequa/components/action';

export class BaseProvider implements NetworkProvider {

    protected readonly provider = new Subject<NetworkDataset>();
    public dataset = new NetworkDataset();
    public active = true;

    public readonly EDGESEPARATOR = "~~~EDGE~~~";

    public readonly activateAction: Action;
    public readonly resetAction: Action;

    public context: NetworkContext;

    constructor(
        public name: string
    ) {
        this.activateAction = new Action({
            icon: this.active? "fas fa-toggle-on fa-fw" : "fas fa-toggle-off fa-fw",
            text: this.active? "Active" : "Deactivated",
            title: "Toggle this provider on/off",
            action: (action: Action) => {
                this.active = !this.active
                action.icon = this.active? "fas fa-toggle-on fa-fw" : "fas fa-toggle-off fa-fw";
                action.text = this.active? "Active" : "Deactivated";
                this.getData(this.context);
            }
        });
        this.resetAction = new Action({
            icon: "fas fa-trash-alt fa-fw",
            text: "Reset",
            title: "Clear the data of this provider and start again",
            action: () => {
                this.dataset.clear();
                this.getData(this.context);
            }
        });
    }

    protected getEdgeId(node1: Node, node2: Node): string {
        return node1.id + this.EDGESEPARATOR + node2.id;
    }
    
    protected getNodeId(type: NodeType, value: string): string {
        return `${type.name}:${value}`;
    }

    protected getNodeValue(node: Node): string {
        return node.id.substr(node.type.name.length+1);
    }

    protected createNode(type: NodeType, id: string, label: string, visible = true, customProps = {}, count = 1): Node {
        let node: Node = {
            id: this.getNodeId(type, id),
            label,
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
    
    protected createEdge(type: EdgeType, fromNode: Node, toNode: Node, fieldValue: string | undefined = undefined, visible = true, customProps = {}, count = 1, directed = false, relation?: string): Edge {
        const edge: Edge = {
            id: this.getEdgeId(fromNode, toNode),
            from: fromNode.id,
            to: toNode.id,
            fieldValue,
            type: type,
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

    getProviderActions(): Action[] {
        return [this.activateAction, this.resetAction];
    }

    getNodeActions(node: Node): Action[] {
        const actions: Action[] = []
        if(this.active && node.provider === this && node.type.field) {
            actions.push(new Action({
                icon: "fas fa-filter",
                title: `Filter search with '${node.label}'`,
                action: () => {
                    node.context.searchService.query.addSelect(node.type.field! + "`"+ node.label + "`:`"+this.getNodeValue(node)+"`", node.context.name);
                    node.context.searchService.search();
                }
            }));
        }
        return actions;
    }

    getEdgeActions(edge: Edge): Action[] {
        const actions: Action[] = [];
        const nodeFrom = edge.context.nodes.get(edge.from);
        const nodeTo = edge.context.nodes.get(edge.to);
        if(this.active && edge.provider === this) {
            if(edge.type.field && edge.fieldValue) {
                actions.push(new Action({
                    icon: "fas fa-filter",
                    title: `Filter search with '${edge.fieldValue}'`,
                    action: () => {
                        edge.context.searchService.query.addSelect(edge.type.field + ":`"+edge.fieldValue+"`", edge.context.name);
                        edge.context.searchService.search();
                    }
                }));
            }
            else if(nodeFrom && nodeTo && nodeFrom.type.field && nodeTo.type.field) {
                actions.push(new Action({
                    icon: "fas fa-filter",
                    title: `Filter search with '${nodeFrom.label}' and '${nodeTo.label}'`,
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