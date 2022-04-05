import { FacetDateParams } from '@sinequa/analytics/timeline';
import { FacetConfig, FacetListParams, FacetMySearchParams, FacetRangeParams, FacetRefineParams, FacetTagCloudParams, FacetTreeParams } from '@sinequa/components/facet';

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

export type FacetParams = FacetListParams | FacetTreeParams | FacetMySearchParams | FacetRangeParams | FacetRefineParams | FacetTagCloudParams | FacetDateParams;
export const FACETS: FacetConfig<FacetParams>[] = [
    {
        title: "msg#facet.geo.title",
        type: "list",
        icon: "fas fa-globe-americas",
        parameters: {
            aggregation: "Geo",
            name: "geo",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.company.title",
        type: "list",
        icon: "fas fa-building",
        parameters: {
            name: "company",
            aggregation: "Company",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.person.title",
        type: "list",
        icon: "fas fa-user",
        parameters: {
            name: "person",
            aggregation: "Person",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.docformat.title",
        type: "list",
        icon: "far fa-file-word",
        parameters: {
            name: "docformat",
            aggregation: "DocFormat",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.modified.title",
        type: "date",
        icon: "fas fa-calendar-day",
        parameters: {
            name: "modified",
            aggregation: "Modified",
            field: "modified",
            timelineAggregationName: "Timeline",
            showCount: true,
            allowPredefinedRange: true,
            allowCustomRange: true,
            showCustomRange: true,
            replaceCurrent: true,
            displayEmptyDistributionIntervals: true
        }
    },
    {
        title: "msg#facet.size.title",
        type: "list",
        icon: "fas fa-sort-amount-up-alt",
        parameters: {
            name: "size",
            aggregation: "Size",
            showCount: true,
            searchable: false,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.documentlanguages.title",
        type: "list",
        icon: "far fa-comment",
        parameters: {
            name: "documentlanguages",
            aggregation: "DocumentLanguages",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        title: "msg#facet.concepts.title",
        type: "list",
        icon: "fas fa-comment-dots",
        parameters: {
            name: "concepts",
            aggregation: "Concepts",
            showCount: true,
            searchable: false,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    }
];

export const METADATA: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
];
