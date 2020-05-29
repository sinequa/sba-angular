import {Injectable, Inject, InjectionToken, Type} from "@angular/core";
import {Observable, of} from "rxjs";
import {LabelsWebService, AuditEventType, Record} from "@sinequa/core/web-services";
import {AppService, ValueItem} from "@sinequa/core/app-utils";
import {Utils, IRef} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {Action} from "@sinequa/components/action";
import {PrincipalWebService} from "@sinequa/core/web-services";
import {IntlService} from "@sinequa/core/intl";
import {SelectionService} from '@sinequa/components/selection';

export interface IFormData {
    labelRef: IRef<string>;
    public: boolean;
    autofocus: number;
}

export interface LabelsComponents {
    renameModal: Type<any>;
    labelActionItem: Type<any>;
}

export const enum UpdateLabelsAction {
    add,
    remove,
    rename,
    delete,
    bulkAdd,
    bulkRemove
}

export const LABELS_COMPONENTS = new InjectionToken<LabelsComponents>("LABELS_COMPONENTS");

@Injectable({
    providedIn: 'root',
})
export class LabelsService {
    private _privateLabelsPrefix: string | undefined;

    constructor(
        private labelsWebService: LabelsWebService,
        private appService: AppService,
        private searchService: SearchService,
        private modalService: ModalService,
        private principalWebService: PrincipalWebService,
        private intlService: IntlService,
        private selectionService: SelectionService,
        @Inject(LABELS_COMPONENTS) public labelsComponents: LabelsComponents,
        ){

        this.principalWebService.events.subscribe(
            (event) => {
                switch (event.type) {
                    case "changed":
                        this._privateLabelsPrefix = undefined;
                        break;
                }
            });

    }

    public get publicLabelsField(): string | undefined {
        return this.appService.cclabels ? this.appService.cclabels.publicLabelsField : undefined;
    }

    public get privateLabelsField(): string | undefined {
        return this.appService.cclabels ? this.appService.cclabels.privateLabelsField : undefined;
    }

    // From navbar

    selectLabel = (item: Action, $event: UIEvent) => {
        const formData = item.data as IFormData;
        const labels = this.split(formData.labelRef.value);
        if (labels.length) {
            this.selectLabels(labels, formData.public);
        }
    }

    renameLabel = (item: Action, $event: UIEvent) => {
        const formData = item.data as IFormData;
        const labels = this.split(formData.labelRef.value);
        if (labels.length) {
            const data: IRef<string> = { value: labels[0] };
            this.modalService.open(this.labelsComponents.renameModal, {model: data})
                .then((result) => {
                    if (result === ModalResult.OK) {
                        this.renameLabels(labels, data.value, formData.public);
                    }
                });
        }
    }

    deleteLabel = (item: Action, $event: UIEvent) => {
        const formData = item.data as IFormData;
        const _labels = formData.labelRef.value;
        const labels = this.split(_labels);
        if (labels.length) {
            this.modalService.yesNo("msg#labels.deleteLabelAreYouSure", {values: {name: _labels}})
                .then((result) => {
                    if (result === ModalResult.Yes) {
                        this.deleteLabels(labels, formData.public);
                    }
                });
        }
    }

    bulkAddLabel = (item: Action, $event: UIEvent) => {
        const formData = item.data as IFormData;
        const _labels = formData.labelRef.value;
        const labels = this.split(_labels);
        if (labels.length) {
            this.modalService.yesNo("msg#labels.bulkAddLabelAreYouSure", {values: {name: _labels}})
                .then((result) => {
                    if (result === ModalResult.Yes) {
                        this.bulkAddLabels(labels, formData.public);
                    }
                });
        }
    }

    bulkRemoveLabel = (item: Action, $event: UIEvent) => {
        const formData = item.data as IFormData;
        const _labels = formData.labelRef.value;
        const labels = this.split(_labels);
        if (labels.length) {
            this.modalService.yesNo("msg#labels.bulkRemoveLabelAreYouSure", {values: {name: _labels}})
                .then((result) => {
                    if (result === ModalResult.Yes) {
                        this.bulkRemoveLabels(labels, formData.public);
                    }
                });
        }
    }
    // END From navbar

    // From result selector

