import { HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";

import { Utils } from "@sinequa/core/base";

import { SqHttpClient } from "./http-client";
import { API_ENDPOINTS } from "./types";
import { START_CONFIG } from "./start-config.web.service";

/**
 * A base helper class for web services. It holds the {@link StartConfig} for the app
 */
export abstract class HttpService {

    protected readonly startConfig = inject(START_CONFIG);
    protected readonly httpClient = inject(SqHttpClient)

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
    makeUrl(api: API_ENDPOINTS): string {
        return Utils.addUrl(this.startConfig.apiPath!, api);
    }

    /**
     * Makes an Angular {@link HttpParams} object from a basic Javascript object
     *
     * @param params A map of parameter values
     */
    makeParams(params: Record<string, string | boolean | number | Date | object | undefined>): HttpParams {
        return Utils.makeHttpParams(params);
    }
}