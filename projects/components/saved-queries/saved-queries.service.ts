import {Injectable, InjectionToken, Inject, Type, OnDestroy} from "@angular/core";
import { HttpResponse } from '@angular/common/http';
import {Subject, Observable, throwError} from "rxjs";
import {UserSettingsWebService, QueryExportWebService, ExportSourceType, ExportOutputFormat,
    DownloadWebService, AuditEvents, AuditEvent} from "@sinequa/core/web-services";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {AppService, Query} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SelectionService} from "@sinequa/components/selection";
import {SearchService} from "@sinequa/components/search";
import {Action} from '@sinequa/components/action';


export interface SavedQuery {
    name: string;
    description?: string;
    query: Query;
}

// from core/models/audit
export const enum SavedQueryEventType {
    Loaded = "SavedQuery_Loaded",
    Patched = "SavedQuery_Patched",

    Add = "SavedQuery_Add",
    Delete = "SavedQuery_Delete",
    DeleteAll = "SavedQuery_DeleteAll",
    Rename = "SavedQuery_Rename",
    Update = "SavedQuery_Update",

    Search = "Search_SavedQuery"
}

// Types of events triggering a change event
export const SAVED_QUERIES_CHANGE_EVENTS = [
    SavedQueryEventType.Add,
    SavedQueryEventType.Delete,
    SavedQueryEventType.DeleteAll,
    SavedQueryEventType.Rename,
    SavedQueryEventType.Update
];


// CRUD Events
export interface SavedQueryChangeEvent {
    type: SavedQueryEventType;
    savedquery?: SavedQuery;
}


// Model expected by the ManageSavedQueries Modal.
export interface ManageSavedQueriesModel {
    savedQueries: SavedQuery[];
    auditEvents?: AuditEvent[];
}

// Data model of the Export dialog.
export interface ExportQueryModel {
    format: ExportOutputFormat;
    export: ExportSourceType;
    webService: string;
    maxCount?: number;
    queryName?: string;
}

/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *     public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SavedQueriesModule,
            providers: [
                {
                    provide: SAVEDQUERY_COMPONENTS,
                    useValue: {
                        editSavedQueryModal: EditSavedQuery,
                        manageSavedQueriesModal: ManageSavedQueries,
                        exportSavedQueryModal: ExportQuery
                    }
                },
                SavedQueriesService,
                SelectionService
            ]
        };
    }
 *
 */
export interface SavedQueryComponents {
    editSavedQueryModal: Type<any>;
    manageSavedQueriesModal: Type<any>;
    exportSavedQueryModal: Type<any>;
}
export const SAVEDQUERY_COMPONENTS = new InjectionToken<SavedQueryComponents>('SAVEDQUERY_COMPONENTS');


@Injectable({
    providedIn: 'root',
})
export class SavedQueriesService implements OnDestroy {

    private readonly _events = new Subject<SavedQueryChangeEvent>();
    private readonly _changes = new Subject<SavedQueryChangeEvent>();

    // An application may want to alter the action (icon, etc.)
    public selectedRecordsAction: Action;

