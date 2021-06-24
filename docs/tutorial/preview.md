---
layout: default
title: Preview & Modals
parent: Tutorial
nav_order: 7
---

# Preview & Modals

Now, we would like to display the **HTML preview** of a document when clicking on its title, including all the highlighted entities detected by Sinequa in the text of the document.

As usual, the preview is packaged in a module from [`@sinequa/components`]({{site.baseurl}}modules/components/components.html): the [`BsPreviewModule`]({{site.baseurl}}modules/components/preview.html).

Furthermore, we would like the preview to be displayed in **popup**. Again, we have a module for that: The [`BsModalModule`]({{site.baseurl}}modules/components/modal.html).

## Importing the Modal and Preview modules

In your `app.module.ts`, import the `BsPreviewModule` and `BsModalModule` and add them to the `NgModule` declaration:

```ts
import { BsPreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';

@NgModule({
  imports: [
    ...
    BsPreviewModule,
    BsModalModule
```

## Opening a popup

First let's try to open a popup when clicking on the title of a document. This popup is a new component.

Create a new component in `src/app/`, named `preview.ts`.

```ts
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

```ts
import { Preview } from './preview';

@NgModule({
  ...
  declarations: [
    ...
    Preview
```

Now, in our `app.component.ts`, let's create a method `openDocument()` to open our new component with the `ModalService`:

```ts
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

```html
{% raw %}<a href="#" (click)="openDocument(record)">
    <h3 [innerHtml]="record.displayTitle || record.title"></h3>
</a>
<a href="{{record.url1}}">
    <div class="source">{{record.url1}}</div>
</a>{% endraw %}
```

Now, click on one the documents... Here is what you should see:

![Modal popup]({{site.baseurl}}assets/tutorial/modal.png){: .d-block .mx-auto }

## Passing data to a modal component

Now, let's try to display the title of the document in the preview header.

To do so, we need to update our `openDocument()` method:

```ts
openDocument(record: Record){
    this.modalService.open(Preview, {model: record});
    return false;
}
```

The `ModalService` is going to inject the `Record` object into our `Preview` component. We can get this input by declaring a constructor in our `Preview` component:

```ts
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

![Modal with title]({{site.baseurl}}assets/tutorial/modal-title.png){: .d-block .mx-auto }

## Preview data

Before we can display the HTML preview, we need to get the URL of this preview from the backend. This can be managed by the `PreviewService`.

In the constructor of your `Preview` component, add the following asynchronous call:

```ts
import { PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';

...
export class Preview {

    url?: string; // URL of the HTML preview

    constructor(
        ...
        previewService: PreviewService,
        searchService: SearchService){

        previewService.getPreviewData(record.id, searchService.query).subscribe({
            next: (data) => {
                this.url = previewService.makeDownloadUrl(data.documentCachedContentUrl);
            }
        });
```

The preview data contains the `documentCachedContentUrl` property which is the one we need to load in an `<iframe>` element.

## Displaying the HTML

To display the HTML, we will use the `sq-preview-document-iframe` component from the Preview module rather than directly using an `iframe`, since it takes care of a few issues for us.

We can modify the HTML template of our `Preview` component:

```html
<sq-modal [title]="record.title" [showFooter]="false">
    <sq-preview-document-iframe [downloadUrl]="url"></sq-preview-document-iframe>
</sq-modal>
```

![Small Preview Modal]({{site.baseurl}}assets/tutorial/modal-small.png){: .d-block .mx-auto }

This works, but our large preview is displayed in a very small dialog... To fix this, we should first ask the `ModalService` to use the full screen:

```ts
this.modalService.open(Preview, {model: record, fullscreen: true});
```

Finally, a fullscreen preview!

![Fullscreen preview]({{site.baseurl}}assets/tutorial/modal-preview.png){: .d-block .mx-auto }

## Highlighting entities in the preview

Notice that our HTML does not seem to contain any highlight...

But, if you look closer and inspect the content of the HTML, you can actually see that the entities detected by Sinequa are wrapper in `<span>` elements with lots of attributes:

![Entities in the HTML]({{site.baseurl}}assets/tutorial/preview-entities.png){: .d-block .mx-auto }

What the application is missing is a `preview.css` file to apply colors to these elements.

Let's create a new `preview.scss` file in our `src/styles/` directory, and add the following content:

```scss
span.extractslocations {
    background-color: #ecdcdc
}

span.matchlocations {
    background-color: #e9cdcd
}

span.company {
    background-color: #c0e1ee
}

span.geo {
    background-color: #bef0e5
}

span.person {
    background-color: #ddecb8
}
```

This doesn't actually have any effect, because by default Angular won't build separate CSS files...

We have to edit the `angular.json` file at the root of our workspace, and replace the following lines:

```json
"styles": [
    "projects/hello-search/src/styles/app.scss"
],
```

By:

```json
"extractCss": true,
"styles": [
    {
        "input": "projects/hello-search/src/styles/app.scss",
        "bundleName": "app"
    },
    {
        "input": "projects/hello-search/src/styles/preview.scss",
        "bundleName": "preview",
        "inject": false
    }
],
```

And now... Voilà:

![Highlighted entities]({{site.baseurl}}assets/tutorial/entities-highlights.png){: .d-block .mx-auto }

---

Next: [User Settings](user-settings.html)
{: style="float: right;" }

Previous: [Autocomplete](autocomplete.html)
