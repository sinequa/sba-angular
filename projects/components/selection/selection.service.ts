import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {Record} from "@sinequa/core/web-services";
import {Action} from "@sinequa/components/action";
import {SearchService} from "@sinequa/components/search";

export enum SelectionEventType {
    SELECT,
    UNSELECT
}

export interface SelectionEvent {
    type: SelectionEventType;
    records: Record[];
    source?: string;
}


@Injectable({
    providedIn: 'root',
})
export class SelectionService implements OnDestroy {

    public readonly selectedRecords: string[] = []; // ids of the currently selected records (records not necessarily in results)
    public readonly selectionActions: Action[] = []; // Actions that other services can register onto this service

    private _events = new Subject<SelectionEvent>();

    public readonly selectedRecordsAction: Action;

    constructor(
        public searchService : SearchService
    ){

        this.searchService.events.subscribe(event => {

            if(event.type === "new-results" && this.searchService.haveRecords){
                
                let newSelectedRecords: Record[] = [];
                if (this.searchService.results && this.searchService.results.records) {
                    for (let record of this.searchService.results.records) {
                        if (this.selectedRecords.includes(record.id) && !record.$selected) {
                            record.$selected = true;    // Select previously selected records
                            newSelectedRecords.push(record);
                        }
                    }
                }
                if(newSelectedRecords.length > 0)   // Menus might need to be refreshed
                    this._events.next({type: SelectionEventType.SELECT, records: newSelectedRecords});

            } else if(event.type === "new-query") {

                this.clearSelectedRecords();    // Unless it's a new query

            }

        });

        this.selectedRecordsAction = this.buildSelectRecordsAction();
        this.selectionActions.push(this.selectedRecordsAction);

        this.events.subscribe({next: () => {
            this.selectionActions.forEach(action => action.update());
        }});

    }

    /**
     * Emits an event on any (bulk or single) selection and unselection events
     */
    public get events() : Subject<SelectionEvent> {
        return this._events;
    }

    ngOnDestroy(){
        this._events.complete();
    }
    
    /**
     * @returns true if at least one record is selected
     */
    public get haveSelectedRecords(): boolean {
        return this.selectedRecords.length > 0;
    }

    /**
     * @returns true if all records in the search results are selected
     */
    public get allRecordsSelected(): boolean {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        let allSelected = true;
        for (let record of this.searchService.results.records) {
            if (!record.$selected) {
                allSelected = false;
            }
        }
        return allSelected;
    }

    private selectCurrentRecords() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        let newSelectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (let record of this.searchService.results.records) {
                if (!record.$selected) {
                    this.selectedRecords.push(record.id);
                    newSelectedRecords.push(record);
                    record.$selected = true;
                }
            }
        }
        if(newSelectedRecords.length > 0)
            this._events.next({type: SelectionEventType.SELECT, records: newSelectedRecords});
    }

    private deselectCurrentRecords() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return;
        }
        let newUnselectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (let record of this.searchService.results.records) {
                if (record.$selected) {
                    let index = this.selectedRecords.indexOf(record.id);
                    if (index !== -1) {
                        this.selectedRecords.splice(index, 1);
                        newUnselectedRecords.push(record);
                        record.$selected = false;
                    }
                }
            }
        }
        if(newUnselectedRecords.length > 0)
            this._events.next({type: SelectionEventType.UNSELECT, records: newUnselectedRecords});
    }

    /**
     * Toggles the selection of one record or all those in the results.
     * Emits a SelectionEvent if a record is selected or unselected.
     * @param record if provided, will toggle the selection of this record; if not will toggle all records in results
     */
    public toggleSelectedRecords(record?: Record, source?: string) {
        if (!!record) {
            let index = this.selectedRecords.indexOf(record.id);
            let event : SelectionEvent;
            if (index > -1) {
                this.selectedRecords.splice(index, 1);
                record.$selected = false;
                event = {type: SelectionEventType.UNSELECT, records: [record]};
            }
            else {
                this.selectedRecords.push(record.id);
                record.$selected = true;
                event = {type: SelectionEventType.SELECT, records: [record]};
            }
            if(source){
                event.source = source;
            }
            this._events.next(event);
        }
        else {
            if (this.allRecordsSelected) {
                this.deselectCurrentRecords();
            }
            else {
                this.selectCurrentRecords();
            }
        }
    }

    /**
     * Unselect all selected records
     * Emits a SelectionEvent
     */
    public clearSelectedRecords() {
        this.selectedRecords.splice(0);
        let newUnselectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            if (this.searchService.haveRecords) {
                for (let record of this.searchService.results.records) {
                    record.$selected = false;
                    newUnselectedRecords.push(record);
                }
            }
        }
        if(newUnselectedRecords.length > 0)
            this._events.next({type: SelectionEventType.UNSELECT, records: newUnselectedRecords});
    }
    
    private buildSelectRecordsAction(): Action {
        return new Action({
            icon: "far fa-square",
            text: "msg#resultsSelector.selectDocuments",
            messageParams: {values: {count: this.selectedRecords.length}},
            action: (item, $event) => {
                this.toggleSelectedRecords();
            },
            updater: (item) => {
                item.icon = this.haveSelectedRecords ? "far fa-check-square" : "far fa-square";
                item.title = this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle";
                item.messageParams = {values: {count: this.selectedRecords.length}};
            }
        });
    }
}