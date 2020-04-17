import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {AppService} from "@sinequa/core/app-utils";
import {Checkbox} from "../advanced-models";

@Component({
    selector: "sq-advanced-form-checkbox",
    templateUrl: "./advanced-form-checkbox.html"
})
export class BsAdvancedFormCheckbox implements OnInit {
    @Input() form: FormGroup;
    @Input() config: Checkbox;
    name: string;
    label: string;

    constructor(
        private appService: AppService) {
    }

    ngOnInit() {
        this.name = this.config.field || this.config.name;
        this.label = this.config.label || this.appService.getSingularLabel(this.config.field);
    }
}