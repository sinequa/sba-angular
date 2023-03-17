import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuditEvents, IMulti, IQuery, QueryIntentData, Results } from "@sinequa/core/web-services";
import { RESULTS } from "../data/results";

/**
 * Mocked query web service
 */
@Injectable({
    providedIn: "root"
})
export class MockQueryWebService<T extends Results = Results> {

    public getResults(query: IQuery, auditEvents?: AuditEvents, queryIntentData?: QueryIntentData): Observable<T> {
        return of(RESULTS as any);
    }

    public getMultipleResults(queries: IQuery[], auditEvents?: AuditEvents): Observable<IMulti<T>> {
        return of({ results: [RESULTS as any] });
    }

}
