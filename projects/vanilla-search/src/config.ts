import { FacetConfig } from '@sinequa/components/facet';

/**
 * This list is used by Vanilla Search to activate key features in the UI.
 * The order below determines the order of menus, buttons, facets, etc.
 */
export const FEATURES: string[] = [
    "recent-documents",             // Keep track of recently opened documents and suggest them in the autocomplete
    "recent-queries",               // Keep track of recent queries and suggest them in the autocomplete
    "saved-queries",                // Allow users to save queries to easily replay them ang suggest them in the autocomplete
    "baskets",                      // Allow users to bookmark documents in "baskets" (aka "collections") and suggest them in the autocomplete
    "labels",                       // Allow users to tag documents with labels
    "alerts",                       // Allow users to subscribe to a regular alert for a particular query
    "suggests",                     // Display general text suggestions in the autocomplete
    "advanced-form",                // Display an advanced search form
    "keep-advanced-form-filters",   // When the user makes a new search query, do not reset the content of the autocomplete form
    "keep-tab",                     // When the user makes a new search query, stay on the same tab
    //"keep-filters",                 // When the user makes a new search query, do not reset the filters that are active (eg. from facets)
    "toggle-keep-filters",          // Display a button to toggle the "keep-filter" option
    //"voice-recognition",            // Display a button to trigger voice recognition (supported only on Chrome-based browsers and uses Google servers for processing)
];

export const FACETS: FacetConfig[] = [
    {
        name: "geo",
        title: "msg#facet.geo.title",
        type: "list",
        aggregation: "Geo",
        icon: "fas fa-globe-americas",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "company",
        title: "msg#facet.company.title",
        type: "list",
        aggregation: "Company",
        icon: "fas fa-building",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "person",
        title: "msg#facet.person.title",
        type: "list",
        aggregation: "Person",
        icon: "fas fa-user",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "docformat",
        title: "msg#facet.docformat.title",
        type: "list",
        aggregation: "DocFormat",
        icon: "far fa-file-word",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "modified",
        title: "msg#facet.modified.title",
        type: "list",
        aggregation: "Modified",
        icon: "fas fa-calendar-day",
        showCount: true,
        searchable: false,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "size",
        title: "msg#facet.size.title",
        type: "list",
        aggregation: "Size",
        icon: "fas fa-sort-amount-up-alt",
        showCount: true,
        searchable: false,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "documentlanguages",
        title: "msg#facet.documentlanguages.title",
        type: "list",
        aggregation: "DocumentLanguages",
        icon: "far fa-comment",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
    {
        name: "concepts",
        title: "msg#facet.concepts.title",
        type: "list",
        aggregation: "Concepts",
        icon: "fas fa-comment-dots",
        showCount: true,
        searchable: false,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
    },
];

export const METADATA: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
];
