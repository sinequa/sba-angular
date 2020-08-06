import { Subscription } from 'rxjs';
import { Record } from '@sinequa/core/web-services';
import { SelectionService, SelectionEventType } from '@sinequa/components/selection';
import { NodeType, NetworkContext } from '../network-models';
import { RecordsProvider, StructuralEdgeType } from './records-provider';


/**
 * An extension of the RecordsProvider, where records are not provided
 * directly, but instead are taken from the SelectionService and refreshed
 * every time a node is selected or unselected.
 * ⚠️ Note that the SelectionService must be configured to store records instead
 * of just records ids!
 * See http://localhost:4000/sba-angular/modules/components/selection.html#selection-service
 */
export class SelectedRecordsProvider extends RecordsProvider {

    // Subscription to the SelectionService, allowing to refresh the list of records
    selectionSubscription: Subscription;

    constructor(
        public name = "Selected documents",
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected selectionService: SelectionService,
        protected hideRecordNode = false
    ){
        super(name, nodeType, edgeTypes, selectionService.getSelectedItems() as Record[], hideRecordNode);

        this.selectionSubscription = selectionService.events.subscribe(event => {
            if(event.type === SelectionEventType.SELECT || SelectionEventType.UNSELECT) {
                const records = selectionService.getSelectedItems() as Record[];
                this.updateDataset(records);
                this.provider.next(this.dataset);
            }
        });
    }


    // NetworkProvider interface

    getData(context: NetworkContext) {
        this.context = context;
        this.updateDataset(this.selectionService.getSelectedItems() as Record[]);
        this.provider.next(this.dataset);
    }
    
    onDestroy() {
        this.selectionSubscription?.unsubscribe();
    }

}
    