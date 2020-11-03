import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdvancedCheckbox } from "../../advanced-form.service";

@Component({
    selector: "sq-advanced-form-checkbox",
    templateUrl: "./advanced-form-checkbox.html",
})
export class BsAdvancedFormCheckbox implements OnInit {
    @Input() form: FormGroup;
    @Input() config: AdvancedCheckbox;
    name: string;
    label: string;

    constructor() {}

    ngOnInit() {
        this.name = this.config.name;
        this.label = this.config.label;
    }
}
