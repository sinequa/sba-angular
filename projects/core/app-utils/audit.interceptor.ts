import {Injectable, Inject} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {START_CONFIG, StartConfig, AuditRecord, AuditEvent, AuditEvents} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";

/**
 * An `HttpInterceptor` to process audi events attached to the request body
 * in the `$auditRecord` member.
 */
@Injectable({
    providedIn: "root"
})
export class AuditInterceptor implements HttpInterceptor {
    constructor(
        @Inject(START_CONFIG) private startConfig: StartConfig
    ) {
    }

    private shouldIntercept(url: string): boolean {
        /*tslint:disable-next-line*/
        return Utils.startsWith(url, this.startConfig.apiPath!);
    }

    private isJsonable(obj): boolean {
        return (Utils.isObject(obj) || Utils.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }

    // Handle legacy calls where auditEvents is either an AuditEvent or AuditEvent[]
    private ensureAuditRecord(auditEvents: AuditEvents): AuditRecord | undefined{
        if (!auditEvents) {
            return undefined;
        }
        let auditEvents1: AuditEvent[] | undefined;
        if (Utils.isArray(auditEvents)) {
            auditEvents1 = auditEvents;
        }
        else if (Utils.isObject(auditEvents)) {
            const auditRecord = auditEvents as AuditRecord;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                return auditRecord;
            }
            auditEvents1 = [auditEvents as AuditEvent];
        }
        return {
            auditEvents: auditEvents1
        };
    }

    /**
     * Called once the `$auditRecord` member has been standardized, this method
     * can be overidden to update fields in the audit events associated with a
     * web service call.
     */
    protected updateAuditRecord(auditRecord: AuditRecord) {
    }

    /**
     * Intercept requests with a JSON body and standardize the format of the
     * `$auditRecord` member.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.shouldIntercept(request.url) && this.isJsonable(request.body)) {
            request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
            this.updateAuditRecord(request.body.$auditRecord);
        }
        return next.handle(request);
    }
}
