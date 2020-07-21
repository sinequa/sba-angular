import {AuthenticationOauthService} from "./authentication-oauth.service";
import {AuthenticationPopupService} from "./authentication-popup.service";
import {AuthenticationService} from "./authentication.service";
import {LoginInterceptor} from "./login.interceptor";
import {JWTService} from "./jwt.service";
import {LoginService} from "./login.service";
import {TokenService} from "./token.service";

const LOGIN_MODULE_PROVIDERS = [
    AuthenticationOauthService,
    AuthenticationPopupService,
    AuthenticationService,
    LoginInterceptor,
    JWTService,
    LoginService,
    TokenService,
];

export {LOGIN_MODULE_PROVIDERS};
