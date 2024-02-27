import { Injectable, InjectionToken } from "@angular/core";
import { HttpService } from "./http.service";
import { Utils } from "@sinequa/core/base";
import { HubConnectionBuilder, LogLevel, HubConnection, MessageHeaders, HttpTransportType } from '@microsoft/signalr';

export interface ConnectionOptions {
  withCredentials?: boolean; // if true, the browser automatically includes the authentication cookie in the request headers when establishing the SignalR connection
  headers?: MessageHeaders;
  transports?: HttpTransportType[] // If transports are provided, use them; otherwise, let SignalR negotiate
  accessTokenFactory?: () => string;
}

/** A token that is used to inject the transports allowed to use by hub connection.
 *
 * Expects a {@link HttpTransportType} value.
*/
export const SIGNAL_R_TRANSPORTS = new InjectionToken<HttpTransportType>('SIGNAL_R_TRANSPORTS');

/** A token that is used to inject the log level for the hub connection.
 *
 * Expects a {@link LogLevel} value.
*/
export const SIGNAL_R_LOG_LEVEL = new InjectionToken<LogLevel>('SIGNAL_R_LOG_LEVEL');

/**
 * A service to connect the Sinequa server to the client via SignalR
 */
@Injectable({
  providedIn: "root"
})
export class SignalRWebService extends HttpService {
  private static readonly endpoints = "endpoints/v1";

  /**
   * Makes an endpoint url by appending the endpoint name to the application path
   * held on the {@link StartConfig}
   *
   * @param endpoint An endpoint name
   */
  override makeUrl(endpoint: string): string {
    return Utils.addUrl(this.startConfig.applicationPath!, endpoint);
  }

  /**
   * Builds a SignalR connection to the given endpoint
   * @param endpointName Name of the endpoint to connect to
   * @param options  Options for the connection. It must overrides the default options
   * @param logLevel  The log level for the connection
   * @param automaticReconnect  Whether the connection should automatically attempt to reconnect
   * @returns  A SignalR connection
   */
  buildConnection(endpointName: string, options: ConnectionOptions, logLevel = LogLevel.Information, automaticReconnect = false): HubConnection {
    const url = this.makeUrl(SignalRWebService.endpoints) + "/" + endpointName;

    const connectionBuilder = new HubConnectionBuilder()
      .withUrl(url, options)
      .configureLogging(logLevel);

    if (automaticReconnect) {
      connectionBuilder.withAutomaticReconnect();
    }

    return connectionBuilder.build();
  }

  /**
   * Starts a SignalR connection.
   * @param connection  A SignalR connection
   */
  async startConnection(connection: HubConnection | undefined): Promise<void> {
    if (!connection) {
      throw new Error("Please provide a valid connection to start");
    }
    try {
      await connection.start();
      console.log(`The SignalR connection has been successfully established! \n url: ${connection.baseUrl} \n connectionId: ${connection.connectionId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Stops a SignalR connection.
   * @param connection A SignalR connection
   */
  async stopConnection(connection: HubConnection | undefined): Promise<void> {
    if (!connection) {
      throw new Error("Please provide a valid connection to stop");
    }
    try {
      await connection.stop();
      console.log(`The SignalR connection has been successfully stopped! \n url: ${connection.baseUrl} \n connectionId: ${connection.connectionId}`);
    } catch (error) {
      throw error;
    }
  }
}
