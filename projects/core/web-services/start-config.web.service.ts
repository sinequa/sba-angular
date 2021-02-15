import {Injectable, InjectionToken, Optional, Inject} from "@angular/core";
import {Observable} from "rxjs";
import atomic from "atomicjs";
import {IProviders} from "ng2-ui-auth";
import {Utils} from "@sinequa/core/base";

/**
 * An {@link InjectionToken} to access the app's {@link StartConfig} instance
 */
export const START_CONFIG = new InjectionToken<StartConfig>("START_CONFIG");

/**
 * Defines members whose values are automatically deduced from direct {@link StartConfig} members
 */
export interface DeducedStartConfig {
    /**
     * The origin of the url used to make Sinequa API calls
     */
    origin?: string;
    /**
     * The application path of the url used to make Sinequa API calls
     */
    applicationPath?: string;
    /**
     * The url in the browser (origin + pathname)
     */
    browserUrl?: string;
    /**
     * The path used to make Sinequa API calls, including any virtual directories.
     * If CORS is active then it will be prefixed by the Sinequa server origin
     */
    apiPath?: string;
    /**
     * A flag indicating whether the app is running in a CORS context.
     */
    corsActive?: boolean;
}

/**
 * Defines members whose values are retrieved from the Sinequa app configuration and that are available prior to user login
 */
export interface PreloginAppConfig {
    /**
     * Specifies which storage should be used to hold the CSRF token used to protect Sinequa API calls against
     * CSRF attacks
     */
    authenticationStorage?: 'session' | 'local';
    /**
     * Contains the available login providers (only used for popup-based login)
     */
    providers?: IProviders;
    /**
     * Contains the OAuth auto login provider
     */
    autoOAuthProvider?: string;
    /**
     * Contains the OAuth auto login provider
     */
    autoSAMLProvider?: string;
    /**
     * A boolean value indicating whether popup-based login should be used
     */
    usePopupForLogin?: boolean;
    /**
     * The URL to be used to display online help
     */
    helpUrl?: string;
    /**
     * A boolean value indicating whether auditing is enabled
     */
    auditEnabled?: boolean;
    /**
     * A boolean value indicating whether ML auditing is enabled
     */
    mlAuditEnabled?: boolean;
    /**
     * The version of Sinequa running on the server
     */
    version?: string;
    /**
     * The date of the version of Sinequa running on the server
     */
    versionDate?: Date;
}

/**
 * Contains start-up configuration for the application. An instance of this object
 * must be provided when registering the {@link WebServicesModule} either by providing the START_CONFIG
 * injection token or by using the [forRoot]{@link WebServicesModule#forRoot} static method.
 *
 * Typically only the members declared directly (url, app, production) should be specified.
 * The other values are either deduced from these members or are retrieved from the Sinequa configuration
 */
export interface StartConfig extends DeducedStartConfig, PreloginAppConfig {
    /**
     * The url of the sinequa server including any virtual directories - defaults to the browser url
     */
    url?: string;
    /**
     * The app name (can be deduced from the browser url when the app is served by Sinequa)
     */
    app?: string;
    /**
     * A flag indicating whether the app is running in production mode or not
     * (can be deduced from the browser url when the app is served by Sinequa)
     */
    production?: boolean;
}

/**
 * Defines Sinequa server configuration that can be held on a web server and retrieved using
 * [StartConfigWebService.fetchServerConfig]{@link StartConfigWebService#fetchServerConfig}
 */
export interface ServerConfig {
    /**
     * The URL of the Sinequa server including any virtual directories
     */
    url?: string;
    /**
     * The name of the application
     */
    app?: string;
}

/**
 * A service to manage the initialization of the app's {@link StartConfig} instance. The service
 * is automatically instantiated by an {@link APP_INITIALIZER} in {@link WebServicesModule} and the
 * initialization is performed in the constructor.
 */
@Injectable({
    providedIn: "root"
})
export class StartConfigWebService {
    private static API_PATH = "/api/v1";

    /**
     * Initializes the injected {@link StartConfig} instance. Outputs an error to the
     * console if no instance is injected.
     *
     * @param startConfig The start configuration instance
     */
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
        let apiPath = Utils.addUrl(url.pathname, StartConfigWebService.API_PATH);
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

    /**
     * Fetches pre-login app configuration from the Sinequa server and merges it
     * into the start config instance
     *
     * @returns An observable of the start config after being merged with the pre-login app configuration
     */
    fetchPreLoginAppConfig(): Observable<StartConfig> {
        return Observable.create(observer => {
            let _url = Utils.addUrl(this.startConfig.apiPath!, "app");
            _url = Utils.addSearchParams(_url, {
                app: this.startConfig.app,
                preLogin: true
            });
            atomic(_url, {
                headers: {
                    "sinequa-force-camel-case": true
                }
            })
                .then(response => {
                    const initialStartConfig = Utils.copy(this.startConfig);
                    Utils.extend(this.startConfig, response.data, initialStartConfig);
                    const versionDate = this.startConfig.versionDate;
                    if (Utils.isString(versionDate)) { // it will be
                        this.startConfig.versionDate = Utils.fromSysDateStr(versionDate);
                    }
                    observer.next(this.startConfig);
                    observer.complete();
                })
                .catch(error => {
                    console.error("Error retrieving app config");
                    observer.error(error);
                });
        });
    }

    /**
     * Retrieves Sinequa server configuration from a web server hosting the app
     *
     * @param url A URL to a JSON file containing the Sinequa server configuration
     *
     * @returns An observable of the Sinequa server configuration
     */
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
