import {Injectable, OnDestroy} from "@angular/core";
import {RfmWebService, AuditWebService, Results, Record, RFMDisplay} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import {Subject, Observable, Subscription} from 'rxjs';

export type RFMType = "important" | "click" | "like";

export interface CCRFM {
    name: string;
    click: CCRFM.Action;
    like: CCRFM.Action;
    important: CCRFM.Action;
}

export declare module CCRFM {
    interface Action {
        name: string;
        enabled: boolean;
        actionEnabled: boolean;
        noMenu: boolean;
        displayUnrated: boolean;
        negAvailable: boolean;
    }
}

export enum RFMEventType {
    ClickSet = "RFM_ClickSet",
    ClickReset = "RFM_ClickReset",
    Like = "RFM_Like",
    LikeReset = "RFM_LikeReset",
    Dislike = "RFM_Dislike",
    Important = "RFM_Important",
    ImportantReset = "RFM_ImportantReset",
    Ban = "RFM_Ban"
}

export interface RFMEvent {
    type: "updated";
}

@Injectable({
    providedIn: 'root',
})
export class RFMService implements OnDestroy {

    private _events = new Subject<RFMEvent>();
    private _subscription: Subscription;

    constructor(
        public appService: AppService,
        public rfmService: RfmWebService,
        public searchService: SearchService,
        public auditService: AuditWebService
    ){
        this._subscription = this.searchService.resultsStream.subscribe(results => {
            this.updateRfm(results);
        });
    }

    get events(): Observable<RFMEvent> {
        return this._events;
    }

    ngOnDestroy(){
        this._events.complete();
        this._subscription.unsubscribe();
    }

    public getMenuActions(config: CCRFM.Action): RFMDisplay[] {
        const actions = [RFMDisplay.positiveRate, RFMDisplay.unrate];
        if(config.negAvailable)
            actions.push(RFMDisplay.negativeRate);
        return actions;
    }

    public static getActionName(rfmDisplay: RFMDisplay): string {
        switch (rfmDisplay) {
            case RFMDisplay.positiveRate:
                return "pos";
            case RFMDisplay.mainlyPosRate:
                return "mpos";
            case RFMDisplay.unrate:
                return "unrated";
            case RFMDisplay.mainlyNegRate:
                return "mneg";
            case RFMDisplay.negativeRate:
                return "neg";
            default:
                return "none";
        }
    }


    public static toAuditEventType(action : RFMType, evt: RFMDisplay): RFMEventType | undefined {
        let aet: RFMEventType | undefined;
        switch (action) {
            case "important":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.Important;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.ImportantReset;
                        break;
                    case RFMDisplay.negativeRate:
                        aet = RFMEventType.Ban;
                        break;
                }
                break;
            case "like":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.Like;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.LikeReset;
                        break;
                    case RFMDisplay.negativeRate:
                        aet = RFMEventType.Dislike;
                        break;
                }
                break;
            case "click":
                switch (evt) {
                    case RFMDisplay.positiveRate:
                        aet = RFMEventType.ClickSet;
                        break;
                    case RFMDisplay.unrate:
                        aet = RFMEventType.ClickReset;
                        break;
                    //case RFMDisplay.negativeRate:
                    //aet = AuditEventType.RFM_Dislike;
                    //break;
                }
                break;
        }
        return aet;
    }

    public notifyRfmAction(rfmEvent: any, record: Record, results: Results) {
        this.auditService.notifyDocument(rfmEvent, record, results, undefined, {
            queryhash: this.searchService.results ? this.searchService.results.rfmQueryHash : undefined,
            querytext: this.searchService.query.text,
            querylang: this.searchService.query.questionLanguage || (this.appService.ccquery && this.appService.ccquery.questionLanguage)
        });
    }


    /**
     * Called every time new results come in.
     * Performs a request for
     * @param results
     */
    private updateRfm(results: Results | undefined) {
        if (results && results.records) {
            const ccquery = this.appService.ccquery;
            if (ccquery && ccquery.rFM) {
                Utils.subscribe(this.rfmService.getRfmData(ccquery.rFM, results),
                    (value) => {
                        if (value) {
                            for (const record of results.records) {
                                const rfmData = value[record.id];
                                if (!!rfmData) {
                                    record.rfm = rfmData;
                                }
                            }
                            this._events.next({type: "updated"});
                        }
                    });
            }
        }
    }
}
