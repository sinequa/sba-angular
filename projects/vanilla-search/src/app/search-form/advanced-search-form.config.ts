import {
    AdvancedFormType,
    BasicAdvancedConfig,
    AdvancedSelect,
    AdvancedRange,
    AdvancedInput,
    AdvancedCheckbox,
    AdvancedOperator,
} from "@sinequa/components/advanced";

export let advancedSearchFormConfig: Map<
    string,
    | BasicAdvancedConfig
    | AdvancedSelect
    | AdvancedRange
    | AdvancedInput
    | AdvancedCheckbox
> = new Map([
    [
        "sources",
        {
            aggregation: "",
            field: "treepath",
            name: "sources",
            label: "msg#searchForm.labels.treepath",
            list: "",
            multiple: true,
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Select,
        },
    ],
    [
        "authors",
        {
            aggregation: "",
            field: "authors",
            name: "authors",
            label: "msg#searchForm.labels.authors",
            list: "",
            multiple: true,
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Select,
        },
    ],
    [
        "size",
        {
            field: "size",
            name: "size",
            label: "msg#searchForm.labels.size",
            type: AdvancedFormType.Range,
            min: "",
            max: "",
        },
    ],
    [
        "modified",
        {
            field: "modified",
            name: "modified",
            label: "msg#searchForm.labels.modified",
            type: AdvancedFormType.Range,
            min: "",
            max: "",
        },
    ],
    [
        "multiInput",
        {
            field: "person",
            name: "multiInput",
            label: "msg#searchForm.labels.person",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.MultiInput,
        },
    ],
    [
        "input",
        {
            field: "docformat",
            name: "input",
            label: "msg#searchForm.labels.docformat",
            operator: AdvancedOperator.NONE,
            type: AdvancedFormType.Input,
        },
    ]
]);
