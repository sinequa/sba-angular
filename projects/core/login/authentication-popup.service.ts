import {Injectable, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {flatMap} from "rxjs/operators";
import {PopupService} from "ng2-ui-auth";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";

/**
 * Override ng2-ui-auth's popup handling as it doesn't work with SAML + IE11 because
 * of a double redirection.
 * The initial request is to Sinequa which redirects to the authentication provider.
 * On successful authentication, the authentication provider redirects back
 * to Sinequa to perform the login.
 * In IE the initial redirection causes the popup window to be reported as "closed"
 * which breaks the process.
 * So, override ng2-ui-auth's PopupService and do the inital request to get the
 * redirect url outside of the popup
 */
@Injectable({
    providedIn: "root"
})
export class AuthenticationPopupService extends PopupService {
    constructor(
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        protected httpClient: HttpClient) {
        super();
    }

    open(url: string, options: any/*IOauth2Options | IOauth1Options*/, cordova: boolean | undefined): Observable<Window> {
        if (Utils.startsWith(url, this.startConfig.apiPath!)) {
            return this.httpClient.get<{redirectUrl: string}>(url, {
                params: Utils.makeHttpParams({
                    noUserOverride: true,
                    noAutoAuthentication: true,
                    tokenInCookie: true,
                    loginInPopup: true
                })
            }).pipe(flatMap((ret) => {
                return super.open(ret.redirectUrl, options, cordova);
            }));
        }
        return super.open(url, options, cordova);
    }
}
