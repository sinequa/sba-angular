import {Injectable, Optional, OnDestroy, Inject, InjectionToken} from "@angular/core";
import {Subject} from "rxjs";
import {UserSettingsWebService, AuditEvents, Record} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";
import {Utils} from "@sinequa/core/base";


export interface RecentDocument {
    /**
     * Fields from Record that we want to store/display/index for recent documents
     */
    id: string;
    title: string;
    url1: string;
    treepath: string[];
    docformat: string;
    authors: string[];

    /**
     * Date at which the document was last opened
     */
    date: Date;

    /**
     * Store whether the doc was opened in the preview or directly via url
     */
    original: boolean;
}


// from core/models/audit
export const enum RecentDocumentEventType {
    Loaded = "RecentDocument_Loaded",
    Patched = "RecentDocument_Patched",
    Add = "RecentDocument_Add",
    Update = "RecentDocument_Update",
    Delete = "RecentDocument_Delete",
    Search = "Search_RecentDocument"
}

// Types of events triggering a change event
export const RECENT_DOCUMENTS_CHANGE_EVENTS = [
    RecentDocumentEventType.Add,
    RecentDocumentEventType.Update,
    RecentDocumentEventType.Delete,
];


// CRUD Events
export interface RecentDocumentChangeEvent {
    type: RecentDocumentEventType;
    recentdocument?: RecentDocument;
}

export const MAX_DOCUMENTS = new InjectionToken("MAX_DOCUMENTS");

@Injectable({
    providedIn: 'root',
})
export class RecentDocumentsService implements OnDestroy {

    private readonly _events = new Subject<RecentDocumentChangeEvent>();
    private readonly _changes = new Subject<RecentDocumentChangeEvent>();

    constructor(
        public userSettingsService: UserSettingsWebService,
        public searchService: SearchService,
        @Optional() @Inject(MAX_DOCUMENTS) private maxDocuments: number,
    ){
        if(!this.maxDocuments){
            this.maxDocuments = 20;
        }

        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Revive dates
            this.recentdocuments.forEach(rd => {
                if (Utils.isString(rd.date)) {
                    const date = Utils.toDate(rd.date);
                    if (date) {
                        rd.date = date;
                    }
                }
            });
            // ==> Menus need to be rebuilt
            this.events.next({type: RecentDocumentEventType.Loaded});
        });

        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(RECENT_DOCUMENTS_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });

        /**
         * Subscribe to the search service to capture "open-original-document" event
         * and add documents to this service
         */
        this.searchService.events.subscribe(event => {
            if(event.type === "open-original-document" && event.record){
                this.addDocument(event.record, true);
            }
        });
    }


    // GETTERS

    /**
     * Returns the list of this user's recent documents.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent documents if it does not already exist.
     */
    public get recentdocuments() : RecentDocument[]{
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["recentDocuments"])
            this.userSettingsService.userSettings["recentDocuments"] = [];
        return this.userSettingsService.userSettings["recentDocuments"];
    }

    /**
     * Triggers any event among RecentDocumentChangeEvent
     * (use for fine-grained control of recent documents workflow)
     */
    public get events() : Subject<RecentDocumentChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of recent documents
     * (use to refresh recent documents menus)
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<RecentDocumentChangeEvent> {
        return this._changes;
    }

    /**
     * @returns true if there is at least one recent document
     */
    public get hasRecentDocument(): boolean {
        return this.recentdocuments.length > 0;
    }

    /**
     * @returns a recent document with the given name or null if it does not exist
     * @param name
     */
    public recentdocument(text: string): RecentDocument | undefined {
        const i = this.recentdocumentIndex(text);
        return i>= 0? this.recentdocuments[i] : undefined;
    }

    private recentdocumentIndex(id: string): number {
        for (let i = 0, ic = this.recentdocuments.length; i < ic; i++) {
            const recentdocument = this.recentdocuments[i];
            if (recentdocument && recentdocument.id === id) {
                return i;
            }
        }
        return -1;
    }

    private comparator(q1: RecentDocument, q2: RecentDocument){
        return q2.date.getTime() - q1.date.getTime();
    }


    // CRUD

    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param record Record to add to the service
     * @param original Whether the original doc was opened or the preview
     * @returns true if recentdocument was created
     */
    public addDocument(record: Record, original: boolean) {
        if(record){
            return this.addRecentDocument({
                id: record.id,
                title: record.title,
                url1: record.url1,
                treepath: record.treepath,
                docformat: record.docformat,
                authors: record.authors,

                date: new Date(),
                original: original
            });
        }
        return false;
    }

    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param recentdocument the recentdocument to create
     * @returns true if recentdocument was created
     */
    public addRecentDocument(recentdocument: RecentDocument) : boolean {

        if(!recentdocument.id){
            return false;
        }

        const i = this.recentdocumentIndex(recentdocument.id); // If the document already exists
        if(i >= 0){
            this.recentdocuments[i].date = recentdocument.date; // Update the date of the existing document
            this.events.next({type : RecentDocumentEventType.Update, recentdocument: this.recentdocuments[i]});
        }
        else {
            this.recentdocuments.push(recentdocument);
            this.events.next({type : RecentDocumentEventType.Add, recentdocument: recentdocument});
        }

        // Sort the list
        this.recentdocuments.sort(this.comparator);

        // Truncate the list
        if(this.maxDocuments >=0 )
            this.recentdocuments.splice(this.maxDocuments);

        this.patchRecentDocuments([{
            type: RecentDocumentEventType.Add,
            detail: {
                recentdocument: recentdocument.id
            }
        }]);
        return true;
    }

    /**
     * Deletes the given RecentDocument (based on its name)
     * Emits an RecentDocument event.
     * Update the data on the server.
     * @param recentdocument
     * @returns true if recent document was deleted
     */
    public deleteRecentDocument(recentdocument: RecentDocument) : boolean {

        const index = this.recentdocumentIndex(recentdocument.id);

        if(index === -1)
            return false; // Nothing to delete

        this.recentdocuments.splice(index, 1);
        this.events.next({type : RecentDocumentEventType.Delete, recentdocument: recentdocument});
        this.patchRecentDocuments([
            {
                type: RecentDocumentEventType.Delete,
                detail: {
                    recentdocument: recentdocument.id
                }
            }
        ]);
        return true;
    }

    /**
     * Updates Recent Documents in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchRecentDocuments(auditEvents?: AuditEvents) {
        return this.userSettingsService.patch({recentDocuments: this.recentdocuments}, auditEvents)
            .subscribe(
                next => {
                    this.events.next({type: RecentDocumentEventType.Patched});
                },
                error => {
                    console.error("Could not patch Recent documents!", error);
                }
            );
    }


    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}