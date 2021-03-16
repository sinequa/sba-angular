import {HttpClient, HttpErrorResponse, HttpInterceptor, HttpParams, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {inject, TestBed} from "@angular/core/testing";

import {HTTP_REQUEST_INITIALIZERS, LoginInterceptor} from '.';
import {NotificationsService} from '../notification';
import {START_CONFIG} from '../web-services';
import {AuthenticationService} from './authentication.service';
import {LoginService} from './login.service';

describe("login interceptor", () => {
  let interceptorInstance: HttpInterceptor | null;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

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
        {provide: START_CONFIG, useValue: {app: "testing_app"}},
        {provide: HTTP_REQUEST_INITIALIZERS, useValue: {}},
        {provide: LoginService, deps: [START_CONFIG], useClass: LoginService},
        {provide: AuthenticationService, deps: [START_CONFIG], useClass: AuthenticationService},
        {provide: HTTP_INTERCEPTORS, deps: [START_CONFIG, HTTP_REQUEST_INITIALIZERS, NotificationsService, LoginService, AuthenticationService], useClass: LoginInterceptor, multi: true}
      ]
    });

    // get interceptor instance
    interceptorInstance = getInterceptorInstance<LoginInterceptor>(TestBed.inject(HTTP_INTERCEPTORS), LoginInterceptor);

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
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


  it('When 401, try to get Credentials or error is rethrow', () => {
    const login = TestBed.inject(LoginService);
    spyOn(login, "getCredentials").and.returnValue(Promise.resolve());
    // before refacto this method doesn't exists
    spyOn<any>(interceptorInstance, "handle401Error").and.callThrough();

    const message = '401 error';

    // Make an HTTP GET request
    httpClient.get("/data").subscribe(
      res => fail('should have failed with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.error).toEqual(message, 'message');
      }
    );

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne("/data");

    // Respond with mock error
    req.flush(message, {status: 401, statusText: 'Unauthorized'});

    expect(login.getCredentials).toHaveBeenCalledTimes(1);
    expect((interceptorInstance as LoginInterceptor)["handle401Error"]).toHaveBeenCalledTimes(1);
  });

  it('When an error occurs, error is rethrow', () => {
    const login = TestBed.inject(LoginService);
    spyOn(login, "getCredentials").and.returnValue(Promise.resolve());
    // before refacto this method doesn't exists
    spyOn<any>(interceptorInstance, "handle401Error").and.callThrough();

    const message = '403 Forbidden';

    // Make an HTTP GET request
    httpClient.get("/data").subscribe(
      res => fail('should have failed with the 403 error'),
      (err: HttpErrorResponse) => {
        expect(err.error).toEqual(message, 'message');
      }
    );

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne("/data");

    // Respond with mock error
    req.flush(message, {status: 403, statusText: 'Forbidden'});

    expect(login.getCredentials).not.toHaveBeenCalled();
  });

  it("should intercept request", () => {
    httpClient.get("/data").subscribe(res => {
      expect(res).toEqual("ok");
    });

    const req = httpMock.expectOne("/data");
    req.flush("ok");

    expect(req.request.params.has("noAutoAuthentication")).toBeFalse();
    expect(req.request.params.has("noUserOverride")).toBeFalse();
    expect(req.request.params.has("noNotify")).toBeFalse();

    expect(req.request.headers.has("sinequa-force-camel-case")).toBeTrue();
  });

  it("should no intercept request with 'noIntercept' params", () => {
    // noIntercept
    const params = new HttpParams().set("noIntercept", "noIntercept")

    httpClient.get("/data", {params}).subscribe(res => {
      expect(res).toEqual("ok");
    });

    const req = httpMock.expectOne("/data?noIntercept=noIntercept");
    req.flush("ok");

  });

});