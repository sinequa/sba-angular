import { Injectable } from "@angular/core";
import { Observable, of, EMPTY } from "rxjs";
import { HttpService, IQuery, Labels, LabelsRights } from "@sinequa/core/web-services";
import { LABELS, LABELSRIGHTS } from "../data/labels";

@Injectable({
    providedIn: "root"
})
export class MockLabelsWebService extends HttpService {

    list(
        prefix: string,
        _public: boolean): Observable<Labels> {
        return of(LABELS);
    }

    array(
        prefix: string,
        _public: boolean): Observable<string[]> {
        return of(LABELS.labels);
    }

    getUserRights(): Observable<LabelsRights> {
        return of(LABELSRIGHTS);
    }

    add(labels: string[],
        ids: string[],
        _public: boolean): Observable<void> {
        return EMPTY;
    }

    remove(labels: string[],
        ids: string[],
        _public: boolean): Observable<void> {
        return EMPTY;
    }

    rename(labels: string[],
        newLabel: string,
        _public: boolean): Observable<void> {
        return EMPTY;
    }

    delete(labels: string[],
        _public: boolean): Observable<void> {
        return EMPTY;
    }

    bulkAdd(labels: string[],
        query: IQuery,
        _public: boolean): Observable<void> {
        return EMPTY;
    }

    bulkRemove(labels: string[],
        query: IQuery,
        _public: boolean): Observable<void> {
        return EMPTY;
    }
}
