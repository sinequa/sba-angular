import {
    Injectable,
    Inject,
    InjectionToken,
    Type,
    OnDestroy,
} from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import {
    PrincipalWebService,
    LabelsWebService,
    AuditEventType,
    LabelsRights,
} from "@sinequa/core/web-services";
import { AppService, ValueItem } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import { ModalService, ModalResult } from "@sinequa/core/modal";
import { Action } from "@sinequa/components/action";
import { IntlService } from "@sinequa/core/intl";
import { NotificationsService } from "@sinequa/core/notification";
import { SelectionService } from "@sinequa/components/selection";

export interface LabelsComponents {
    renameModal: Type<any>;
    labelsAutocompleteComponent: Type<any>;
    deleteModal: Type<any>;
    addModal: Type<any>;
    editModal: Type<any>;
}

export interface ModalProperties {
    public: boolean;
    allowEditPublicLabels: boolean;
    allowManagePublicLabels: boolean;
    allowNewLabels: boolean;
    disableAutocomplete: boolean;
    action: number;
    radioButtons: any[];
}

export const enum UpdateLabelsAction {
    add,
    remove,
    rename,
    delete,
    bulkAdd,
    bulkRemove,
    edit,
}

export const LABELS_COMPONENTS = new InjectionToken<LabelsComponents>(
    "LABELS_COMPONENTS"
);

@Injectable({
    providedIn: "root",
})
export class LabelsService implements OnDestroy {
    private _privateLabelsPrefix: string | undefined;
    private static readonly defaultLabelsRights: LabelsRights = {
        canManagePublicLabels: true,
        canEditPublicLabels: true,
    };
    private labelsRightsSubscription: Subscription | undefined;
    private labelsRights: LabelsRights | undefined;

    constructor(
        private labelsWebService: LabelsWebService,
        private appService: AppService,
        private searchService: SearchService,
        private modalService: ModalService,
        private principalWebService: PrincipalWebService,
        private intlService: IntlService,
        private notificationService: NotificationsService,
        private selectionService: SelectionService,
        @Inject(LABELS_COMPONENTS) public labelsComponents: LabelsComponents
    ) {
        this.principalWebService.events.subscribe((event) => {
            switch (event.type) {
                case "changed":
                    this._privateLabelsPrefix = undefined;
                    this.labelsRights = undefined;
                    this.labelsRightsSubscription = undefined;
                    break;
            }
        });
    }

    public get publicLabelsField(): string | undefined {
        return this.appService.cclabels
            ? this.appService.cclabels.publicLabelsField
            : undefined;
    }

    public get privateLabelsField(): string | undefined {
        return this.appService.cclabels
            ? this.appService.cclabels.privateLabelsField
            : undefined;
    }

    public get labelsAutoSuggestWildcard(): string | undefined {
        return this.appService.cclabels
            ? this.appService.cclabels.labelsAutoSuggestWildcard
            : undefined;
    }

    public get allowPublicLabelsManagement(): boolean {
        return this.appService.cclabels
            ? this.appService.cclabels.allowPublicLabelsCreation
            : false;
    }

    public get allowPublicLabelsEdition(): boolean {
        return this.appService.cclabels
            ? this.appService.cclabels.allowPublicLabelsModification
            : false;
    }

    public get userLabelsRights(): LabelsRights {
        let rights: LabelsRights | undefined;
        if (!this.labelsRights) {
            if (!this.labelsRightsSubscription) {
                const observable = this.labelsWebService.getUserRights();
                this.labelsRightsSubscription = Utils.subscribe(
                    observable,
                    (response) => (rights = response)
                );
            } else {
                rights = LabelsService.defaultLabelsRights;
            }
            this.labelsRights = !!rights
                ? rights
                : LabelsService.defaultLabelsRights;
        }
        return this.labelsRights;
    }

    ngOnDestroy() {
        if (this.labelsRightsSubscription) {
            this.labelsRightsSubscription.unsubscribe();
        }
    }

