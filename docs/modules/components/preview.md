---
layout: default
title: Preview Module
parent: Components
grand_parent: Modules
nav_order: 5
---

# Preview Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsPreviewModule.html) auto-generated from source code.

The Autocomplete module is also documented in the [tutorial]({{site.baseurl}}tutorial/preview.html).

[Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html#preview-route) also has a documented [preview component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview).

## Features

This module provides functionality to display the HTML preview of a document in Sinequa, as well as features to interact with the content of this preview:

- A **service** that queries the server for the preview data ([`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html)) and manages the different ways of displaying the preview (in a popup, in a route or in a new tab/window).
- A **core API** to display the HTML preview and interact with its content. It is composed of two components ([`sq-preview-document-iframe`]({{site.baseurl}}components/components/PreviewDocumentIframe.html) to display the preview and [`sq-preview-tooltip`]({{site.baseurl}}components/components/PreviewTooltip.html), a dynamic tooltip that can be inserted in the document) and a class ([`PreviewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html)) to interact with the content.
- Additional **components** based on this core API and on the [Bootstrap](https://getbootstrap.com/) library to display and interact with the preview in different ways (faceted preview, popup, etc.).

![Preview]({{site.baseurl}}assets/tutorial/modal-preview.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`.

```ts
import { BsPreviewModule } from '@sinequa/components/preview';

@NgModule({
  imports: [
    ...
    BsPreviewModule
```

## Preview Service

The [`PreviewService`]({{site.baseurl}}components/injectables/PreviewService.html) provides the following API:

- `getPreviewData(id: string, query: Query, audit = true): Observable<PreviewData>`

    This method uses the [`PreviewWebService`]({{site.baseurl}}core/injectables/PreviewWebService.html) to obtain the [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html) for a given document and search query and also takes care of generating audit events.

- `makeDownloadUrl(url: string): SafeResourceUrl`

    This method is necessary to sanitize the preview URL from [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html).

- `openRoute(record: Record, query: Query, path = "preview")`

    This method navigates to a URL of the form `#preview?id=...&query=...`, which means your app must have a `/preview` route which takes care of extracting these parameters for the URL, querying `getPreviewData()` and displaying the preview. This is the case in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html#preview-route).

- `openNewWindow(record: Record, query: Query)`

    This method opens *a new window* with a URL of the form: `#preview?id=...&query=...&app=...`, which means your app must have a `/preview` route which takes care of extracting these parameters for the URL, querying `getPreviewData()` and displaying the preview.

- `openModal(record: Record, query: Query, model: any)`

    This method uses the [`ModalService`]({{site.baseurl}}core/injectables/ModalService.html) to open a popup dialog with the preview. The component displayed by this modal is by default [`sq-preview-popup`](components/components/BsPreviewPopup.html), but it can be replaced by your own custom component by adding it in to your providers in `app.module.ts`:

    ```ts
    providers: [
        ...
        {provide: PREVIEW_MODAL, useValue: MyPreviewPopup}
    ]
    ```

    Note that the component itself must take care of querying the `getPreviewData()` method.

## Core API

### Document iframe

The HTML preview is a standalone webpage with its styles and scripts. It must be displayed inside an `<iframe>` element. This is the role of the [`sq-preview-document-iframe`]({{site.baseurl}}components/components/PreviewDocumentIframe.html) component.

The component expects the following inputs:

- `downloadUrl`: The URL of the HTML preview. This URL is the sanitized version of the one provided by [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html) (use `downloadUrl = previewService.makeDownloadUrl(data.documentCachedContentUrl)`).
- `scalingFactor` (Optional): A factor for scaling the preview (generally downscaling), so you can see the whole preview in a small container.
- `sandbox` (Optional): A string containing the sandbox value for the `sandbox` attribute. The `sandbox` attribute is used to restrict `iframe` content actions. By default, the value is set to : `allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts`

When the HTML preview finishes loading in the `<iframe>`, the component emits an `onPreviewReady` event. The event is an instance of [`PreviewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html).

### Preview Document

The [`PreviewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html) class is a wrapper around the `document` object of the iframe. It exposes an API to manipulate the content of the preview.

The main methods are the following:

- `insertComponent(component)`: Appends a DOM element to the preview's `<body>`.
- `getHighlightText(categoryId, index)`: Returns the text of the entity or highlight by id (`#categoryId_index`); these parameters are consistent with those available in [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html).
- `selectHighlight(categoryId, index)`: Selects a specific entity of highlight (defined as the previous method). "Select" means we scroll the page to view the entity and add the `sq-current` class to its `<span>` element (which allows highlighting it via CSS).
- `clearHighlightSelection()`: Remove any selected element (as defined in the previous method).
- `updateHighlightFilterState(filters)`: Applies a global filter that turns highlighting on or off.
- `filterHighlights(filters)`: Applies a global filter that turns highlighting on or off and clears the selection.
- `toggleHighlight(category, on, value?)`: Turns on or off a category of highlights (eg. a type of entity), or a specific value if provided.

### Preview Tooltip

The core API also includes [`sq-preview-tooltip`]({{site.baseurl}}components/components/PreviewTooltip.html), a customizable component which can be inserted in the HTML preview, and responds to the user's mouse movements and clicks. This enables custom features when hovering over an entity or selecting some text.

![Tooltip hover]({{site.baseurl}}assets/modules/preview/tooltip-hover.png){: .d-block .mx-auto }
*Default Preview Tooltip when hovering over an entity*
{: .text-center }

![Tooltip select]({{site.baseurl}}assets/modules/preview/tooltip-select.png){: .d-block .mx-auto }
*Customized tooltip showing a "Search" action in Vanilla Search*
{: .text-center }

The tooltip is inserted in the preview by transclusion:

```html
<sq-preview-document-iframe [downloadUrl]="downloadUrl" (onPreviewReady)="onPreviewReady($event)">

    <!-- Tooltip injected in the preview -->
    <sq-preview-tooltip #tooltip [previewDocument]="previewDocument" [previewData]="previewData">
    </sq-preview-tooltip>

</sq-preview-document-iframe>
```

The tooltip takes custom *actions* (See [Action Module](action.html)) as inputs for either the *entity hover* or the *text selection* behaviors shown above.

For example:

```html
<sq-preview-tooltip ... [selectedTextActions]="tooltipTextActions">
</sq-preview-tooltip>
```

And:

```ts
this.tooltipTextActions = [new Action({
    text: "Search",
    icon: "fas fa-search",
    action: (action, event) => {
        ...
    }
})];
```

## Preview Components

### Preview Facet

The [`sq-preview-facet-2`]({{site.baseurl}}components/components/BsFacetPreviewComponent2.html) displays a scaled-down preview in a facet (See [Facet Module](facet.html)). The header of the facet displays the record's metadata (with a [`sq-metadata`]({{site.baseurl}}components/components/Metadata.html) component).

![Preview facet]({{site.baseurl}}assets/modules/preview/facet.png){: .d-block .mx-auto width="400px" }

The component requires at least a [`record`]({{site.baseurl}}core/interfaces/Record.html) and a [`query`]({{site.baseurl}}core/classes/Query.html) as inputs (they are necessary to download the [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html)).

```html
<sq-facet-card>
    <sq-facet-preview-2 #facet
        [record]="record"
        [query]="searchService.query">
    </sq-facet-preview-2>
</sq-facet-card>
```

This component is used in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html)'s [Search component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search).

### Extract Panel

The [`sq-preview-extracts-panel`]({{site.baseurl}}components/components/BsPreviewExtractsPanelComponent.html) component displays the relevant extracts extracted from the [`PreviewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html). Clicking on a extract selects it in the preview (highlight and scroll).

![Extract panel]({{site.baseurl}}assets/modules/preview/extracts.png){: .d-block .mx-auto width="350px"}

The component requires a [`previewData`]({{site.baseurl}}core/interfaces/PreviewData.html) input and a [`previewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html).

```html
<sq-preview-extracts-panel [previewData]="previewData" [previewDocument]="previewDocument">
</sq-preview-extracts-panel>
```

This component is used in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html)'s [Preview component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview).

### Entity Panel

The [`sq-preview-entity-panel`]({{site.baseurl}}components/components/BsPreviewEntityPanelComponent.html) component displays the lists of entities and matches in the document. The data is available in the [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html) object. The facets displaying each type of highlight allow the user to navigate between the different occurrences and turn them on or off.

![Entity panel]({{site.baseurl}}assets/modules/preview/entities.png){: .d-block .mx-auto width="350px" }

The component requires a [`previewData`]({{site.baseurl}}core/interfaces/PreviewData.html) input and a [`previewDocument`]({{site.baseurl}}components/classes/PreviewDocument.html).

```html
<sq-preview-entities-panel [previewData]="previewData" [previewDocument]="previewDocument">
</sq-preview-entities-panel>
```

This component is used in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html)'s [Preview component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview).

### Search Form

The [`sq-preview-search-form`]({{site.baseurl}}components/components/BsPreviewSearchFormComponent.html) component is a simple search form that lets users search for content within the preview.

The search is actually triggered by navigating to the same URL but updating the `query.text` field. **⚠️ This assumes the component lives inside a "Preview" route which listens to URL changes and updates the [`PreviewData`]({{site.baseurl}}core/interfaces/PreviewData.html) via the [`PreviewService`]({{site.baseurl}}components/injectables/PreviewService.html) accordingly**.

![Search form]({{site.baseurl}}assets/modules/preview/search-form.png){: .d-block .mx-auto width="350px" }

```html
<sq-preview-search-form [query]="query"></sq-preview-search-form>
```

### Preview popup

The [`sq-preview-popup`]({{site.baseurl}}components/components/BsPreviewPopup.html) is a "document navigator" user interface displayed in a popup (See [Modal Module](modal.html)). The component displayed *inside* the popup is actually [`sq-preview-panel`]({{site.baseurl}}components/components/BsPreviewPanel.html).

This component requires you to import a stylesheet ([`components/preview/bootstrap/preview.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/components/preview/bootstrap/preview.scss)) in your global `styles/app.scss`.

![Preview popup]({{site.baseurl}}assets/modules/preview/popup.png){: .d-block .mx-auto }

The popup can be displayed with:

```ts
this.previewService.openModal(this.record, this.query, {
    displaySimilarDocuments: true,
    metadata: ["filename", "authors", "size"]
});
```

(As mentioned [above](#preview-service), you can replace this popup by your own custom component)
