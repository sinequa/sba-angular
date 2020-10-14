import { AdvancedFormType } from '@sinequa/components/advanced';

export let advancedSearchFormConfig: Map<string, any> = new Map([
  [
      "sources",
      {
          aggregation: "",
          autocompleteEnabled: true,
          field: "treepath",
          name: "sources",
          label: "Sources",
          list: "",
          multiple: true,
          type: AdvancedFormType.Select
      }
  ]
]);
