---
layout: default
title: 11.5.0
sidebar_position: 107
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.5.0)

- Migration to Angular 11. The migration is relatively easy. For customer applications, make sure to apply the following change in angular.json: replace  "lazy": true  by  "inject": false (this change is already done for Vanilla Search). Some application-level configuration files also change (tsconfig.ts): In customer applications these files must be aligned with the ones in Vanilla Search. Note that with this new configuration, ng serve captures changes in the core and components libraries (ie. no need to wait for the libraries to recompile when working on a packaged component).
- The autocomplete supports Fielded Search with a graphical mode (colored badges in the search bar) or advanced mode (text-based, supporting boolean expressions)
- Improvements of the facet components:
  - Possibility to remove filters in the multi-facet component (for one subfacet or all at once)
  - Multiple selections within the same facet are merged when possible
  - Selected items always appear at the top of the facet list (even if they yield no result)
  - Multiple selection is supported in search mode
  - Scrollbars added by default to manage long lists of items
  - Facet filters component now uses actual facet components in dropdowns
  - Simplification of facet-range UI
- Support for multiple results views added (not enabled by default in Vanilla, but new documentation available)
- Refactoring of the labels components and integration in Vanilla:
  - Simplified labels menus
  - Labelling integrated in the selection toolbar (supporting single and multiple document selection)
  - Adding/removing labels on a document can be done through the same "edit" dialog (supporting autocomplete)
- New sample module demonstrating Google maps integration in the SBA framework.
- New application sample: Pepper, a Search & Analytics application built around a customizable dashboard. Pepper includes various sample widgets (charts, map, timeline, network, heatmap) which can be extended and customized.
- New "sqSticky" directive to allow facet bars to have a fixed position but still be scrollable when too long. sqSticky is now used by default in Vanilla.
- Added an "artificial" session id for auditing the application (with a 10 min timeout). Also fixed some audit events (removed events for recent queries & documents, added events when removing filters and sorting the page, etc.).
- New autoscrolling directive and "more results" components, as modern alternatives to the classical pager. The autoscrolling directive is activated by default in Vanilla Search.
- Refactoring of advanced search components and sample integration in Vanilla Search, with associated documentation. Simplified API and reusable building blocks designed in line with Angular's best practices.
- Improvements of document navigator (incl. zoom in/out buttons, better loading of HTML, dynamic position of tooltip)
- Improvements of home page facets in Vanilla (possibility to open items in new tabs)
- By default, in Vanilla, the tab currently opened is persisted even when searching for new text. This change can be easily reverted by changing the search() method in search-form.component.ts.
- New documentation for user ratings, sponsored links, auditing applications, results views, labels, advanced search, feedback, Pepper, autoscroll, facet filters, login methods and server-side plugins.
