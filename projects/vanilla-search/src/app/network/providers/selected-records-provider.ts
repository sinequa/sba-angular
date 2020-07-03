import { Subscription } from 'rxjs';
import { Record } from '@sinequa/core/web-services';
import { SelectionService, SelectionEventType } from '@sinequa/components/selection';
import { NodeType } from '../network-models';
import { RecordsProvider, StructuralEdgeType } from './records-provider';


export class SelectedRecordsProvider extends RecordsProvider {

    selectionSubscription: Subscription;

    constructor(
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected selectionService: SelectionService
    ){
        super(nodeType, edgeTypes, selectionService.getSelectedItems() as Record[]);

        this.selectionSubscription = selectionService.events.subscribe(event => {
            if(event.type === SelectionEventType.SELECT || SelectionEventType.UNSELECT) {
                const records = selectionService.getSelectedItems() as Record[];
                this.updateDataset(records);
                this.provider.next(this.dataset);
            }
        });
    }

    // NetworkProvider interface

    onDestroy() {
        this.selectionSubscription?.unsubscribe();
    }

}
    