---
layout: default
title: Metadata Module
parent: Components
grand_parent: Modules
nav_order: 11
---

# Metadata Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/MetadataModule.html) auto-generated from source code.

## Features

This module introduces the UI component that displays the metadata of a document in the search result page.

![Document metadata]({{site.baseurl}}assets/modules/metadata/metadata-example.png)
{: .d-block .mx-auto }
*Document metadata*
{: .text-center }

## Import

```typescript
import { MetadataModule } from '@sinequa/components/metadata';

@NgModule({
  imports: [
      /*....*/
      MetadataModule,
      /*....*/
  ],
  /*....*/
})
```

## API usage

This module exports the [`Metadata` component]({{site.baseurl}}components/components/Metadata.html) that is responsible
for displaying metadata of a document.

An entry of metadata is simply a value of an index column of the considered document.

For example, some of the metadata displayed by `vanilla-search` are:

| Metadata title    | Index column  | Icon name in `icons.scss` |
|-------------------|---------------| --------------------------|
| Size              | size          | size                      |
| Format            | docformat     | docformat                 |
| Date              | modified      | modified                  |
| Filename          | filename      | filename                  |
| Sources           | treepath      | treepath                  |

The selector for the component is `sq-metadata` and it expects a number of inputs:

* `record`: The document whose metadata is being displayed,
* `items`: The metadata entries of the document to be displayed, these are simply the names of index columns,
* `showTitles`: Whether to display the title of the metadata entry, these titles are defined in the configuration of
the query webservice, in `Advanced` tab > `Column Aliases` grid,
* `showIcons`: Whether to display the icon of the metadata entry, these icons are defined in the `icons.scss` files,
with the name of the icon entry being the same as the name of the index column.
* `clickable`: Whether the metadata entries are clickable, in which case,
clicking a metadata entry produces a filter in the current query.
* `spacing`: The spacing format when displaying the metadata. The valid values are:
  * `'default'`: the default spacing,
  * `'compact'`: add the class `sq-compact` to all metadata entries, the expected effect is that the spacing is narrower than `'default'`,
  * `'comfortable'`: add the class `sq-comfortable` to all metadata entries, the expected effect is that the spacing is broader than `'default'`,

Example: the effect of different spacing values

!['default' spacing]({{site.baseurl}}assets/modules/metadata/metadata-default-spacing.png)
{: .d-block .mx-auto }
*'default' spacing*
{: .text-center }

!['compact' spacing]({{site.baseurl}}assets/modules/metadata/metadata-compact-spacing.png)
{: .d-block .mx-auto }
*'compact' spacing*
{: .text-center }

!['comfortable' spacing]({{site.baseurl}}assets/modules/metadata/metadata-comfortable-spacing.png)
{: .d-block .mx-auto }
*'comfortable' spacing*
{: .text-center }

The component also emits an event when an element of the metadata is selected / clicked on.

This module also exports the [`MetadataItem` component]({{site.baseurl}}components/components/MetadataItem.html) which is used by
the `Metadata` component and displays a single metadata item. Using the `MetadaItem` component directly provides more layout flexibility,
allowing other content to interspersed in the layout and different input properties to be specified for individual items. The component's
selector is `sq-metadata-item` and it expects a number of inputs which are similar to those of the `Metadata` component:

* `record`: The document whose metadata is being displayed,
* `item`: The metadata entry of the document to be displayed,
* `showTitle`: Whether to display the title of the metadata item, these titles are defined in the configuration of
the query webservice, in `Advanced` tab > `Column Aliases` grid,
* `showIcon`: Whether to display the icon of the metadata entry, these icons are defined in the `icons.scss` files,
with the name of the icon entry being the same as the name of the index column.
* `clickable`: Whether the metadata entry is clickable, in which case,
clicking a metadata entry produces a filter in the current query.
* `spacing`: The spacing format when displaying the metadata. The valid values are:
  * `'default'`: the default spacing,
  * `'compact'`: add the class `sq-compact` to all metadata entries, the expected effect is that the spacing is narrower than `'default'`,
  * `'comfortable'`: add the class `sq-comfortable` to all metadata entries, the expected effect is that the spacing is broader than `'default'`,

To use this component independently of the `Metadata` component particular classes should be used on the container element of the `sq-metadata-item`
elements. The `sq-metadata` class should always be present on the container. Additionally, if a `tabular` layout is required then the `sq-tabular`
class should be added.
