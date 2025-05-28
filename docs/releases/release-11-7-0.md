---
layout: default
title: 11.7.0
nav_order: 104
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.7.0){:.d-block .text-right }

## General changes

**Migration from Angular 11 to 12.2**: The migration has little impact on the source code of your application. See the official [migration guide](https://update.angular.io/?l=3&v=11.0-12.0).
⚠️ However, you may encounter difficulties with your dependencies. We recommend completely deleting your node_modules folder, running `npm clean cache` and reinstalling it from scratch (`npm install`). If possible, use our provided package.json and package-lock.json as is. If you have modified these files (to install libraries), make sure to update your versions to reflect the changes we have made (like removing d3-format or setting specific versions of certain libraries).

⚠️ Code duplications: To minimize duplication of code between Vanilla and Pepper, we modified Pepper to reference files in the Vanilla project (like the search form, autocomplete and various stylesheets). Files are typically referenced with `"@sinequa/vanilla"` (an alias added in pepper/tsconfig.json). If you use the Pepper sample application you may either use this new structure (modify files in the Vanilla Search project), or use the legacy structure. A drawback of using the legacy structure is that your application will not be updated when we release new versions (only the Vanilla Search code will be updated).

Icons and logos: We updated Sinequa icons and logos across our applications and documentation.

The loading screens (defined in index.html) now use inline styles rather than Bootstrap to avoid a positioning glitch on start-up.

A new documentation page ([Speed and Performance](https://sinequa.github.io/sba-angular/tipstricks/speed-performance.html)) explains how to use module lazy loading to speed-up complex applications (typically with multiple routes and "heavy" components).

Compilation errors on UNC paths (due to CSS stylesheet extensions) have been fixed.


## @sinequa/core library:

New web service "Doc Builder": [`DocBuilderWebService`](https://sinequa.github.io/sba-angular/core/injectables/DocBuilderWebService.html) allows to merge documents split by pages (PDF, Words, Powerpoints...). This is the service powering the new "Presentation Builder" module (see below).

New web service "Text Chunks": [`TextChunksWebService`](https://sinequa.github.io/sba-angular/core/injectables/TextChunksWebService.html) allows to fetch text from specific documents at specific locations. This is the service powering the new "entity tooltip" functionality (see below).

⚠️ Following a change in the query web service, the list of relevant extracts for each record has a new harmonized structure. This may affect your application if it makes use of this data (which is not the case in the standard Vanilla Search and Pepper application samples).

⚠️ Minor change in the Dataset web service: The `get()` method returns a `Dataset` type instead of a `Results` type.


## @sinequa/components library:

### New module: Slide Builder 🎉

New module to display a list of slide and a selection arranger to create a custom slide deck and export it. See [documentation](https://sinequa.github.io/sba-angular/modules/components/slide-builder.html).

### Search module:

- Integration of Query Intent web service in the `SearchService`. See [documentation](https://sinequa.github.io/sba-angular/tipstricks/query-intent.html) to leverage Query intents in your SBA.
- Infinite scroll: Added a visual indicator that more results are being loaded
- Sort selector: Fixed error in the sort selector (with no sort action).

### Facets module:

- Facet tree/list:

   - Give the possibility to customize the list of facets for each tab (`includedTabs`, `excludedTabs` properties of `FacetConfig`)
   - Filters can be removed using the checkbox
   - Fixed facet list with integer values

- Facet Filters:

   - New option to let users personalize their list of filters (`enableCustomization`). Developers must provide the complete list of facets and the default ones (See [configuration of the facet bar](https://sinequa.github.io/sba-angular/modules/components/facet.html#facet-bar))
   - Fixed tree facet closing unintentionally when clicking on the tree items
   - Set a minimum and maximum width for the dropdown facets
   - Made facet filters special states (filtered, disabled) more visible

- Tag Cloud:

   - Fixed a tagcloud bug where the clear all filters wouldn't work when the Input aggregations was a string
   - Use column's alias instead of column's name to have consistent styles (defined in the metadata stylesheet).

- Facet Card:

   - Add option `collapseOnClickOutside` so that it collapses once clicking outside (for dropdown behavior)

### Preview module

- New minimap component displaying the position of extracts in the document
- Add a preview loading indicator
- Jump to most relevant extract when preview opens
- In entity facet (preview), i18n entity labels (like "Xxx[fr]Yyy") are properly displayed and formatted.
- Fix extracts panel sort tooltip missing text

### Metadata module

Metadata component: New option `showEntityTooltip` to display text surrounding entities in a tooltip. To enable this functionality, set this input to `true` and check "Include locations in the results" in the Query web service > Advanced > Entities section.

### Results view module

When 'view' query params is missing, the default view is displayed

### Result module

- Results source component propagates clicks (to open the preview in Vanilla/Pepper)
- Sponsored results: Tooltips are properly displayed

### Utils module:

- Fixed tooltip remaining visible in the top left of the screen
- Tooltips can now display HTML asynchronously

### User settings:

Refactored the user menu (integrated the dark mode button)

### Baskets (aka collections):

Made baskets exportable (from "manage baskets" popup)

### Autocomplete module:

Added a function to know if the field-search-items components has items or not.



## @sinequa/analytics library:

### AG Grid:

- Integrated Sinequa facets and search service in ag-grid module for optimal search experience.
- Fixed lost selection of records when filtering.

### Heatmap:

Fixed ResultsHeatmapView selectView causing search to fail (make sure that searches complete before component is destroyed)

### Charts:

- Display aggregation **labels** instead of name in charts dropdown menus

### Advanced form

- Fixed styling of metadata in multi-input forms.


## Pepper App:

- Replaced pager by infinite scroll
- Gave widgets specific default sizes (when adding from the "add widget" modal)
- Added the treepath facet to Pepper's facet filters by default
