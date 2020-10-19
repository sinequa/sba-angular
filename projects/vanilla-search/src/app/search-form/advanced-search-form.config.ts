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
]);
