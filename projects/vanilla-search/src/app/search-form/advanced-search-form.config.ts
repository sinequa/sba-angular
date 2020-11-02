import { AdvancedFormType, AdvancedSelect, AdvancedRange, AdvancedInput } from "@sinequa/components/advanced";
import { AdvancedOperator } from '@sinequa/core/web-services';

export let advancedSearchFormConfig: Map<string, AdvancedSelect | AdvancedRange | AdvancedInput | any> = new Map([
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
        "multiEntry",
        {
            field: "docformat",
            name: "multiEntry",
            label: "Formats",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.MultiEntry
        }
    ],
    [
        "entry",
        {
            field: "filename",
            name: "entry",
            label: "filename",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Entry
        }
    ]
]);
