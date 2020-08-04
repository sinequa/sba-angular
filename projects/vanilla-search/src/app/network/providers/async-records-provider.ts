import { Query } from '@sinequa/core/app-utils';
import { NodeType, NetworkContext } from '../network-models';
import { SearchService } from '@sinequa/components/search';
import { RecordsProvider, StructuralEdgeType } from './records-provider';


export class AsyncRecordsProvider extends RecordsProvider {

    constructor(
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected query: Query,
        protected searchService: SearchService,
        protected hideRecordNode = false,
        public name = "Documents"
    ){
        super(nodeType, edgeTypes, [], hideRecordNode, name);
    }


    public setQuery(query: Query) {
        this.query = query;
    }


    // NetworkProvider interface

    /**
     * Updates the dataset after an asynchronous call to retrieve the records.
     */
    getData(context: NetworkContext) {
        this.context = context;
        // Query mode
        this.searchService.getResults(this.query, undefined, {searchInactive: true})
            .subscribe(results => {
                this.updateDataset(results.records);
                this.provider.next(this.dataset);
            });
    }

}
    