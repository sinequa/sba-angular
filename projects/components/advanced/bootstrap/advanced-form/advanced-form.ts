import {Component, Input, HostBinding} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Control} from "../advanced-models";

@Component({
    selector: "sq-advanced-form",
    templateUrl: "./advanced-form.html",
    styleUrls: ["./advanced-form.css"]
})
export class BsAdvancedForm {
    @Input() form: FormGroup;
    @Input() items: Control[];
    @Input() autocompleteEnabled: boolean;
    @Input() suggestQuery: string;
    @HostBinding("class.sq-flex-form") true; // class=sq-flex-form on wrapper component

    constructor() {
    }

}