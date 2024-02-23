---
layout: default
title: Slide Builder Module
parent: Components
grand_parent: Libraries
sidebar_position: 14
---

# Slide Builder Module

## Features

This module provides components for displaying, rearranging and exporting Powerpoint slides.

![Slide Builder](/assets/modules/slide-builder/slide-builder.png)


Users can select slides from the results list to add them to their presentation. Rearranging the slide order is simply done by drag and drop. Finally, a button allows to produce a Powerpoint file from the list of slides.

## Prerequisites

> ⚠️⚠️⚠️ **NOTE:** This module requires a web service available as of Sinequa 11.7.0. ⚠️⚠️⚠️

## Server-side configuration

Before slide builder can be implemented on the front-end, the server-side configuration requires the following:

- [Conversion Plan & Converter](#conversion-plan--converter): integral part to splitting the individual PowerPoint slides.
- [Collection](#collection): requires included extensions and the appropriate conversion plan.
- [Query Web Service](#query-web-service): requires a specific tab configuration that displays the slide builder.

### Conversion Plan & Converter

In order to implement slide builder, a collection requires storing PowerPoint documents locally.
Thus, we must ensure the conversion plan satisfies the following criteria:

1. Conversion Plan: ***Store Original*** --enabled for PowerPoint extensions.

    ![Slide Builder](/assets/modules/slide-builder/slide-conversionplan.png)
    

2. Converter: Converters splitting the documents

    ![Slide Builder](/assets/modules/slide-builder/slide-converter1.png)
    
    ---
    ![Slide Builder](/assets/modules/slide-builder/slide-converter2.png)
    

### Collection

All slide builder collections should be stored in a centralized **source** and **index**. No other type of records should be stored.

There are two ways to configure a collection to index slides:

1. Creating a collection only indexing PowerPoint documents

    When creating a collection **specifically** for the slide builder module, the collection should only index PowerPoint extensions.

    ![Slide Builder](/assets/modules/slide-builder/slide-extensions.png)
    

    ⚠️ The conversion plan previously configured should be attached to this collection.

2. Creating a HyperIndex collection targetting an exisiting index containing other extensions

    Some collections may already contain preexisting data. To avoid repetition creating a collection from scratch and reindexing data on a seperate collection,
    ensure that the preexisting collections satisfies the conversion plan configuration.

    - It is required to reindex the preexisting data if the conversion plan was not configured previously.
    - By creating a **HyperIndex connector**, the targeted index (that contains various types of documents) will be filtered to index only PowerPoint extensions.

### Query Web Service

The query web service must be configured to provide the slides in a context where we want to display the slide builder. One way to achieve this is to create a dedicated **tab**.

For example, we can configure tab search based on the **docformat** or **treepath** column and use index inclusions/exclusions to return the right content in our dedicated "slides" tab.

![Slide Builder](/assets/modules/slide-builder/slide-queryservice-tabs1.png)


![Slide Builder](/assets/modules/slide-builder/slide-queryservice-tabs2.png)


Note that the slides index is excluded from the "all" tab, to avoid displaying individual slides in that context.

## SBA integration

### Import

Add `SlideBuilderModule` to your Angular imports in `app.module.ts`:

```ts
import { SlideBuilderModule } from "@sinequa/components/slide-builder";
/*....*/

@NgModule({
    imports: [
        /*....*/
        SlideBuilderModule,
        /*....*/
    ],
    /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enSlideBuilder} from "@sinequa/components/slide-builder";

const messages = Utils.merge({}, ..., enSlideBuilder, appMessages);
```

### Slide Builder component

The `sq-slide-builder` component displays a list of selected slides. The component actually uses the `SelectionService` from the [Selection Module](selection.md) as a data model for the selected slides. The Drag & Drop capability is actually directly based on the [`sq-selection-arranger`](selection.md#selection-arranger) component.

![Slide arranger](/assets/modules/slide-builder/slide-arranger.png)

This component is designed to be embedded in a facet card:

```html
<sq-facet-card *ngIf="results.tab === 'slides'"
    [collapsible]="false"
    icon="far fa-file-powerpoint"
    title="Slide Deck Builder"
    tooltip="Click on a slide from the search results to add it to the Slide Deck Builder."
    class="d-block mb-3 facet-preview">
    <sq-slide-builder #facet></sq-slide-builder>
</sq-facet-card>
```


When at least one slide is selected, the action buttons are displayed in the facet header. They let users export the presentation as a Powerpoint file, save it as a basket (or collection), or clear the current selection.

It is possible to deactivate the option to save as a basket by passing the input `enableSaveAsBasket` as `false`.

It is also possible to customize the display by passing a template by transclusion:

```html
<sq-slide-builder #facet>
    <ng-template let-record>
        <div>This is the record: {{record.id}}</div>
    <ng-template>
</sq-slide-builder>
```

### Slide List component

The `sq-slide-list` component displays a tiled view of PowerPoint slides:

![Slide list](/assets/modules/slide-builder/slide-list.png)

The component requires a `Results` object as an input, and, of course, the component should be displayed only in a context where the records are individual slides. A good way to create such a context is to use tab, as shown below:

```html
<sq-slide-list [results]="results" *ngIf="results.tab === 'slides'">
</sq-slide-list>
```


The component has various optional inputs and outputs:

- `colClass` (default: `'col-6'`): A [Bootstrap column class](https://getbootstrap.com/docs/4.0/layout/grid/) to determine the width of the slides. By default, `'col-6'` gives 50% of the available width to each slide. `'col-12'` would give 100% of the width, `'col-4'`, one-third, and so one. This parameter can be used to easily balance the density of the view and legibility of the slides.
- `selectedRecord`: A single `Record` that is considered "selected" by the user (for example, to display the preview). This affects only the display of that record and the keyboard-based navigation.
- `recordSelect` (output): An event triggered when the user uses keyboard-based navigation to go through the list of results.
- `recordKeydown` (output): An event triggered when the user uses a key while a record is selected via keyboard-based navigation.
