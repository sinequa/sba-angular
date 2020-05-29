import {Injectable, OnDestroy, InjectionToken, Inject} from "@angular/core";
import {Subject} from "rxjs";
import {Record} from "@sinequa/core/web-services";
import {Action} from "@sinequa/components/action";
import {SearchService} from "@sinequa/components/search";

export enum SelectionEventType {
    SELECT,
    UNSELECT,
    MOVE
}

export interface SelectionEvent {
    type: SelectionEventType;
    records: Record[];
    source?: string;
}

export interface SelectionItem {
    id: string;
}

/**
 * The storage mode allows to customize how the service stores records, 
 * which enables different features:
 * - id: only store the id of a selected record (default)
 * - record: store the entire record
 * - a function that customize what is stored (at least the record id is required)
 */
export interface SelectionOptions {
    resetOnNewResults: boolean;
    resetOnNewQuery: boolean;
    storage: "id" | "record" | ((record: Record) => SelectionItem);
}

export const defaultSelectionOptions: SelectionOptions = {
    resetOnNewResults: false,
    resetOnNewQuery: true,
    storage: "id"
}

export const SELECTION_OPTIONS = new InjectionToken<SelectionOptions>("SELECTION_OPTIONS");

@Injectable({
    providedIn: 'root',
})
export class SelectionService implements OnDestroy {

    protected readonly selectedRecords: SelectionItem[] = []; // currently selected items
    public readonly selectionActions: Action[] = []; // Actions that other services can register onto this service

    private _events = new Subject<SelectionEvent>();

    public readonly selectedRecordsAction: Action;

    constructor(
        public searchService : SearchService,
        @Inject(SELECTION_OPTIONS) public selectionOptions: SelectionOptions 
    ){

        this.searchService.events.subscribe(event => {

            if(!this.selectionOptions.resetOnNewResults && event.type === "new-results" && this.searchService.haveRecords){

                const newSelectedRecords: Record[] = [];
                if (this.searchService.results && this.searchService.results.records) {
                    for (const record of this.searchService.results.records) {
                        const index = this.selectedRecords.findIndex(item => item.id === record.id);
                        if (index !== -1 && !record.$selected) {
                            record.$selected = true;    // Select previously selected records
                            this.selectedRecords.splice(index, 1, record);
                            newSelectedRecords.push(record);
                        }
                    }
                }
                if(newSelectedRecords.length > 0)   // Menus might need to be refreshed
                    this._events.next({type: SelectionEventType.SELECT, records: newSelectedRecords});

            }

            if(this.selectionOptions.resetOnNewResults && event.type === "new-results") {
                this.clearSelectedRecords();
            }
            
            if(this.selectionOptions.resetOnNewQuery && event.type === "new-query") {
                this.clearSelectedRecords();
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

    private getItem(record: Record): SelectionItem {
        if(this.selectionOptions.storage === "id") {
            return {id: record.id};
        }
        else if(this.selectionOptions.storage === "record") {
            return record;
        }
        else {
            return this.selectionOptions.storage(record);
        }
    }

    /**
     * Returns a copy of the list of selected records
     */
    public getSelectedItems(): SelectionItem[] {
        return this.selectedRecords.slice(0);
    }

    /**
     * Return the list of selected record ids
     */
    public getSelectedIds(): string[] {
        return this.selectedRecords.map(r => r.id);
    }

    /**
     * @returns true if at least one record is selected
     */
    public get haveSelectedRecords(): boolean {
        return this.selectedRecords.length > 0;
    }

    public getSelectedCount(): number {
        return this.selectedRecords.length;
    }

    /**
     * @returns true if all records in the search results are selected
     */
    public get allRecordsSelected(): boolean {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        let allSelected = true;
        for (const record of this.searchService.results.records) {
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
        const newSelectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (const record of this.searchService.results.records) {
                if (!record.$selected) {
                    this.selectedRecords.push(this.getItem(record));
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
        const newUnselectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (const record of this.searchService.results.records) {
                if (record.$selected) {
                    const index = this.selectedRecords.findIndex(item => item.id === record.id);
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
            const index = this.selectedRecords.findIndex(item => item.id === record.id);
            let event : SelectionEvent;
            if (index > -1) {
                this.selectedRecords.splice(index, 1);
                record.$selected = false;
                event = {type: SelectionEventType.UNSELECT, records: [record]};
            }
            else {
                this.selectedRecords.push(this.getItem(record));
                record.$selected = true;
                event = {type: SelectionEventType.SELECT, records: [record]};
            }
            // record might not be the one in the search service results (if passing a SelectionItem)
            const ssRecord = this.searchService.getRecordFromId(record.id);
            if(ssRecord) {
                ssRecord.$selected = record.$selected;
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
     * Moves a selected record to a different index;
     * @param record 
     * @param newIndex 
     */
    public moveSelectedRecord(record: Record, newIndex: number) {
        const i = this.selectedRecords.findIndex(r => r.id === record.id);
        if(i === -1) {
            throw new Error(`Record ${record.id} is not in the selected records`);
        }
        this.selectedRecords.splice(i, 1);
        this.selectedRecords.splice(newIndex, 0, this.getItem(record));
        this.events.next({type: SelectionEventType.MOVE, records: [record]});
    }

    /**
     * Unselect all selected records
     * Emits a SelectionEvent
     */
    public clearSelectedRecords() {
        this.selectedRecords.splice(0);
        const newUnselectedRecords: Record[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (const record of this.searchService.results.records) {
                if(record.$selected){
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
                this.toggleSelectedRecords(undefined, "multiple-selector");
            },
            updater: (item) => {
                item.icon = this.haveSelectedRecords ? "far fa-check-square" : "far fa-square";
                item.title = this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle";
                item.messageParams = {values: {count: this.selectedRecords.length}};
            }
        });
    }
}