    public buildLabelsMenu(
        addLabels: (items: Action[], _public: boolean) => void,
        icon = "fas fa-tags", labelsText?, labelsTitle = "msg#labels.labels",
        publicLabelsText = "msg#labels.publicLabels", privateLabelsText = "msg#labels.privateLabels"): Action | undefined {

        if (!this.publicLabelsField && !this.privateLabelsField) {
            return undefined;
        }

        let children: Action[];
        const combined = !!this.publicLabelsField && !!this.privateLabelsField;

        if (combined) {
            children = [
                new Action({
                    text: publicLabelsText,
                    children: this._buildLabelsMenu(true, addLabels),
                    toggle: this.toggle
                }),
                new Action({
                    text: privateLabelsText,
                    children: this._buildLabelsMenu(false, addLabels),
                    toggle: this.toggle
                })
            ];
        }
        else if (!!this.publicLabelsField) {
            children = this._buildLabelsMenu(true, addLabels);
        }
        else if (!!this.privateLabelsField) {
            children = this._buildLabelsMenu(false, addLabels);
        }
        else {
            console.log("no labels configured");
            return undefined;
        }

        const menu = new Action({
            text: labelsText,
            title: labelsTitle,
            icon: icon,
            children: children
        });

        if (!combined) {
            menu.toggle = this.toggle;
        }

        return menu;
    }

    toggle = (item: Action, open: boolean) => {
        if (open) {
            const formItem = item.children[0];
            (<IFormData>formItem.data).autofocus++;
        }
    }

    public buildSelectionAction(): Action | undefined {
        const action = this.buildLabelsMenu(
            (items: Action[], _public: boolean) => {
                const formItem = items[0];
                items.push(
                    new Action({
                        text: _public? "msg#labels.addPublicLabelTitle" : "msg#labels.addPrivateLabelTitle",
                        action: (item, $event) => {
                            if ((<IFormData>formItem.data).labelRef.value) {
                                const labels = this.split((<IFormData>formItem.data).labelRef.value);
                                this.addLabels(labels, this.selectionService.getSelectedIds(), _public);
                            }
                        }
                    }));
                items.push(
                    new Action({
                        text: _public? "msg#labels.removePublicLabelTitle" : "msg#labels.removePrivateLabelTitle",
                        action: (item, $event) => {
                            if ((<IFormData>formItem.data).labelRef.value) {
                                const labels = this.split((<IFormData>formItem.data).labelRef.value);
                                this.removeLabels(labels, this.selectionService.getSelectedIds(), _public);
                            }
                        }
                    }));
            });
        if(action){
            action.updater = (action) => {
                action.hidden = !this.selectionService.haveSelectedRecords;
            };
            action.hidden = true;
        }
        return action;
    }

    // menu support
    private _makeFormItem(_public: boolean): Action {
        const action = new Action({
                component: this.labelsComponents.labelActionItem,
                data: <IFormData>{
                labelRef: {value: ""},
                public: _public,
                autofocus: 0,
            }
        });
        action.componentInputs = {
            model: action
        };
        return action;
    }


    // Build a standard labels menu with label entry form at the top and additional items added by a passed callback
    private _buildLabelsMenu(_public: boolean, addItems: (items: Action[], _public: boolean) => void): Action[] {
        const items: Action[] = [
            this._makeFormItem(_public),
            new Action({
                separator: true
            })
        ];
        addItems(items, _public);
        return items;
    }


    // Labels
    /**
     * The following methods update the modify the labels for some documents via
     * the LabelsWebService, and they update the records in searchService.results
     * (for immediate display)
     **/

    private updateLabels(action: UpdateLabelsAction, labels: string[], ids: string[], newLabel: string, _public: boolean) {

        if (!_public) {
            labels = <string[]>this.addPrivatePrefix(labels);
        }
        const field = this.appService.cclabels && this.appService.resolveColumnAlias(_public ?
            this.appService.cclabels.publicLabelsField : this.appService.cclabels.privateLabelsField);
        if (field && this.searchService.results && this.searchService.results.records) {
            for (let j = 0, jc = this.searchService.results.records.length; j < jc; j++) {
                const record = this.searchService.results.records[j];
                if (!ids || ids.indexOf(record.id) !== -1) {
                    let currentLabels: string[] = record[field];
                    if (action === UpdateLabelsAction.add) {
                        if (!currentLabels) {
                            currentLabels = [];
                        }
                    }
                    if (currentLabels) {
                        for (let k = 0, kc = labels.length; k < kc; k++) {
                            const label = labels[k];
                            let index;
                            switch (action) {
                                case UpdateLabelsAction.add:
                                case UpdateLabelsAction.bulkAdd:
                                    if (currentLabels.indexOf(label) === -1) {
                                        currentLabels.push(label);
                                    }
                                    break;
                                case UpdateLabelsAction.remove:
                                case UpdateLabelsAction.bulkRemove:
                                    index = currentLabels.indexOf(label);
                                    if (index !== -1) {
                                        currentLabels.splice(index, 1);
                                    }
                                    break;
                                case UpdateLabelsAction.rename:
                                    index = currentLabels.indexOf(label);
                                    if (index !== -1) {
                                        if (currentLabels.indexOf(newLabel) === -1) {
                                            currentLabels.splice(index, 1, newLabel);
                                        }
                                        else {
                                            currentLabels.splice(index, 1);
                                        }
                                    }
                                    break;
                                case UpdateLabelsAction.delete:
                                    index = currentLabels.indexOf(label);
                                    if (index !== -1) {
                                        currentLabels.splice(index, 1);
                                    }
                                    break;
                            }
                        }
                        record[field] = currentLabels;
                    }
                }
            }
        }
        //TODO - facets
    }

