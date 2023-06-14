---
layout: default
title: Metadata Module
parent: Components
grand_parent: Modules
nav_order: 8
---

# Metadata Module

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

## API usage

This module exports 2 main components: `MetadataItemComponent` which displays one metadata entry, and `MetadataComponent` which displays a list of metadata entries with a layout.

An entry of metadata is simply a value of an index column of the considered document. Documents have many different types of metadata (mono-valued, multiple-valued, entities, tree-structured, text, numbers, dates, booleans...)

For example, some of the metadata displayed by `vanilla-search` are:

| Metadata title    | Index column  | Fontawesome Icon       |
|-------------------|---------------| -----------------------|
| Size              | size          | fas fa-weight-hanging  |
| Format            | docformat     | fas fa-info-circle     |
| Date              | modified      | far fa-calendar-alt    |
| Filename          | filename      | far fa-file-alt        |
| Sources           | treepath      | fas fa-folder-open     |

### The `sq-metadata-item` selector

This component displays one metadata entry and it expects these inputs:

**Required parameters:**

* `record`: The document whose metadata is being displayed.
* `field`: The column name to retrieve the value from.

**Optional parameters:**

* `query` (default: `SearchService.query`): The query to apply any filter action to.
* `label`: A label to insert before the value (which will look like "label: value").
* `icon`: The Fontawesome class of the icon to insert before the label and value.
* `fieldClass`: Any additional CSS classes you want to apply to the field value.
* `filterable` (default: `false`): Whether you can add a filter on this metadata for the query. This will add a "Filter" button in a tooltip.
* `excludable` (default: `false`): Whether you can add an exclusion filter on this metadata for the query. This will add an "Exclude" button in a tooltip.
* `showEntityExtract` (default: `false`): Whether the entity extract should be displayed in a tooltip.
* `actions`: Any additional actions for the metadata entry to display in a tooltip.
* `collapseRows` (default: `true`): Whether the rows are collapsible, to save space.
* `entityExtractMaxLines` (default: `4`): The maximum number of lines to display for the entity extract in the tooltip.
* `actionsButtonsStyle` (default: `btn btn-secondary`): The style to apply to the action buttons.
* `actionsButtonsSize` (default: `sm`): The size to apply to the action buttons.

### The `sq-metadata` selector

This component displays a list of `sq-metadata-item` and facilitates the layout which can either be linear or with one entry per line. It also allows to construct sentences to include metadata entries to.

**Required parameters:**

* `record`: The document whose metadata is being displayed,
* `config` (`(MetadataConfig | string)[]`): The metadata entries of the document to be displayed, this is a list containing some `MetadataConfig` objects which contain the parameters to apply for each metadata entry following what `sq-metadata-item` as inputs. There can also be strings in this array which allows you to make sentences with metadata entries in the middle of them (example below).

**Optional parameters:**

* `query` (default: `SearchService.query`): The query to apply any filter action to.
* `layout` (default: `inline`): The type of layout for the metadata entries list. This can only be "inline" (all next to each other) or "table" (one per line).
* `actionsButtonsStyle` (default: `btn btn-secondary`): The style to apply to the action buttons.
* `actionsButtonsSize` (default: `sm`): The size to apply to the action buttons.

The component also emits an event when an element of the metadata is selected / clicked on.

## Examples

### Metadata

<!-- <doc-metadata></doc-metadata> -->

The following metadata is displayed with all the default options:

```ts
this.metadata: MetadataConfig[] = [
    {
        field: "docformat",
        label: "Format",
        icon: "fas fa-info-circle"
    },
    {
        field: "modified",
        label: "Date",
        icon: "far fa-calendar-alt"
    },
    {
        field: "size",
        label: "Size",
        icon: "fas fa-weight-hanging"
    },
    {
        field: "treepath",
        label: "Source",
        icon: "fas fa-folder-open"
    },
    {
        field: "filename",
        label: "Filename",
        icon: "far fa-file-alt"
    }
];
```

```html
<sq-metadata
    [record]="openedDoc"
    [config]="metadata"
    [query]="searchService.query">
</sq-metadata>
```

![Default metadata settings]({{site.baseurl}}assets/modules/metadata/metadata-default.png){: .d-block .mx-auto }

You can also add the `[layout]="'table'"` input to the component to have one entry per line.

![Table metadata]({{site.baseurl}}assets/modules/metadata/metadata-table.png){: .d-block .mx-auto }

The `filterable` and `excludable` parameters can be used to display the filtering buttons when hovering the metadata entry:

```ts
this.metadata: MetadataConfig[] = [
    {
        field: "docformat",
        label: "Format",
        icon: "fas fa-info-circle",
        filterable: true,
        excludable: true
    },
    {
        field: "modified",
        label: "Date",
        icon: "far fa-calendar-alt",
        filterable: true
    },
    ...
```

![Filter and Exclude]({{site.baseurl}}assets/modules/metadata/metadata-filters1.png){: .d-block .mx-auto }

![Filter only]({{site.baseurl}}assets/modules/metadata/metadata-filters2.png){: .d-block .mx-auto }

Here is also with a custom action:

```ts
this.metadata: MetadataConfig[] = [
    {
        field: "docformat",
        label: "Format",
        icon: "fas fa-info-circle",
        filterable: true,
        excludable: true,
        actions: [new Action({
            text: "Test",
            icon: "fas fa-user-edit",
            action: () => {
                // some code
            }
        })
    },
    ...
```

![Metadata custom action]({{site.baseurl}}assets/modules/metadata/metadata-actions.png){: .d-block .mx-auto }

As mentioned before, the `config` array input can also contain strings, allowing to create full sentences containing some metadata entries inside of it. Here is an example:

```ts
this.metadata: (MetadataConfig | string)[] = [
    "The document ",
    {
      field: "filename",
      fieldClass: "mx-1 badge rounded-pill bg-secondary",
      filterable: true
    },
    " has been created the ",
    {
      field: "modified",
      fieldClass: "ms-1 sq-text"
    }
];
```

Notice the `sq-text` class provided which makes it the same font size as the text since metadata entries are smaller by default.

![Metadata custom action]({{site.baseurl}}assets/modules/metadata/metadata-sentence.png){: .d-block .mx-auto }

### Metadata item

While `sq-metadata` facilitates the layout, you can just use `sq-metadata-item` to display a metadata entry:

```html
<sq-metadata-item [record]="openedDoc" [field]="'modified'"></sq-metadata-item>
```

![Metadata item]({{site.baseurl}}assets/modules/metadata/metadata-item.png){: .d-block .mx-auto }

Or with more parameters:

```html
<sq-metadata-item
    [record]="openedDoc"
    [field]="'modified'"
    [icon]="'fas fa-phone'"
    [fieldClass]="'badge rounded-pill bg-secondary'"
    [filterable]="true"
    [excludable]="true"
    [label]="'Label'">
</sq-metadata-item>
```

![Metadata item]({{site.baseurl}}assets/modules/metadata/metadata-item2.png){: .d-block .mx-auto }
