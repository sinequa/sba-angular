import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Results, Record } from '@sinequa/core/web-services';
import { SelectionService } from '@sinequa/components/selection';

@Component({
    selector: 'sq-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
    @Input() results: Results;
    @Input() selectedRecord: Record;
    @Input() colClass = "col-6";

    /** Event emitters for keyboard navigation in the results list */
    
    constructor(
        public selectionService: SelectionService
    ) {}

    @Output() recordClicked = new EventEmitter<any>();

    onImageClick(record: any) {
        console.log("click in ImageListComponent");
        this.recordClicked.emit(record);
    }
}