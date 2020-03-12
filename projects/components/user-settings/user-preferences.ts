import { Injectable } from '@angular/core';
import { UserSettingsWebService, UserSettings } from '@sinequa/core/web-services';

/**
 * The role of this service is to bundle together the simple preferences of
 * the user and synchronise them with the user settings.
 * 
 * Usage:
 * this.userPreferences.get("foo")
 * this.userPreferences.set("foo", "bar")
 * this.userPreferences.sync()
 */
@Injectable({
    providedIn: "root"
})
export class UserPreferences {

    constructor(
        private userSettingsService: UserSettingsWebService
    ) {
    }

    private get prefs(): any {
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["prefs"])
            this.userSettingsService.userSettings["prefs"] = {};
        return this.userSettingsService.userSettings["prefs"];
    }

    public get(property: string) {
        return this.prefs[property];
    }

    public set(property: string, value: any, noSync?: boolean) {
        this.prefs[property] = value;
        if(!noSync){
            this.sync();
        }
    }

    public sync(){
        this.userSettingsService.patch(<UserSettings>{prefs: this.prefs});
    }
    
}