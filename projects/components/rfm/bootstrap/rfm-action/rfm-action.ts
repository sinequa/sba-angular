import {Component, Input, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Results, Record, RFMDisplay, RFMActionDisplay} from "@sinequa/core/web-services";
import {RFMService, CCRFM, RFMType} from "../../rfm.service";
import {Action} from "@sinequa/components/action";
import {Subscription} from "rxjs";

@Component({
    selector: "sq-rfm-action",
    templateUrl: "./rfm-action.html"
})
export class BsRfmAction implements OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() record: Record;
    @Input() config: CCRFM.Action;  // Parent should bind this.appService.ccrfm[type]
    @Input() rfm: RFMActionDisplay; // Parent should bind record.rfm && record.rfm[type]
    @Input() type: RFMType;         // click, like, important (default)
    @Input() size: string;
    action: Action;

    menuActions: RFMDisplay[];

    private rfmSubscription: Subscription;

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected rFMService: RFMService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.rfmSubscription) {
            this.rfmSubscription = this.rFMService.events.subscribe(
                (event) => {
                    this.changeDetectorRef.markForCheck();
                }
            );
        }
        if (changes["rfm"]) {
            if (!this.action) {
                this.type = (Utils.toLowerCase(this.type) || "important") as RFMType;
                // List of menu actions from app config
                this.menuActions = this.rFMService.getMenuActions(this.config);
                this.buildAction();
            }
            else {
                this.action.update();
            }
        }
    }

    ngOnDestroy() {
        this.rfmSubscription.unsubscribe();
    }

    get hasRFMAction(): boolean {
        return this.record.rfmEnabled && this.config.enabled &&
            this.hasRfmImage;
    }

    get rfmStatus(): RFMDisplay {
        return (!this.rfm) ? RFMDisplay.unrate : this.rfm.status;
    }

    get hasRfmImage() : boolean {
        return this.rfmImage !== RFMDisplay.none;
    }

    get rfmImage(): RFMDisplay {
        return (!this.rfm) ? this.rfmDefaultImage : this.rfm.image;
    }

    private get rfmDefaultImage(): RFMDisplay {
        return ( this.config.displayUnrated || !this.config.noMenu) ? RFMDisplay.unrate : RFMDisplay.none;
    }

    get rfmImageAction(): RFMDisplay {
        return (!this.rfm) ? this.rfmDefaultImageAction : this.rfm.imageAction;
    }

    private get rfmDefaultImageAction(): RFMDisplay {
        return this.config.noMenu ? RFMDisplay.positiveRate : RFMDisplay.none;
    }

    get rfmAvailableActions(): RFMDisplay {
        return (!this.rfm) ? this.rfmDefaultAvailableActions : this.rfm.availableActions;
    }

    private get rfmDefaultAvailableActions(): RFMDisplay {
        if (this.config.noMenu) {
            return RFMDisplay.none;
        }
        if (this.config.negAvailable) {
            return RFMDisplay.personalAll;
        }
        return RFMDisplay.personalPosOnly;
    }

    get displayImgAction(): boolean {
        return this.rfmImageAction !== RFMDisplay.none;
    }

    get displayMenu(): boolean {
        return this.rfmImageAction === RFMDisplay.none &&
            this.rfmAvailableActions !== RFMDisplay.none &&
            !this.config.noMenu;
    }

    get displayNoAction(): boolean {
        return this.rfmImageAction === RFMDisplay.none &&
            this.rfmAvailableActions === RFMDisplay.none;
    }

    getActionIcon(rfmDisplay: RFMDisplay): string {
        const name = RFMService.getActionName(rfmDisplay);
        return `rfm-${this.type}-${name}`;
    }

    buildAction() {
        this.action = new Action({
            updater: (item) => {
                item.icon = this.getActionIcon(this.rfmImage);
            }
        });
        if (this.displayImgAction) {
            this.action.action = (item) => {
                this.selectRfmDisplay(this.rfmImageAction);
            };
        }
        if (this.displayMenu) {
            this.action.children = this.menuActions.map(rfmDisplay => new Action({
                icon: this.getActionIcon(rfmDisplay),
                data: rfmDisplay,
                action: (item) => {
                    this.selectRfmDisplay(item.data);
                },
                updater: (item) => {
                    item.disabled = rfmDisplay === this.rfmStatus;
                }
            }));
        }
        this.action.update();
    }

    selectRfmDisplay(rfmDisplay: RFMDisplay) {
        if (rfmDisplay !== this.rfmStatus) {
            const eventtype = RFMService.toAuditEventType(this.type, rfmDisplay);
            this.rFMService.notifyRfmAction(eventtype, this.record, this.results);
            // Update RFM data for the record (created a new RFM data can be necessary)
            this.updateRfmData(rfmDisplay, this.rfmStatus);
        }
    }

    private updateRfmData(newStatus: RFMDisplay, newAction: RFMDisplay) {
        let updateNeeded = false;
        if (!this.rfm) {
            this.rfm = {
                eventCount: 1,
                average: 0,
                status: newStatus,
                image: newStatus,
                imageAction: newAction,
                availableActions: this.rfmDefaultAvailableActions
            };
            updateNeeded = true;
        }
        else {
            if (newStatus === RFMDisplay.unrate) {
                this.rfm.eventCount--;
            }
            else {
                this.rfm.eventCount++;
            }
            this.rfm.status = newStatus;
            this.rfm.image = newStatus;
            this.rfm.imageAction = newAction;
        }

        if (updateNeeded) {
            let rfm = this.record.rfm;
            let updateRfm = false;
            if (!rfm) {
                updateRfm = true;
                rfm = {};
            }
            rfm[this.type] = this.rfm;
            if (updateRfm) {
                this.record.rfm = rfm;
            }
        }
        this.action.update();
    }
}