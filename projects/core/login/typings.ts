import { InjectionToken, Type } from "@angular/core";
import { MapOf } from "@sinequa/core/base";
import { CCApp, Principal, UserSettings } from "@sinequa/core/web-services";

/**
 * Describes the different session events that are emitted by the {@link LoginService}
 * * `session-start`: emitted after successful login
 * * `session-end`: emitted after logout and also when the {@link LoginService} is destroyed
 * * `session-changed`: emitted whenever the login state changes - login, logout and user override
 */
export interface SessionEvent {
  type: "session-start" | "session-end" | "session-changed" | "login-complete" | "login-failed" | "logout-complete";
}


/**
* An `InjectionToken` to set the component to use for the login modal dialog which is displayed
* by the {@link LoginService} when performing a manual login. This makes the service independent
* of any particular UI framework. If manual login is to be used a component must be configured by
* providing this token.
*/
export const MODAL_LOGIN = new InjectionToken<Type<any>>('MODAL_LOGIN');

export const CREDENTIALS = new InjectionToken<Credentials>('CREDENTIALS');

/**
* Describes the data retrieved during the login process.
*/
export interface LoginData {
  /**
   * The application configuration.
   */
  app: CCApp;
  /**
   * The principal corresponding to the logged in user.
   */
  principal: Principal;
  /**
   * The user settings for the logged in user.
   */
  userSettings: UserSettings;
}

export interface Authentication {
  csrfToken: string;
  headers?: MapOf<string>;    // set in http headers
  params?: MapOf<string>;     // added to query string
}

/**
* Describes the credentials that a user would enter manually to authenticate
*/
export interface Credentials {
  userName?: string;
  password?: string;
}

export const LEGACY_PROCESSED_CREDENTIALS_KIND = 0;

/**
* Describes the object created after successful authentication. The form of this object
* is designed to maintain compatibility with previous SBA libraries
*/
export interface ProcessedCredentials {
  /**
   * An unused "kind" value - always set to 0
   */
  kind: number;
  /**
   * The user name of the authenticated user
   */
  userName?: string;
  /**
   * Additional data containing the associated CSRF token that is sent with
   * authenticated web service requests and the provider for informational
   * purposes only. The provider will be `Sinequa` for form-based authentication
   * and the name of the auto-login provider in the Sinequa configuration for
   * OAuth and SAML authentication
   */
  data: {
      csrfToken: string, // the web token itself is stored in the sinequa-web-token cookie
      provider: string
  };
}

/**
* Describes the object used by an administrator to authenticate as another user
*/
export interface UserOverride {
  /**
   * The user name of the user to authenticate as
   */
  userName: string;
  /**
   * The Sinequa domain name containing the user
   */
  domain: string;
}

/**
* Describes a JWT object
*/
export interface JsonWebToken {
  header: {
      typ: string,
      alg: string
  };
  payload: {
      iss: string,
      iat: string,
      exp: string,
      sub: string,
      hash: string
  };
  signature: string;
}
