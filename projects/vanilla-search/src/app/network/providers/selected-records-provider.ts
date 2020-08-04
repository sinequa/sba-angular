import { Subscription } from 'rxjs';
import { Record } from '@sinequa/core/web-services';
import { SelectionService, SelectionEventType } from '@sinequa/components/selection';
import { NodeType, NetworkContext } from '../network-models';
import { RecordsProvider, StructuralEdgeType } from './records-provider';

export class SelectedRecordsProvider extends RecordsProvider {

    selectionSubscription: Subscription;

    constructor(
        protected nodeType: NodeType,
        protected edgeTypes: StructuralEdgeType[],
        protected selectionService: SelectionService,
        protected hideRecordNode = false,
        public name = "Selected documents"
    ){
        super(nodeType, edgeTypes, selectionService.getSelectedItems() as Record[], hideRecordNode, name);

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
    