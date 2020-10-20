import { AdvancedFormType, Select, Range, Entry } from "@sinequa/components/advanced";
import { AdvancedOperator } from '@sinequa/core/web-services';

export let advancedSearchFormConfig: Map<string, Select | Range | Entry | any> = new Map([
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
            field: "treepath",
            name: "multiEntry",
            label: "Sources multi entry",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.MultiEntry,
            min: "",
            max: ""
        }
    ]
]);
