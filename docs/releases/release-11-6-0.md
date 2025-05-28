---
layout: default
title: 11.6.0
nav_order: 106
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.6.0){:.d-block .text-right }

- General refactoring of the SBA libraries:
  - The **@sinequa/components** library has been refactored as 2 libraries (**@sinequa/components** and **@sinequa/analytics**). The new analytics library contains the most advanced components from the former library (charts, heatmap, network, map, timeline), and we will keep developing new modules featuring similar advanced integrations.
  - References to the material design library have been removed. Only the components based on the Bootstrap library remain.
  - The **tslint** configuration has been replaced with **eslint** configuration.
  - Our 3 libraries are now published to **npm** (we will publish them every time we release a new version of the code on Github).
- Preview optimization & improvements:
  - General performance optimization to speed up the loading time of the preview, particularly with large number of pages
  - Optimization of the extract panel on the left, to handle a large number of extracts
  - Display of the document title & original URL at the top of the document navigator
  - Improvement of the preview tooltip look & feel (dynamic scale & positioning)
  - Custom user interface for documents split by pages with document splitter
  - The preview facet (visible in Vanilla & Pepper) now has action buttons to toggle the visibility of entities & extracts highlights
  - We added the possibility to remove the `sandbox` attribute of the preview iframe (by passing `null`, which can be required in some situations)
- Facets:
  - New tag cloud facet component. Documentation available [here](https://sinequa.github.io/sba-angular/modules/components/facet.html#tag-cloud-facet). This component was added to Pepper's palette of components.
  - Refactored my-search facet component with new options & styling. Documentation available [here](https://sinequa.github.io/sba-angular/modules/components/facet.html#my-search-facet). Note that this component replaces the breadcrumbs component in both Vanilla & Pepper (the component is not displayed with a facet card, but simply above the list of results).
  - Handling of excluded items in list facets
  - List facets now have an option to display a visual bar proportional to the number of items
- New functionalities added to the main search form of Vanilla & Pepper (which are now fully identical):
  - Inline button to clear the form
  - Inline button to keep current filters (eg. facets) active for a new search (false by default)
  - Inline button to search by speaking (the button is not shown by default, as it relies on querying Google's servers)
  - Inline button to display an advanced form (not shown on Pepper by default)
  - The above options can all be turned on or off by commenting or uncommenting the features in [`config.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/config.ts) (or alternatively by passing these options via the "Customization (JSON)" tab of the application's configuration - See [configuration](https://sinequa.github.io/sba-angular/tipstricks/configuration.html)).
  - The search form now handles a long list of fielded search "badges" by scrolling horizontally (with additional left/right buttons)
- New web services added to the **@sinequa/core** library:
  - `DatasetWebService`: allows to fetch data from the new Dataset web service (currently in beta) as an alternative to the query web service.
  - `QueryIntentWebService`: allows to analyze a user's query to infer its intent, using the latest query intent integration on the Sinequa server (currently in beta).
- New audit events added:
  - Navigation events: We now record navigation between routes of the applications, as well as leaving the app and returning (`navigation.home`, `navigation.exit`, etc.)
  - Timeline filtering (from, to)
  - Autocomplete selection
  - Application logout
- The analytics library contains a new **"finance"** module containing 2 components for displaying amounts of money extracted from documents. Documentation available [here](https://sinequa.github.io/sba-angular/modules/analytics/finance.html). These components have been added to Pepper's palette of components.
- Minor improvements to the network component's performance & API
- New options/behaviors added to the `sq-result-title` component
- The user ratings component does not display empty messages any more
- Delegated admins can now navigate to the administration from the user menu
- New documentation page on the SBA startup lifecycle available [here](https://sinequa.github.io/sba-angular/tipstricks/startup.html).
