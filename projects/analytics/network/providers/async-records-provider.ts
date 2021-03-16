import { Query } from '@sinequa/core/app-utils';
import { NodeType, NetworkContext } from '../network-models';
import { RecordsProvider, StructuralEdgeType } from './records-provider';


/**
 * An extension of RecordsProviders where the records are not provided
 * directly, but instead fetched from the server via a given Query object.
 */
export class AsyncRecordsProvider extends RecordsProvider {

    constructor(
        public name: string,
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected query: Query,
        protected hideRecordNode = false
    ){
        super(name, nodeType, edgeTypes, [], hideRecordNode);
    }


    /**
     * Sets a new query to asynchronous records providers.
     * It will be used on the next call to getData()
     * @param query The query object we want to use to fetch records
     */
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
        this.context.searchService.getResults(this.query, undefined, {searchInactive: true})
            .subscribe(results => {
                this.updateDataset(results.records);
                this.provider.next(this.dataset);
            });
    }

}
    