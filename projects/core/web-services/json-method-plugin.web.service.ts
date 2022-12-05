import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpService} from "./http.service";
import {Utils} from "@sinequa/core/base";

/**
 * A generic service for invoking JsonMethod plugins
 */
@Injectable({
  providedIn: "root"
})
export class JsonMethodPluginService extends HttpService{

  /**
   * Call a JsonMethod plugin using an HTTP POST
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @param options HTTP options for the request
   * @returns An observable of the plugin's return value
   */
  post(method: string, query: any, options?: {[key: string]: any}) : Observable<any> {
    if (!Utils.isObject(query)) {
      return throwError({error: "invalid query object"});
    }
    const observable = this.httpClient.post(this.makeUrl(method), query, options);

    Utils.subscribe(observable,
      (response) => {
        console.log("JsonMethodPluginService.post success - data: ", response);
      },
      (error) => {
        console.log("JsonMethodPluginService.post failure - error: ", error);
      },
      () => {
        console.log("JsonMethodPluginService.post complete");
      });

    return observable;
  }

  /**
   * Call a JsonMethod plugin using an HTTP POST
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @param options HTTP options for the request
   * @returns An observable of the plugin's return value
   */
  call(method: string, query: any, options?: {[key: string]: any}): Observable<any> {
    return this.post(method, query, options);
  }

  /**
   * Call a JsonMethod plugin using an HTTP GET
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @param options HTTP options for the request
   * @returns An observable of the plugin's return value
   */
  get(method: string, query: any, options?: {[key: string]: any}): Observable<any> {
    const observable = this.httpClient.get(this.makeUrl(method), {
      params: this.makeParams(query),
      ...options
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

  override makeUrl(api: string): string {
    return super.makeUrl('plugin/' + api);
  }
}