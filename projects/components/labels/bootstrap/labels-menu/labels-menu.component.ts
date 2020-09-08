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
            text: "msg#renameLabel.title",
            title: "msg#renameLabel.title",
            action: () => {
                this.labelsService.renameLabelModal();
            },
        });

        this.deleteAction = new Action({
            text: "msg#deleteLabel.title",
            title: "msg#deleteLabel.title",
            action: () => {
                this.labelsService.deleteLabelModal();
            },
        });

        this.bulkAddAction = new Action({
            text: "msg#bulkAddLabel.title",
            title: "msg#bulkAddLabel.title",
            action: () => {
                this.labelsService.bulkAddLabelModal();
            },
        });

        this.bulkDeleteAction = new Action({
            text: "msg#bulkRemoveLabel.title",
            title: "msg#bulkRemoveLabel.title",
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

        const labelsActions: Action[] = [this.renameAction, this.deleteAction];

        /** Allow Bulk actions only if there are some results */
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
