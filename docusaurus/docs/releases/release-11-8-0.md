---
layout: default
title: 11.8.0
sidebar_position: 102
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.8.0)

# General changes

- Removed support for Internet Explorer from `browserslist` file
- Upgrade to ngx-bootstrap v8
- Migration from ng5-slider to angular-slider
- Refactoring of proxy config files to group all the endpoints together
- Added "override" keyword from typescript 4.3 to improve type checking
- Fixed Bootstrap `btn-light` class (hover and active effects invisible when the button is on a `bg-light` background)
- Fixed some remaining Bootstrap v5 utilities (`font-style` -> `fst`, `font-weight` -> `fw`...)

# Vanilla Search

- New Help menu available within the User menu
- Added the new `sq-facet-date` (featuring the timeline) as a replacement to the `sq-facet-list` for the "modified" metadata
- Added the new Neural Search components, when Neural Search is activated:
    - Neural Search On/Off button in search form
    - Answer card at top of results list
    - Passages displayed instead of relevant extracts
    - List of relevant passages available within the preview UI
    - Passages highlighted in the HTML preview

# Pepper

- Fixed broken view when a widget is added while another is maximized

# Core library

- Fixed infinite loops upon 401 errors

# Components library

- Facets library (`@sinequa/components/facet`):
   - ⚠️ Major refactoring of the "facet containers" (`sq-facet-multi`, `sq-facet-filters` and `sq-facet-bar`). Previously, these components were limited to predefined facet types, namely `sq-facet-list` and `sq-facet-tree` and predefined parameter names. Now, these containers can display any type of facet components, including custom ones. This change requires a migration of the facet configuration objects (defined by default in the `config.ts` files): The `FacetConfig<T>` is now parametric, requiring developers to specify what kind of configuration they contain (eg. `FacetConfig<FacetListParams>` for an `sq-facet-list` component. Please refer to the [documentation](https://sinequa.github.io/sba-angular/modules/components/facet.html) of this module for more information.
   - `allowAnd` option added to the `sq-facet-tree` (same usage as for `sq-facet-list`)
   - Prevent sequential clicks in the `sq-facet-tree` to be merged with `OR`
   - Proper wrapping of the list of filters in the `sq-facet-filters` components, when there are too many filters to display on one line.
   - Fixed wrong number of items in facets (by default 11 instead of 10)
   - Fixed bug with `null` value selection in distributions
- Search library (`@sinequa/components/search`):
   - When an http search request fails, stop the loading animation
   - Tabs (`sq-tabs`): Made the display of counters optional (`showCounts` parameter)
- Preview library (`@sinequa/components/preview`):
   - Display the link to the PDF version of the file, when available
   - Fixed issue with the navigation history (requiring double clicks of the back button)
   - FIxed issue with minimap when there are no extract to display
- Utils library (`@sinequa/components/utils`): Added fallback positions (`fallbackPlacements`) to the `sq-tooltip` directive
- Saved queries library  (`@sinequa/components/saved-queries`): Prevent app from breaking if multiple query exports are defined
- Autocomplete library  (`@sinequa/components/autocomplete`): Removed parsing of the query when fielded search if off
- Recent documents & Recent queries: Fixed conversion of dates to/from UTC to avoid displaying wrong dates.
- Action library  (`@sinequa/components/action`): Fixed menus left open when nested within another dropdown menu
- Result and Metadata libraries:
    - Better support of change detection (primarily to enhance the User Experience in UI Builder)
    - `sq-result-title`: Use the original document URL ("store original" option) when it exists and `url1` is not available
- Machine Learning library (`@sinequa/components/machine-learning`): 2 new components dedicated to the Neural Search user interface (`sq-answer-card` for displaying answers found by the "Answer Finder" model, and `sq-passage-list` for displaying the list of passages found by the "Passage Ranking" model)

# Analytics library

- Timeline library:
    - UI improvements to the `sq-facet-date` component (which is now used by default in Vanilla and Pepper)
    - New option to display a tooltip when hovering the datapoints of the timeline
- Network component: Display real labels instead of aggregation names in network menus
