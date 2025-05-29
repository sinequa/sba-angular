---
layout: default
title: Filters Module
parent: Components
grand_parent: Libraries
sidebar_position: 4
---

# Filters Module

## Features

This module provides 3 components to visualize the [filters](../core/app-utils.md#filtering-the-metadata) of a `Query` object.

A query can contain a "tree" of filters defining the boolean conditions for filtering the search results. These filters might look like:

- Source: "Documentation"
- And either:
  - Format: "pdf"
  - Format: "html"

These filters would be added to a `query` object with the `addFilter` method:

```ts
query.addFilter({
  operator: "and",
  filters: [
    {field: "Source", value: "Documentation"},
    {
      operator: "or",
      filters: [
        {field: "Format", value: "pdf"},
        {field: "Format", value: "html"},
      ]
    }
  ]
});
```

See more details about the supported filters in the [documentation of the Query objects](../core/app-utils.md#filtering-the-metadata).

The filters would then be represented by the following tree (in the `sq-filters-editor` component):

![Filters Editor](/assets/modules/filters/filters-editor.png)

## Import

```typescript
import { FiltersModule } from '@sinequa/components/filters';

@NgModule({
  imports: [
    ...
    FiltersModule,
  ],
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enFilters} from "@sinequa/components/filters";

const messages = Utils.merge({}, ..., enFilters, appMessages);
```

## API usage

### Filters component

The `sq-filters` component displays the filters of a query in an inline view:

<doc-filters></doc-filters>

### Filters editor component

The `sq-filters-editor` component displays the filters of a query in an editable tree view:

<doc-filters-editor></doc-filters-editor>

### Filters view component

The `sq-filters-view` component integrates both the `sq-filters` and `sq-filters-editor` components. By default it displays the `sq-filters` component, and when clicking on the "Edit" button, it displays the `sq-filters-editor` component.

<doc-filters-view></doc-filters-view>
