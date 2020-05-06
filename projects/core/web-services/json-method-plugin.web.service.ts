import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";

/**
 * A generic service for invoking JsonMethod plugins
 */
@Injectable({
  providedIn: "root"
})
export class JsonMethodPluginService extends HttpService{
  constructor(
    public httpClient: SqHttpClient,
    @Inject(START_CONFIG) startConfig: StartConfig
    ) {
      super(startConfig);
  }

  /**
   * Call a JsonMethod plugin using an HTTP POST
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @returns An observable of the plugin's return value
   */
  post(method: string, query: any) : Observable<any> {
    if (!Utils.isObject(query)) {
      return throwError({error: "invalid query object"});
    }
    const observable = this.httpClient.post(this.makeUrl(method), query);

    Utils.subscribe(observable,
      (response) => {
        console.log("JsonMethodPluginService.call success - data: ", response);
      },
      (error) => {
        console.log("JsonMethodPluginService.call failure - error: ", error);
      },
      () => {
        console.log("JsonMethodPluginService.call complete");
      });

    return observable;
  }

  /**
   * Call a JsonMethod plugin using an HTTP POST
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @returns An observable of the plugin's return value
   */
  call(method: string, query: any): Observable<any> {
    return this.post(method, query);
  }

  /**
   * Call a JsonMethod plugin using an HTTP GET
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @returns An observable of the plugin's return value
   */
  get(method: string, query: any): Observable<any> {
    const observable = this.httpClient.get(this.makeUrl(method), {
      params: this.makeParams(query)
    });

    Utils.subscribe(observable,
      (response) => {
        console.log("JsonMethodPluginService.get success - data: ", response);
      },
      (error) => {
        console.log("JsonMethodPluginService.get failure - error: ", error);
      },
      () => {
        console.log("JsonMethodPluginService.get complete");
      });

    return observable;
  }

  makeUrl(api: string): string {
    return super.makeUrl('plugin/' + api);
  }
}