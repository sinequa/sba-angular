import { Query } from '@sinequa/core/app-utils';
import { Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { NodeType, Node, NetworkProvider } from '../network-models';
import { RecordsProvider, StructuralEdgeType, RecordNode } from './records-provider';
import { Utils } from '@sinequa/core/base';
import { combineLatest } from 'rxjs';


export interface DynamicNodeType extends NodeType {
    /** Returns a query object to execute to obtain a record for this node */
    getQuery: (node: Node) => Query|undefined;
    /** Defines when the query should be executed. Warning: oninsert may generate multiple simultaneous queries */
    trigger: "oninsert" | "onclick" | "manual";
}


export class DynamicNodeProvider extends RecordsProvider {

    nodeCache = new Map<string, Record>();

    constructor(
        protected nodeType: DynamicNodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected permanent: boolean,
        protected searchService: SearchService,
        protected sourceProviders?: NetworkProvider[]
    ){
        super(nodeType, edgeTypes, []);
        
        if(this.nodeType.trigger === "oninsert" && sourceProviders) {
            combineLatest(sourceProviders.map(p => p.getProvider())).subscribe(dataset => {
                if(this.active){
                    // "Merge" the nodes from all datasets into a map
                    const map = new Map<string, Node>();
                    dataset.forEach(dataset => {
                        dataset.getNodes().forEach(node => {
                            if(node.visible) {
                                map.set(node.id, node);
                            }
                        });
                    });
                    // Update the dataset of dynamic edges
                    this.updateDynamicDataset(Array.from(map.values()));
                }
            });
        }
    }

    protected updateDynamicDataset(nodes: Node[]) {
        
        // Source nodes not already provided
        let sourceNodes = nodes.filter(node => node.type === this.nodeType); // We want to start from scratch
        
        if(!this.permanent) {
            // if the nodes added are non-permanent, we rebuild the dataset from scratch
            this.dataset.clear();
        }
        else {
            // if the nodes added are permanent, we don't want to add them again
            sourceNodes = sourceNodes.filter(node => !this.dataset.hasNode(node.id));
        }

        // Get source nodes that require a query
        const queries = sourceNodes.map(node => (this.nodeCache.has(node.id) || (node as RecordNode).record)? undefined : this.nodeType.getQuery(node));
        const _queries = queries.filter(q => !!q) as Query[];
        if(_queries.length > 0) {
            this.searchService.getMultipleResults(_queries, undefined).subscribe(res => {
                this.mutateNodes(sourceNodes as RecordNode[], 
                        res.results.map(r => r.records.length > 0? r.records[0] : undefined), 
                        queries);
                this.provider.next(this.dataset);
            });
        }
        else {
            this.mutateNodes(sourceNodes as RecordNode[], [], queries);            
            this.provider.next(this.dataset);
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
    }

    protected mutateNode(node: RecordNode, record: Record) {
        node.record = record;
        node.precendence = 1;
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
        if(this.active && this.nodeType.trigger === "onclick" && node && node.type === this.nodeType) {
            
            if(!this.permanent) {
                this.dataset.clear(); // Remove data from previously clicked node
            }

            if(node.record) {
                this.mutateNode(node, node.record);
                this.provider.next(this.dataset);
            }
            else if(this.nodeCache.has(node.id)) {
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
    }
}
