import {Injectable, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {flatMap} from "rxjs/operators";
import {OauthService, SharedService, PopupService, ConfigService} from "ng2-ui-auth";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";

/**
 * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
 */
@Injectable({
    providedIn: "root"
})
export class AuthenticationOauthService extends OauthService {
    constructor(
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        protected httpClient: HttpClient,
        protected sharedService: SharedService,
        protected popupService: PopupService,
        protected configService: ConfigService) {
        super(httpClient, sharedService, configService, popupService);
    }

    authenticate<T extends object | string>(name: string, userData: any): Observable<T> {
        const options = this.configService.options.providers[name];
        if (options.sqInitState) {
            return this.httpClient.get<{state: string}>(Utils.addUrl(this.startConfig.apiPath!, "oauth"), {
                params: Utils.makeHttpParams({
                    action: "initstate",
                    provider: options.name,
                    tokenInCookie: true,
                    loginInPopup: true,
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            }).pipe<T>(flatMap<{state: string}, Observable<T>>((ret) => {
                options.state = ret.state;
                return super.authenticate(name, userData);
            }));
        }
        return super.authenticate(name, userData);
    }
}
