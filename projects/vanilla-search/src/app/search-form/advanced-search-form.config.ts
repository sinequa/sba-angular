import { AdvancedFormType, Select } from "@sinequa/components/advanced";

export let advancedSearchFormConfig: Map<string, Select | any> = new Map([
    [
        "sources",
        {
            aggregation: "",
            field: "treepath",
            name: "sources",
            label: "Sources",
            list: "",
            multiple: true,
            type: AdvancedFormType.Select,
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
            type: AdvancedFormType.Select,
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
    ]
]);
