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

export interface ListControl {
    field: string;
    label: string;
    name: string;
    list: string;
    aggregation: string;
}

export enum AdvancedFormType {
    Checkbox = "AdvancedFormCheckbox",
    Entry = "AdvancedFormEntry",
    Range = "AdvancedFormRange",
    Select = "AdvancedFormSelect",
    MultiEntry = "AdvancedFormMultiEntry"
}

export interface Checkbox extends Control {
}

export interface Entry extends Control {
}

export interface Range extends Control {
}

export interface Select extends ListControl {
    height: number;
    visibleThreshold: number;
    multiple: boolean;
}

export interface MultiEntry extends Control {
    nbVisibleLines?: number;
    distinct?: boolean;
}