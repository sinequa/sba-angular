import { Query } from '@sinequa/core/app-utils';
import { Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { NodeType, Node, NetworkProvider, NetworkDataset } from '../network-models';
import { RecordsProvider, StructuralEdgeType, RecordNode } from './records-provider';
import { Utils } from '@sinequa/core/base';
import { combineLatest } from 'rxjs';
import { Action } from '@sinequa/components/action';


export interface DynamicNodeType extends NodeType {
    /** Returns a query object to execute to obtain a record for this node */
    getQuery: (node: Node) => Query|undefined;
    /** Defines when the query should be executed. Warning: oninsert may generate multiple simultaneous queries */
    trigger: "oninsert" | "onclick" | "manual";
}


export class DynamicNodeProvider extends RecordsProvider {

    protected processedNodes: string[] = [];
    protected nodeCache = new Map<string, Record>();

    constructor(
        protected nodeType: DynamicNodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected permanent: boolean,
        protected searchService: SearchService,
        public name: string,
        protected sourceProviders: NetworkProvider[]
    ){
        super(nodeType, edgeTypes, [], false, name);
        
        combineLatest(sourceProviders.map(p => p.getProvider())).subscribe(dataset => {
            if(this.active){
                // "Merge" the nodes from all datasets into a map
                const map = new Map<string, Node>();
                dataset.forEach(dataset => {
                    dataset.getNodes().forEach(node => {
                        if(node.visible && node.type === this.nodeType) {
                            map.set(node.id, node);
                        }
                    });
                });
                // Update the dataset of dynamic edges
                this.updateDynamicDataset(Array.from(map.values()));
            }
        });
    }

    protected updateDynamicDataset(sourceNodes: Node[]) {
        
        // We rebuild the dataset from scratch, in case some source nodes were removed
        this.dataset = new NetworkDataset();

        // If oninsert, we want to process all the source nodes. If not, we want to process the nodes in the processedNodes list
        if(this.nodeType.trigger !== "oninsert") {
            this.processedNodes = this.processedNodes.filter(id => !!sourceNodes.find(node => node.id === id)); // We want to "forget" the nodes that are not in the source anymore
            sourceNodes = sourceNodes.filter(node => this.processedNodes.indexOf(node.id) !== -1); // We want to process only the nodes currently in the processed list
        }
        
        // For each source, we get its query
        const queries = sourceNodes.map(node => (this.nodeCache.has(node.id) || (node as RecordNode).record)? undefined : this.nodeType.getQuery(node));
        const _queries = queries.filter(q => !!q) as Query[];
        // If there are queries, we process them asynchronously
        if(_queries.length > 0) {
            this.searchService.getMultipleResults(_queries, undefined).subscribe(res => {
                this.mutateNodes(sourceNodes as RecordNode[], res.results.map(r => r.records.length > 0? r.records[0] : undefined), queries);
            });
        }
        else {
            this.mutateNodes(sourceNodes as RecordNode[], [], queries);
        }
    }

    protected processNode(node: RecordNode) {
        if(!this.permanent) {
            this.dataset.clear(); // Remove data from previously clicked node
            this.processedNodes.splice(0); // Remove the processed nodes
        }

        this.processedNodes.push(node.id);
        if(this.nodeCache.has(node.id)) {
            this.mutateNode(node, this.nodeCache[node.id]);
            this.provider.next(this.dataset);
        }
        else {
            const query = this.nodeType.getQuery(node);
            if(query) {
                this.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(results => {
                    if(results.records.length > 0) {
                        this.mutateNode(node, results.records[0]);
                    }
                    this.provider.next(this.dataset);
                });
            }
        }       
    }

    protected mutateNodes(nodes: RecordNode[], records: (Record|undefined)[], queries: (Query|undefined)[]) {
        let j = 0;
        for(let i = 0; i<nodes.length; i++){
            const node = nodes[i];
            const query = queries[i];
            let record: Record|undefined;
            if(query){
                record = records[j++];
            }
            else if(node.record) {
                record = node.record;
            }
            else if(this.nodeCache.has(node.id)){
                record = this.nodeCache[node.id];
            }

            if(record) {
                this.mutateNode(node, record);
            }
        }
        this.provider.next(this.dataset);
    }

    protected mutateNode(node: RecordNode, record: Record) {
        node.record = record;
        node.precedence = 1; // Give more precedence to the new node
        this.nodeCache[node.id] = record;
        this.refreshNodeOptions(node); // The node might change appearance, since it has mutated into a record node
        this.edgeTypes.forEach(type => {
            this.addStructuralEdges(node, type);
        });
    }

    protected refreshNodeOptions(node: RecordNode) {
        let options;
        if(typeof this.nodeType.nodeOptions === "function") {
            options = this.nodeType.nodeOptions(node, this.nodeType);
        }
        else {
            options = this.nodeType.nodeOptions;
        }
        return Utils.extend(node, options);
    }
    
    // Network provider interface

    onNodeClicked(node?: RecordNode) {
        if(this.active && this.nodeType.trigger === "onclick" && node && node.type === this.nodeType && this.processedNodes.indexOf(node.id) === -1) {
            this.processNode(node);
        }
    }

    getNodeActions(node: RecordNode): Action[] {
        const actions = super.getNodeActions(node);
        if(this.active && this.nodeType.trigger === "manual" && node && node.type === this.nodeType && this.processedNodes.indexOf(node.id) === -1) {
            actions.unshift(new Action({
                icon: "fas fa-star-of-life",
                title: `Enrich node '${node.label}'`,
                action: () => {
                    this.processNode(node);
                }
            }));
        }
        return actions;
    }
}
