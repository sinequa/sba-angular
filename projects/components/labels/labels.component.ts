import {Component, Input, OnChanges, HostBinding} from "@angular/core";
import {Utils, IRef} from "@sinequa/core/base";
import {AppService} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";
import {LabelsService} from "./labels.service";

@Component({
    selector: "sq-labels",
    // We need the two spans to get whitespace between each label
    // change size by adding h1-6 class to .sq-label div (default is h5)
    templateUrl: "./labels.component.html",
    styles: [`
.input-autocomplete{
    display: flex;
    flex-direction: column;
}
    `]
})
export class Labels implements OnChanges {
    @Input() record: Record;
    @Input() public: boolean;
    @Input() class: string; // to preserve any classes set on host by the caller
    @Input() field: string;
    private labelsField: string;
    showLabels: boolean;
    labels: string[];
    newLabelRef: IRef<string>;
    adding: boolean;

    @HostBinding("class") hostClasses;

    constructor(
        private appService: AppService,
        private labelsService: LabelsService) {
        this.adding = false;
        this.newLabelRef = {value: ""};
    }

    ngOnChanges() {
        this.labelsField = this.appService.resolveColumnAlias(this.field);
        this.showLabels = !!this.labelsField;
        this.hostClasses = [this.class, this.public ? "sq-labels-public" : "sq-labels-private"].join(" ");
        this.makeLabels();
    }

    private makeLabels() {
        if (!this.showLabels) {
            this.labels = [];
            return;
        }
        const labels = this.record[this.labelsField];
        if (Utils.isArray(labels)) {
            this.labels = this.labelsService.sort(labels.slice(), this.public);
        }
        else {
            this.labels = [];
        }
    }

    select(label: string) {
        if (!this.public) {
            label = <string>this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.selectLabels([label], this.public);
    }

    toggleAdd() {
        this.adding = !this.adding;
        if (this.adding) {
            // Reset initial value (desired?)
            this.newLabelRef.value = "";
        }
    }

    onSubmit(){
        if (this.newLabelRef.value) {
            const labels = this.labelsService.split(this.newLabelRef.value).filter((value) => { return this.labels.indexOf(value) === -1; });
            Utils.subscribe(this.labelsService.addLabels(labels, [this.record.id], this.public),
                (value) => {
                    this.adding = false;
                });
        }
    }

    clickOutside = () => {
        this.adding = false;
    }

    remove(
        index: number) {
        let label = this.labels[index];
        if (!this.public) {
            label = <string>this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.removeLabels([label], [this.record.id], this.public);
    }

}