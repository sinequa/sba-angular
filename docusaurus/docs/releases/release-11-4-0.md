---
layout: default
title: 11.4.0
sidebar_position: 109
parent: Releases
---

[See on Github](https://github.com/sinequa/sba-angular/releases/tag/1.1.0)

This update brings many small improvements and bug fixes to the SBA framework.

The most significant changes include:
- Improved display of relevant extracts in Vanilla Search's preview.
- The selection module can now keep track of record objects instead of just record ids. This allows a new selection arranger component to see and reorder a list of selected documents (see [documentation](https://sinequa.github.io/sba-angular/modules/components/selection.html)).
- We removed automatic date revival (scanning of data returned by the REST API, to convert string into Date objects when possible - this caused unexpected bugs), which means custom code may need to be updated to perform this parsing wherever necessary.
- Improved results view management (currently not used in Vanilla Search since only one view is used)
- Fixed compatibility issues with IE11.
- Improved the autocomplete to sort items by relevance across categories.
- Refactored Heatmap component (see [documentation](https://sinequa.github.io/sba-angular/modules/components/heatmap.html)).
- Refactored Timeline component (see [documentation](https://sinequa.github.io/sba-angular/modules/components/timeline.html)).
- Sample Vis Timeline component (see [documentation](https://sinequa.github.io/sba-angular/modules/components/vis-timeline.html)).
- Refactoring of charts modules based on `ngx-charts` and `fusioncharts` (see [documentation](https://sinequa.github.io/sba-angular/modules/components/ngx-charts.html)).
