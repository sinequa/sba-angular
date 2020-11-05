import { AdvancedFormType, AdvancedSelect, AdvancedRange, AdvancedInput, AdvancedCheckbox } from "@sinequa/components/advanced";
import { AdvancedOperator } from '@sinequa/core/web-services';

export let advancedSearchFormConfig: Map<string, AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox> = new Map([
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
            field: "company",
            name: "multiInput",
            label: "company",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.MultiInput
        }
    ],
    [
        "input",
        {
            field: "docformat",
            name: "input",
            label: "docformat",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Input
        }
    ],
    [
        "checkbox",
        {
            field: "filename",
            name: "checkbox",
            label: "filename",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Checkbox
        }
    ]
]);
