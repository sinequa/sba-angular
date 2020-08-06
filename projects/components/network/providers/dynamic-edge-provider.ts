import { Query } from '@sinequa/core/app-utils';
import { Results, Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { EdgeType, Node, Edge, NetworkProvider, NetworkDataset } from '../network-models';
import { RecordsProvider, StructuralEdgeType, RecordNode } from './records-provider';
import { combineLatest } from 'rxjs';
import { Action } from '@sinequa/components/action';


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

    protected processedNodes: string[] = [];
    protected nodeCache = new Map<string, Results>();

    constructor(
        protected edgeType: DynamicEdgeType,
        protected secondaryEdgeTypes: StructuralEdgeType[],
        protected permanent: boolean,
        protected searchService: SearchService,
        public name: string,
        protected sourceProviders: NetworkProvider[]
    ){
        super(edgeType.nodeTypes[1], secondaryEdgeTypes, [], false, name);

        combineLatest(sourceProviders.map(p => p.getProvider())).subscribe(dataset => {
            if(this.active) {
                // Merge the nodes from all datasets into a map
                const map = new Map<string, Node>();
                dataset.forEach(dataset => {
                    dataset.getNodes().forEach(node => {
                        if(node.visible && node.type === this.edgeType.nodeTypes[0]) {
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
        if(this.edgeType.trigger !== "oninsert") {
            this.processedNodes = this.processedNodes.filter(id => !!sourceNodes.find(node => node.id === id)); // We want to "forget" the nodes that are not in the source anymore
            sourceNodes = sourceNodes.filter(node => this.processedNodes.indexOf(node.id) !== -1); // We want to process only the nodes currently in the processed list
        }

        // For each source, we get its query
        const queries = sourceNodes.map(node => this.nodeCache.has(node.id)? undefined : this.edgeType.getQuery(node, this.edgeType));
        const _queries = queries.filter(q => !!q) as Query[];
        // If there are queries, we process them asynchronously
        if(_queries.length > 0) {
            this.searchService.getMultipleResults(_queries, undefined).subscribe(res => {
                this.addDynamicDataset(sourceNodes, res.results, queries);
            });
        }
        // If not, we process them synchronously
        else {
            this.addDynamicDataset(sourceNodes, [], queries);
        }
    
    }

    protected addDynamicDataset(sourceNodes: Node[], res: Results[], queries: (Query|undefined)[]){
        let j = 0;
        // For each source node
        for(let i = 0; i<sourceNodes.length; i++){
            const sourceNode = sourceNodes[i];
            const query = queries[i];
            // If it has a query or a cached result
            if(query || this.nodeCache.has(sourceNode.id)) {
                const results = this.nodeCache.has(sourceNode.id)? this.nodeCache[sourceNode.id] : res[j++]; // Get the results
                this.nodeCache[sourceNode.id] = results; // update cache
                this.dataset.addNodes(sourceNode); // This will create a duplicate node which will be merged
                const recordNodes = this.addRecordNodes(results.records); // Creates all the record nodes and their secondary edges
                const recordEdges = this.createDynamicEdges(sourceNode, recordNodes);
                this.dataset.addEdges(recordEdges);
            }
        }
        this.provider.next(this.dataset);
    }

    protected createDynamicEdges(node: Node, recordNodes: RecordNode[]): DynamicEdge[] {
        return recordNodes.map(rNode => this.createEdge(this.edgeType, node, rNode, undefined, node.visible, {record: rNode.record}) as DynamicEdge);
    }

    protected processNode(node: Node) {
        const query = this.edgeType.getQuery(node, this.edgeType); // Get the search query for this node
        if(query){
            if(this.nodeCache.has(node.id)) {
                if(!this.permanent) {
                    this.dataset.clear(); // Remove data from previously clicked node
                    this.processedNodes.splice(0); // Remove the processed nodes
                }
                this.processedNodes.push(node.id);
                this.addDynamicDataset([node], [], [query]); // Insert dynamic nodes and edges for this clicked node
            }
            else {
                this.searchService.getResults(query, undefined, {searchInactive: true}).subscribe(results => {
                    if(!this.permanent) {
                        this.dataset.clear(); // Remove data from previously clicked node
                        this.processedNodes.splice(0); // Remove the processed nodes
                    }
                    this.processedNodes.push(node.id);
                    this.addDynamicDataset([node], [results], [query]); // Insert dynamic nodes and edges for this clicked node
                });
            }
        }
    }


    // Network provider interface

    onNodeClicked(node?: Node) {
        if(this.active && this.edgeType.trigger === "onclick" && node && node.type === this.edgeType.nodeTypes[0] && !this.dataset.hasNode(node.id)) {
            this.processNode(node);
        }
    }
    
    getNodeActions(node: Node): Action[] {
        const actions = super.getNodeActions(node);
        if(this.active && this.edgeType.trigger === "manual" && node && node.type === this.edgeType.nodeTypes[0] && !this.dataset.hasNode(node.id)) {            
            actions.push(new Action({
                icon: "fas fa-expand-arrows-alt",
                title: `Expand node '${node.label}'`,
                action: () => {
                    this.processNode(node);
                }
            }));            
        }
        return actions;
    }
}
