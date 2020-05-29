import {Injectable, Inject, InjectionToken, Type, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {UserSettingsWebService, AuditEvent, AuditEvents} from "@sinequa/core/web-services";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {SelectionService} from "@sinequa/components/selection";
import {Action} from "@sinequa/components/action";
import {SearchService} from "@sinequa/components/search";

// Basket interface (from models/UserSettings)
export interface Basket {
    name: string;
    description?: string;
    ids?: string[];
}


// Audit Events (from models/Audit)
export const enum BasketEventType {
    Loaded = "Basket_Loaded",
    Add = "Basket_Add",
    Delete = "Basket_Delete",
    DeleteAll = "Basket_DeleteAll",
    Update = "Basket_Update",
    Rename = "Basket_Rename",

    AddDoc = "Basket_AddDoc",
    RemoveDoc = "Basket_RemoveDoc",
    Open = "Basket_Open",
    ExportCSV = "Basket_ExportCSV",
    Patched = "Basked_Patched"
}


// Types of events triggering a change event
export const BASKET_CHANGE_EVENTS = [
    BasketEventType.Loaded,
    BasketEventType.Add,
    BasketEventType.Delete,
    BasketEventType.DeleteAll,
    BasketEventType.Update,
    BasketEventType.Rename
];


// CRUD Events
export interface BasketChangeEvent {
    type: BasketEventType;
    basket?: Basket;
}


// Model expected by the SelectBasket Modal.
// The filter allows to filter out baskets from the complete list
export interface SelectBasketModel {
    basket: Basket | undefined;
    basketFilter?: (basket: Basket) => boolean;
    allowNew?: boolean;
}

// Model expected by the ManageBaskets Modal.
export interface ManageBasketsModel {
    baskets: Basket[];
    auditEvents?: AuditEvent[];
}


/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *  public static forRoot(): ModuleWithProviders {
        return {
            ngModule: BasketsModule,
            providers: [
                {
                    provide: BASKET_COMPONENTS,
                    useValue: {
                        selectBasketModal: SelectBasket,
                        editBasketModal: EditBasket,
                        manageBasketsModal: ManageBaskets
                    }
                },
                BasketsService
            ]
        };
    }
 */
export interface BasketComponents {
    selectBasketModal: Type<any>;
    editBasketModal: Type<any>;
    manageBasketsModal: Type<any>;
}
export const BASKET_COMPONENTS = new InjectionToken<BasketComponents>('BASKET_COMPONENTS');


@Injectable({
    providedIn: 'root',
})
export class BasketsService implements OnDestroy {

    private readonly _events = new Subject<BasketChangeEvent>();
    private readonly _changes = new Subject<BasketChangeEvent>();

    // An application may want to alter the action (icon, etc.)
    public selectedRecordsAction: Action;

    constructor(
        public userSettingsService: UserSettingsWebService,
        public searchService: SearchService,
        public modalService: ModalService,
        public selectionService: SelectionService,
        @Inject(BASKET_COMPONENTS) public basketComponents: BasketComponents
    ){
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({type: BasketEventType.Loaded});
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(BASKET_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });
        // Register a basket action onto the selection service, so that users can add/remove to/from baskets when documents are selected
        this.selectedRecordsAction = this.buildBasketsAction();
    }

    // GETTERS

    /**
     * Returns the list of this user's baskets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of baskets if it does not already exist.
     */
    public get baskets() : Basket[] {
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["baskets"])
            this.userSettingsService.userSettings["baskets"] = [];
        return this.userSettingsService.userSettings["baskets"];
    }

    /**
     * Triggers any event among BasketChangeEvent
     * (use for fine-grained control of baskets workflow)
     */
    public get events() : Subject<BasketChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of baskets
     * (use to refresh basket menus)
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<BasketChangeEvent> {
        return this._changes;
    }

    /**
     * @returns true if there is at least one basket
     */
    public get hasBasket(): boolean {
        return this.baskets.length > 0;
    }

    /**
     * @returns a basket with the given name or null if it does not exist
     * @param name
     */
    public basket(name: string): Basket | undefined {
        const i = this.basketIndex(name);
        return i>= 0? this.baskets[i] : undefined;
    }

    private basketIndex(name: string): number {
        for (let i = 0, ic = this.baskets.length; i < ic; i++) {
            const basket = this.baskets[i];
            if (basket && basket.name === name) {
                return i;
            }
        }
        return -1;
    }


    // CRUD

    /**
     * Creates a new basket unless it already exists.
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket the basket to create
     * @returns true if basket was created
     */
    public createBasket(basket: Basket) : boolean {

        if(this.basketIndex(basket.name) >= 0)
            return false; // This basket already exists

        this.baskets.unshift(basket);
        this.events.next({type : BasketEventType.Add, basket: basket});
        this.patchBaskets([{
            type: BasketEventType.Add,
            detail: {
                basket: basket.name
            }
        }]);
        return true;
    }

    /**
     * Update the basket at the given index, unless a basket with the same name
     * already exists in the list of baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param basket the basket to update
     * @param index the index at which to update the basket
     * @returns true if basket was updated
     */
    public updateBasket(basket: Basket, index : number) : boolean {

        const prevIndex = this.basketIndex(basket.name);
        if(prevIndex !== -1 && index !== prevIndex)
            return false; // A basket with the same name exists at a different index

        if(index >= 0 && index < this.baskets.length){

            this.baskets.splice(index, 1, basket);
            this.events.next({type : BasketEventType.Update, basket: basket});
            this.patchBaskets([
                {
                    type: BasketEventType.Update,
                    detail: {
                        basket: basket.name
                    }
                }
            ]);
            return true;

        }
        return false;   // This basket does not exist
    }

    /**
     * Updates the full list of Baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param baskets the new list of baskets
     * @param auditEvents the list of audit events to log
     */
    public updateBaskets(baskets: Basket[], auditEvents?: AuditEvents) : boolean {
        Utils.arraySet(this.baskets, baskets);
        this.events.next({type : BasketEventType.Update});
        this.patchBaskets(auditEvents);
        return true;
    }

    /**
     * Deletes the given Basket (based on its name)
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket
     * @returns true if basket was deleted
     */
    public deleteBasket(basket: Basket) : boolean {

        const index = this.basketIndex(basket.name);

        if(index === -1)
            return false; // Nothing to delete

        this.baskets.splice(index, 1);
        this.events.next({type : BasketEventType.Delete, basket: basket});
        this.patchBaskets([
            {
                type: BasketEventType.Delete,
                detail: {
                    savedquery: basket.name
                }
            }
        ]);
        return true;
    }

    /**
     * Adds one or more documents to a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket to which to add the document(s)
     * @param ids id(s) of the document(s) to add to the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was added
     */
    public addToBasket(name: string, ids: string | string[], skipPatch?: boolean): boolean {
        if (!ids) {
            return false;
        }
        const basket = this.basket(name);
        if (!basket) return false;
        if (!basket.ids) basket.ids = [];
        if (Utils.isArray(ids)) {
            for (let i = 0, ic = ids.length; i < ic; i++) {
                const id = ids[i];
                if (basket.ids.indexOf(id) === -1) {
                    basket.ids.push(id);
                }
            }
        }
        else {
            if (basket.ids.indexOf(<string>ids) === -1) {
                basket.ids.push(<string>ids);
            }
        }
        if(!skipPatch){
            this.events.next({type : BasketEventType.AddDoc});
            this.patchBaskets({
                type: BasketEventType.AddDoc,
                detail: {
                    basket: name,
                    "doc-id": basket.ids[0]
                }
            });
        }
        return true;
    }

    /**
     * Removes one or more documents from a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket from which to remove the document(s)
     * @param ids id(s) of the document(s) to remove from the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was removed
     */
    public removeFromBasket(name: string, ids: string | string[], skipPatch?: boolean): boolean {
        if (!ids) {
            return false;
        }
        const basket = this.basket(name);
        if (!basket) return false;
        if (!basket.ids) basket.ids = [];
        if (Utils.isArray(ids)) {
            for (let i = 0, ic = ids.length; i < ic; i++) {
                const id = ids[i];
                const index = basket.ids.indexOf(id);
                if (index !== -1) {
                    basket.ids.splice(index, 1);
                }
            }
        }
        else {
            const index = basket.ids.indexOf(<string>ids);
            if (index !== -1) {
                basket.ids.splice(index, 1);
            }
        }
        if(!skipPatch){
            this.events.next({type : BasketEventType.RemoveDoc});
            this.patchBaskets({
                type: BasketEventType.RemoveDoc,
                detail: {
                    basket: name,
                    "doc-id": basket.ids[0]
                }
            });
        }
        return true;
    }

    /**
     * Removes a document from all the baskets
     * @param id id of the document to remove
     */
    public removeFromAllBaskets(id: string) : boolean {
        const auditEvents: AuditEvent[] = [];
        for (const basket of this.baskets) {
            if( this.removeFromBasket(basket.name, id, true) ){
                auditEvents.push({
                    type: BasketEventType.RemoveDoc,
                    detail: {
                        basket: basket.name,
                        "doc-id": id
                    }
                });
            }
        }
        this.events.next({type : BasketEventType.RemoveDoc});
        this.patchBaskets(auditEvents);
        return true;
    }


    /**
     * Updates Baskets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchBaskets(auditEvents?: AuditEvents) {
        return this.userSettingsService.patch({baskets: this.baskets}, auditEvents)
            .subscribe(
                next => {
                    this.events.next({type: BasketEventType.Patched});
                },
                error => {
                    console.error("Could not patch Baskets!", error);
            });
    }




    // EVENT HANDLERS (Menus)

    /**
     * Uses the SearchService to perform a search returning all
     * the documents in this basket
     * @param basket
     * @param path
     * @returns the search service promise
     */
    public searchBasket(basket : Basket, path?: string) : Promise<boolean> {
        const query = this.searchService.makeQuery();
        query.basket = basket.name;
        this.searchService.setQuery(query);
        this.events.next({type: BasketEventType.Open, basket: basket});
        return this.searchService.search({ path: path }, {
            type: BasketEventType.Open,
            detail: {
                basket: basket.name
            }
        });
    }

    /**
     * Opens a dialog allowing a user to add one (or more) document(s)
     * to a basket.
     * @param ids id(s) of the documents to add to a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was added to a basket
     */
    public addToBasketModal(ids: string | string[], recordBaskets?: string[])
            : Promise<boolean> {
        const model : SelectBasketModel = {
            basket: undefined,
            basketFilter: recordBaskets? b => !recordBaskets.includes(b.name) : undefined,
            allowNew: true
        };
        return this.modalService
            .open(this.basketComponents.selectBasketModal, {model: model})
            .then(result => {
                if (result === ModalResult.OK && model.basket) {
                    return this.addToBasket(model.basket.name, ids);
                }
                return false;
            });
    }

    /**
     * Opens a dialog allowing a user to remove one (or more) document(s)
     * from a basket.
     * @param ids id(s) of the documents to remove from a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was removed from a basket
     */
    public removeFromBasketModal(ids: string | string[], recordBaskets?: string[])
            : Promise<boolean> {
        const model : SelectBasketModel = {
            basket: undefined,
            basketFilter: recordBaskets? b => recordBaskets.includes(b.name) : undefined
        };
        return this.modalService
            .open(this.basketComponents.selectBasketModal, {model: model})
            .then(result => {
                if (result === ModalResult.OK && model.basket) {
                    return this.removeFromBasket(model.basket.name, ids);
                }
                return false;
            });
    }

    /**
     * Opens a dialog allowing a user to create new basket.
     * @param model the initial basket object model
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the basket was created.
     */
    public createBasketModal(model: Basket = {name: ""}) : Promise<boolean> {

        return this.modalService.open(this.basketComponents.editBasketModal, {model: model})
            .then((result) => {

                if (result === ModalResult.OK) {
                    const index = this.basketIndex(model.name);
                    if (index !== -1) {

                        return this.modalService.yesNo("msg#baskets.basketAlreadyExists")
                            .then((result) => {
                                if (result === ModalResult.Yes) {
                                    return this.updateBasket(model, index);
                                }
                                return false;
                            });

                    }
                    else {

                        return this.createBasket(model);

                    }
                }

                return false;
            });
    }

    // Not relevant as of now
    // public editBasketModal(basket: Basket)

    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of baskets.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    public manageBasketsModal() : Promise<boolean> {

        const model: ManageBasketsModel = { baskets: Utils.copy(this.baskets) };

        return this.modalService.open(this.basketComponents.manageBasketsModal, {model: model})
            .then((result) => {
                if (result === ModalResult.OK) {
                    return this.updateBaskets(model.baskets, model.auditEvents);
                }
                return false;
            });

    }


    private buildBasketsAction() : Action {
        return new Action({
            icon: "fas fa-shopping-basket",
            title: "msg#baskets.baskets",
            hidden: true,
            children: [
                new Action({
                    text: "msg#baskets.addToBasket",
                    action: (item, $event) => {
                        this.addToBasketModal(this.selectionService.getSelectedIds());
                    }
                }),
                new Action({
                    text: "msg#baskets.removeFromBasket",
                    action: (item, $event) => {
                        this.removeFromBasketModal(this.selectionService.getSelectedIds());
                    }
                })
            ],
            updater: (action) => {
                action.hidden = !this.selectionService.haveSelectedRecords;
            }
        });
    }

    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
