import { Subject, Observable } from "rxjs";

import { Injectable, OnDestroy } from "@angular/core";

import { Utils } from "@sinequa/core/base";

import { HttpService } from "./http.service";
import { AuditEventType, AuditEvents } from "./types";

type StringWithAutocomplete<T> = T | (string & Record<never, never>);
type UserSettingsKeys = StringWithAutocomplete<keyof UserSettingsBase>;

type UserSettingsBase = {
    language?: string,
    skipCount?: number,
    email?: string
}
/**
 * Minimal built-in user settings. Can be extended in the context of
 * complex applications to store user data, preferences, objects, etc.
 */
export type UserSettings = UserSettingsBase & Record<string, any>

/**
 * A base event from which all events that can be issued by the {@link UserSettingsWebService} are derived
 */


export type UserSettingsChangedEvent = {
    type: "changed"
}
export type UserSettingsLoadEvent = {
    type: "load"
}
export type UserSettingsResetEvent = {
    type: "reset"
}
/**
 * This event is fired each time the [userSettings]{@link UserSettingsWebService#userSettings} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 */
export type UserSettingsEvent = UserSettingsChangedEvent | UserSettingsLoadEvent | UserSettingsResetEvent;


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
    private _events = new Subject<UserSettingsEvent>();

    constructor() {
        super();
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * The observable events emitted by this service
     */
    get events(): Observable<UserSettingsEvent> {
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
        this._events.next({ type: "changed" });
    }

    /**
     * @deprecated use "userSettings" get property to retrieve the user settings
     * @returns User settings object or undefined
     */
    public getUserSettings(): UserSettings | undefined {
        return this.userSettings;
    }

    /**
     * Load the user settings for the currently logged in user.
     * Sets the userSettings member and issues the "changed" event
     */
    public load(): Observable<UserSettings> {
        const observable = this.httpClient.get<UserSettings>(this.makeUrl("usersettings"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable,
            (response) => {
                this._events.next({ type: "load" });
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
        const observable = this.httpClient.post<void>(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "save",
            userSettings: this.userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable,
            (response) => response,
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
        const observable = this.httpClient.post<void>(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "patch",
            userSettings: userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable,
            (response) => response,
            (error) => {
                console.log("userSettingsService.patch failure - error: ", error);
            });
        return observable;
    }

    /**
     * Resets User Settings (emits a change event and audit events).
     */
    public reset(): Observable<void> {
        // Save current state
        const currentState = this.userSettings;
        // Reset User settings (and emit an event!)
        this.userSettings = {};
        const observable = this.save({
            type: AuditEventType.UserSettings_Reset
        });
        observable.subscribe({
            next: () => this._events.next({ type: "reset" }),
            error: () => this.userSettings = currentState // Restore previous state
        })
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

    /**
     * Sets the value of a user setting key.
     * @param key The key of the user setting to set.
     * @param value The value to set for the user setting.
     * @template T The type of the value to set.
     */
    public set<T>(key: UserSettingsKeys, value: T[]) {
        const setting = this.ensuresSettingsKeyExist<T>(key);
        setting.push(...value);
    }

    /**
     * Retrieves the value associated with the specified user settings key.
     * @param key The user settings key to retrieve the value for.
     * @returns The value associated with the specified key.
     */
    public get<T>(key: UserSettingsKeys): T[] {
        return this.ensuresSettingsKeyExist(key);
    }


    /**
     * Ensures that the specified key exists in the user settings object. If the key does not exist,
     * it will be added with an empty array as its value.
     *
     * @template T The type of the value associated with the specified key.
     * @param key The key to ensure exists in the user settings object.
     * @returns The value associated with the specified key.
     */
    private ensuresSettingsKeyExist<T>(key: UserSettingsKeys): T[] {
        if (!this.userSettings) this.userSettings = {};
        if (!this.userSettings[key]) this.userSettings[key] = [];
        return this.userSettings[key];
    }
}
