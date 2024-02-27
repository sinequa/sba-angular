---
layout: default
title: Preview & Modals
parent: Tutorial
sidebar_position: 7
---

# Preview & Modals

Now, we would like to display the **HTML preview** of a document when clicking on its title, including all the highlighted entities detected by Sinequa in the text of the document.

As usual, the preview is packaged in a module from [`@sinequa/components`](/libraries/components/components.md): the [`PreviewModule`](/libraries/components/preview.md).

Furthermore, we would like the preview to be displayed in **popup**. Again, we have a module for that: The [`BsModalModule`](/libraries/components/modal.md).

## Importing the Modal and Preview modules

In your `app.module.ts`, import the `PreviewModule` and `BsModalModule` and add them to the `NgModule` declaration:

```ts title="app.module.ts"
import { PreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';

@NgModule({
  imports: [
    ...
    PreviewModule,
    BsModalModule
```

## Opening a popup

First let's try to open a popup when clicking on the title of a document. This popup is a new component.

Create a new component in `src/app/`, named `preview.ts`.

```ts title="preview.ts"
import {Component} from "@angular/core";

@Component({
    selector: "preview",
    template: `
<sq-modal [title]="'Hello world'">
    Hello world
</sq-modal>
    `
})
export class Preview {}
```

Add this `Preview` component to the list of **declarations** in your `app.module.ts`.

```ts title="app.module.ts"
import { Preview } from './preview';

@NgModule({
  ...
  declarations: [
    ...
    Preview
```

Now, in our `app.component.ts`, let's create a method `openDocument()` to open our new component with the `ModalService`:

```ts title="app.component.ts"
import { Record } from '@sinequa/core/web-services';
import { ModalService } from '@sinequa/core/modal';
import { Preview } from './preview';

export class AppComponent implements AfterViewInit {
    ...

    constructor(
        ...
        public modalService: ModalService) {

    ...
    openDocument(record: Record){
        this.modalService.open(Preview);
        return false;
    }
```

We are almost there. Refactor your `app.component.html` template to call this method, rather than open the original URL of the document:

```html title="app.component.html"
<a href="#" (click)="openDocument(record)">
    <h3 [innerHtml]="record.displayTitle || record.title"></h3>
</a>
<a href="{{record.url1}}">
    <div class="source">{{record.url1}}</div>
</a>
```

Now, click on one the documents... Here is what you should see:

![Modal popup](/assets/tutorial/modal.png)

## Passing data to a modal component

Now, let's try to display the title of the document in the preview header.

To do so, we need to update our `openDocument()` method:

```ts title="app.component.ts"
openDocument(record: Record){
    this.modalService.open(Preview, {model: record});
    return false;
}
```

The `ModalService` is going to inject the `Record` object into our `Preview` component. We can get this input by declaring a constructor in our `Preview` component:

```ts title="preview.ts"
import { Component, Inject } from "@angular/core";
import { Record } from '@sinequa/core/web-services';
import { MODAL_MODEL } from '@sinequa/core/modal';

@Component({
    selector: "preview",
    template: `
<sq-modal [title]="record.title">
    Hello world
</sq-modal>
    `
})
export class Preview {

    constructor(
        @Inject(MODAL_MODEL) public record: Record){
    }

}
```

Now your dialog should display the title of the document (notice we also changed the HTML to set the `[title]` parameter):

![Modal with title](/assets/tutorial/modal-title.png)

## Preview data

The component `sq-preview` handles automatically the loading and display of the HTML preview and requires only the record ID and the query.

```ts title="preview.ts"
@Component({
    selector: "preview",
    template: `
<sq-modal [title]="record.title" [showFooter]="false">
    <sq-preview #facet
        [id]="record.id"
        [query]="searchService.query">
    </sq-preview>
</sq-modal>
    `
})
export class Preview {

    constructor(
        @Inject(MODAL_MODEL) public record: Record,
        public searchService: SearchService) {
    }
}
```

![Small Preview Modal](/assets/tutorial/modal-small.png)

This works, but our large preview is displayed in a very small dialog... To fix this, we should first ask the `ModalService` to use the full screen:

```ts
this.modalService.open(Preview, {model: record, fullscreen: true});
```

`sq-preview` has no default sizing so you can use the `style` attribute to have it to take the full height of the modal:

```html
<sq-preview #facet
    class="h-100"
    [id]="record.id"
    [query]="searchService.query">
</sq-preview>
```

Finally, a fullscreen preview!

![Fullscreen preview](/assets/tutorial/modal-preview.png)

## Highlighting entities in the preview

Notice that our HTML does not seem to contain any highlight...

But, if you look closer and inspect the content of the HTML, you can actually see that the entities detected by Sinequa are wrapper in `<span>` elements with lots of attributes:

![Entities in the HTML](/assets/tutorial/preview-entities.png)

To add some highlights, `sq-preview` contains a `[highlightColors]` input. Let's add some to it with the following content:

```ts
import { PreviewHighlightColors } from "@sinequa/components/preview";

...

@Component({
    selector: "preview",
    template: `
<sq-modal [title]="record.title" [showFooter]="false">
    <sq-preview #facet
        class="h-100"
        [highlightColors]="highlights"
        [id]="record.id"
        [query]="searchService.query">
    </sq-preview>
</sq-modal>
    `
})
export class Preview {

    highlights: PreviewHighlightColors[] = [
        {
            name: 'company',
            color: 'white',
            bgColor: '#FF7675'
        },
        {
            name: 'geo',
            color: 'white',
            bgColor: '#74B9FF'
        },
        {
            name: 'person',
            color: 'white',
            bgColor: '#00ABB5'
        },
        {
            name: 'extractslocations',
            color: 'black',
            bgColor: '#fffacd'
        },
        {
            name: 'matchlocations',
            color: 'black',
            bgColor: '#ff0'
        }
    ];

    ...
```

These properties will apply for each `name` classes their provided `color` and `bgColor` (e.g. the text color `white` and the background color `#FF7675` for the `company` class).

And now... Voilà:

![Highlighted entities](/assets/tutorial/entities-highlights.png)
