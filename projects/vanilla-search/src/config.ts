import { FacetDateParams } from '@sinequa/analytics/timeline';
import { FacetConfig, FacetListParams, FacetMySearchParams, FacetRangeParams, FacetRefineParams, FacetTagCloudParams, FacetTreeParams } from '@sinequa/components/facet';
import { HelpFolderOptions } from '@sinequa/components/user-settings';

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
        name: "geo",
        title: "msg#facet.geo.title",
        type: "list",
        icon: "fas fa-globe-americas",
        parameters: {
            aggregation: "Geo",
            showCount: true,
            searchable: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false
        }
    },
    {
        name: "company",
        title: "msg#facet.company.title",
        type: "list",
        icon: "fas fa-building",
        parameters: {
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
        name: "person",
        title: "msg#facet.person.title",
        type: "list",
        icon: "fas fa-user",
        parameters: {
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
        name: "docformat",
        title: "msg#facet.docformat.title",
        type: "list",
        icon: "far fa-file-word",
        parameters: {
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
        name: "modified",
        title: "msg#facet.modified.title",
        type: "date",
        icon: "fas fa-calendar-day",
        parameters: {
            aggregation: "Modified",
            timelineAggregation: "Timeline",
            showCount: true,
            allowPredefinedRange: true,
            allowCustomRange: true,
            showCustomRange: true,
            replaceCurrent: true,
            displayEmptyDistributionIntervals: true
        }
    },
    {
        name: "size",
        title: "msg#facet.size.title",
        type: "list",
        icon: "fas fa-sort-amount-up-alt",
        parameters: {
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
        name: "documentlanguages",
        title: "msg#facet.documentlanguages.title",
        type: "list",
        icon: "far fa-comment",
        parameters: {
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
        name: "concepts",
        title: "msg#facet.concepts.title",
        type: "list",
        icon: "fas fa-comment-dots",
        parameters: {
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

export const HELP_DEFAULT_FOLDER_OPTIONS: HelpFolderOptions = {
    folder: 'vanilla-search',
    path: '/r/_sinequa/webpackages/help',
    indexFile: 'olh-index.html',
    useLocale: true,
    useLocaleAsPrefix: true
}