    /** From navbar */
    public renameLabelModal(): Promise<ModalResult> {
        const data = {
            oldValues: [],
            newValue: "",
            properties: this._modalProperties(UpdateLabelsAction.rename),
        };
        return this.modalService.open(this.labelsComponents.renameModal, {
            model: data,
        });
    }

    public deleteLabelModal(): Promise<ModalResult> {
        const data = {
            values: [],
            properties: this._modalProperties(UpdateLabelsAction.delete),
        };
        return this.modalService.open(this.labelsComponents.deleteModal, {
            model: data,
        });
    }

    public bulkAddLabelModal(): Promise<ModalResult> {
        const data = {
            values: [],
            properties: this._modalProperties(UpdateLabelsAction.bulkAdd),
        };
        return this.modalService.open(this.labelsComponents.addModal, {
            model: data,
        });
    }

    public bulkRemoveLabelModal(): Promise<ModalResult> {
        const data = {
            values: [],
            properties: this._modalProperties(UpdateLabelsAction.bulkRemove),
        };
        return this.modalService.open(this.labelsComponents.deleteModal, {
            model: data,
        });
    }

    private _modalProperties(action: number): ModalProperties {
        const allowManagePublicLabels: boolean =
            this.allowPublicLabelsManagement &&
            this.userLabelsRights &&
            this.userLabelsRights.canManagePublicLabels;
        const allowEditPublicLabels: boolean =
            this.allowPublicLabelsEdition &&
            this.userLabelsRights &&
            this.userLabelsRights.canEditPublicLabels;
        let allowNewLabels: boolean = false;
        let radioButtonsConf: any;

        switch (action) {
            case UpdateLabelsAction.rename:
            case UpdateLabelsAction.remove:
            case UpdateLabelsAction.delete:
            case UpdateLabelsAction.bulkRemove:
                allowNewLabels = false;
                break;
            case UpdateLabelsAction.add:
            case UpdateLabelsAction.bulkAdd:
            case UpdateLabelsAction.edit:
                allowNewLabels = true;
                break;
            default:
                break;
        }

        switch (action) {
            case UpdateLabelsAction.rename:
            case UpdateLabelsAction.delete:
                radioButtonsConf = this._getModalRadioButtonsConf(
                    allowManagePublicLabels
                );
                break;
            case UpdateLabelsAction.add:
            case UpdateLabelsAction.bulkAdd:
            case UpdateLabelsAction.remove:
            case UpdateLabelsAction.bulkRemove:
            case UpdateLabelsAction.edit:
                radioButtonsConf = this._getModalRadioButtonsConf(
                    allowManagePublicLabels || allowEditPublicLabels
                );
                break;
            default:
                break;
        }

        return {
            allowEditPublicLabels: allowEditPublicLabels,
            allowManagePublicLabels: allowManagePublicLabels,
            allowNewLabels: allowNewLabels,
            action: action,
            ...radioButtonsConf,
        };
    }

    private _getModalRadioButtonsConf(publicRight: boolean): any {
        let isPublic: boolean = true;
        let disableAutocomplete: boolean = false;
        let radioButtons: any[] = [];
        let publicRadioButton = {
            id: "publicLabel",
            name: "msg#labels.public",
            value: true,
            disabled: false,
            checked: true,
        };
        let privateRadioButton = {
            id: "privateLabel",
            name: "msg#labels.private",
            value: false,
            disabled: false,
            checked: false,
        };
        if (!!this.publicLabelsField && !!this.privateLabelsField) {
            if (publicRight) {
                isPublic = true;
                radioButtons = [publicRadioButton, privateRadioButton];
            } else {
                isPublic = false;
                publicRadioButton = {
                    ...publicRadioButton,
                    disabled: true,
                    checked: false,
                };
                privateRadioButton = {
                    ...privateRadioButton,
                    disabled: true,
                    checked: true,
                };
                radioButtons = [publicRadioButton, privateRadioButton];
            }
        } else if (!!this.publicLabelsField) {
            if (publicRight) {
                isPublic = true;
                publicRadioButton = {
                    ...publicRadioButton,
                    disabled: true,
                    checked: true,
                };
                radioButtons = [publicRadioButton];
            } else {
                isPublic = false;
                disableAutocomplete = true;
                publicRadioButton = {
                    ...publicRadioButton,
                    disabled: true,
                    checked: false,
                };
                radioButtons = [publicRadioButton];
            }
        } else if (!!this.privateLabelsField) {
            isPublic = false;
            privateRadioButton = {
                ...privateRadioButton,
                disabled: true,
                checked: true,
            };
            radioButtons = [privateRadioButton];
        }

        return {
            public: isPublic,
            disableAutocomplete: disableAutocomplete,
            radioButtons: radioButtons,
        };
    }
    /** END From navbar */

