import {Injectable, Inject, OnDestroy} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";
import {AuditEvents} from "./audit.web.service";
import jstz from "jstz";

/**
 * Minimal built-in user settings. Can be extended in the context of
 * complex applications to store user data, preferences, objects, etc.
 */
export interface UserSettings {
    language?: string;
    skipCount?: number;
    email?: string;
    [key: string]: any;
}

/**
 * A base event from which all events that can be issued by the {@link UserSettingsWebService} are derived
 */
export interface UserSettingsEvent {
    type: "changed";
}

/**
 * This event is fired each time the [userSettings]{@link UserSettingsWebService#userSettings} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 */
export interface UserSettingsChangedEvent extends UserSettingsEvent {
    type: "changed";
}

/**
 * A service for calling the usersettings web service 
 */
@Injectable({
    providedIn: "root"
})
export class UserSettingsWebService extends HttpService implements OnDestroy {
    private _userSettings: UserSettings | undefined;
    /**
     * The timezone for the user
     */
    timezone: string;
    /**
     * A reviver function that, if set, will be called on the user settings when they are loaded
     */
    reviver: (us: UserSettings) => void;
    private _events = new Subject<UserSettingsChangedEvent>();

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
        this.timezone = jstz.determine().name(); // until momentjs gets this
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * The observable events emitted by this service
     */
    get events(): Observable<UserSettingsChangedEvent> {
        return this._events;
    }

    /**
     * Gets the current {@link UserSettings}
     */
    get userSettings(): UserSettings | undefined {
        return this._userSettings;
    }

    /**
     * Sets the current {@link UserSettings} and issues the "changed" event
     */
    set userSettings(value: UserSettings | undefined) {
        this._userSettings = value;
        this._events.next({type: "changed"});
    }

    //TODO remove
    public getUserSettings(): UserSettings | undefined{
        return this.userSettings;
    }

    /**
     * Load the user settings for the currently logged in user.
     * Sets the userSettings member and issues the "changed" event
     */
    public load(): Observable<UserSettings> {
        let observable = this.httpClient.get<UserSettings>(this.makeUrl("usersettings"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable,
            (response) => {
                this.userSettings = response;
                if (this.userSettings) {
                    if (this.reviver) {
                        this.reviver(this.userSettings);
                    }
                }
            },
            (error) => {
                console.log("userSettingsService.load failure - error: ", error);
            });
        return observable;
    }

    /**
     * Saves the current user settings on the server
     * 
     * @param auditEvents 
     */
    public save(auditEvents?: AuditEvents): Observable<void> {
        let observable = this.httpClient.post<void>(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "save",
            userSettings: this.userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("userSettingsService.save failure - error: ", error);
            });
        return observable;            
    }

    /**
     * Patches the user settings on the server using a partial user settings object. The partial
     * object is used to update the user settings on the server according to [RFC7396]{@link https://tools.ietf.org/html/rfc7396}
     * 
     * @param userSettings The partial user settings
     * @param auditEvents Any associated audit events to store on the server
     */
    public patch(userSettings: UserSettings, auditEvents?: AuditEvents): Observable<void> {
        let observable = this.httpClient.post<void>(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "patch",
            userSettings: userSettings,
            $auditRecord: auditEvents 
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("userSettingsService.patch failure - error: ", error);
            });
        return observable;            
    }

    /**
     * Reads a user setting.
     *
     * @param paths The path to the setting in the JSON.
     */
    public readUserSetting(paths: string[]): any {
        let json: any = this.userSettings;
        if (json) {
            for (const path of paths) {
                json = json[path];
                if (!json) {
                    // Value does not exist yet
                    return undefined;
                }
            }
        }
        return json;
    }
}
