import { Component, Input, OnChanges } from "@angular/core";
import { Node } from './network-models';


export interface NodeData {
    node: Node;
    count?: number; // The count displayed may be different from the node count (for edges)
}

@Component({
    selector: "sq-node-info-card",
    templateUrl: "node-info-card.component.html",
    styles: [`
.card {
    top: 5px;
    left: 0;
    right: 0;
    width: 80%;
}
.circular-image {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    object-fit: cover;
}
    `]
})
export class BsNodeInfoCard implements OnChanges {
    @Input() node: Node;

    closed: boolean;
    expanded: boolean;

    nodeData: NodeData;

    neighbors: {[type: string]: NodeData[]};

    ngOnChanges() {
        this.closed = false;
        this.expanded = false;
        this.nodeData = { node: this.node, count: this.node.count };

        this.neighbors = {};
        this.node.context.edges
            .stream()
            .filter(e => e.from === this.node.id || e.to === this.node.id) // Filter edges
            .map(e => {
                const id = e.from === this.node.id ? e.to : e.from
                const node = this.node.context.nodes.get(id);
                return {node, count: e.count};
            }) // get node and edge count
            .forEach(item => {
                if(item.node) {
                    const type = item.node.type.field ?
                        item.node.context.appService.getPluralLabel(item.node.type.field) : // Try to get the "pretty label"
                        item.node.type.name; // Or just use the node type's name
                    if(!this.neighbors[type]) {
                        this.neighbors[type] = []; // Initialize the neighbor array
                    }
                    // Create the node data
                    this.neighbors[type].push({ node: item.node, count: item.count } as NodeData);
                }
                return true;
            });
        // Sort the neighbors by decreasing count number
        Object.values(this.neighbors)
            .forEach(list => list.sort((a,b) => (b.count || 0) - (a.count || 0)));
    }

    focusNode(node: Node) {
        // Hack to gain access to the network instance (networkService does not have the focus() method)
        const networkInstance = node.context.networkService['networks'][node.context.name];
        networkInstance.focus(node.id, {animation: true}); // Move the view to this node with animation
        networkInstance.selectNodes([node.id], true); // Warning: does not trigger events...
        node.context.select(node, undefined); // Select the node to update info cards, actions
        return false;
    }
}