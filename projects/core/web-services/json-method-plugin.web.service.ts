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
   * Call a JsonMethod plugin
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @returns An observable of the plugin's return value
   */
  call(method: string, query: any) : Observable<any> {
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

  makeUrl(api: string): string {
    return super.makeUrl('plugin/' + api);
  }
}