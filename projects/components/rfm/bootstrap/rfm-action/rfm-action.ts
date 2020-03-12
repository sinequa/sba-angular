import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Results, Record, RFMDisplay, RFMActionDisplay} from "@sinequa/core/web-services";
import {RFMService, CCRFM, RFMType} from "../../rfm.service";
import {Action} from "@sinequa/components/action";


@Component({
    selector: "sq-rfm-action",
    templateUrl: "./rfm-action.html"
})
export class BsRfmAction implements OnInit, OnDestroy {
    @Input() results: Results;
    @Input() record: Record;
    @Input() config: CCRFM.Action;  // Parent should bind this.appService.ccrfm[type]
    @Input() rfm: RFMActionDisplay; // Parent should bind record.rfm[type] and display this component *ngIf RFM data is set
    @Input() type: RFMType;         // click, like, important (default)
    @Input() size: string;
    action: Action;

    menuActions: RFMDisplay[];

    constructor(
        protected rFMService: RFMService) {
    }

    ngOnInit() {

        this.type = <RFMType> Utils.toLowerCase(this.type || "important");
                
        // List of menu actions from app config
        this.menuActions = this.rFMService.getMenuActions(this.config);
        
        this.buildAction();

    }

    ngOnDestroy() {
        
    }

    get hasRFMAction(): boolean {
        return this.record.rfmEnabled && this.config.enabled &&
            this.rfm.image != RFMDisplay.none;
    }

    get displayImgAction(): boolean {
        return this.rfm.imageAction != RFMDisplay.none;
    }
    
    get displayMenu(): boolean {
        return this.rfm.imageAction == RFMDisplay.none &&
            this.rfm.availableActions != RFMDisplay.none &&
            !this.config.noMenu;
    }

    get displayNoAction(): boolean {
        return this.rfm.imageAction == RFMDisplay.none &&
            this.rfm.availableActions == RFMDisplay.none;
    }

    getActionIcon(rfmDisplay: RFMDisplay): string {
        let name = RFMService.getActionName(rfmDisplay);
        return `rfm-${this.type}-${name}`;
    }

    buildAction() {
        this.action = new Action({
            children: [],
            updater: (item) => {
                item.icon = this.getActionIcon(this.rfm.image);
            }
        });
        if (this.displayImgAction) {
            this.action.action = (item) => {
                this.selectRfmDisplay(this.rfm.imageAction);
            };
        }
        if (this.displayMenu) {
            for (let rfmDisplay of this.menuActions) {
                this.action.children.push(new Action({
                    icon: this.getActionIcon(rfmDisplay),
                    data: rfmDisplay,
                    action: (item) => {
                        this.selectRfmDisplay(item.data);
                    },
                    updater: (item) => {
                        item.disabled = rfmDisplay === this.rfm.status; 
                    }
                }));
            }
        }
        this.action.update();
    }
    

    selectRfmDisplay(rfmDisplay: RFMDisplay) {
        if (rfmDisplay !== this.rfm.status) {
            let eventtype = RFMService.toAuditEventType(this.type, rfmDisplay);
            this.rFMService.notifyRfmAction(eventtype, this.record, this.results);
            // Update RFM data for the record (created a new RFM data can be necessary)
            this.updateRfmData(rfmDisplay, this.rfm.status);
        }
    }

    private updateRfmData(newStatus: RFMDisplay, newAction: RFMDisplay) {
        if (newStatus == RFMDisplay.unrate) {
            this.rfm.eventCount--;
        }
        else {
            this.rfm.eventCount++;
        }
        this.rfm.status = newStatus;
        this.rfm.image = newStatus;
        this.rfm.imageAction = newAction;

        this.buildAction();
    }

}