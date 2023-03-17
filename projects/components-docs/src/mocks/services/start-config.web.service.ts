import { Injectable, Optional, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import atomic from "atomicjs";
import { Utils } from "@sinequa/core/base";
import { ServerConfig, StartConfig, START_CONFIG } from "@sinequa/core/web-services";
import { START_CONFIG_DATA } from "../data/start-config";

@Injectable({
    providedIn: "root"
})
export class MockStartConfigWebService {
    private static API_PATH = "/api/v1";

    constructor(@Optional() @Inject(START_CONFIG) private startConfig: StartConfig) {
        if (!startConfig) {
            console.error("START_CONFIG must be provided in your app module");
            return;
        }
        this.initStartConfig();
    }

    private getDefaultStartConfig(): StartConfig {
        const startConfig: StartConfig = {};
        const browserUrl = Utils.makeURL(window.location.href);
        let parts = Utils.split(browserUrl.pathname, "/");
        const appSpecifierIndex = parts.findIndex(value => Utils.eqNCN(value, "app", "app-debug"));
        if (appSpecifierIndex !== -1 && appSpecifierIndex < parts.length - 1) {
            const appSpecifier = parts[appSpecifierIndex];
            startConfig.app = parts[appSpecifierIndex + 1];
            startConfig.production = appSpecifier === "app" ? true : false;
            parts = parts.slice(0, appSpecifierIndex);
        }
        startConfig.url = Utils.addUrl(browserUrl.origin, ...parts);
        return startConfig;
    }

    private initStartConfig() {
        const defaultStartConfig = this.getDefaultStartConfig();
        const initialStartConfig = Utils.copy(this.startConfig);
        Utils.extend(this.startConfig, defaultStartConfig, initialStartConfig);
        const browserUrl = Utils.makeURL(window.location.href);
        const url = Utils.makeURL(this.startConfig.url!);
        let apiPath = Utils.addUrl(url.pathname, MockStartConfigWebService.API_PATH);
        let applicationPath = url.pathname;
        const corsActive = url.origin !== browserUrl.origin;
        if (corsActive) {
            apiPath = Utils.addUrl(url.origin, apiPath);
            applicationPath = Utils.addUrl(url.origin, applicationPath);
        }
        this.startConfig.origin = url.origin;
        this.startConfig.applicationPath = applicationPath;
        this.startConfig.apiPath = apiPath;
        this.startConfig.corsActive = corsActive;
        this.startConfig.browserUrl = Utils.addUrl(browserUrl.origin, browserUrl.pathname);
    }

    fetchPreLoginAppConfig(): Observable<StartConfig> {
        return of(START_CONFIG_DATA as any);
    }

    fetchServerConfig(url?: string): Observable<ServerConfig> {
        return Observable.create(observer => {
            if (!url) {
                const _url = Utils.makeURL(window.location.href);
                url = Utils.addUrl(_url.pathname, "sinequa-config.json");
            }
            atomic(url)
                .then(response => {
                    // If the config file is empty or not valid json we'll most likely get a string for data
                    let serverConfig = response.data;
                    if (!Utils.isObject(serverConfig)) {
                        console.warn("invalid sinequa-config.json file");
                        serverConfig = {};
                    }
                    observer.next(serverConfig);
                    observer.complete();
                })
                .catch(error => {
                    console.log("sinequa-config.json not found");
                    observer.next({});
                    observer.complete();
                });
        });
    }
}
