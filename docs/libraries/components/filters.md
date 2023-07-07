---
layout: default
title: Filters Module
parent: Components
grand_parent: Libraries
nav_order: 4
---

# Filters Module

## Features

This module provides 3 components to visualize the *filters* of a `Query` object.

A query can contain a "tree" of filters defining the boolean conditions for filtering the search results. For example, a query might the filters:

- Source: "Documentation"
- And either:
  - Format: "pdf"
  - Format: "html"

Which is represented by the following tree (in the `sq-filters-editor` component):

![Filters Editor]({{site.baseurl}}assets/modules/filters/filters-editor.png){: .d-block .mx-auto }

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
