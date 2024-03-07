---
layout: default
title: Collapse Module
parent: Components
grand_parent: Libraries
sidebar_position: 21
---

# Collapse Module

## Features

This module provides components to add collapsible panels to your components as well as collapse/expand buttons to trigger this effect.

One of the usages of this module is the collapse/expand functionality of the facets (with `collapsible = true`).

![Collapse functionality in facet](/assets/modules/collapse/collapse-facet-example.png)
*Collapse functionality in facet*


## Import

Add `CollapseModule` to your Angular imports in `app.module.ts`:

```ts
import { CollapseModule } from "@sinequa/components/collapse";
/*....*/

@NgModule({
    imports: [
        /*....*/
        CollapseModule,
        /*....*/
    ],
    /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enCollapse} from "@sinequa/components/collapse";

const messages = Utils.merge({}, ..., enCollapse, appMessages);
```

## API usage

The `sq-collapse` component can be used in Angular templates to create collapsible panels.

Wrap the collapsible content into `<sq-collapse>` and `<ng-template>` elements (meaning the content will be instantiated only once displayed).

Example 1: A collapsible list of element in the HTML template

<doc-collapse></doc-collapse>

The `sq-collapse` component only expects a `boolean` property `collapsed`, which instructs it whether to show the collapsible content or not.

You can manage the variable/property that is used as input of this property as you like.
You can change it using an HTML button like in the above example or with any other HTML components.

`@sinequa/components/collapse` also includes a syntactic sugar component - `sq-collapse-button` - to help you quickly create input components to toggle the `collapsed` property. By default, these components display a chevron icon (as in the image above), but the icon and text can be customized via the `icon`, `text`, `collapsedTitle` and `expandedTitle` inputs respectively.

Example 2: Usage of the `sq-collapse-button`

<doc-collapse-button></doc-collapse-button>
