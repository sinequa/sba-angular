import { Injectable } from "@angular/core";
import { HttpService } from "@sinequa/core/web-services";
import { Observable, of, EMPTY } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MockTokenService extends HttpService {

    getCsrfToken(notify = false): Observable<string> {
        return of('csrfToken');
    }

    deleteWebTokenCookie(): Observable<void> {
        return EMPTY;
    }
}
