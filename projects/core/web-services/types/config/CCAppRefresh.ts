import { CCApp } from ".";

/**
 * Defines the object returned by a call to [AppWebService.refresh]{@link AppWebService#refresh}. If the upToDate
 * member is false then the app member contains the latest version of the app configuration
 */

export interface CCAppRefresh {
    upToDate: boolean;
    app?: CCApp;
}
