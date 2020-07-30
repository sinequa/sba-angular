import {Injectable, InjectionToken, Inject, Type, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {UserSettingsWebService, AuditEvents, AuditEvent} from "@sinequa/core/web-services";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {Query} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";

// From core/models/usersettings
export namespace Alert {
    export enum Frequency {
        Daily,
        Hourly,
        Immediate,
        Weekly,
        Monthly
    }

    export enum Days {
        None = 0x00,
        Monday = 0x01,
        Tuesday = 0x02,
        Wednesday = 0x04,
        Thursday = 0x08,
        Friday = 0x10,
        Saturday = 0x20,
        Sunday = 0x40,
        AllDays = (Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday),
        WeekDays = (Monday | Tuesday | Wednesday | Thursday | Friday)
    }
}

export interface Alert {
    name: string;
    description?: string;
    query: Query;
    timezone: string;
    timezoneOffset?: string;
    frequency: Alert.Frequency;
    days: Alert.Days;
    interval: number; // every "n"...
    index: number; // day of month
    times: string; //times: number[]; // offsets from 00:00 in milliseconds
    active: boolean;
    combine: boolean;
    respectTabSelection: boolean;
}

// from core/models/audit
export const enum AlertEventType {
    Loaded = "Alert_Loaded",
    Patched = "Alert_Patched",

    Add = "Alert_Add",
    Delete = "Alert_Delete",
    DeleteAll = "Alert_DeleteAll",
    Update = "Alert_Update",

    Search_AlertQuery = "Search_AlertQuery",
}

// Types of events triggering a change event
export const ALERT_CHANGE_EVENTS = [
    AlertEventType.Loaded,
    AlertEventType.Add,
    AlertEventType.Delete,
    AlertEventType.Update
];


// CRUD Events
export interface AlertChangeEvent {
    type: AlertEventType;
    alert?: Alert;
}


// Model expected by the ManageAlerts Modal.
export interface ManageAlertsModel {
    alerts: Alert[];
    auditEvents?: AuditEvent[];
}

/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *  public static forRoot(): ModuleWithProviders<AlertsModule> {
        return {
            ngModule: AlertsModule,
            providers: [
                {
                    provide: ALERT_COMPONENTS,
                    useValue: {
                        editAlertModal: EditAlert,
                        manageAlertsModal: ManageAlerts
                    }
                },
                AlertsService
            ]
        };
    }
 *
 */
export interface AlertComponents {
    editAlertModal: Type<any>;
    manageAlertsModal: Type<any>;
}
export const ALERT_COMPONENTS = new InjectionToken<AlertComponents>('ALERT_COMPONENTS');


@Injectable({
    providedIn: 'root',
})
export class AlertsService implements OnDestroy {

    private readonly _events = new Subject<AlertChangeEvent>();
    private readonly _changes = new Subject<AlertChangeEvent>();

    constructor(
        public userSettingsService: UserSettingsWebService,
        public searchService: SearchService,
        public modalService: ModalService,
        @Inject(ALERT_COMPONENTS) public alertComponents: AlertComponents
    ){
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({type: AlertEventType.Loaded});
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(ALERT_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });
    }

    // GETTERS

    /**
     * Returns the list of this user's alerts.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of alerts if it does not already exist.
     */
    public get alerts() : Alert[]{
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["alerts"])
            this.userSettingsService.userSettings["alerts"] = [];
        return <Alert[]> (<unknown>this.userSettingsService.userSettings["alerts"]);
    } // TODO: remove cast when UserSettings is updated

    /**
     * Triggers any event among AlertChangeEvent
     * (use for fine-grained control of alerts workflow)
     */
    public get events() : Subject<AlertChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of alerts
     * (use to refresh alert menus)
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<AlertChangeEvent> {
        return this._changes;
    }

    /**
     * @returns true if there is at least one alert
     */
    public get hasAlert(): boolean {
        return this.alerts.length > 0;
    }

    /**
     * @returns an alert with the given name or undefined if it does not exist
     * @param name
     */
    public alert(name: string): Alert | undefined {
        const i = this.alertIndex(name);
        return i>= 0? this.alerts[i] : undefined;
    }

    private alertIndex(name: string): number {
        for (let i = 0, ic = this.alerts.length; i < ic; i++) {
            const alert = this.alerts[i];
            if (alert && alert.name === name) {
                return i;
            }
        }
        return -1;
    }


    // CRUD

    /**
     * Creates a new alert unless it already exists.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to create
     * @returns true if alert was created
     */
    public createAlert(alert: Alert) : boolean {

        if(this.alertIndex(alert.name) >= 0)
            return false; // This alert already exists

        this.alerts.unshift(alert);
        this.events.next({type : AlertEventType.Add, alert: alert});
        this.patchAlerts([{
            type: AlertEventType.Add,
            detail: {
                alert: alert.name
            }
        }]);
        return true;
    }

    /**
     * Update the alert at the given index, unless an alert with the same name
     * already exists in the list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to update
     * @param index the index at which to update the alert
     * @returns true if alert was updated
     */
    public updateAlert(alert: Alert, index : number) : boolean {

        const prevIndex = this.alertIndex(alert.name);
        if(prevIndex !== -1 && index !== prevIndex)
            return false; // An alert with the same name exists at a different index

        if(index >= 0 && index < this.alerts.length){

            this.alerts.splice(index, 1, alert);
            this.events.next({type : AlertEventType.Update, alert: alert});
            this.patchAlerts([
                {
                    type: AlertEventType.Update,
                    detail: {
                        alert: alert.name
                    }
                }
            ]);
            return true;

        }
        return false;   // This alert does not exist
    }

    /**
     * Updates the full list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alerts the new list of alerts
     * @param auditEvents the list of audit events to log
     */
    public updateAlerts(alerts : Alert[], auditEvents?: AuditEvents) : boolean {
        Utils.arraySet(this.alerts, alerts);
        this.events.next({type : AlertEventType.Update});
        this.patchAlerts(auditEvents);
        return true;
    }

    /**
     * Deletes the given alert (based on its name)
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert
     * @returns true if alert was deleted
     */
    public deleteAlert(alert: Alert) : boolean {

        const index = this.alertIndex(alert.name);

        if(index === -1)
            return false; // Nothing to delete

        this.alerts.splice(index, 1);
        this.events.next({type : AlertEventType.Delete, alert: alert});
        this.patchAlerts([
            {
                type: AlertEventType.Delete,
                detail: {
                    alert: alert.name
                }
            }
        ]);
        return true;
    }

    /**
     * Sets this alert to the current search context, using the search service
     */
    public setAlertToCurrentQuery(alert: Alert){
        alert.query = Query.copy(this.searchService.query);
    }

    /**
     * Updates Alerts in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchAlerts(auditEvents?: AuditEvents) {
        return this.userSettingsService.patch({alerts: this.alerts}, auditEvents)
            .subscribe(
                next => {
                    this.events.next({type: AlertEventType.Patched});
                },
                error => {
                    console.error("Could not patch Alerts!", error);
                }
            );
    }




    // EVENT HANDLERS (Menus)

    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this alert.
     * @param alert
     * @returns the search service promise
     */
    public searchAlert(alert: Alert) : Promise<boolean> {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(alert.query)));
        this.events.next({type: AlertEventType.Search_AlertQuery, alert: alert});
        return this.searchService.search(undefined, {
            type: AlertEventType.Search_AlertQuery,
            detail: {
                alert: alert.name
            }
        });
    }

    /**
     * Opens a dialog allowing a user to create a new alert.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was created.
     */
    public createAlertModal() : Promise<boolean> {
        const alert: Alert = {
            name: "",
            description: "",
            timezone: this.userSettingsService.timezone,
            query: Query.copy(this.searchService.query),
            frequency: Alert.Frequency.Daily,
            days: Alert.Days.WeekDays,
            interval: 1,
            index: 1,
            times: "9:00",
            active: true,
            combine: true,
            respectTabSelection: false
        };
        return this.modalService.open(this.alertComponents.editAlertModal, {model: alert})
            .then((result) => {
                if (result === ModalResult.OK) {

                    const index = this.alertIndex(alert.name);
                    if (index !== -1) {

                        return this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                            .then((result) => {
                                if (result === ModalResult.Yes) {
                                    return this.updateAlert(alert, index);
                                }
                                return false;
                            });

                    } else {
                        return this.createAlert(alert);
                    }
                }
                return false;
            });
    }

    /**
     * Opens a dialog allowing a user to edit an existing alert.
     * @param alert: The alert to edit
     * @param noUpdate: if true, will not update the server after the edit
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was updated.
     */
    public editAlertModal(alert: Alert, noUpdate?: boolean) : Promise<boolean> {

        const prevName = alert.name;

        return this.modalService.open(this.alertComponents.editAlertModal, {model: alert})
            .then((result) => {

                if (result === ModalResult.OK) {

                    if(noUpdate) return true;

                    const prevIndex = this.alertIndex(prevName);
                    if(prevIndex === -1) return false; // this alert did not exist

                    const index = this.alertIndex(alert.name);
                    if (index !== -1 && index !== prevIndex) {  // An alert with the same (new) name exists

                        return this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                            .then((result) => {
                                if (result === ModalResult.Yes) {
                                    const prevAlert = this.alert(prevName);
                                    if (prevAlert) {
                                        this.deleteAlert(prevAlert); // Remove the alert with old name
                                    }
                                    return this.updateAlert(alert, this.alertIndex(alert.name)); // Update the alert with new name (index might have changed due to delete of old name)
                                }
                                return false;
                            });

                    } else {

                        return this.updateAlert(alert, prevIndex); // Update this alert

                    }
                }

                return false;
            });
    }

    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of alerts.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    public manageAlertsModal() : Promise<boolean> {

        const model: ManageAlertsModel = { alerts: Utils.copy(this.alerts) };

        return this.modalService.open(this.alertComponents.manageAlertsModal, {model})
            .then((result) => {
                if (result === ModalResult.OK) {
                    return this.updateAlerts(model.alerts, model.auditEvents);
                }
                return false;
            });

    }

    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