    addLabels(labels: string[], ids: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.add(labels, ids, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.add, labels, ids, "", _public);
            });
        return observable;
    }

    removeLabels(labels: string[], ids: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.remove(labels, ids, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.remove, labels, ids, "", _public);
            });
        return observable;
    }

    selectLabels(labels: string[], _public: boolean): Promise<boolean> {
        const field = this.appService.cclabels && (_public ?
            this.appService.cclabels.publicLabelsField : this.appService.cclabels.privateLabelsField);
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
                    display: display
                });
            }
        }

        this.searchService.addFieldSelect(field, items);
        return this.searchService.search(undefined,
            {
                type: AuditEventType.Label_Open,
                detail: {
                    label: !!labels ? labels.toString() : null,
                    public: _public
                }
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
                    values.forEach(value => {
                        if(labels.indexOf(value) === -1) {
                            labels.push(value);
                        }
                    });
                }
            }
        }
        return labels;
    }

    renameLabels(labels: string[], newLabel: string, _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.rename(labels, newLabel, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.rename, labels, [], newLabel, _public);
            });
        return observable;
    }

    deleteLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.delete(labels, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.delete, labels, [], "", _public);
            });
        return observable;
    }

    /**
     * Get the ids of the record currently in searchService.results
     */
    getCurrentRecordIds(): string[]{
        const ids: string[] = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (let i = 0, ic = this.searchService.results ? this.searchService.results.records.length : 0; i < ic; i++) {
                const record = this.searchService.results.records[i];
                ids.push(record.id);
            }
        }
        return ids;
    }

    getRecordFromId(id: string) : Record | undefined {
        let record: Record | undefined;
        if (this.searchService.results && this.searchService.results.records) {
            let rec : Record;
            for( let i=0, ic=this.searchService.results.records.length; !record && i<ic; i++) {
                rec = this.searchService.results.records[i];
                if (Utils.eq(rec.id, id)) record = rec;
            }
        }
        return record;
    }

    bulkAddLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkAdd(labels, this.searchService.query, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.bulkAdd, labels, this.getCurrentRecordIds(), "", _public);
            });
        return observable;
    }

    bulkRemoveLabels(labels: string[], _public: boolean): Observable<void> {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkRemove(labels, this.searchService.query, _public);
        Utils.subscribe(observable,
            () => {
                this.updateLabels(UpdateLabelsAction.bulkRemove, labels, this.getCurrentRecordIds(), "", _public);
            });
        return observable;
    }


    get privateLabelsPrefix(): string {
        if (!this.principalWebService.principal) {
            return "";
        }
        if (!this._privateLabelsPrefix && this.appService.cclabels) {
            if (this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                this._privateLabelsPrefix = Utils.addUrl("/", Utils.replace(this.principalWebService.principal.userId, "|", "/"), "/");
            }
            else {
                this._privateLabelsPrefix = this.principalWebService.principal.userId + "|";
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
        return labels.trim().split(/\s*;\s*/).filter((value) => {
            return value !== "";
        });
    }

    private _addPrivatePrefix(label: string): string {
        if (this.appService.cclabels && this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
            return Utils.addUrl(this.privateLabelsPrefix, label);
        }
        else {
            return this.privateLabelsPrefix + label;
        }
    }

    addPrivatePrefix(labels: string|string[]): string|string[] {
        if (typeof labels === "string") {
            return this._addPrivatePrefix(labels);
        }
        else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._addPrivatePrefix(labels[i]);
            }
            return labels;
        }
    }

    private _removePrivatePrefix(label: string): string {
        if (label.indexOf(this.privateLabelsPrefix) === 0) {
            if (this.appService.cclabels && this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                return label.slice(this.privateLabelsPrefix.length - 1);
            }
            else {
                return label.slice(this.privateLabelsPrefix.length);
            }
        }
        return label;
    }

    removePrivatePrefix(labels: string|string[]): string|string[] {
        if (typeof labels === "string") {
            return this._removePrivatePrefix(labels);
        }
        else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._removePrivatePrefix(labels[i]);
            }
            return labels;
        }
    }
}
