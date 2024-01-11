import {HttpClient, HttpErrorResponse, HttpInterceptor, HttpParams, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";

import { NotificationsService } from "@sinequa/core/notification";
import { START_CONFIG } from "@sinequa/core/web-services";

import { AuthenticationService } from "./authentication.service";
import { HTTP_REQUEST_INITIALIZERS, LoginInterceptor } from "./login.interceptor";
import { LoginService } from "./login.service";
import { IntlService, LOCALES_CONFIG, Locale } from "../intl";


describe("login interceptor", () => {
  let interceptorInstance: HttpInterceptor | null;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let intlService: IntlService;

  function getInterceptorInstance<T extends HttpInterceptor>(interceptors: HttpInterceptor[], type: any): HttpInterceptor | null {
    let searchedInterceptor: HttpInterceptor | null = null;
    interceptors.forEach((interceptor: HttpInterceptor) => {
      if (interceptor instanceof type) {
        searchedInterceptor = interceptor;
      }
    });
    return searchedInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // ...
      ],
      providers: [
        { provide: START_CONFIG, useValue: { app: "testing_app" } },
        { provide: HTTP_REQUEST_INITIALIZERS, useValue: {} },
        { provide: LOCALES_CONFIG, useValue: {}},
        { provide: LoginService, deps: [START_CONFIG], useClass: LoginService },
        { provide: AuthenticationService, deps: [START_CONFIG], useClass: AuthenticationService },
        { provide: IntlService, deps: [START_CONFIG, LOCALES_CONFIG], useClass: IntlService },
        { provide: HTTP_INTERCEPTORS, deps: [START_CONFIG, HTTP_REQUEST_INITIALIZERS, NotificationsService, LoginService, AuthenticationService, IntlService], useClass: LoginInterceptor, multi: true }
      ]
    });

    // get interceptor instance
    interceptorInstance = getInterceptorInstance<LoginInterceptor>(TestBed.inject(HTTP_INTERCEPTORS), LoginInterceptor);

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    intlService = TestBed.inject(IntlService);
    intlService.currentLocale = { name: "fr" } as Locale;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should retrieve interceptors list", inject(
    [HTTP_INTERCEPTORS, START_CONFIG, LoginService, AuthenticationService],
    (interceptors: typeof HTTP_INTERCEPTORS) => {
      (interceptors as any).forEach((interceptor: HttpInterceptor) => {
        if (interceptor instanceof LoginInterceptor) {
          expect(interceptor).toBeDefined();
        }
      });
    }
  ));

  it("should instanciate interceptor", () => {
    expect(interceptorInstance).toBeDefined();
  })


  it('When 401, try to get Credentials or error is rethrow', async () => {
    const login = TestBed.inject(LoginService);
    spyOn(login, "getCredentials").and.returnValue(Promise.resolve());
    // before refacto this method doesn't exists
    spyOn<any>(interceptorInstance, "handle401Error").and.callThrough();

    const message = '401 error';

    // Make an HTTP GET request
    await httpClient.get("/api/v1/data")
      .subscribe({
        next: res => fail('should have failed with the 401 error'),
        error: (err: HttpErrorResponse) => {
          expect(err.error).toEqual(message, 'message');
        }
      });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne("/api/v1/data?ui-language=fr");

    // Respond with mock error
    req.flush(message, { status: 401, statusText: 'Unauthorized' });

    expect(login.getCredentials).toHaveBeenCalledTimes(1);
    expect((interceptorInstance as LoginInterceptor)["handle401Error"]).toHaveBeenCalledTimes(1);
  });

  it('When an error occurs, error is rethrow', async () => {
    const login = TestBed.inject(LoginService);
    spyOn(login, "getCredentials").and.returnValue(Promise.resolve());
    // before refacto this method doesn't exists
    spyOn<any>(interceptorInstance, "handle401Error").and.callThrough();

    const message = '403 Forbidden';

    // Make an HTTP GET request
    await httpClient.get("/api/v1/data")
      .subscribe({
        next: res => fail('should have failed with the 403 error'),
        error: (err: HttpErrorResponse) => {
          expect(err.error).toEqual(message, 'message');
        }
      });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne("/api/v1/data?ui-language=fr");

    // Respond with mock error
    req.flush(message, {status: 403, statusText: 'Forbidden'});

    expect(login.getCredentials).not.toHaveBeenCalled();
  });

  it("should intercept request", async () => {
    await httpClient.get("/api/v1/data")
      .subscribe(res => {
        expect(res).toEqual("ok");
      });

    const req = httpMock.expectOne("/api/v1/data?ui-language=fr");
    req.flush("ok");

    expect(req.request.params.has("noAutoAuthentication")).toBeFalse();
    expect(req.request.params.has("noUserOverride")).toBeFalse();
    expect(req.request.params.has("noNotify")).toBeFalse();

    expect(req.request.headers.has("sinequa-force-camel-case")).toBeTrue();
  });

  it("should no intercept request with 'noIntercept' params", () => {
    // noIntercept
    const params = new HttpParams().set("noIntercept", "noIntercept")

    httpClient.get("/api/v1/data", {params}).subscribe(res => {
      expect(res).toEqual("ok");
    });

    const req = httpMock.expectOne("/api/v1/data?noIntercept=noIntercept");
    req.flush("ok");

  });

});
