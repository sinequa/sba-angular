import { Injectable } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';

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

    /**
     * Returns the value of a property
     * @param property the name of this property
     */
    public get(property: string) {
        return this.prefs[property.toLowerCase()];
    }

    /**
     * Sets the value of a property
     * @param property the name of this property
     * @param value the value
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    public set(property: string, value: any, skipSync?: boolean) {
        this.prefs[property.toLowerCase()] = value;
        if(!skipSync){
            this.sync();
        }
    }

    /**
     * Deletes a given property from the preferences
     * @param property the name of this property
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    public delete(property: string, skipSync?: boolean) {
        this.prefs[property.toLowerCase()] = null;
        if(!skipSync){
            this.sync();
        }
    }

    /**
     * Synchronizes the user preferences with the server
     */
    public sync(){
        this.userSettingsService.patch({prefs: this.prefs});
    }

}