import { FacetConfig } from "@sinequa/components/facet";

export const FACETS: FacetConfig<{}>[] = [
  {
    name: "geo",
    title: "msg#facet.geo.title",
    type: "list",
    aggregation: "Geo",
    icon: "fas fa-globe-americas",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "company",
    title: "msg#facet.company.title",
    type: "list",
    aggregation: "Company",
    icon: "fas fa-building",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "person",
    title: "msg#facet.person.title",
    type: "list",
    aggregation: "Person",
    icon: "fas fa-user",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "docformat",
    title: "msg#facet.docformat.title",
    type: "list",
    aggregation: "DocFormat",
    icon: "far fa-file-word",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "modified",
    title: "msg#facet.modified.title",
    type: "list",
    aggregation: "Modified",
    icon: "fas fa-calendar-day",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "size",
    title: "msg#facet.size.title",
    type: "list",
    aggregation: "Size",
    icon: "fas fa-sort-amount-up-alt",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "documentlanguages",
    title: "msg#facet.documentlanguages.title",
    type: "list",
    aggregation: "DocumentLanguages",
    icon: "far fa-comment",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
  {
    name: "concepts",
    title: "msg#facet.concepts.title",
    type: "list",
    aggregation: "Concepts",
    icon: "fas fa-comment-dots",
    parameters: {
      showCount: true,
      searchable: true,
      allowExclude: true,
      allowOr: true,
      allowAnd: false,
      displayEmptyDistributionIntervals: false,
    }
  },
];
