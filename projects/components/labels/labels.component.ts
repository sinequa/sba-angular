import {Component, Input, OnChanges, HostBinding} from "@angular/core";
import {Utils, IRef} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";
import {LabelsService} from "./labels.service";
import { AppService } from '@sinequa/core/app-utils';

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
      .sq-label-group {
        display: inline-block;
        &:not(:last-child) {
            margin-right: $spacer / 4;
        }
      }
      .sq-label {
        display: inline-block;
        margin-bottom: $spacer / 8;
      }
      .sq-labels-public {
          background-color: #4fc3f7;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          color: #fff;
      }
      .sq-labels-private {
          background-color: #7283a7;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          color: #fff;
      }
      .sq-label-remove {
          margin-left: $spacer / 16;
      }
      .chip {
        display: inline-block;
        height: 20px;
        padding: 0 6px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        cursor: pointer;
        border-radius: 16px;
        -webkit-transition: all .3s linear;
        transition: all .3s linear;
      }
      .clickable {
        cursor: pointer;
      }
        .clickable:hover {
            opacity: 85%;
      }
    `]
})
export class Labels implements OnChanges {
    @Input() record: Record;
    @Input() public: boolean;
    @Input() enableDelete: boolean = true;
    protected labelsField: string;
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
        const field = this.public ? this.labelsService.publicLabelsField : this.labelsService.privateLabelsField;
        this.labelsField = this.appService.resolveColumnAlias(field);
        this.showLabels = !!this.labelsField;
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

    // toggleAdd() {
    //     this.adding = !this.adding;
    //     if (this.adding) {
    //         // Reset initial value (desired?)
    //         this.newLabelRef.value = "";
    //     }
    // }

    // onSubmit(){
    //     if (this.newLabelRef.value) {
    //         const labels = this.labelsService.split(this.newLabelRef.value)
    //             .filter((value) => this.labels.indexOf(value) === -1);
    //         Utils.subscribe(this.labelsService.addLabels(labels, [this.record.id], this.public),
    //             (value) => {
    //                 this.adding = false;
    //             });
    //     }
    // }

    // clickOutside = () => {
    //     this.adding = false;
    // }

    remove(
        index: number) {
        let label = this.labels[index];
        if (!this.public) {
            label = <string>this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.removeLabels([label], [this.record.id], this.public);
    }

}
