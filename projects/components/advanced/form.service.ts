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

export interface Select {
    field: string;
    label: string;
    name: string;
    list: string;
    aggregation: string;
    multiple: boolean;
    operator: AdvancedOperator.NONE;
    type: string;
}

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
        config: Select,
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

    /**
     * Retrieve the value to be set to a specific form control from a given query
     * @param config the advanced-search-form field config
     */
    getAdvancedValue(config: Select | any): AdvancedValue | AdvancedValue[] {
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
    setAdvancedValue(value: AdvancedValue | AdvancedValue[], config: Select | any) {
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
            this.searchService.query?.setAdvancedValue(
                config.field,
                this._ensureAdvancedValue(config, value),
                config.operator,
                !this._isDistribution(config)
            );
        }
    }

    private _ensureAdvancedValue(
        config: Select | any,
        value: any
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

    private _isDistribution(config: Select | any): boolean {
        if (config.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(
                config.aggregation
            );
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }
}
