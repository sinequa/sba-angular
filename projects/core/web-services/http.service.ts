import {HttpParams} from "@angular/common/http";
import {Utils, MapOf} from "@sinequa/core/base";
import {StartConfig} from "./start-config.web.service";

/**
 * A base helper class for web services. It holds the {@link StartConfig} for the app
 */
export abstract class HttpService {
    /**
     * Constructor
     *
     * @param startConfig The start configuration
     */
    constructor(
        protected startConfig: StartConfig) {
    }

    /**
     * The name of the application
     */
    get appName(): string {
        return this.startConfig.app!;
    }

    /**
     * Makes an API url by appending the api name to the api path
     * held on the {@link StartConfig}
     *
     * @param api An API name
     */
    makeUrl(api: string): string {
        return Utils.addUrl(this.startConfig.apiPath!, api);
    }

    /**
     * Makes an Angular {@link HttpParams} object from a basic Javascript object
     *
     * @param params A map of parameter values
     */
    makeParams(params: MapOf<string | boolean | number | Date | object | undefined>): HttpParams {
        return Utils.makeHttpParams(params);
    }
}