import {
    AdvancedFormType,
    BasicAdvancedConfig,
    AdvancedSelect,
    AdvancedRange,
    AdvancedInput,
    AdvancedCheckbox,
    AdvancedOperator,
} from "@sinequa/components/advanced";

export const advancedSearchFormConfig: Map<
    string,
    | BasicAdvancedConfig
    | AdvancedSelect
    | AdvancedRange
    | AdvancedInput
    | AdvancedCheckbox
> = new Map();

const config: (
    | BasicAdvancedConfig
    | AdvancedSelect
    | AdvancedRange
    | AdvancedInput
    | AdvancedCheckbox
)[] = [
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
    {
        field: "size",
        name: "size",
        label: "msg#searchForm.labels.size",
        type: AdvancedFormType.Range,
        min: "",
        max: "",
    },
    {
        field: "modified",
        name: "modified",
        label: "msg#searchForm.labels.modified",
        type: AdvancedFormType.Range,
        min: "",
        max: "",
    },
    {
        field: "person",
        name: "multiInput",
        label: "msg#searchForm.labels.person",
        operator: AdvancedOperator.NONE,
        type: AdvancedFormType.MultiInput,
    },
    {
        field: "docformat",
        name: "input",
        label: "msg#searchForm.labels.docformat",
        operator: AdvancedOperator.NONE,
        type: AdvancedFormType.Input,
    },
];

config.forEach(
    (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => advancedSearchFormConfig.set(config.name, config)
);
