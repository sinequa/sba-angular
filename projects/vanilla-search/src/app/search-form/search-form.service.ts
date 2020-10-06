/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ValidatorFn,
} from "@angular/forms";

/* Services */
import { ValidationService, ValidatorType } from "@sinequa/core/validation";
import { AppService } from "@sinequa/core/app-utils";
import { AdvancedFormType, Select } from "@sinequa/components/advanced";

export let advancedSearchSchema: Map<string, any> = new Map([
    [
        "sources",
        {
            aggregation: "",
            autocompleteEnabled: true,
            field: "treepath",
            label: "Sources",
            list: "",
            multiple: true,
            type: AdvancedFormType.Select,
        }
    ]
]);

@Injectable({
    providedIn: "root",
})
export class SearchFormService {
    constructor(
        private formBuilder: FormBuilder,
        private validationService: ValidationService,
        private appService: AppService
    ) {}

    buildForm(): FormGroup {
        const search = new FormControl(
            {
                value: "",
                disabled: false,
            },
            {
                validators: [],
                updateOn: "change",
            }
        );

        const sources = new FormControl(
            {
                value: "",
                disabled: false,
            },
            {
                validators: [this.makeValidatorFn(advancedSearchSchema.get('sources').field, ValidatorType.Required)],
                updateOn: "change",
            }
        );

        return this.formBuilder.group({
            search: search,
            sources: sources,
        });
    }

    makeValidatorFn(field: string, type: ValidatorType, validatorValue?: any ): ValidatorFn {
        const column = this.appService.getColumn(field);
        const parser = column ? column.parser : undefined;
        let rangeType;
        if (column && (AppService.isInteger(column) || AppService.isDouble(column))) {
            rangeType = 0;
        } else if (column && AppService.isDate(column)) {
            rangeType = new Date();
        } else {
            rangeType = "";
        }
        let fn: ValidatorFn;
        switch (type) {
            case ValidatorType.Min:
                fn = this.validationService.minValidator(
                    validatorValue,
                    parser
                );
                break;
            case ValidatorType.Max:
                fn = this.validationService.maxValidator(
                    validatorValue,
                    parser
                );
                break;
            case ValidatorType.Required:
                fn = Validators.required;
                break;
            case ValidatorType.Email:
                fn = Validators.email;
                break;
            case ValidatorType.Pattern:
                fn = Validators.pattern(validatorValue);
                break;
            case ValidatorType.Integer:
                fn = this.validationService.integerValidator(parser);
                break;
            case ValidatorType.Number:
                fn = this.validationService.numberValidator(parser);
                break;
            case ValidatorType.Date:
                fn = this.validationService.dateValidator(parser);
                break;
            case ValidatorType.Range:
                fn = this.validationService.rangeValidator(rangeType, parser);
                break;
        }
        return fn;
    }
}
