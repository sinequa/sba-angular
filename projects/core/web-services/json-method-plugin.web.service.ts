import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpService} from "./http.service";
import { MapOf, Utils } from "@sinequa/core/base";
import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

type Options = {
  headers?: HttpHeaders | {
      [header: string]: string | string[]
  },
  context?: HttpContext,
  observe?: 'body' | 'events' | 'response',
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
  },
  reportProgress?: boolean,
  responseType: 'arraybuffer' | 'blob' | 'text' | 'json',
  withCredentials?: boolean
}

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
  post<U>(method: string, query: U, options?: Options) : Observable<any> {
    if (!Utils.isObject(query)) {
      return throwError(() => ({error: "invalid query object"}));
    }
    return this.httpClient.post(this.makeUrl(method), query, options as any);
  }

  /**
   * Call a JsonMethod plugin using an HTTP POST
   *
   * @param method The name of the JsonMethod plugin
   * @param query Parameters to pass to the plugin
   * @param options HTTP options for the request
   * @returns An observable of the plugin's return value
   *
   * @deprecated use the `post()` method instead
   */
  call<U>(method: string, query: U, options?: Options): Observable<any> {
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
  get<U extends MapOf<string | boolean | number | Date | object | undefined>>(method: string, query: U, options?: Options): Observable<any> {
    return this.httpClient.get(this.makeUrl(method), {
      params: this.makeParams(query),
      ...options as any
    });
  }

  override makeUrl(api: string): string {
    return super.makeUrl('plugin/' + api);
  }
}
