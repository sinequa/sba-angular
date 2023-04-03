import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Observable, of, EMPTY } from "rxjs";
import { Utils } from "@sinequa/core/base";
import { AuditEvents, HttpService, UserSettings, UserSettingsChangedEvent } from "@sinequa/core/web-services";
import { USER_SETTINGS } from "../data/user-settings";

@Injectable({
    providedIn: "root"
})
export class MockUserSettingsWebService extends HttpService implements OnDestroy {
    private _userSettings: UserSettings | undefined;

    timezone: string;

    reviver: (us: UserSettings) => void;
    private _events = new Subject<UserSettingsChangedEvent>();

    constructor() {
        super();
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    ngOnDestroy() {
        this._events.complete();
    }

    get events(): Observable<UserSettingsChangedEvent> {
        return this._events;
    }

    get userSettings(): UserSettings | undefined {
        return this._userSettings;
    }

    set userSettings(value: UserSettings | undefined) {
        this._userSettings = value;
        this._events.next({ type: "changed" });
    }

    public getUserSettings(): UserSettings | undefined {
        return this.userSettings;
    }

    public load(): Observable<UserSettings> {
        const observable = of(USER_SETTINGS);
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

    public save(auditEvents?: AuditEvents): Observable<void> {
        return EMPTY;
    }

    public patch(userSettings: UserSettings, auditEvents?: AuditEvents): Observable<void> {
        return EMPTY;
    }

    public reset() {
        this.userSettings = {};
        return EMPTY;
    }

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
