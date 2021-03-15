import { Component, Input, OnChanges } from "@angular/core";
import { Node, Edge } from './network-models';


@Component({
    selector: "sq-edge-info-card",
    templateUrl: "edge-info-card.component.html",
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
export class BsEdgeInfoCard implements OnChanges {
    @Input() edge: Edge;

    closed: boolean;
    expanded: boolean;

    fromNode: Node;
    toNode: Node;

    ngOnChanges() {
        this.closed = false;
        this.expanded = false;

        this.fromNode = this.edge.context.nodes.get(this.edge.from) as Node;
        this.toNode = this.edge.context.nodes.get(this.edge.to) as Node;
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