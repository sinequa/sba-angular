import { FacetDateParams } from '@sinequa/analytics/timeline';
import { FacetConfig, FacetListParams, FacetRangeParams, FacetRefineParams, FacetTagCloudParams } from '@sinequa/components/facet';
import { MetadataConfig } from '@sinequa/components/metadata';
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


export const INCYTE_FACETS_ALL: FacetConfig<FacetParams>[] = [
    {
        name: "projectcompound",
        aggregation: "ProjectCompoundTree",
        title: "Compounds by project",
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
        name: "study",
        aggregation: "StudyEntity",
        title: "Study Ids",
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
        name: "assay",
        aggregation: "AssayCsv",
        title: "Assays",
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
        name: "authors",
        aggregation: "Authors",
        title: "msg#facet.authors.title",
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
        name: "modified",
        aggregation: "Modified",
        title: "Last edition date",
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
        name: "docformat",
        aggregation: "DocFormat",
        title: "Format",
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
    }
];

export const INCYTE_FACETS_FILESHARES: FacetConfig<FacetParams>[] = [
    {
        name: "projectcompound",
        aggregation: "ProjectCompoundTree",
        title: "Compounds by project",
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
        name: "study",
        aggregation: "StudyEntity",
        title: "Study Ids",
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
        name: "assay",
        aggregation: "AssayCsv",
        title: "Assays",
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
        name: "authors",
        aggregation: "Authors",
        title: "msg#facet.authors.title",
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
        name: "modified",
        aggregation: "Modified",
        title: "Last edition date",
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
        name: "docformat",
        aggregation: "DocFormat",
        title: "Format",
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
    }
];

export const INCYTE_FACETS_CHEMCART: FacetConfig<FacetParams>[] = [
    {
        name: "projectcompound",
        aggregation: "ProjectCompoundTree",
        title: "Compounds by project",
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
        name: "experimentType",
        aggregation: "ExperimentType",
        title: "Experiment Type",
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
        name: "experimentStatus",
        aggregation: "ExperimentStatus",
        title: "Experiment Status",
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
        name: "assay",
        aggregation: "AssayCsv",
        title: "Assays",
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
        name: "authors",
        aggregation: "Authors",
        title: "msg#facet.authors.title",
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
        name: "experimentEndDate",
        aggregation: "ExperimentEndDate",
        title: "Experiment End Date",
        type: "date",
        icon: "fas fa-fw fa-calendar-day",
        parameters: {
            timelineAggregation: "ExperimentEndDate",
            showCount: true,
            allowPredefinedRange: true,
            allowCustomRange: true,
            showCustomRange: true,
            replaceCurrent: true,
            displayEmptyDistributionIntervals: true
        },
    },
    {
        name: "experimentSignDate",
        aggregation: "ExperimentSignDate",
        title: "Experiment Sign Date",
        type: "date",
        icon: "fas fa-fw fa-calendar-day",
        parameters: {
            timelineAggregation: "ExperimentSignDate",
            showCount: true,
            allowPredefinedRange: true,
            allowCustomRange: true,
            showCustomRange: true,
            replaceCurrent: true,
            displayEmptyDistributionIntervals: true
        }
    },
    {
        name: "docformat",
        aggregation: "DocFormat",
        title: "Format",
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
    }
];

export const INCYTE_FACETS_BENCHLING: FacetConfig<FacetParams>[] = [
    {
        name: "projectcompound",
        aggregation: "ProjectCompoundTree",
        title: "Compounds by project",
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
        name: "authors",
        aggregation: "Authors",
        title: "msg#facet.authors.title",
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
        name: "modified",
        aggregation: "Modified",
        title: "Last edition date",
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
    }
];

export const INCYTE_FACETS_PSILO: FacetConfig<FacetParams>[] = [
    {
        name: "projectcompound",
        aggregation: "ProjectCompoundTree",
        title: "Compounds by project",
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
    }
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
    },
    {
        name: 'MeshEntity',
        color: '#F5FFFA',
        bgColor: '#006400'
    },
    {
        name: 'StudyEntity',
        color: '#E6E6FA',
        bgColor: '#673AB7'
    },
    {
        name: 'AssayEntity',
        color: '#FFFFFF',
        bgColor: '#E65100'
    },
    {
        name: 'ProjectCompoundEntity',
        color: '#333333',
        bgColor: '#FA8072'
    }
];

export const SELECTORS_HIGHLIGHTS: {selectors: string[], highlights: PreviewHighlightColors[]}[] = [
    {
        selectors: ['.sq-metadata-tooltip span', 'sq-preview-extracts-panel span'],
        highlights: PREVIEW_HIGHLIGHTS
    }
];

export const METADATA_CONFIG: MetadataConfig[] = [
    {
        field: "treepath",
        label: "msg#metadata.treepath_label",
        icon: "fas fa-fw fa-folder-open",
        filterable: true,
        collapseRows: true
    },
    {
        field: "filename",
        label: "msg#metadata.filename_label",
        icon: "far fa-fw fa-file-alt"
    },
    {
        field: "authors",
        label: "msg#metadata.authorsPluralLabel",
        icon: "fas fa-fw fa-user-edit",
        filterable: true
    },
    {
        field: "modified",
        label: "msg#metadata.modifiedLabel",
        icon: "far fa-fw fa-calendar-alt"
    }
];