    constructor(
        public userSettingsService: UserSettingsWebService,
        public searchService: SearchService,
        public modalService: ModalService,
        public appService: AppService,
        public queryExportService: QueryExportWebService,
        public downloadService: DownloadWebService,
        public selectionService: SelectionService,
        @Inject(SAVEDQUERY_COMPONENTS) public savedQueryComponents: SavedQueryComponents
    ){
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({type: SavedQueryEventType.Loaded});
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(SAVED_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });
        // Initialize selection action
        this.selectedRecordsAction = new Action({
            icon: 'fas fa-download',
            title: 'msg#exportQuery.btnTitle',
            action: (_item: Action, _event: Event) => {
                this.exportModal(this.selectionService.haveSelectedRecords
                    ? ExportSourceType.Selection
                    : ExportSourceType.Result);
            },
        });
    }


    // GETTERS

    /**
     * Returns the list of this user's saved queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of saved queries if it does not already exist.
     */
    public get savedqueries() : SavedQuery[]{
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["savedQueries"])
            this.userSettingsService.userSettings["savedQueries"] = [];
        return this.userSettingsService.userSettings["savedQueries"];
    }

    /**
     * Triggers any event among SavedQueryChangeEvent
     * (use for fine-grained control of saved queries workflow)
     */
    public get events() : Subject<SavedQueryChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of saved queries
     * (use to refresh saved queries menus)
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<SavedQueryChangeEvent> {
        return this._changes;
    }

    /**
     * @returns true if there is at least one saved query
     */
    public get hasSavedQuery(): boolean {
        return this.savedqueries.length > 0;
    }

    /**
     * @returns a saved query with the given name or null if it does not exist
     * @param name
     */
    public savedquery(name: string): SavedQuery | undefined {
        const i = this.savedqueryIndex(name);
        return i>= 0? this.savedqueries[i] : undefined;
    }

    private savedqueryIndex(name: string): number {
        for (let i = 0, ic = this.savedqueries.length; i < ic; i++) {
            const savedquery = this.savedqueries[i];
            if (savedquery && savedquery.name === name) {
                return i;
            }
        }
        return -1;
    }



    // CRUD

    /**
     * Creates a new saved query unless it already exists.
     * Emits an savedquery event.
     * Update the data on the server.
     * @param savedquery the savedquery to create
     * @returns true if savedquery was created
     */
    public createSavedQuery(savedquery: SavedQuery) : boolean {

        if(this.savedqueryIndex(savedquery.name) >= 0)
            return false; // This savedquery already exists

        this.savedqueries.unshift(savedquery);
        this.events.next({type : SavedQueryEventType.Add, savedquery: savedquery});
        this.patchSavedQueries([{
            type: SavedQueryEventType.Add,
            detail: {
                savedquery: savedquery.name
            }
        }]);
        return true;
    }

    /**
     * Update the saved query at the given index, unless a saved query with the same name
     * already exists in the list of saved queries.
     * Emits an Saved Query event.
     * Update the data on the server.
     * @param savedquery the saved query to update
     * @param index the index at which to update the saved query
     * @returns true if saved query was updated
     */
    public updateSavedQuery(savedquery: SavedQuery, index : number) : boolean {

        const prevIndex = this.savedqueryIndex(savedquery.name);
        if(prevIndex !== -1 && index !== prevIndex)
            return false; // A saved query with the same name exists at a different index

        if(index >= 0 && index < this.savedqueries.length){

            this.savedqueries.splice(index, 1, savedquery);
            this.events.next({type : SavedQueryEventType.Update, savedquery: savedquery});
            this.patchSavedQueries([
                {
                    type: SavedQueryEventType.Update,
                    detail: {
                        savedquery: savedquery.name
                    }
                }
            ]);
            return true;

        }
        return false;   // This saved query does not exist
    }

    /**
     * Updates the full list of saved queries.
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedqueries the new list of saved queries
     * @param auditEvents the list of audit events to log
     */
    public updateSavedQueries(savedqueries : SavedQuery[], auditEvents?: AuditEvents) : boolean {
        Utils.arraySet(this.savedqueries, savedqueries);
        this.events.next({type : SavedQueryEventType.Update});
        this.patchSavedQueries(auditEvents);
        return true;
    }

    /**
     * Deletes the given SavedQuery (based on its name)
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedquery
     * @returns true if saved query was deleted
     */
    public deleteSavedQuery(savedquery: SavedQuery) : boolean {

        const index = this.savedqueryIndex(savedquery.name);

        if(index === -1)
            return false; // Nothing to delete

        this.savedqueries.splice(index, 1);
        this.events.next({type : SavedQueryEventType.Delete, savedquery: savedquery});
        this.patchSavedQueries([
            {
                type: SavedQueryEventType.Delete,
                detail: {
                    savedquery: savedquery.name
                }
            }
        ]);
        return true;
    }

    /**
     * Sets this saved query to the current search context, using the search service
     */
    public setSavedQueryToCurrentQuery(savedquery: SavedQuery){
        savedquery.query = Query.copy(this.searchService.query);
    }

    /**
     * Updates Saved Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchSavedQueries(auditEvents?: AuditEvents) {
        return this.userSettingsService.patch({savedQueries: this.savedqueries}, auditEvents)
            .subscribe(
                next => {
                    this.events.next({type: SavedQueryEventType.Patched});
                },
                error => {
                    console.error("Could not patch Saved queries!", error);
                }
            );
    }


    public rssHref(item: SavedQuery) {
        return Utils.addSearchParams(this.appService.appWebService.makeUrl("query.rss"),
            {
                app: this.appService.appName,
                name: item.name
            });
    }


    public hasRssEnabled(): boolean {
        return !!this.appService.app && !!this.appService.app.queryRssEnabled;
    }


    /**
     * Checks if there is a configuration for the export web service.
     *
     * @returns true if there is a configuration for the export web service.
     */
    public hasExportConfig(): boolean {
        return !!this.appService.app && !!this.appService.app.queryExport;
    }


    public download(model : ExportQueryModel): Observable<HttpResponse<Blob>> {
        return this.downloadService.download(this.requestExport(model));
    }

    private requestExport(model: ExportQueryModel): Observable<HttpResponse<Blob>> {
        switch (model.export) {
            case ExportSourceType.Result:
                return this.queryExportService.exportResult(
                    model.webService,
                    this.searchService.query,
                    this.searchService.results,
                    model.format,
                    model.maxCount);
            case ExportSourceType.Selection:
                return this.queryExportService.exportSelection(
                    model.webService,
                    this.searchService.query,
                    this.searchService.results,
                    this.selectionService.getSelectedIds(),
                    model.format,
                    model.maxCount);
            case ExportSourceType.SavedQuery:
                return this.queryExportService.exportSavedQuery(
                    model.webService,
                    model.queryName || "",
                    model.format,
                    model.maxCount);
            default:
                console.log(
                    'QueryExporter.export unexpected export type: ',
                    ExportSourceType[model.export]);
                return throwError('QueryExporter.export unexpected export type: ');
        }
    }




    // EVENT HANDLERS (Menus)

    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this saved query.
     * @param saved query
     * @returns the search service promise
     */
    searchSavedQuery(savedquery: SavedQuery, path?: string): Promise<boolean> {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(savedquery.query)));
        this.events.next({type: SavedQueryEventType.Search, savedquery: savedquery});
        return this.searchService.search({ path: path }, {
            type: SavedQueryEventType.Search,
            detail: {
                "saved-query": savedquery.name
            }
        });
    }

    /**
     * Opens a dialog allowing a user to save the current query.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the query was saved.
     */
    createSavedQueryModal(query: Query = this.searchService.query) : Promise<boolean> {
        const savedQuery: SavedQuery = {
            name: "",
            query: Query.copy(query)
        };
        return this.modalService.open(this.savedQueryComponents.editSavedQueryModal, {model: savedQuery})
            .then((result) => {
                if (result === ModalResult.OK) {

                    const index = this.savedqueryIndex(savedQuery.name);
                    if (index !== -1) {

                        return this.modalService.yesNo("msg#savedQueries.savedQueryAlreadyExists")
                            .then((result) => {
                                if (result === ModalResult.Yes) {
                                    return this.updateSavedQuery(savedQuery, index);
                                }
                                return false;
                            });

                    } else {
                        return this.createSavedQuery(savedQuery);
                    }
                }
                return false;
            });
    }

    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of saved queries.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    public manageSavedQueriesModal() : Promise<boolean> {

        const model: ManageSavedQueriesModel = { savedQueries: Utils.copy(this.savedqueries) };

        return this.modalService.open(this.savedQueryComponents.manageSavedQueriesModal, {model})
            .then((result) => {
                if (result === ModalResult.OK) {
                    return this.updateSavedQueries(model.savedQueries, model.auditEvents);
                }
                return false;
            });

    }

    /**
     * Exports a query via a modal dialog.
     *
     * @param exportType type of export to perform (selection, saved query, results)
     * @param savedQuery The saved query
     */
    public exportModal(exportType: ExportSourceType, savedQuery?: SavedQuery)
            : Promise<ModalResult> {

        if (!this.hasExportConfig() || !this.appService.app) {
            return Promise.resolve(ModalResult.Cancel);
        }

        const model: ExportQueryModel = {
            format: ExportOutputFormat.Csv,
            export: exportType,
            webService: this.appService.app.queryExport
        };

        if (savedQuery && exportType === ExportSourceType.SavedQuery) {
            model.queryName = savedQuery.name;
        }

        return this.modalService.open(this.savedQueryComponents.exportSavedQueryModal, {model});
    }


    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