    /** From result selector */
    public buildSelectionAction(): Action | undefined {
        if (!this.publicLabelsField && !this.privateLabelsField) {
            return undefined;
        }
        const action = new Action({
            icon: "fas fa-tags",
            title: "msg#labels.labels",
            action: () => {
                this.editLabelModal();
            },
        });
        if (action) {
            action.updater = (action) => {
                action.hidden = !this.selectionService.haveSelectedRecords;
            };
            action.hidden = true;
        }
        return action;
    }

    public editLabelModal(): Promise<ModalResult> {
        const data = {
            valuesToBeAdded: [],
            valuesToBeRemoved: [],
            properties: this._modalProperties(UpdateLabelsAction.edit),
        };
        return this.modalService.open(this.labelsComponents.editModal, {
            model: data,
        });
    }
    /** END result selector */


    addLabels(
        labels: string[],
        ids: string[],
        _public: boolean
    ): Observable<void> {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.add(labels, ids, _public);
        return observable;
    }

    removeLabels(
        labels: string[],
        ids: string[],
        _public: boolean
    ): Observable<void> {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.remove(labels, ids, _public);
        return observable;
    }

    selectLabels(labels: string[], _public: boolean): Promise<boolean> {
        const field =
            this.appService.cclabels &&
            (_public
                ? this.appService.cclabels.publicLabelsField
                : this.appService.cclabels.privateLabelsField);
        if (!field) {
            return Promise.resolve(false);
        }
        const items: ValueItem[] = [];
        const selectedLabels: string[] = this.getSelectedLabels(field);
        for (let label of labels) {
            const display = label;
            if (!_public) {
                label = <string>this.addPrivatePrefix(label);
            }
            if (selectedLabels.indexOf(label) === -1) {
                items.push({
                    value: label,
                    display: display,
                });
            }
        }

        this.searchService.addFieldSelect(field, items);
        return this.searchService.search(undefined, {
            type: AuditEventType.Label_Open,
            detail: {
                label: !!labels ? labels.toString() : null,
                public: _public,
            },
        });
    }

    /**
     * Retrieves the labels that are not in the current filters of breadcrumbs
     *
     * @param field The column index containing the labels.
     * @returns The selected labels
     */
    private getSelectedLabels(field: string): string[] {
        const labels: string[] = [];
        if (field && this.searchService.breadcrumbs?.activeSelects) {
            for (const select of this.searchService.breadcrumbs.activeSelects) {
                if (select.expr) {
                    const values = select.expr.getValues(field);
                    values.forEach((value) => {
                        if (labels.indexOf(value) === -1) {
                            labels.push(value);
                        }
                    });
                }
            }
        }
        return labels;
    }

