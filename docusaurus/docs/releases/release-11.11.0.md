---
layout: default
title: 11.11.0
sidebar_position: 98
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.11.0)

# General changes

:::info
no breaking changes
:::

## Chore
|Ticket    | |Description|
|----------|---|---|
|          | 🎨 | Add anonymous type T to dataset web service |
|          | 🎨 | extract all types in their own file and improve typings |
| SBA-818  | ✨ | Improve the autocomplete navigation behavior by preselecting automatically the values selected via keyboard | 
| ES&minus;20677 | 🚨 | migrate to fontawesome 6 |
| ES-20713 | 🚨 | Migrate Bootstrap to 5.3 |

## Applications
|Ticket| |Description|
|---|---|---|
| SBA-824  | ✨ (pepper) | Always display the result selector for better clarity |
| ES-20703 | ✨ (vanilla) | Add alert when no result |
| SBA-710  | ✨ (vanilla) | help button to search tips and trick always visible |
| ES-20727 | ✨ (vanilla) | display recent queries when clicking on empty search bar like Google |
|          | 💄 (vanilla/css) | move root.scss file to sinequa.scss |
|          | 💄 (vanilla/css) | remove css extension from sass import |
|          | 💄 (vanilla/css) | remove the deprecated sass "~" operator |

## Documentation
|Ticket| |Description|
|---|---|---|
|          | 🐛 (component-docs) | Fix loading advanced form in SBA website |
|          | 🐛 (component-docs) | fix search form suggestions |
| SBA-845  | 📝 (docs) | update advanced search form documentation |
| SBA-828  | 📝 (docs) | add some details to the tutorial |
|          | 🚨 (docs) | fix links in the documentation |


## Core
|Ticket| |Description|
|---|---|---|
| ES-20728 | ✨ | HTTP interceptor handle authentication for API v2 routes |

## Components
|Ticket| |Description|
|---|---|---|
|          | ✨ (preview) | New custom highlights functionality in the preview |
| ES-&nbsp;20762 | 🐛 (preview/extracts) | remove empty extracts |
|          | ✨ (ml/passage) | Select passage in the preview upon click on top passage |
| ES-20942 | ✨ (ml/similar-documents) | display similar document relative to a specifc record using the new doc similarity API |
| SBA-897  | 🐛 (alert) | add options: respect tab selection and combine |
| SBA-876  | ✨ (search-form) | Add new search form toggle for filters persistance |
| SBA-861  | ✨ (search-form) | trigger a new search on brain icon click |
| ES-20726 | ✨ (search) | trigger a query syntax error message on get results error |
| SBA-877  | ✨ (filters) | add the possibility to override filters classes |
| SBA-693  | 🐛&nbsp;(modal/cdk&minus;drag&minus;n&minus;drop) | force top position to 0 |
| SBA-840  | 🐛 (advanced) | set input value on changes |
| ES-20784 | 🐛 (facet) | filter on label of an entity |
| ES-20740 | ✨ (facet) | save facet collapse status in preferences |
| ES-20697 | ✨ (metadata) | add new valueClicked output to metadata values |

## Assistant
|Ticket| |Description|
|---|---|---|
| ES-20721 | ✨ | raise event on assistant error |
| ES-20694 | ✨ | allow assistant edition and regeneration |
|          | ✨ | Improve display of references in tooltips and allow to open the preview |
|          | ✨ | Render code blocks with syntax highlighting and custom card |
|          | ✨ | Include model name in audit events |
|          | ✨ | Implement the placeholder in new assistant message component |
| ES-20692 | ✨ | add a stop generating button in the assistant |
|          | ✨ | New rendering of assistant messages, allowing to customize the references |
| ES-20690 | ✨ | change the input focus to be triggered at the end of streaming messages |
| ES-20701 | ✨ | make the settings update to not reload the assistant |

## Analytics
|Ticket| |Description|
|---|---|---|
| ES-20676 | 🐛 (googlemaps) | refresh points when loading more results |
