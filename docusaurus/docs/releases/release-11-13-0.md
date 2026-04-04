---
layout: default
title: 11.13.0
sidebar_position: 92
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.12.0)

## General changes

:::info
SBA Framework is compatible with Angular 18 and dependencies are up to date with no breaking changes.
:::

## ✨ Features

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-10-25 | (facet-date) Rework on facet date                                                                |
| 2024-10-25 | Add message for like filter operator                                                             |
| 2024-10-30 | (timeline) Refactor facet-date component to include mask selection                               |
| 2024-10-31 | (facet-date) Add date filtering in timeline visualization                         |
| 2024-10-31 | (first-page) Update `FirstPageService` to use options.aggregations in `getFirstPage()` method          |
| 2024-10-31 | (facet-date) Add 'Apply' button and update date range filter logic in facet-date component       |
| 2024-11-04 | (facet-date) Add 'apply' label to date facet and enhance NumericalFilter with 'eq' operator                   |
| 2024-11-05 | (ag-grid) Update dependencies and refactor ag-grid component for improved functionality/performance|
| 2024-11-05 | (facet-date) Enhance date facet functionality and add aggregation overrides                                   |
| 2024-12-17 | (advanced-search) Refactor `setSelect()` to support query options and field operators              |
| 2025-01-14 | (components-docs) Enhance `DocMenuComponent` to use `Renderer2` for font size adjustments            |
| 2025-04-18 | (fusion-charts) License fetching                                                                 |

## 🐛 Bug Fixes

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-09-09 | (preview) No highlights with SVG/DWG                                                             |
| 2024-09-12 | (intl.service) Brackets in treepath interpreted as sysLang message                               |
| 2024-09-18 | (my search facet) Display the exclusion operator when active                                     |
| 2024-09-30 | (heatmap) Use the key separator sets in the admin                                                |
| 2024-10-08 | (search input) Fielded search with regex pattern doesn't work                                    |
| 2024-10-09 | (search input) Fielded search with regex pattern doesn't work                                    |
| 2024-10-25 | (autocomplete) Misleading display with the autocomplete                                          |
| 2024-10-25 | (neural) Disable Neural-Search according to user preferences                                     |
| 2025-01-14 | (machine-learning) Prevent passage expansion when text is selected in a passage list component   |
| 2025-01-15 | (analytics) Set default value for query input in AgGridViewComponent                            |
| 2025-05-16 | Fix dark theme icon and tooltip                                                                  |

## 📦 Dependencies

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-10-01 | Bump @types/estree from 1.0.0 to 1.0.6                                                           |
| 2024-10-01 | Bump zone.js from 0.14.7 to 0.14.10                                                              |
| 2024-10-08 | Bump @microsoft/teams-js from 2.24.0 to 2.29.0                                                   |
| 2024-10-08 | Bump focus-within from 2.0.0 to 3.0.2                                                            |
| 2024-10-08 | Bump postcss from 7.0.39 to 8.4.47                                                               |
| 2024-10-10 | Update projects to Angular 18                                                                    |
| 2024-10-10 | Update @angular-slider/ngx-slider to version 17.0.2                                              |
| 2024-11-04 | Update ag-grid to 31.3.4                                                                         |
| 2025-02-10 | Remove eslint-plugin-jsdoc from dependencies                                                     |
| 2025-03-04 | Remove unused Cypress support files                                                              |
| 2025-03-20 | Update jspdf to 3.0.1                                                                            |
| 2025-06-03 | Update docusaurus dependencies to version 3.8.0                                                  |

## ♻️ Refactoring

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-11-05 | Improve code consistency and readability in ag-grid module and view component                    |
| 2024-12-02 | Application start config based on the environment                                                |
| 2024-12-04 | Update logo for vanilla & pepper                                                                 |

## 🩹 Patches

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2025-03-07 | (facet-list) Fix comparison logic in `BsFacetList` for aggregation items                                        |
| 2025-03-07 | Handle URI decoding errors                                                                       |
| 2025-05-26 | (search): Improve expression building                                                         |
| 2025-05-29 | (search): Improve expression building                                                         |
| 2025-06-03 | (facet-tree) Correct facet expression for open action                                                    |
| 2025-06-03 | (ag-grid): Concatenate new search results with existing records                              |
| 2025-06-04 | Update page size selector to be more customizable                                                |

## 🔧 Improvements

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-12-16 | (query-intent) Add query intent in the query payload                                             |
| 2024-12-19 | (facet-date) Update mask value in `BsFacetDate` based on aggregation overrides                     |
| 2025-01-07 | (configuration) Add custom JSON schema support to `CCApp` configuration                            |

## 📖 Documentation

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-12-19 | Update `setSelect()` method signature to include fieldOperator and options parameter               |
| 2025-01-08 | Update configuration to replace `autoSAMLProvider` with `autoOauthProvider`          |
