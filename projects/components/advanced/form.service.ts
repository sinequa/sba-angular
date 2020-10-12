/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    AsyncValidatorFn,
} from "@angular/forms";

/* Services */
import { AdvancedValue, AdvancedOperator } from "@sinequa/core/web-services";
import { AdvancedFormType } from "./bootstrap";
import { Utils } from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";

@Injectable({
    providedIn: "root",
})
export class FormService {
    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public formBuilder: FormBuilder
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

        return this.formBuilder.group({
            search: search,
        });
    }

    createSelectControl(
        config: any,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return new FormControl(
            {
                value: this.searchService.query?.getAdvancedValue(
                    config.field,
                    config.operator
                ),
                disabled: false,
            },
            {
                validators: !!validators ? validators : [],
                asyncValidators: !!asyncValidators ? asyncValidators : [],
                updateOn: "change",
            }
        );
    }

    // makeValidatorFn(field: string, type: ValidatorType, validatorValue?: any ): ValidatorFn {
    //     const column = this.appService.getColumn(field);
    //     const parser = column ? column.parser : undefined;
    //     let rangeType;
    //     if (column && (AppService.isInteger(column) || AppService.isDouble(column))) {
    //         rangeType = 0;
    //     } else if (column && AppService.isDate(column)) {
    //         rangeType = new Date();
    //     } else {
    //         rangeType = "";
    //     }
    //     let fn: ValidatorFn;
    //     switch (type) {
    //         case ValidatorType.Min:
    //             fn = this.validationService.minValidator(
    //                 validatorValue,
    //                 parser
    //             );
    //             break;
    //         case ValidatorType.Max:
    //             fn = this.validationService.maxValidator(
    //                 validatorValue,
    //                 parser
    //             );
    //             break;
    //         case ValidatorType.Required:
    //             fn = Validators.required;
    //             break;
    //         case ValidatorType.Email:
    //             fn = Validators.email;
    //             break;
    //         case ValidatorType.Pattern:
    //             fn = Validators.pattern(validatorValue);
    //             break;
    //         case ValidatorType.Integer:
    //             fn = this.validationService.integerValidator(parser);
    //             break;
    //         case ValidatorType.Number:
    //             fn = this.validationService.numberValidator(parser);
    //             break;
    //         case ValidatorType.Date:
    //             fn = this.validationService.dateValidator(parser);
    //             break;
    //         case ValidatorType.Range:
    //             fn = this.validationService.rangeValidator(rangeType, parser);
    //             break;
    //     }
    //     return fn;
    // }

    /**
     * Retrieve the value to be set to a specific form control from a given query
     * @param config the advanced-search-form field config
     */
    getAdvancedValue(config: any): AdvancedValue | AdvancedValue[] {
        if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
            const range: AdvancedValue[] = [];
            range.push(
                this.searchService.query?.getAdvancedValue(
                    config.field,
                    AdvancedOperator.GTE
                )
            );
            range.push(
                this.searchService.query?.getAdvancedValue(
                    config.field,
                    AdvancedOperator.LTE
                )
            );
            return range;
        } else {
            const value:
                | AdvancedValue
                | AdvancedValue[] = this.searchService.query?.getAdvancedValue(
                config.field,
                config.operator
            );
            return value;
        }
    }

    /**
     * Update the query with the new values
     * @param value new value to be updated in the query
     * @param config the advanced-search-form field config
     */
    setAdvancedValue(value: AdvancedValue | AdvancedValue[], config: any) {
        if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
            const range = value;
            const from = Utils.isArray(range)
                ? this._ensureAdvancedValue(config, range[0])
                : undefined;
            const to = Utils.isArray(range)
                ? this._ensureAdvancedValue(config, range[1])
                : undefined;
            this.searchService.query?.setAdvancedValue(
                config.field,
                from,
                AdvancedOperator.GTE
            );
            this.searchService.query?.setAdvancedValue(
                config.field,
                to,
                AdvancedOperator.LTE
            );
        } else {
            console.log(this.searchService.query);
            if (!Utils.isArray(value)) {
                this.searchService.query?.setAdvancedValue(
                    config.field,
                    this._ensureAdvancedValue(config, value),
                    config.operator,
                    !this._isDistribution(config)
                );
            }
            console.log(this.searchService.query);
        }
    }

    private _ensureAdvancedValue(
        config: any,
        value: AdvancedValue
    ): AdvancedValue {
        if (value !== undefined) {
            const column = this.appService.getColumn(config.field);
            if (column) {
                if (Utils.isString(value)) {
                    if (!this._isDistribution(config)) {
                        if (AppService.isDate(column)) {
                            value = Utils.toDate(value);
                        } else if (AppService.isInteger(column)) {
                            if (Utils.testInteger(value)) {
                                value = Utils.toInt(value);
                            }
                        } else if (AppService.isDouble(column)) {
                            if (Utils.testFloat(value)) {
                                value = Utils.toNumber(value);
                            }
                        } else if (AppService.isBoolean(column)) {
                            value = Utils.isTrue(value);
                        }
                    }
                }
            }
        }
        return value;
    }

    private _isDistribution(config: any): boolean {
        if (config.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(
                config.aggregation
            );
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }
}
