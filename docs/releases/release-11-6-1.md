---
layout: default
title: 11.6.1
nav_order: 105
parent: Releases
---


[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.6.1){:.d-block .text-right }

- Multiple optimizations and bug fixes of the **document navigator** and **preview** module:
  - Improved navigation in the list of extracts
  - Better performance with large files
  - Fixed issues with Excel spreadsheets (eg. refresh the list of extracts when changing tabs)
  - Improved embedded tooltip positioning and display (fixed cropped tooltip on the sides and bottom of the preview)
  - Support entity formatting and internationalization (featured developed by Sword)
- **Tree facets** are now searchable (`[searchable]="true"`) by default. For an optimal experience, please check "Match the search terms anywhere in field values" in the autocomplete web service configuration (available as of Sinequa 11.6.0).
- New option in **facet filters** (Pepper's horizontal facet bar) to let users customize the list of facets with `[enableCustomization]="true"` (feature developed by CTC).
- New **"comments"** module in the @sinequa/components library to display a thread of comments attached to a document. Comments must be stored in a custom index, and accessed via a server-side plugin (which is provided along with the front-end code). Refer to the [online documentation](https://sinequa.github.io/sba-angular/modules/components/comments.html).
- New **"ag-grid"** module in the @sinequa/analytics library to display a list of search results as a grid component powered by the [AG Grid](https://www.ag-grid.com/) library. The module contains one component which is a sample integration of the AG Grid library (which can be used in many other ways). We implemented the "Infinite row model" supported by the library, which offers a great user experience compared to alternatives. We use the free version of the library ("Community"), but many additional options are available with the Enterprise version. Refer to the [online documentation](https://sinequa.github.io/sba-angular/modules/analytics/ag-grid.html).
- Improvements of the **metadata** module ([documentation](https://sinequa.github.io/sba-angular/modules/components/metadata.html)):
  - Display entity counts within a document (returned by the server as of Sinequa 11.6.1)
  - Collapse multi-valued metadata by default
  - Fixed inline display mode and general look & feel
  - Removed the "spacing" parameter
  - Simplified styling of the library
  - Removed entity-summary component and result-metadata (now redundant)
- Optimization and bug fixes in the **timeline** module (selection boundaries hidden out of viewport, fixed behavior when series are reduced to a single point) and new "legend" component which can be displayed with `[showLegend]="true"` (Refer to the [documentation](https://sinequa.github.io/sba-angular/modules/analytics/timeline.html#legend)).
- Refactoring and optimization of the **action** module.
- Refactoring of module dependencies to enable **lazy loading** of routes (See [Angular documentation](https://angular.io/guide/lazy-loading-ngmodules)), which is now supported (but not implemented by default) in Vanilla Search.
- New option to **reset all user settings** in the user top-right menu.
- Fixed cropped drop-down/drop-up menus in Pepper.
- Fixed a breaking change in the "user ratings" component.
- Multiple improvements of **audit events** (to support the new Usage Analytics SBA released in Sinequa 11.6.1).
- Added a warning when editing but not saving an **alert**.
- Fixed the behavior of the app for **403 errors** (forbidden access).
