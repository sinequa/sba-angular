import { Query } from '@sinequa/core/app-utils';
import { Results, Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { EdgeType, Node, Edge, getEdgeId, NetworkProvider } from '../network-models';
import { RecordsProvider, StructuralEdgeType, RecordNode } from './records-provider';
import { Utils } from '@sinequa/core/base';
import { combineLatest } from 'rxjs';


export interface DynamicEdge extends Edge {
    record: Record;
}

export interface DynamicEdgeType extends EdgeType {
    /** Returns a query object to execute to obtain dynamic edges from a node */
    getQuery: (node: Node, type: DynamicEdgeType) => Query | undefined;
    /** count limits the number of records returned by the query service and allows for pagination */
    count?: number;
    /** Defines when the dynamic edge should be executed. Warning: oninsert may generate multiple simultaneous queries */
    trigger: "oninsert" | "onclick" | "manual";
}

export function isDynamicEdgeType(et: EdgeType): et is DynamicEdgeType {
    return !!(et as DynamicEdgeType).getQuery;
}


/**
 * 
 */
export class DynamicEdgeProvider extends RecordsProvider {

    nodeCache = new Map<string, Results>();

    constructor(
        protected edgeType: DynamicEdgeType,
        protected secondaryEdgeTypes: StructuralEdgeType[],
        protected permanent: boolean,
        protected searchService: SearchService,
        protected sourceProviders?: NetworkProvider[],
    ){
        super(edgeType.nodeTypes[1], secondaryEdgeTypes, []);

        if(this.edgeType.trigger === "oninsert" && sourceProviders) {
            combineLatest(sourceProviders.map(p => p.getProvider())).subscribe(dataset => {
                if(this.active){
                    // Merge the nodes from all datasets into a map
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
        let sourceNodes = nodes.filter(node => node.type === this.edgeType.nodeTypes[0]); // We want to start from scratch

        if(!this.permanent) {
            // if the nodes added are non-permanent, we rebuild the dataset from scratch
            this.dataset.clear();
        }
        else {
            // if the nodes added are permanent, we don't want to add them again
            sourceNodes = sourceNodes.filter(node => !this.dataset.hasNode(node.id));
        }

        const queries = sourceNodes.map(node => this.nodeCache.has(node.id)? undefined : this.edgeType.getQuery(node, this.edgeType));
        const _queries = queries.filter(q => !!q) as Query[];
        if(_queries.length > 0) {
            this.searchService.getMultipleResults(_queries, undefined).subscribe(res => {
                this.addDynamicDataset(sourceNodes, res.results, queries);
                this.provider.next(this.dataset);
            });
        }
        else {
            this.addDynamicDataset(sourceNodes, [], queries);
            this.provider.next(this.dataset);
        }
    
    }

    protected addDynamicDataset(sourceNodes: Node[], res: Results[], queries: (Query|undefined)[]){
        let j = 0;
        for(let i = 0; i<sourceNodes.length; i++){
            const sourceNode = sourceNodes[i];
            const query = queries[i];
            if(query || this.nodeCache.has(sourceNode.id)){
                const results = this.nodeCache.has(sourceNode.id)? this.nodeCache[sourceNode.id] : res[j++];
                this.nodeCache[sourceNode.id] = results; // update cache
                this.dataset.addNodes(sourceNode); // This will create a duplicate node which will be merged
                const recordNodes = this.addRecordNodes(results.records); // Creates all the record nodes and their secondary edges
                const recordEdges = this.createDynamicEdges(sourceNode, recordNodes);
                this.dataset.addEdges(recordEdges);
            }
        }
    }

    protected createDynamicEdges(node: Node, recordNodes: RecordNode[]): DynamicEdge[] {
        return recordNodes.map(rNode => this.createDynamicEdge(node, rNode));
    }

    protected createDynamicEdge(node: Node, recordNode: RecordNode): DynamicEdge {
        const edge: DynamicEdge = {
            id: getEdgeId(node, recordNode),
            from: node.id,
            to: recordNode.id,
            type: this.edgeType,
            record: recordNode.record,
            visible: node.visible,
            count: 1,
            provider: this
        }
        let options: {[key: string]: any};
        if(typeof this.edgeType.edgeOptions === "function") {
            options = this.edgeType.edgeOptions([recordNode, node], edge, this.edgeType);
        }
        else {
            options = this.edgeType.edgeOptions;
        }
        return Utils.extend(edge, options);
    }


    // Network provider interface

    onNodeClicked(node?: Node) {
        if(this.active && this.edgeType.trigger === "onclick" && node && node.type === this.edgeType.nodeTypes[0] && !this.dataset.hasNode(node.id)) {
            const query = this.edgeType.getQuery(node, this.edgeType); // Get the search query for this node
            if(query){
                this.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(results => {
                    if(!this.permanent) {
                        this.dataset.clear(); // Remove data from previously clicked node
                    }
                    this.addDynamicDataset([node], [results], [query]); // Insert dynamic nodes and edges for this clicked node
                    this.provider.next(this.dataset);
                });
            }
        }
    }
}
