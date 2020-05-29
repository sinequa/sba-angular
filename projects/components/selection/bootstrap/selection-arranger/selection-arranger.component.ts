import { Component, ContentChild, TemplateRef, Input, Output, EventEmitter } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Record } from "@sinequa/core/web-services";
import { SearchService } from '@sinequa/components/search';
import { SelectionService, SelectionItem } from '../../selection.service';

@Component({
    selector: "sq-selection-arranger",
    templateUrl: "./selection-arranger.component.html",
    styleUrls: ["./selection-arranger.component.scss"]
})
export class BsSelectionArranger {

    /**
     * If a list of records is supplied it is used to display and rearrange the list of records.
     * If this list is not supplied, the SelectionService list of items is used instead.
     */
    @Input() records?: Record[];

    /**
     * A template must be passed by transclusion to display each record in the selection
     */
    @ContentChild(TemplateRef, {static: false}) recordTpl: TemplateRef<any>;

    /**
     * Triggers event when the user moves or removes a record in the list.
     */
    @Output() change = new EventEmitter<SelectionItem[]>();

    constructor(
        public searchService: SearchService,
        public selectionService: SelectionService
    ) {
    }

    getRecords(): SelectionItem[] {
        return this.records || this.selectionService.getSelectedItems();
    }

    dropRecord(event: CdkDragDrop<string[]>) {
        if (event.isPointerOverContainer) { //https://material.angular.io/cdk/drag-drop/api#CdkDragExit
            if(this.records) {
                moveItemInArray(this.records, event.previousIndex, event.currentIndex); // Reorder the items when item dragged inside the drop zone
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.moveSelectedRecord(record as Record, event.currentIndex);
            }
        }
        else {
            if(this.records) {
                this.records.splice(event.previousIndex, 1);
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.toggleSelectedRecords(record as Record, "selection-arranger");
            }
        }
        this.change.next(this.getRecords());
    }

    removeRecord(record: Record) {
        if(this.records) {
            this.records.splice(this.records.indexOf(record), 1);
        }
        else {
            this.selectionService.toggleSelectedRecords(record, "selection-arranger");
        }
        this.change.next(this.getRecords());
    }
}