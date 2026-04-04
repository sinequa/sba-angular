---
layout: default
title: 11.10.1
sidebar_position: 97
parent: Releases
---


#### ✨ Enhancements

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2024-10-25 | facet-date: Rework on facet date (ES-24132)                                                                  |
| 2024-10-25 | core: Refactor FirstPageService to accept aggregations in getFirstPage method (ES-24171)                     |
| 2024-10-30 | facet-date: Refactor facet-date component to include mask selection (ES-22206)                               |
| 2024-10-30 | facet-date: Add sq-facet-date component for date filtering in timeline visualization                         |
| 2024-10-31 | facet-date: Add sq-facet-date component for date filtering in timeline visualization                         |
| 2024-10-31 | facet-date: Add 'Apply' button and update date range filter logic in facet-date component (ES-24132)         |
| 2025-01-14 | components-docs: Enhance DocMenuComponent to use Renderer2 for font size adjustments (ES-22899)              |

#### 🐛 Bug Fixes

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2024-09-09 | preview: No highlights with SVG/DWG (ES-23425)                                                               |
| 2024-09-12 | intl.service: Brackets in treepath interpreted as sysLang message (ES-23683)                                 |
| 2024-09-18 | my search facet: Display the exclusion operator when active (ES-24193)                                       |
| 2024-09-30 | heatmap: Use the key separator sets in the admin (ES-24437)                                                  |
| 2024-10-08 | search input: Fielded search with regex pattern doesn't work (ES-24206)                                      |
| 2024-10-09 | search input: Fielded search with regex pattern doesn't work (ES-24206)                                      |
| 2024-10-25 | autocomplete: Misleading display with the autocomplete (ES-23881)                                            |
| 2024-10-25 | neural: Disable Neural-Search according to user preferences (ES-21170)                                       |
| 2025-01-14 | maching-learning: Prevent passage expansion when text is selected in a passage list component (ES-20761)     |
| 2025-01-15 | analytics: Set default value for query input in AgGridViewComponent (ES-25444)                               |

#### 📦 Dependency Updates

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2024-09-17 | chore: Update ag-grid-angular and ag-grid-community versions (ES-24158)                                      |
| 2024-10-01 | deps: Bump @types/estree from 1.0.0 to 1.0.6                                                                 |
| 2024-10-01 | deps: Bump zone.js from 0.14.7 to 0.14.10                                                                    |
| 2024-10-08 | deps: Bump @microsoft/teams-js from 2.24.0 to 2.29.0                                                         |
| 2024-10-08 | deps: Bump focus-within from 2.0.0 to 3.0.2                                                                  |
| 2024-10-08 | deps: Bump postcss from 7.0.39 to 8.4.47                                                                     |
| 2024-10-10 | deps: Update to Angular 18                                                                                   |
| 2024-10-10 | deps: Update @angular-slider/ngx-slider to version 17.0.2                                                    |
| 2024-10-28 | deps: Update ws package version to 8.17.1                                                                    |
| 2024-11-04 | ag-grid: Update ag-grid to 31.3.4 (ES-20804)                                                                 |
| 2025-02-10 | deps: Remove eslint-plugin-jsdoc from dependencies                                                           |
| 2025-03-04 | cypress: Remove unused Cypress support files (ES-25996)                                                      |

#### 🩹 Patches

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2025-03-07 | BsFacetList: Fix comparison logic in BsFacetList for aggregation items (ES-26034)                            |
| 2025-03-07 | core: Handle URI decoding errors (ES-25827)                                                                  |
| 2025-05-26 | search: Fix(search): Improve expression building (ES-26808)                                                  |

#### 🔧 Maintenance

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2024-12-16 | query-intent: (ES-25285)                                                                                     |
| 2024-12-19 | facet-date: Update mask value in BsFacetDate based on aggregation overrides (ES-22206)                       |
| 2025-01-07 | configuration: Add custom JSON schema support to CCApp configuration (ES-25380)                              |

#### 📝 Documentation

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2025-01-08 | documentation: Update configuration to replace autoSAMLProvider with autoOauthProvider (ES-25393)            |

#### feat / fix / other

| Date       | Description                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------------|
| 2024-11-04 | facet-date, NumericalFilter: Add 'apply' label to date facet and enhance NumericalFilter with 'eq' operator   |
| 2024-11-05 | facet-date: Enhance date facet functionality and add aggregation overrides                                    |
| 2024-12-02 | core: Fix application start config based on the environment (ES-25188)                                       |
| 2024-12-04 | vanilla & pepper: Update logo for vanilla & pepper (ES-25220)                                                |
