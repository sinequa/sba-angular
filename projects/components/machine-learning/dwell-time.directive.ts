import {Directive, Input, HostListener, OnInit, OnDestroy} from "@angular/core";
import {MlAuditService} from "./ml-audit.service";

export interface DwellTimeOptions {
    actionType: MlAuditService.ActionType;
    docId: string;
}

@Directive({
    selector: "[sqDwellTime]"
})
export class DwellTime implements OnInit, OnDestroy {
    @Input("sqDwellTime") options: DwellTimeOptions;
    action: MlAuditService.Action | undefined;

    constructor(
        protected mlAuditService: MlAuditService) {
    }

    ngOnInit() {
        if (this.options.actionType === "preview") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.subType = "start";
            this.mlAuditService.notifyEvent(this.action);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }

    ngOnDestroy() {
        if (this.options.actionType === "preview") {
            if (this.action) {
                this.mlAuditService.endAction(this.action);
                this.action = undefined;
            }
        }
    }

    @HostListener("mouseenter", ["$event"])
    onMouseEnter(event: MouseEvent) {
        if (this.options.actionType === "over") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }

    @HostListener("mouseleave", ["$event"])
    onMouseLeave(event: MouseEvent) {
        if (this.options.actionType === "over") {
            if (this.action) {
                this.action.dwellTime = this.mlAuditService.calcDwellTime(this.action);
                this.action.timestamp = undefined;
                this.mlAuditService.notifyEvent(this.action);
                this.action = undefined;
            }
        }
    }
}