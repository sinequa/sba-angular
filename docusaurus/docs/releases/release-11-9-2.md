---
layout: default
title: 11.9.2
sidebar_position: 99
parent: Releases
---

### ✨ Enhancements

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-10-25 | (facet-date) Rework on facet date                                                                |
| 2024-10-25 | (first-page) Refactor `FirstPageService` to accept aggregations in `getFirstPage` method         |
| 2024-12-17 | (advanced-search) Refactor `setSelect()` method to support query options and field operators      |
| 2025-01-14 | (components-docs) Enhance `DocMenuComponent` to use `Renderer2` for font size adjustments        |

### 🐛 Bug Fixes

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-09-30 | (heatmap) Use the key separator sets in the admin                                                |
| 2024-10-08 | (search input) Fielded search with regex pattern doesn't work                                    |
| 2024-10-25 | (autocomplete) Misleading display with the autocomplete                                          |
| 2024-10-25 | (neural) Disable Neural-Search according to user preferences                                     |
| 2025-01-14 | (machine-learning) Prevent passage expansion when text is selected in a passage list component   |
| 2025-01-15 | (analytics) Set default value for query input in AgGridViewComponent                             |

### 🩹 Patches

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-12-02 | Application start config based on the environment                                                |
| 2025-05-26 | (search): Improve expression building                                                            |
| 2025-06-03 | (facet): Correct facet expression for open action                                                |

### 📦 Dependency Updates

| Date       | Description                                                                                      |
|------------|--------------------------------------------------------------------------------------------------|
| 2024-11-04 | Update ag-grid to 31.3.4                                                                         |
