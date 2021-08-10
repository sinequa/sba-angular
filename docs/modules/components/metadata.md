---
layout: default
title: Metadata Module
parent: Components
grand_parent: Modules
nav_order: 8
---

# Metadata Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/MetadataModule.html) auto-generated from source code.

## Features

This module introduces the UI component that displays the metadata of a document in the search result page.

![Document metadata]({{site.baseurl}}assets/modules/metadata/metadata-example.png){: .d-block .mx-auto }
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

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enMetadata} from "@sinequa/components/metadata";

const messages = Utils.merge({}, ..., enMetadata, appMessages);
```

To work properly, you should also import the module's stylesheet in your own application's stylesheet (this stylesheet uses Bootstrap functions to generate colors for the metadata badges):

```scss
@import "../../../components/metadata/metadata.scss";
```

## API usage

This module exports the [`Metadata` component]({{site.baseurl}}components/components/Metadata.html) that is responsible for displaying the metadata of a document.

An entry of metadata is simply a value of an index column of the considered document. Documents have many different types of metadata (mono-valued, multiple-valued, entities, tree-structured, text, numbers, dates, booleans...)

For example, some of the metadata displayed by `vanilla-search` are:

| Metadata title    | Index column  | Icon name in `icons.scss` |
|-------------------|---------------| --------------------------|
| Size              | size          | size                      |
| Format            | docformat     | docformat                 |
| Date              | modified      | modified                  |
| Filename          | filename      | filename                  |
| Sources           | treepath      | treepath                  |

The selector for the component is `sq-metadata` and it expects a number of inputs:

**Required parameters:**

* `record`: The document whose metadata is being displayed,
* `items` (`string[]`): The metadata entries of the document to be displayed, these are simply the names of index columns,

**Optional parameters:**

* `showTitles` (default: `true`): Whether to display the title of the metadata entry, these titles are defined in the configuration of the query web service, in **Advanced** tab > **Column Aliases** grid,
* `showIcons` (default: `false`): Whether to display the icon of the metadata entry, these icons are defined in the `icons.scss` files, with the name of the icon entry being the same as the name of the index column.
* `showCounts` (default: `true`): When the metadata is a list of entities (extracted from the text of the document), this option allows to display the number of occurrences of these entities in that document.
* `clickable` (default: `true`): Whether the metadata entries are clickable (in which case they are displayed as "badges" instead of plain text).
* `searchOnClick` (default: `true`): When `true`, clicking on a metadata item produces a filter in the current query.
* `tabular` (default: `true`): When `true`, the metadata is displayed as a table (1 row = 1 column), and when `false` all the metadata is displayed inline.
* `collapseRows` (default: `true`): In tabular mode, when the data is multivalued (for entities and CSV columns), only display one line of data with a button to expand/collapse this line.

The component also emits an event when an element of the metadata is selected / clicked on.

### Examples

The following metadata is displayed with all the default options:

```ts
this.metadata = ["authors", "docformat", "modified", "size", "treepath", "filename", "geo", "company"]
```

```html
<sq-metadata
  [record]="record" 
  [items]="metadata">
</sq-metadata>
```

![Default metadata settings]({{site.baseurl}}assets/modules/metadata/metadata-default.png){: .d-block .mx-auto }

In this other example, the same metadata is displayed with the following options:

```html
<sq-metadata 
  [record]="record"
  [items]="metadata"
  [showIcons]="true"
  [showTitles]="false"
  [showCounts]="false"
  [clickable]="false"
  [tabular]="false"
  [collapseRows]="false">
</sq-metadata>
```

![Inline metadata settings]({{site.baseurl}}assets/modules/metadata/metadata-inline.png){: .d-block .mx-auto }

### Metadata Item

This module also exports the [`MetadataItem` component]({{site.baseurl}}components/components/MetadataItem.html) which is used by
the `Metadata` component and displays a **single** metadata item. Using the `MetadaItem` component directly provides more layout flexibility,
allowing other content to interspersed in the layout and different input properties to be specified for individual items. The component's
selector is `sq-metadata-item` and it expects a number of inputs which are similar to those of the `Metadata` component.

```html
<sq-metadata-item [record]="record" [item]="'geo'"></sq-metadata-item>
```

![Single metadata item]({{site.baseurl}}assets/modules/metadata/metadata-item.png){: .d-block .mx-auto }
