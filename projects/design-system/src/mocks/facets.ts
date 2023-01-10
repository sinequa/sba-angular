import { FacetDateParams } from "@sinequa/analytics/timeline";
import { FacetConfig, FacetListParams, FacetMySearchParams, FacetRangeParams, FacetRefineParams, FacetTagCloudParams, FacetTreeParams } from '@sinequa/components/facet';

export type FacetParams = FacetListParams | FacetTreeParams | FacetMySearchParams | FacetRangeParams | FacetRefineParams | FacetTagCloudParams | FacetDateParams;
export const FACETS: FacetConfig<FacetParams>[] = [
    {
        name: "geo",
        title: "Places",
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
        title: "Companies",
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
        title: "People",
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
        title: "Formats",
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
        title: "Dates",
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
        title: "Sizes",
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
        title: "Languages",
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
        title: "Concepts",
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