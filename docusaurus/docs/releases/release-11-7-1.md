---
layout: default
title: 11.7.1
sidebar_position: 103
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/11.7.1)

## General changes:

⚠️ Migration to Bootstrap v5 and Popper.js v2: This migration introduces breaking changes! When migrating an existing app to this new version of the framework, please follow the [official guide](https://getbootstrap.com/docs/5.0/migration/) from Bootstrap.

Among the most impacting changes are the spacing classes used throughout the framework:

- ml-* becomes ms-* ("s" stands for start)
- mr-* becomes me-* ("e" stands for end)
- same for padding: pl-* and pr-*

Why this new notation? For LTR/RTL language purpose (Left to Right/Right To Left)
- If we are in LTR: "start" is "left" and "end" is "right" ("s" and "e" in the new notation)
- If we are in RTL: "start" is "right" and "end" is "left", this is done automatically, no need to update UI for RTL language with this new notation.

## Vanilla & Pepper

- Refactored search template to use a results$ observable, making customization easier, and removing the need for a subscription.
- Deactivate Gridster overflow when dropdown is shown (fixing cropped dropdown menus in Pepper)

## Core library

- Added a ccquery parameter to the function getColumn() to allow the use with other cc queries, default has been in case no value is set

## Components library:

- Action module: Allowed objects in dropdown-menu to get custom classes
- Facet module: Support distributions with `null` values

## Analytics library

- New Date facet component (in timeline module), combining (optionally): a timeline, date pickers (from/to) and predefined facet items ("since 1 year")
- Added clientSide option to sq-ag-grid if all data is already loaded and infinite scrolling is not required
- Added cell renderer framework to column definitions for AG Grid
- Fixed heatmap breadcrumbs bad selection
- Added a loading flag to show the user when the heatmap's data is loading
