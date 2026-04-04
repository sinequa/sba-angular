---
layout: default
title: 11.11.0
sidebar_position: 96
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.11.0)

## General changes

| Version | Release Date |
|---------|-------------|
| [11.11.1](./release-11-11-1)  | 2025-06      |

:::info
no breaking changes
:::

## Chore

|Ticket    |Description|
|----------|---|
|          | Add anonymous type T to dataset web service |
|          | extract all types in their own file and improve typings |
| SBA-818  | Improve the autocomplete navigation behavior by preselecting automatically the values selected via keyboard |
| ES&minus;20677 | migrate to fontawesome 6 |
| ES-20713 | Migrate Bootstrap to 5.3 |

## Applications

|Ticket|Description|
|---|---|
| SBA-824  | (pepper) Always display the result selector for better clarity |
| ES-20703 | (vanilla) Add alert when no result |
| SBA-710  | (vanilla) help button to search tips and trick always visible |
| ES-20727 | (vanilla) display recent queries when clicking on empty search bar like Google |
|          | (vanilla/css) move root.scss file to sinequa.scss |
|          | (vanilla/css) remove css extension from sass import |
|          | (vanilla/css) remove the deprecated sass "~" operator |

## Documentation

|Ticket|Description|
|---|---|
|          | Fix loading advanced form in SBA website |
|          | fix search form suggestions |
| SBA-845  | update advanced search form documentation |
| SBA-828  | add some details to the tutorial |
|          | fix links in the documentation |

## Core

|Ticket| |Description|
|---|---|---|
| ES-20728 | ✨ | HTTP interceptor handle authentication for API v2 routes |

## Components

|Ticket|Description|
|---|---|
|          | New custom highlights functionality in the preview |
| ES-&nbsp;20762 | remove empty extracts (preview/extracts) |
|          | Select passage in the preview upon click on top passage (ml/passage) |
| ES-20942 | display similar document relative to a specific record using the new doc similarity API (ml/similar-documents) |
| SBA-897  | add options: respect tab selection and combine (alert) |
| SBA-876  | Add new search form toggle for filters persistence (search-form) |
| SBA-861  | trigger a new search on brain icon click (search-form) |
| ES-20726 | trigger a query syntax error message on get results error (search) |
| SBA-877  | add the possibility to override filters classes (filters) |
| SBA-693  | force top position to 0 (modal/cdk-drag-n-drop) |
| SBA-840  | set input value on changes (advanced) |
| ES-20784 | filter on label of an entity (facet) |
| ES-20740 | save facet collapse status in preferences (facet) |
| ES-20697 | add new valueClicked output to metadata values (metadata) |

## Assistant

|Ticket|Description|
|---|---|
| ES-20721 | raise event on assistant error |
| ES-20694 | allow assistant edition and regeneration |
|          | Improve display of references in tooltips and allow to open the preview |
|          | Render code blocks with syntax highlighting and custom card |
|          | Include model name in audit events |
|          | Implement the placeholder in new assistant message component |
| ES-20692 | add a stop generating button in the assistant |
|          | New rendering of assistant messages, allowing to customize the references |
| ES-20690 | change the input focus to be triggered at the end of streaming messages |
| ES-20701 | make the settings update to not reload the assistant |

## Analytics

|Ticket|Description|
|---|---|
| ES-20676 | (googlemaps) refresh points when loading more results |