    renameLabels(
        labels: string[],
        newLabel: string,
        _public: boolean
    ): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.rename(
            labels,
            newLabel,
            _public
        );
        Utils.subscribe(
            observable,
            () => {},
            () => {
                this.notificationService.error("msg#renameLabel.errorFeedback");
            },
            () => {
                this.notificationService.success(
                    "msg#renameLabel.successFeedback"
                );
                this.searchService.search(); /** Update the display immediately in the components and facets*/
            }
        );
        return observable;
    }

    deleteLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.delete(labels, _public);
        Utils.subscribe(
            observable,
            () => {},
            () => {
                this.notificationService.error("msg#deleteLabel.errorFeedback");
            },
            () => {
                this.notificationService.success(
                    "msg#deleteLabel.successFeedback"
                );
                this.searchService.search(); /** Update the display immediately in the components and facets*/
            }
        );
        return observable;
    }

    bulkAddLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkAdd(
            labels,
            this.searchService.query,
            _public
        );
        Utils.subscribe(
            observable,
            () => {},
            () => {
                this.notificationService.error(
                    "msg#bulkAddLabel.errorFeedback"
                );
            },
            () => {
                this.notificationService.success(
                    "msg#bulkAddLabel.successFeedback"
                );
                this.searchService.search(); /** Update the display immediately in the components and facets*/
            }
        );
        return observable;
    }

    bulkRemoveLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkRemove(
            labels,
            this.searchService.query,
            _public
        );
        Utils.subscribe(
            observable,
            () => {},
            () => {
                this.notificationService.error(
                    "msg#bulkRemoveLabel.errorFeedback"
                );
            },
            () => {
                this.notificationService.success(
                    "msg#bulkRemoveLabel.successFeedback"
                );
                this.searchService.search(); /** Update the display immediately in the components and facets*/
            }
        );
        return observable;
    }

    get privateLabelsPrefix(): string {
        if (!this.principalWebService.principal) {
            return "";
        }
        if (!this._privateLabelsPrefix && this.appService.cclabels) {
            if (
                this.appService.isTree(
                    this.appService.cclabels.privateLabelsField
                )
            ) {
                this._privateLabelsPrefix = Utils.addUrl(
                    "/",
                    Utils.replace(
                        this.principalWebService.principal.userId,
                        "|",
                        "/"
                    ),
                    "/"
                );
            } else {
                this._privateLabelsPrefix =
                    this.principalWebService.principal.userId + "|";
            }
        }
        return this._privateLabelsPrefix || "";
    }

    sort(labels: string[], _public: boolean): string[] {
        if (!labels) return labels;
        return labels.sort((a, b) => {
            if (!a) return -1;
            if (!b) return 1;
            if (!_public) {
                a = <string>this.removePrivatePrefix(a);
                b = <string>this.removePrivatePrefix(b);
            }
            a = this.intlService.formatMessage(a);
            b = this.intlService.formatMessage(b);
            return a.localeCompare(b);
        });
    }

    split(labels: string): string[] {
        if (!labels) {
            return [];
        }
        return labels
            .trim()
            .split(/\s*;\s*/)
            .filter((value) => {
                return value !== "";
            });
    }

    private _addPrivatePrefix(label: string): string {
        if (
            this.appService.cclabels &&
            this.appService.isTree(this.appService.cclabels.privateLabelsField)
        ) {
            return Utils.addUrl(this.privateLabelsPrefix, label);
        } else {
            return this.privateLabelsPrefix + label;
        }
    }

    addPrivatePrefix(labels: string | string[]): string | string[] {
        if (typeof labels === "string") {
            return this._addPrivatePrefix(labels);
        } else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._addPrivatePrefix(labels[i]);
            }
            return labels;
        }
    }

    private _removePrivatePrefix(label: string): string {
        if (label.indexOf(this.privateLabelsPrefix) === 0) {
            if (
                this.appService.cclabels &&
                this.appService.isTree(
                    this.appService.cclabels.privateLabelsField
                )
            ) {
                return label.slice(this.privateLabelsPrefix.length - 1);
            } else {
                return label.slice(this.privateLabelsPrefix.length);
            }
        }
        return label;
    }

    removePrivatePrefix(labels: string | string[]): string | string[] {
        if (typeof labels === "string") {
            return this._removePrivatePrefix(labels);
        } else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._removePrivatePrefix(labels[i]);
            }
            return labels;
        }
    }
}
