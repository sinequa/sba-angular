import {AdvancedOperator} from "@sinequa/core/web-services";
import {Validator} from "@sinequa/core/validation";

export interface Control {
    type: string;
    active: boolean;
    field: string; // Name/Alias of column in the index
    operator: AdvancedOperator;
    label: string;
    autocompleteEnabled: boolean;
    name: string; // required if same field used in more than one control
    list: string;
    aggregation: string;
    min: string | number | Date;
    max: string | number | Date;
    pattern: string;
    validators: Validator[];
}



export interface Checkbox extends Control {
}

