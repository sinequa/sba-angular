import {Injectable, Inject} from "@angular/core";
import {Observable, of} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils, MapOf, JsonObject} from "@sinequa/core/base";
import {Results, Record} from "./query.web.service";
import {LinkResult} from "./sponsored-links.web.service";

/**
 * Describes a single audit event
 */
export interface AuditEvent {
    type: AuditEventType | string; // allow custom event types
    detail?: JsonObject;
    rfmDetail?: JsonObject;
}

/**
 * Contains an array of {@link AuditEvent} objects and an array of ML audit event records
 */
export interface AuditRecord {
    auditEvents?: AuditEvent[];
    mlAuditEvents?: any[];
}

/**
 * A composite type describing a set of AuditEvents
 */
export type AuditEvents = AuditEvent | AuditEvent[] | AuditRecord;

/**
 * The standard audit event types
 */
export const enum AuditEventType {
    // Should be in par with AuditEventType enum from AuditManager.cs
    None = "None",

    // WebApp event types
    Search_FirstPage = "Search_FirstPage",
    Search_Text = "Search_Text",
    Search_Refine = "Search_Refine",
    Search_Select_Item = "Search_Select_Item",
    Search_Select_Custom = "Search_Select_Custom",
    Search_Select_Concept = "Search_Select_Concept",
    Search_Select_Correction = "Search_Select_Correction",
    Search_GotoPage = "Search_GotoPage",
    Search_GotoTab = "Search_GotoTab",
    Search_DisplayResult = "Search_DisplayResult",
    Search_RemoveResult = "Search_RemoveResult",
    Search_RemoveAdvanced = "Search_RemoveAdvanced",
    Search_SavedQuery = "Search_SavedQuery",
    Search_WebService = "Search_WebService",
    Search_DidYouMean_Original = "Search_DidYouMean_Original",
    Search_DidYouMean_Correction = "Search_DidYouMean_Correction",
    Search_ExportCSV = "Search_ExportCSV",
    Search_SavedQuery_ExportCSV = "Search_SavedQuery_ExportCSV",
    Search_Selection_ExportCSV = "Search_Selection_ExportCSV",
    Search_AlertQuery = "Search_AlertQuery",
    Search_Select_AnalyticsItem = "Search_Select_AnalyticsItem",
    Search_Sort = "Search_Sort",
    Search_Exit_Logout = "Search_Exit_Logout",
    Search_Timeline_Usage = "Search_Timeline_Usage",
    Search_AutoComplete = "Search_Autocomplete",

    SavedQuery_Add = "SavedQuery_Add",
    SavedQuery_Delete = "SavedQuery_Delete",
    SavedQuery_DeleteAll = "SavedQuery_DeleteAll",
    SavedQuery_Rename = "SavedQuery_Rename",

    Alert_Edit = "Alert_Edit",
    Alert_Delete = "Alert_Delete",
    Alert_DeleteAll = "Alert_DeleteAll",

    Link_Display = "Link_Display",
    Link_Click = "Link_Click",

    Basket_Add = "Basket_Add",
    Basket_Delete = "Basket_Delete",
    Basket_DeleteAll = "Basket_DeleteAll",
    Basket_Rename = "Basket_Rename",
    Basket_AddDoc = "Basket_AddDoc",
    Basket_RemoveDoc = "Basket_RemoveDoc",
    Basket_Open = "Basket_Open",
    Basket_ExportCSV = "Basket_ExportCSV",

    Label_Add = "Label_Add",
    Label_Delete = "Label_Delete",
    Label_Rename = "Label_Rename",
    Label_Open = "Label_Open",
    Label_AddDoc = "Label_AddDoc",
    Label_RemoveDoc = "Label_RemoveDoc",
    Label_ExportCSV = "Label_ExportCSV",
    Label_Menu_ExportCSV = "Label_Menu_ExportCSV",

    Rating_Set = "Rating_Set",
    Rating_Delete = "Rating_Delete",

    Doc_Preview = "Doc_Preview",
    Doc_CacheHtml = "Doc_CacheHtml",
    Doc_CachePdf = "Doc_CachePdf",
    Doc_CacheOriginal = "Doc_CacheOriginal",
    Doc_Url1 = "Doc_Url1",
    Doc_Url2 = "Doc_Url2",

    Click_ResultLink = "Click_ResultLink",
    Click_ResultLink1 = "Click_ResultLink1",
    Click_ResultLink2 = "Click_ResultLink2",
    Click_ResultLink3 = "Click_ResultLink3",
    Click_ResultLink4 = "Click_ResultLink4",
    Click_ResultLink5 = "Click_ResultLink5",
    Click_ResultLink6 = "Click_ResultLink6",
    Click_ResultLink7 = "Click_ResultLink7",
    Click_ResultLink8 = "Click_ResultLink8",
    Click_ResultLink9 = "Click_ResultLink9",
    Click_ResultLink10 = "Click_ResultLink10",
    Click_PreviewLink1 = "Click_PreviewLink1",
    Click_PreviewLink2 = "Click_PreviewLink2",
    Click_PreviewLink3 = "Click_PreviewLink3",
    Click_PreviewLink4 = "Click_PreviewLink4",
    Click_PreviewLink5 = "Click_PreviewLink5",
    Click_PreviewLink6 = "Click_PreviewLink6",
    Click_PreviewLink7 = "Click_PreviewLink7",
    Click_PreviewLink8 = "Click_PreviewLink8",
    Click_PreviewLink9 = "Click_PreviewLink9",
    Click_PreviewLink10 = "Click_PreviewLink10",

    RFM_ClickSet = "RFM_ClickSet",
    RFM_ClickReset = "RFM_ClickReset",
    RFM_Like = "RFM_Like",
    RFM_LikeReset = "RFM_LikeReset",
    RFM_Dislike = "RFM_Dislike",
    RFM_Important = "RFM_Important",
    RFM_ImportantReset = "RFM_ImportantReset",
    RFM_Ban = "RFM_Ban"
}

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
@Injectable({
    providedIn: "root"
})
export class AuditWebService extends HttpService {
    private static readonly endpoint = "audit.notify";

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        protected httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Notify the Sinequa server of a sponsored link event
     *
     * @param evt The audit event type
     * @param sl The sponsored link
     * @param resultId The id of the results that showed the sponsored link
     * @param parameters Additional information
     */
    notifySponsoredLink(
        evt: AuditEventType, sl: LinkResult, resultId: string,
        parameters?: MapOf<string | number | boolean | undefined>): Observable<void>  {
        const detail: JsonObject = {
            "link-id": sl.id,
            rank: sl.rank || 0,
            title: sl.title,
            url: sl.url,
            "result-id": resultId
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        return this.notify(data);
    }

    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param doc The document (record) in question
     * @param resultsOrId The results or resultid that contain the document
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocument(
        evt: AuditEventType, doc: Record, resultsOrId: Results | string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void>  {
        let resultId: string | null;
        let results: Results | undefined;
        if (Utils.isString(resultsOrId)) {
            resultId = resultsOrId;
        }
        else {
            results = resultsOrId;
            resultId = results ? results.id : null;
        }
        const detail: JsonObject = {
            app: this.appName,
            "doc-id": doc.id,
            rank: doc.rank,
            title: doc.title,
            source: Utils.treeFirstNode(doc.collection[0]),
            collection: doc.collection[0],
            "result-id": resultId,
            filename: doc.filename,
            fileext: doc.fileext,
            index: doc.databasealias
        };
        if (results) {
            detail["result-count"] = results.totalRowCount;
        }
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail: JsonObject = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }
        return this.notify(data);
    }

    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param id The id of the document (record) in question
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocumentById(
        evt: AuditEventType, id: string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void>  {
        const collection = id.substr(0, id.indexOf("|"));
        const detail: JsonObject = {
            app: this.appName,
            "doc-id": id,
            rank: -1,
            source: Utils.treeFirstNode(collection),
            collection
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail: JsonObject = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }
        return this.notify(data);
    }

    /**
     * Notify logout
     */
    notifyLogout() : Observable<void> {
        const detail: JsonObject = {
            app: this.appName,
        };

        const data: AuditEvent = {
            type: AuditEventType.Search_Exit_Logout,
            detail
        };

        return this.notify(data);
    }

    /**
     * Notify the Sinequa server of a set of audit events
     *
     * @param auditEvents The audit events
     */
    notify(auditEvents: AuditEvents): Observable<void> {
        if (!this.startConfig.auditEnabled) {
            return of(undefined);
        }
        const observable = this.httpClient.post<void>(this.makeUrl(AuditWebService.endpoint), {
            event: AuditEventType.None,
            app: this.appName,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("auditService.notify failure - error: ", error);
            });
        return observable;
    }
}