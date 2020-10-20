import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppService } from "@sinequa/core/app-utils";
import { CCColumn } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { Entry } from '../../form.service';

@Component({
    selector: "sq-advanced-form-entry",
    templateUrl: "./advanced-form-entry.html",
    styles: [
        `
            .input-autocomplete {
                display: flex;
                flex-direction: column;
            }
        `,
    ],
})
export class BsAdvancedFormEntry implements OnInit, AfterViewInit {
    @Input() form: FormGroup;
    @Input() config: Entry;
    @Input() autocompleteEnabled: boolean;
    @Input() suggestQuery: string;
    name: string;
    label: string;
    column: CCColumn | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    initialized = false;

    constructor(public appService: AppService) {}

    get isDate(): boolean {
        return !!this.column && AppService.isDate(this.column);
    }

    ngOnInit() {
        this.name = this.config.name;
        this.label = this.config.label;
        this.column = this.appService.getColumn(this.config.field);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.config.min)
                ? this.config.min
                : undefined;
            this.maxDate = Utils.isDate(this.config.max)
                ? this.config.max
                : undefined;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;
        }, 500);
    }
}
