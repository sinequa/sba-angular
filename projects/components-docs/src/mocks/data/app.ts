import { CCScope } from "@sinequa/core/web-services";

const scopes: CCScope[] = [
    { name: 'scope 1' },
    { name: 'scope 2' }
];

export const APP = {
    "workspaceApp": "\/_sba\/_sba-angular\/projects\/vanilla-search\/",
    "queryNames": "query",
    "autocomplete": "autocomplete",
    "labels": "_labels",
    "preview": "_preview",
    "queryExport": "_queryexport",
    "sponsoredLinks": "_sponsoredlinks",
    "description": "",
    "usePopupForLogin": false,
    "oAuthProviders": "",
    "samlProviders": "",
    "data": {

    },
    "revision": 1,
    "dataSets": "",
    "authorizationLevel": "User",
    "auditEnabled": true,
    "name": "app",
    "webServices": {
        "autocomplete": {
            "description": "default web service for auto-complete",
            "webServiceType": "Autocomplete",
            "revision": 1,
            "allowedWithAnySBA": false,
            "suggestQueries": "",
            "useDistributionRegex": true,
            "name": "autocomplete"
        },
        "_labels": {
            "description": "default web service for labels",
            "webServiceType": "labels",
            "revision": 1,
            "name": "_labels",
            "privateLabelsField": "collection",
            "publicLabelsField": "collection"
        },
        "_preview": {
            "description": "default web service for document preview",
            "webServiceType": "preview",
            "revision": 1,
            "docResultCss": "preview.css",
            "docResultJs": "preview\/preview.js",
            "highlights": "extractslocations,matchlocations,person,geo,company",
            "name": "_preview"
        },
        "_queryexport": {
            "revision": 1,
            "description": "default web service for exporting query result",
            "webServiceType": "queryexport",
            "linksMaxCount": "",
            "linksSortByOrder": true,
            "linksFilterDuplicateUrls": false,
            "linksGlobalRelevance": "",
            "separator": "",
            "maxCount": "",
            "columns": {
                "column$": [
                    {
                        "title": "Title",
                        "pattern": "title",
                        "selectionQuery": ""
                    },
                    {
                        "title": "Filename",
                        "pattern": "filename",
                        "selectionQuery": ""
                    },
                    {
                        "title": "Modified",
                        "pattern": "modified",
                        "selectionQuery": ""
                    },
                    {
                        "title": "Authors",
                        "pattern": "authors",
                        "selectionQuery": ""
                    },
                    {
                        "title": "Url",
                        "pattern": "url1",
                        "selectionQuery": ""
                    }
                ]
            },
            "name": "_queryexport"
        },
        "_sponsoredlinks": {
            "description": "default web service for sponsored links",
            "webServiceType": "sponsoredlinks",
            "revision": 1,
            "linksMaxCount": "",
            "linksSortByOrder": true,
            "linksFilterDuplicateUrls": false,
            "linksGlobalRelevance": "",
            "name": "_sponsoredlinks"
        }
    },
    "queries": {
        "query": {
            "description": "Custom params: Include entity locations (for tooltips) + test_data index + test_data fields + test_data aggregations",
            "webServiceType": "Query",
            "indexList": "index,test_data",
            "inputFile": "blah",
            "queryPlugin": "Filters\/Sinequa.Plugin.CustomQueryPlugin",
            "searchStrategy": "_Normal",
            "preferUseLocalEngine": false,
            "strictRefine": false,
            "maxResults": "",
            "skipCount": "",
            "questionPrecision": "Default",
            "questionStrategy": "Default",
            "questionLanguage": "autodetect",
            "questionDefaultLanguage": "autodetect",
            "conceptLimit": "",
            "sCMode": "smart",
            "sCFilter": "",
            "removeDuplicates": false,
            "duplicateRemovalScope": "default",
            "useNearHash": false,
            "globalRelevance": "",
            "relevanceDelta": "",
            "wordsRelevance": "",
            "additionalSelectClause": "",
            "additionalWhereClause": "",
            "overrideGroupBy": "",
            "overrideOrderBy": "",
            "postGroupBy": true,
            "selectiveGroupMerging": false,
            "sourceSelection": "",
            "collectionSelection": "",
            "sourceSecurityOverride": "",
            "collectionSecurityOverride": "",
            "optionalIndexList": "",
            "excludedColumns": "",
            "sqlTimeout": "",
            "useOrderNBy": false,
            "loadDefaultSeeNomSyn": false,
            "useUSUKVariants": true,
            "synonymsEnabled": true,
            "synonyms": "",
            "reformulationsEnabled": true,
            "reformulations": "",
            "stopWordsEnabled": true,
            "stopWords": "",
            "lightWordsEnabled": true,
            "lightWords": "",
            "rawWordsEnabled": true,
            "rawWords": "",
            "requiredWordsEnabled": true,
            "requiredWords": "",
            "rewritingsEnabled": false,
            "rewritings": "",
            "rWClasses": "",
            "lKMEnabled": false,
            "stopWordsRuleSetsEnabled": false,
            "stopWordsRuleSets": "",
            "documentClassesColumn": "",
            "activeDocumentClassWeightGroup": "",
            "documentClasses": "",
            "partNames": "",
            "relevanceTransforms": "",
            "displaySortingChoices": false,
            "restrictSortToSortingChoices": false,
            "sortingChoices": [
                {
                    "name": "relevance",
                    "orderByClause": "globalrelevance desc",
                    "isDefaultNoRelevance": false,
                    "isDefaultWithRelevance": true,
                    "display": "msg#sort.relevance"
                },
                {
                    "name": "date",
                    "orderByClause": "modified desc",
                    "isDefaultNoRelevance": true,
                    "isDefaultWithRelevance": false,
                    "display": "msg#sort.date"
                },
                {
                    "name": "filename",
                    "orderByClause": "filename asc",
                    "isDefaultNoRelevance": false,
                    "isDefaultWithRelevance": false,
                    "display": "msg#sort.filename"
                },
                {
                    "name": "title",
                    "orderByClause": "title asc",
                    "isDefaultNoRelevance": false,
                    "isDefaultWithRelevance": false,
                    "display": "msg#sort.title"
                }
            ],
            "questionLanguageWeights": "",
            "phonetizerLanguageMapping": "",
            "advanced": {
                "lexas": "",
                "mw": "",
                "wsw": "",
                "wcw": "",
                "wpw": "",
                "wac": "",
                "autocompound": "",
                "n": "",
                "t": "",
                "c": "",
                "d": "",
                "idf": "",
                "kidf": "",
                "nzlp": "",
                "swbf": "",
                "fw": "",
                "ffs": "",
                "fcs": "",
                "fds": "",
                "lcs": "",
                "lds": "",
                "lfs": "",
                "escs": "",
                "esds": "",
                "esfs": "",
                "fbf": "",
                "fbw": "",
                "fbo": "",
                "fbhl": "",
                "fbm": "",
                "fbn": "",
                "fbamf": "",
                "more": "",
                "rfmw": ""
            },
            "aggregations": [
                {
                    "name": "Size",
                    "column": "size",
                    "distribution": "_SizeDefault",
                    "count": "",
                    "minLevel": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "title": "SiZe",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Concepts",
                    "column": "concepts",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "MatchingPartnames",
                    "column": "matchingpartnames",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "DocumentLanguages",
                    "column": "documentlanguages",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "DocFormat",
                    "column": "docformat",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Authors",
                    "column": "authors",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "DocType",
                    "column": "doctype",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "FileExt",
                    "column": "fileext",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "distribution": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Modified",
                    "column": "modified",
                    "distribution": "_DateDefault",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Treepath",
                    "column": "treepath",
                    "distribution": "",
                    "count": "",
                    "minLevel": "",
                    "correlation": false,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "title": "",
                    "minLevels": "",
                    "maxNodes": 20,
                    "keySeparator": "",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Geo",
                    "column": "geo",
                    "distribution": "",
                    "count": "",
                    "minLevel": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": true,
                    "title": "",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Person",
                    "column": "person",
                    "distribution": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": true,
                    "title": "",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Company",
                    "column": "company",
                    "distribution": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": true,
                    "title": "",
                    "includeInStandardSearch": true,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Timeline",
                    "column": "modified",
                    "distribution": "",
                    "count": -1,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "title": "",
                    "includeInStandardSearch": true,
                    "order": "keyasc",
                    "mask": "YYYY-WW",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "Heatmap",
                    "column": "{heatmapField1}\/{heatmapField2}",
                    "distribution": "",
                    "count": 2000,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "title": "",
                    "includeInStandardSearch": false,
                    "order": "",
                    "mask": "",
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "additionalAggregationParameters": "",
                    "limit": ""
                },
                {
                    "name": "",
                    "column": "",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggBool",
                    "column": "sourcebool1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggInt",
                    "column": "sourceint1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": 3,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggDouble",
                    "column": "sourcedouble1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": 3,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggDoubleDist",
                    "column": "sourcedouble1",
                    "distribution": "Doubles",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggDoubleRange",
                    "column": "sourcedouble1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "includeInStandardSearch": true,
                    "maxCountToOrder": "",
                    "order": "",
                    "tabBehavior": "",
                    "mask": "",
                    "operators": "min,max,sum,avg,stddev,variance",
                    "operatorValueColumn": "",
                    "usePredefinedValues": false,
                    "treeAsCsv": false,
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "displayKeySeparator": ""
                },
                {
                    "name": "AggDateDist",
                    "column": "sourcedatetime1",
                    "distribution": "Dates",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggDateRange",
                    "column": "sourcedatetime1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "includeInStandardSearch": true,
                    "maxCountToOrder": "",
                    "order": "",
                    "tabBehavior": "",
                    "mask": "",
                    "operators": "min,max",
                    "operatorValueColumn": "",
                    "usePredefinedValues": false,
                    "treeAsCsv": false,
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "displayKeySeparator": ""
                },
                {
                    "name": "AggDateTimeline",
                    "column": "sourcedatetime1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": -1,
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false,
                    "includeInStandardSearch": true,
                    "maxCountToOrder": "",
                    "order": "keyasc",
                    "tabBehavior": "",
                    "mask": "YYYY",
                    "operators": "",
                    "operatorValueColumn": "",
                    "usePredefinedValues": false,
                    "treeAsCsv": false,
                    "minLevels": "",
                    "maxNodes": "",
                    "keySeparator": "",
                    "displayKeySeparator": ""
                },
                {
                    "name": "AggString",
                    "column": "sourcestr1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggTree",
                    "column": "sourcetree1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggEntity",
                    "column": "entity1",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                },
                {
                    "name": "AggEntityNorm",
                    "column": "entity2",
                    "distribution": "",
                    "additionalAggregationParameters": "",
                    "limit": "",
                    "count": "",
                    "postGroupBy": true,
                    "mergeGroups": true,
                    "correlation": false
                }
            ],
            "bar": "",
            "groupBy": "",
            "orderBy": "",
            "mergeGroups": true,
            "columnsInfo": {
                "columns": [
                    {
                        "name": "geo",
                        "aliases": "geo",
                        "label": "msg#metadata.geo_label",
                        "labelPlural": "msg#metadata.geo_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "person",
                        "aliases": "person",
                        "label": "msg#metadata.person_label",
                        "labelPlural": "msg#metadata.person_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "company",
                        "aliases": "company",
                        "label": "msg#metadata.company_label",
                        "labelPlural": "msg#metadata.company_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "treepath",
                        "aliases": "treepath, source",
                        "label": "msg#metadata.treepath_label",
                        "labelPlural": "msg#metadata.treepath_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "title",
                        "aliases": "title",
                        "label": "msg#metadata.title_label",
                        "labelPlural": "msg#metadata.title_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "authors",
                        "aliases": "authors",
                        "label": "msg#metadata.authors_label",
                        "labelPlural": "msg#metadata.authors_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "modified",
                        "aliases": "modified",
                        "label": "msg#metadata.modified_label",
                        "labelPlural": "msg#metadata.modified_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "docformat",
                        "aliases": "docformat",
                        "label": "msg#metadata.docformat_label",
                        "labelPlural": "msg#metadata.docformat_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "filename",
                        "aliases": "filename",
                        "label": "msg#metadata.filename_label",
                        "labelPlural": "msg#metadata.filename_plural_label",
                        "description": "",
                        "formatter": "",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "size",
                        "aliases": "size",
                        "label": "msg#metadata.size_label",
                        "labelPlural": "msg#metadata.size_plural_label",
                        "description": "",
                        "formatter": "memorysize",
                        "transforms": "",
                        "parser": ""
                    },
                    {
                        "name": "documentlanguages",
                        "aliases": "language",
                        "label": "msg#metadata.documentlanguages_label",
                        "labelPlural": "msg#metadata.documentlanguages_plural_label",
                        "description": "",
                        "formatter": "language",
                        "transforms": "",
                        "parser": ""
                    }
                ]
            },
            "tabSearch": {
                "isActive": true,
                "column": "docformat",
                "totalIsSumOfTabTotals": true,
                "loadAggregationsForSelectedTab": true,
                "postGroupBy": true,
                "mergeGroups": true,
                "tabs": [
                    {
                        "name": "all",
                        "value": "*",
                        "display": "msg#results.results_all_tab",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    },
                    {
                        "name": "html",
                        "value": "html,htm",
                        "display": "Web",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    },
                    {
                        "name": "doc",
                        "value": "doc,docx,rtf",
                        "display": "Word",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    },
                    {
                        "name": "xls",
                        "value": "xls,xlsx",
                        "display": "Excel",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    },
                    {
                        "name": "ppt",
                        "value": "ppt,pptx",
                        "display": "PowerPoint",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    },
                    {
                        "name": "txt",
                        "value": "txt",
                        "display": "msg#results.results_text_tab",
                        "excludedIndices": "",
                        "excludedAggregations": "",
                        "isDefault": false
                    }
                ],
                "runQueryConcurrently": false
            },
            scopes,
            "scopesActive": false,
            "columns": "",
            "pageSize": "",
            "extractsLength": "",
            "extractsPartNames": "",
            "defaultNearValue": 10,
            "revision": 1,
            "allowedWithAnySBA": false,
            "enableFieldedSearch": true,
            "columnFieldsIncluded": "",
            "columnFieldsExcluded": "",
            "partnameFieldsIncluded": "",
            "partnameFieldsExcluded": "",
            "extractsChunk": "",
            "extractsCount": "",
            "extractsContext": "",
            "securityPluginEnabled": false,
            "securityPlugins": "",
            "queryIntent": "",
            "queryIntentSet": "",
            "chineseScript": "",
            "allowEmptySearch": true,
            "searchEntities": {
                "inFullText": false,
                "externalSvcTimeout": ""
            },
            "searchTags": "",
            "similarDocuments": {
                "maxNumberOfOtherVersions": "",
                "otherVersionsRelevanceThreshold": "",
                "maxNumberOfSimilarDocuments": "",
                "similarDocumentsRelevanceThreshold": "",
                "removeDuplicates": false
            },
            "rfmV2": {
                "defaultTimeout": ""
            },
            "entityFetchLimit": "",
            "entityFetchMode": "",
            "returnLocations": true,
            "maxReturnedLocationPairCount": "",
            "respectFieldPermissions": false,
            "name": "query",
            "searchIndexes": "index,test_data"
        }
    },
    "rfms": {

    },
    "indexes": {
        "index": {
            "name": "index",
            "indexType": "Normal"
        },
        "_": {
            "name": "_",
            "indexType": "normal",
            "columns": {
                "treepath": {
                    "name": "treepath",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "title": {
                    "name": "title",
                    "type": "string",
                    "typeModifier": "di",
                    "eType": 14,
                    "eTypeModifier": 264
                },
                "filename": {
                    "name": "filename",
                    "type": "string",
                    "typeModifier": "di",
                    "eType": 14,
                    "eTypeModifier": 264
                },
                "authors": {
                    "name": "authors",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "modified": {
                    "name": "modified",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "indexationtime": {
                    "name": "indexationtime",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "collection": {
                    "name": "collection",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "version": {
                    "name": "version",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "versionrights": {
                    "name": "versionrights",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "connectorinfo": {
                    "name": "connectorinfo",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "containerid": {
                    "name": "containerid",
                    "type": "string",
                    "typeModifier": "i",
                    "eType": 14,
                    "eTypeModifier": 256
                },
                "containerversion": {
                    "name": "containerversion",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "flags": {
                    "name": "flags",
                    "type": "csv",
                    "typeModifier": "ci",
                    "eType": 15,
                    "eTypeModifier": 260
                },
                "tags": {
                    "name": "tags",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "keywords": {
                    "name": "keywords",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "size": {
                    "name": "size",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "fileext": {
                    "name": "fileext",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "docformat": {
                    "name": "docformat",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "doctype": {
                    "name": "doctype",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "msgfrom": {
                    "name": "msgfrom",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "msgto": {
                    "name": "msgto",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "geo": {
                    "name": "geo",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "person": {
                    "name": "person",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "company": {
                    "name": "company",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "url1": {
                    "name": "url1",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "url2": {
                    "name": "url2",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "accesslist1": {
                    "name": "accesslist1",
                    "type": "csv",
                    "typeModifier": "ci",
                    "eType": 15,
                    "eTypeModifier": 260
                },
                "accesslist2": {
                    "name": "accesslist2",
                    "type": "csv",
                    "typeModifier": "ci",
                    "eType": 15,
                    "eTypeModifier": 260
                },
                "deniedlist1": {
                    "name": "deniedlist1",
                    "type": "csv",
                    "typeModifier": "ci",
                    "eType": 15,
                    "eTypeModifier": 260
                },
                "sourcecsv1": {
                    "name": "sourcecsv1",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv2": {
                    "name": "sourcecsv2",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv3": {
                    "name": "sourcecsv3",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv4": {
                    "name": "sourcecsv4",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv5": {
                    "name": "sourcecsv5",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv6": {
                    "name": "sourcecsv6",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv7": {
                    "name": "sourcecsv7",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv8": {
                    "name": "sourcecsv8",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv9": {
                    "name": "sourcecsv9",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcecsv10": {
                    "name": "sourcecsv10",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "sourcetree1": {
                    "name": "sourcetree1",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "sourcetree2": {
                    "name": "sourcetree2",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "sourcetree3": {
                    "name": "sourcetree3",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "sourcetree4": {
                    "name": "sourcetree4",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "sourcetree5": {
                    "name": "sourcetree5",
                    "type": "csv",
                    "typeModifier": "ct",
                    "eType": 15,
                    "eTypeModifier": 524292
                },
                "sourcestr1": {
                    "name": "sourcestr1",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr2": {
                    "name": "sourcestr2",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr3": {
                    "name": "sourcestr3",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr4": {
                    "name": "sourcestr4",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr5": {
                    "name": "sourcestr5",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr6": {
                    "name": "sourcestr6",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr7": {
                    "name": "sourcestr7",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr8": {
                    "name": "sourcestr8",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr9": {
                    "name": "sourcestr9",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcestr10": {
                    "name": "sourcestr10",
                    "type": "csv",
                    "typeModifier": "acilx",
                    "eType": 15,
                    "eTypeModifier": 8390917
                },
                "sourcevarchar1": {
                    "name": "sourcevarchar1",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "sourcevarchar2": {
                    "name": "sourcevarchar2",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "sourcevarchar3": {
                    "name": "sourcevarchar3",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "sourcevarchar4": {
                    "name": "sourcevarchar4",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "sourcevarchar5": {
                    "name": "sourcevarchar5",
                    "type": "varchar",
                    "typeModifier": null,
                    "eType": 12,
                    "eTypeModifier": 0
                },
                "sourcedatetime1": {
                    "name": "sourcedatetime1",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "sourcedatetime2": {
                    "name": "sourcedatetime2",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "sourcedatetime3": {
                    "name": "sourcedatetime3",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "sourcedatetime4": {
                    "name": "sourcedatetime4",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "sourcedatetime5": {
                    "name": "sourcedatetime5",
                    "type": "datetime",
                    "typeModifier": null,
                    "eType": 3,
                    "eTypeModifier": 0
                },
                "sourceint1": {
                    "name": "sourceint1",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "sourceint2": {
                    "name": "sourceint2",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "sourceint3": {
                    "name": "sourceint3",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "sourceint4": {
                    "name": "sourceint4",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "sourceint5": {
                    "name": "sourceint5",
                    "type": "integer",
                    "typeModifier": null,
                    "eType": 6,
                    "eTypeModifier": 0
                },
                "sourcedouble1": {
                    "name": "sourcedouble1",
                    "type": "double",
                    "typeModifier": null,
                    "eType": 8,
                    "eTypeModifier": 0
                },
                "sourcedouble2": {
                    "name": "sourcedouble2",
                    "type": "double",
                    "typeModifier": null,
                    "eType": 8,
                    "eTypeModifier": 0
                },
                "sourcedouble3": {
                    "name": "sourcedouble3",
                    "type": "double",
                    "typeModifier": null,
                    "eType": 8,
                    "eTypeModifier": 0
                },
                "sourcedouble4": {
                    "name": "sourcedouble4",
                    "type": "double",
                    "typeModifier": null,
                    "eType": 8,
                    "eTypeModifier": 0
                },
                "sourcedouble5": {
                    "name": "sourcedouble5",
                    "type": "double",
                    "typeModifier": null,
                    "eType": 8,
                    "eTypeModifier": 0
                },
                "sourcebool1": {
                    "name": "sourcebool1",
                    "type": "boolean",
                    "typeModifier": null,
                    "eType": 1,
                    "eTypeModifier": 0
                },
                "sourcebool2": {
                    "name": "sourcebool2",
                    "type": "boolean",
                    "typeModifier": null,
                    "eType": 1,
                    "eTypeModifier": 0
                },
                "sourcebool3": {
                    "name": "sourcebool3",
                    "type": "boolean",
                    "typeModifier": null,
                    "eType": 1,
                    "eTypeModifier": 0
                },
                "sourcebool4": {
                    "name": "sourcebool4",
                    "type": "boolean",
                    "typeModifier": null,
                    "eType": 1,
                    "eTypeModifier": 0
                },
                "sourcebool5": {
                    "name": "sourcebool5",
                    "type": "boolean",
                    "typeModifier": null,
                    "eType": 1,
                    "eTypeModifier": 0
                },
                "entity1": {
                    "name": "entity1",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "entity2": {
                    "name": "entity2",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "entity3": {
                    "name": "entity3",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "entity4": {
                    "name": "entity4",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "entity5": {
                    "name": "entity5",
                    "type": "csv",
                    "typeModifier": "cel",
                    "eType": 15,
                    "eTypeModifier": 2068
                },
                "enginecsv1": {
                    "name": "enginecsv1",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "enginecsv2": {
                    "name": "enginecsv2",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "enginecsv3": {
                    "name": "enginecsv3",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "enginecsv4": {
                    "name": "enginecsv4",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "enginecsv5": {
                    "name": "enginecsv5",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "engineusercsv1": {
                    "name": "engineusercsv1",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "engineusercsv2": {
                    "name": "engineusercsv2",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "engineusercsv3": {
                    "name": "engineusercsv3",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "engineusercsv4": {
                    "name": "engineusercsv4",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                },
                "engineusercsv5": {
                    "name": "engineusercsv5",
                    "type": "csv",
                    "typeModifier": "acil",
                    "eType": 15,
                    "eTypeModifier": 2309
                }
            }
        },
        "test_data": {
            "name": "test_data",
            "indexType": "Normal"
        }
    },
    "lists": {

    },
    "apiVersion": "1.0",
    "versionId": "430FEF02780F4767B5AC52527C2B7D8C",
    "defaultQueryName": "query",
    "methodresult": "ok"
};