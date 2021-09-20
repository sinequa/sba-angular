import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Results, Record } from '@sinequa/core/web-services';
import { SelectionService } from '@sinequa/components/selection';

@Component({
    selector: 'sq-slide-list',
    templateUrl: './slide-list.component.html',
    styleUrls: ['./slide-list.component.scss']
})
export class SlideListComponent {
    @Input() results: Results;
    @Input() selectedRecord: Record;
    @Input() thumbnailColumn: string;
    @Input() colClass = "col-6";

    /** Event emitters for keyboard navigation in the results list */
    @Output() recordSelect = new EventEmitter<{index: number}>();
    @Output() recordKeydown = new EventEmitter<{record: Record, event: KeyboardEvent}>();
    
    constructor(
        public selectionService: SelectionService
    ) {}

    get selectedIndex() {
        return this.selectedRecord ? this.results.records.indexOf(this.selectedRecord) : -1;
    }

    onRecordSelect(index: number) {
        this.recordSelect.next({index});
    }

    onRecordKeydown(record: Record, event: KeyboardEvent) {
        this.recordKeydown.next({record, event});
    }

    onSlideClick(record: Record) {
        this.selectionService.toggleSelectedRecords(record);
    }

}