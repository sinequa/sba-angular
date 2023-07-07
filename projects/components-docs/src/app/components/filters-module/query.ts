import { Query } from "@sinequa/core/app-utils";

export const querySample = new Query("");

querySample.addFilter({
  operator: "and",
  filters: [
    {field: "Source", value: "Documentation"},
    {
      operator: "or",
      filters: [
        {field: "Format", value: "pdf"},
        {field: "Format", value: "html"},
      ]
    }
  ]
});
