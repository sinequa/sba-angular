import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    OnDestroy,
} from "@angular/core";
import { Action } from "@sinequa/components/action";
import { LoginService } from "@sinequa/core/login";
import { LabelsService } from "../../labels.service";
import { Results } from "@sinequa/core/web-services";
import { Subscription } from "rxjs";

@Component({
    selector: "sq-labels-menu",
    templateUrl: "./labels-menu.component.html",
})
export class BsLabelsMenuComponent implements OnInit, OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() icon: string = "fas fa-tags";
    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = "xl";
    @Input() collapseBreakpoint: string = "sm";
    @Input() size: string;

    menu: Action | undefined;

    // Labels  actions
    renameAction: Action;
    deleteAction: Action;
    bulkAddAction: Action;
    bulkDeleteAction: Action;

    private _loginServiceSubscription: Subscription;

    constructor(
        public loginService: LoginService,
        public labelsService: LabelsService
    ) {
        this.renameAction = new Action({
            text: "msg#labels.renameLabel",
            title: "msg#labels.renameLabel",
            action: () => {
                this.labelsService.renameLabelModal();
            },
        });

        this.deleteAction = new Action({
            text: "msg#labels.deleteLabel",
            title: "msg#labels.deleteLabel",
            action: () => {
                this.labelsService.deleteLabelModal();
            },
        });

        this.bulkAddAction = new Action({
            text: "msg#labels.bulkAddLabel",
            title: "msg#labels.bulkAddLabel",
            action: () => {
                this.labelsService.bulkAddLabelModal();
            },
        });

        this.bulkDeleteAction = new Action({
            text: "msg#labels.bulkRemoveLabel",
            title: "msg#labels.bulkRemoveLabel",
            action: () => {
                this.labelsService.bulkRemoveLabelModal();
            },
        });
    }

    ngOnInit() {
        this._loginServiceSubscription = this.loginService.events.subscribe(
            (event) => {
                if (event.type === "session-changed") {
                    this.updateMenu();
                }
            }
        );
    }

    ngOnDestroy() {
        if (this._loginServiceSubscription) {
            this._loginServiceSubscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.results) {
            this.updateMenu();
        }
    }

    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }

        if (
            !this.labelsService.publicLabelsField &&
            !this.labelsService.privateLabelsField
        ) {
            this.menu = undefined;
            return;
        }

        const labelsActions = [this.renameAction, this.deleteAction];
        if (!!this.results && !!this.results.records) {
            labelsActions.push(this.bulkAddAction);
            labelsActions.push(this.bulkDeleteAction);
        }

        this.menu = new Action({
            icon: this.icon,
            text: "msg#labels.labels",
            children: labelsActions,
        });
    }
}
