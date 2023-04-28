import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

export interface Credentials {user: string, password: string};
export const CREDENTIALS = new InjectionToken<Credentials>("CREDENTIALS");

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(CREDENTIALS) protected credentials: Credentials,
    public router: Router
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/login`);
      return of(err.message);
    }
    this.showError(err);
    return throwError(() => err);
  }

  private showError(err: HttpErrorResponse) {
    let body = err.error;
    let header = `${err.statusText} (${err.status})`;
    try {
      const error = JSON.parse(err.error);
      if(error.errorMessage) {
        body = error.errorMessage;
      }
      if(error.errorCodeText) {
        header = `Error: ${error.errorCodeText}`;
      }
    }
    catch {
      console.log(body, header);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setParams: {...this.credentials},
      setHeaders: {"sinequa-force-camel-case": "true"}
    });
    return next.handle(authReq).pipe(catchError(x => this.handleAuthError(x)));
  }

}
