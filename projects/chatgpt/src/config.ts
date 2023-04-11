import { FacetDateParams } from '@sinequa/analytics/timeline';
import { FacetConfig, FacetListParams, FacetRangeParams, FacetRefineParams, FacetTagCloudParams } from '@sinequa/components/facet';
import { PreviewHighlightColors } from '@sinequa/components/preview';
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

export type FacetParams = FacetListParams | FacetRangeParams | FacetRefineParams | FacetTagCloudParams | FacetDateParams;
export const FACETS: FacetConfig<FacetParams>[] = [
    {
        name: "geo",
        aggregation: "Geo",
        title: "msg#facet.geo.title",
        type: "list",
        icon: "fas fa-fw fa-globe-americas",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "company",
        aggregation: "Company",
        title: "msg#facet.company.title",
        type: "list",
        icon: "fas fa-fw fa-building",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "person",
        aggregation: "Person",
        title: "msg#facet.person.title",
        type: "list",
        icon: "fas fa-fw fa-user",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "docformat",
        aggregation: "DocFormat",
        title: "msg#facet.docformat.title",
        type: "list",
        icon: "far fa-fw fa-file-word",
        parameters: {
            showCount: true,
            searchable: false,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "modified",
        aggregation: "Modified",
        title: "msg#facet.modified.title",
        type: "date",
        icon: "fas fa-fw fa-calendar-day",
        parameters: {
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
        aggregation: "Size",
        title: "msg#facet.size.title",
        type: "list",
        icon: "fas fa-fw fa-sort-amount-up-alt",
        parameters: {
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
        aggregation: "DocumentLanguages",
        title: "msg#facet.documentlanguages.title",
        type: "list",
        icon: "far fa-fw fa-comment",
        parameters: {
            showCount: true,
            searchable: false,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "concepts",
        aggregation: "Concepts",
        title: "msg#facet.concepts.title",
        type: "list",
        icon: "fas fa-fw fa-comment-dots",
        parameters: {
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

export const PREVIEW_HIGHLIGHTS: PreviewHighlightColors[] = [
  {
    name: 'company',
    color: 'white',
    bgColor: '#FF7675'
  },
  {
    name: 'geo',
    color: 'white',
    bgColor: '#74B9FF'
  },
  {
    name: 'person',
    color: 'white',
    bgColor: '#00ABB5'
  },
  {
    name: 'extractslocations',
    color: 'black',
    bgColor: '#fffacd'
  },
  {
    name: 'matchlocations',
    color: 'black',
    bgColor: '#ff0'
  }
]
