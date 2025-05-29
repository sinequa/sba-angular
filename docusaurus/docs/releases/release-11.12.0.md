---
layout: default
title: 11.12.0
sidebar_position: 97
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.12.0)

# General changes

:::info
SBA Framework is compatible with Angular 17 and dependencies are up to date
:::

### New component

* The [my-search](/libraries/components/facet#my-search-facet) components removed in 11.10 has been updated to work with the new filters introduced in 11.10.


## Chore

|  | Ticket  | Description |
|---|--------|-------------|
|📦| ES-22530| Angular 17 migration|
|📦| ES-22899| update npm dependencies to latest versions|
|💄| ES-22767| New Sinequa Branding colors|

## Applications

|  | Ticket  | Description |
|---|--------|-------------|
|🐛| ES-23117| (vanilla-search) Remove autoSAMLProvider from `environment.prod.ts`|
|✨| ES-22743| (vanilla-search/search-component) manage results with a virtual scroll list|

## Core

|  | Ticket  | Description |
|---|--------|-------------|
|🐛| ES-23165| (core/query) Update deserializeFilter method to handle both array and non-array data types|
|🐛| ES-22212| (app service) Fix getColumnDefaultAlias method to use lowercase for the first letter of the first alias|
|🐛| ES-22801| (core/web-service) Do not send app information in audit payload |
|🐛| ES-20767| (core/base) fielded search: add parentheses around field expressions|

## Components

|  | Ticket  | Description |
|---|--------|-------------|
|🐛| ES-23662| (facet) Add display property to facet item in facet service |
|✨| ES-23643| (facet/my-search) New "my-search" component | After being removed from SBA 11.10+ the "my-search" component returns.|
|🐛| ES-22415| (search-service) Remove queryId when filters are undefined in search service|
|💄| ES-22924| (machine learning/top passage) remove unnecessary padding in `top-passages.component.scss` |
|🐛| ES-18964| (facet-list) Fix issue with facet list node opening logic|
|🐛| ES-20938| (advanced) advanced search form not filtered|
|🐛| ES-21804| (search-form) strict refine, remove queryid on clear text|
|🐛| ES-21965| (preview) preview failed while loading highlights prefs|
|🐛| ES-21312| (action) Issue in main search bar facet container on "All data" checkbox selection|
|🐛| ES-21334| (preview) extracts do not display automatically when retrieved|
|🐛| ES-20781| (filters) should generate a query with "contains" operator when filtering on a facet|
|🐛| ES-20768| (preview) Add support for displaying Excel previews without sandbox|

## Analytics

|  | Ticket  | Description |
|---|--------|-------------|
|💄| ES-21538| (timeline) Refactor facet-date component to use pure css collapse behavior|
|🐛| ES-22049| (googlemaps) GoogleMapsModule disappears after expanding a preview result |
