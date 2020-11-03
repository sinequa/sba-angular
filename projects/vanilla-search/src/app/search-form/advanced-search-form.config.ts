import { AdvancedFormType, AdvancedSelect, AdvancedRange, AdvancedInput, AdvancedCheckbox } from "@sinequa/components/advanced";
import { AdvancedOperator } from '@sinequa/core/web-services';

export let advancedSearchFormConfig: Map<string, AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox | any> = new Map([
    [
        "sources",
        {
            aggregation: "",
            field: "treepath",
            name: "sources",
            label: "Sources",
            list: "",
            multiple: true,
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Select
        }
    ],
    [
        "authors",
        {
            aggregation: "",
            field: "authors",
            name: "authors",
            label: "Authors",
            list: "",
            multiple: true,
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Select
        }
    ],
    [
        "size",
        {
            field: "size",
            name: "size",
            label: "From / To",
            type: AdvancedFormType.Range,
            min: "",
            max: ""
        }
    ],
    [
        "modified",
        {
            field: "modified",
            name: "modified",
            label: "From / To",
            type: AdvancedFormType.Range,
            min: "",
            max: ""
        }
    ],
    [
        "multiInput",
        {
            field: "docformat",
            name: "multiInput",
            label: "Formats",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.MultiInput
        }
    ],
    [
        "input",
        {
            field: "filename",
            name: "input",
            label: "filename",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Input
        }
    ],
    [
        "checkbox",
        {
            field: "company",
            name: "checkbox",
            label: "company",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Checkbox
        }
    ]
]);
