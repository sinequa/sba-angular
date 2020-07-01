---
layout: default
title: Vanilla Search
parent: Modules
nav_order: 4
---

# Vanilla Search

*Vanilla Search* is a standard Enterprise Search app designed to be simple, efficient and easy to customize into a much more complex application.

If you complete the [Tutorial]({{site.baseurl}}tutorial/tutorial.html), you should notice a lot of similarities between your final app and Vanilla Search. This is intentional, to make it easy for developers to transition from [Hello Search]({{site.baseurl}}modules/hello-search/hello-search.html) and the tutorial, to a full-fledged Enterprise Search app.

The application has **three routes** made of **five components** (of course, these components include many subcomponents from the [`@sinequa/components`]({{site.baseurl}}modules/components/components.html) library):

- The **App** component, which is essentially a wrapper for the [`<router-outlet>`](https://angular.io/api/router/RouterOutlet).
- A **Home** route, greeting users with a search bar and some quick-access facets.
- A **Search** route, allowing users to browse and refine search results and access other features.
- A **Preview** route, allowing users to see the details of a document and navigate its relevant extracts and entities.
- Additionally, a **Search Form** component (which includes the autocomplete) is used within both the Home and Search routes.

The routes are configured in the [`app.module.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/app-module.ts) file:

```ts
export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "search", component: SearchComponent},
    {path: "preview", component: PreviewComponent},
    {path: "**", redirectTo: "home"}
];
```

## Home route

The [Home route](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/home) has a search bar ([Search Form component](#search-form)), and a list of facets:

![Home route]({{site.baseurl}}assets/modules/vanilla-home.png)

You can also switch to a dark theme, by clicking the button under the search bar.

![Home route]({{site.baseurl}}assets/modules/vanilla-dark.png)

You can easily change the logo and application name, at the top of the [template](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.html):

```html
{% raw %}<!-- Home page logo -->
<img src="assets/vanilla-logo.png" id="logo" *ngIf="!isDark()">
<img src="assets/vanilla-logo-dark.png" id="logo" *ngIf="isDark()">

<!-- Home page title -->
<h1>{{ 'msg#app.name' | sqMessage }}</h1>{% endraw %}
```

This is followed by the [search form](#search-form) in the center.

Then, by default, the homepage includes four facets:

- Recent documents: [`sq-facet-recent-documents`]({{site.baseurl}}components/components/BsFacetRecentDocuments.html)
- Recent queries: [`sq-facet-recent-queries`]({{site.baseurl}}components/components/BsFacetRecentQueries.html)
- Saved queries: [`sq-facet-saved-queries`]({{site.baseurl}}components/components/BsFacetSavedQueries.html)
- Collections (aka "Baskets"): [`sq-facet-baskets`]({{site.baseurl}}components/components/BsFacetBasketsComponent.html)

These facets can of course be added or removed, directly in the component template, or via [configuration](#configuration).

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.ts) manages:

- Login and Logout, via the [`LoginService`]({{site.baseurl}}core/injectables/LoginService.html).
- Recent document behaviour (we open the preview).
- Light / Dark theme toggling.
- The list of facets to display and their responsive sizing.

## Search route

The [Search route](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search) has a *navbar* on top, which includes a search bar ([Search Form component](#search-form)), and user menus coming from various libraries of [`@sinequa/components`]({{site.baseurl}}components). Under it are a facet bar (with two facets) and the search results. It is also possible to open a preview of a document on the right, by selecting it in the results.

![Search route]({{site.baseurl}}assets/modules/vanilla-search.png)

The [template](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.html) starts with the **navbar**, which contains:

- A responsive logo (`<img id="logo" src=...>`)
- The [search form](#search-form)
- User menus, which include by default:
  - Collections (aka "Baskets"): [`sq-baskets-menu`]({{site.baseurl}}components/components/BsBasketsMenuComponent.html)
  - Saved Queries: [`sq-saved-queries-menu`]({{site.baseurl}}components/components/BsSavedQueriesMenuComponent.html)
  - Alerts: [`sq-alerts-menu`]({{site.baseurl}}components/components/BsAlertsMenuComponent.html)
  - Labels: [`sq-labels-menu`]({{site.baseurl}}components/components/BsLabelsMenuComponent.html)
  - General User Menu: [`sq-user-menu`]({{site.baseurl}}components/components/BsUserMenuComponent.html)
- The navbar also includes responsive buttons to toggle the visibility of the menu and the facets. The implementation is similar to the one in the [tutorial]({{site.baseurl}}tutorial/responsive-design.html).

The main view under the navbar includes:

- A Facet Bar on the left, with by default:
  - A hierarchical source facet: [`sq-facet-tree`]({{site.baseurl}}components/components/BsFacetTree.html)
  - A multiple metadata facet: [`sq-facet-multi`]({{site.baseurl}}components/components/BsFacetMultiComponent.html)
- In the center, a list of results, including:
  - Tabs: [`sq-tabs`]({{site.baseurl}}components/components/BsTabs.html)
  - Breadcrumbs: [`sq-breadcrumbs`]({{site.baseurl}}components/components/BsBreadcrumbs.html)
  - A Results counter: [`sq-results-counter`]({{site.baseurl}}components/components/ResultsCounter.html)
  - A Sort selector: [`sq-sort-selector`]({{site.baseurl}}components/components/BsSortSelector.html)
  - A "Did you mean?" component: [`sq-did-you-mean`]({{site.baseurl}}components/components/BsDidYouMean.html)
  - Sponsored links: [`sq-sponsored-results`]({{site.baseurl}}components/components/SponsoredResults.html)
  - For each document:
    - A selector (checkbox): [`sq-result-selector`]({{site.baseurl}}components/components/BsResultSelector.html)
    - The document's title: [`sq-result-title`]({{site.baseurl}}components/components/ResultTitle.html)
    - The document's source: [`sq-result-source`]({{site.baseurl}}components/components/ResultSource.html)
    - The document's relevant extracts: [`sq-result-extracts`]({{site.baseurl}}components/components/ResultExtracts.html)
    - The document's missing terms: [`sq-result-missing-terms`]({{site.baseurl}}components/components/ResultMissingTerms.html)
    - The document's thumbnail: [`sq-result-thumbnail`]({{site.baseurl}}components/components/ResultThumbnail.html)
  - A pager: [`sq-pager`]({{site.baseurl}}components/components/BsPager.html)
- And on the right:
  - A list of actions available for the currently selected document(s): [`sq-results-selector`]({{site.baseurl}}components/components/BsResultsSelector.html)
  - A mini-preview facet for the currently clicked document: [`sq-facet-preview-2`]({{site.baseurl}}components/components/BsFacetPreviewComponent2.html)

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.ts) manages:

- The list of facets displayed within [`sq-facet-multi`]({{site.baseurl}}components/components/BsFacetMultiComponent.html) (which can be modified via [configuration](#configuration)).
- The list of menus displayed in the navbar (which can be modified via [configuration](#configuration)).
- The list of metadata displayed by the "mini-preview" (which can be modified via [configuration](#configuration)).
- The opening and closing of documents in the "mini-preview" on the right.
- The (responsive) visibility of facets, results and menus, based on screen size and user actions.

## Preview route

The [Preview route](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview) displays the HTML preview of the document on the right. On the left, a panel contains various tools to interact with the document:

- A search bar ([`sq-preview-search-form`]({{site.baseurl}}components/components/BsPreviewSearchFormComponent.html)), to search and highlight text within the document (note that it uses Sinequa NLP to recognize the language and find words in all their possible forms).
- A list of relevant extracts ([`sq-preview-extracts-panel`]({{site.baseurl}}components/components/BsPreviewExtractsPanelComponent.html)), to quickly navigate to the important parts of the document.
- A list of entities and relevant keywords ([`sq-preview-entity-panel`]({{site.baseurl}}components/components/BsPreviewEntityPanelComponent.html)), to visualize the diversity of topics, navigate between them and control their highlighting.

On the right, the HTML preview is displayed within the [`sq-preview-document-iframe`]({{site.baseurl}}components/components/PreviewDocumentIframe.html) container. Additionally, a dynamic tooltip ([`sq-preview-tooltip`]({{site.baseurl}}components/components/PreviewTooltip.html)) is inserted in the HTML preview, to provide additional functionality when users hover their mouse over entities, or select text.

![Preview route]({{site.baseurl}}assets/modules/vanilla-preview.png)

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/preview/preview.component.ts) manages:

- Navigation events (fetch the preview data when the page is reloaded, or when we search for text within the document).
- Preview Tooltip custom actions (like the search button when text is selected)
- Checking/Unchecking entities based on User Preferences.

## Search form

The [Search Form component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search-form) is similar to the one you build in the [tutorial]({{site.baseurl}}tutorial/completed-app.html#search-form-component).

Additionally, a custom [Autocomplete directive](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete-extended.directive.ts) allows to search into User Settings objects, such as the recent queries, documents, baskets, etc.

![Search form]({{site.baseurl}}assets/modules/search-form.png){: .d-block .mx-auto }

As in the tutorial, the [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/search-form.component.ts) includes a `search()` method. Additionally, it manages the list of custom features that the autocomplete can search into, like the recent documents, the recent queries, the baskets and the saved queries (this list can be [configured](#configuration)).

The [`sqAutocompleteExtended`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete-extended.directive.ts) directive extends the [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive and adds the following:

- The `getSuggests()` method can search in custom objects, as mentioned above (in addition to the classical "Suggest Queries" configured on the server). Notice that, to merge the different sources of autocomplete, we use the [`forkJoin`](https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin) operator from [`rxjs`](https://www.learnrxjs.io/):

    ```ts
    this.processSuggests(
        // The forkJoin method allows to merge the suggestions into a single array, so the parent
        // directive only sees a single source.
        forkJoin(...dataSources).pipe(
            map((suggests) => { 
                return [].concat(...suggests); 
            }),
            catchError((err, caught) => {
                console.error(err);
                return [];
            })
        ), fields);
    ```

    Notice that each data source has a custom search method, leveraging the [`SuggestService`]({{site.baseurl}}components/injectables/SuggestService.html)'s `searchData()` method. For example:

    ```ts
    searchRecentDocuments(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData<RecentDocument>(
            'recent-document',
            text,
            this.recentDocumentsService.recentdocuments,
            (doc: RecentDocument) => doc.title,
            (doc: RecentDocument) => ([] as string[]).concat(doc.url1, doc.treepath, doc.authors),
            "msg#searchForm.recentDocument");
    }
    ```

- The `select()` method performs custom actions, depending on the category of suggestion. For example, recent documents are directly opened, via `previewService.openRoute()`, saved queries are searched in the `/search` route, etc.

## Configuration

Vanilla Search can be configured via two methods (as described in [Configuration]({{site.baseurl}}tipstricks/configuration.html)):

- A central Typescript source file: [`src/config.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/config.ts), which is built with your application.
- A JSON object downloaded from the Sinequa server on start-up (configured in your App's "Customization (JSON)" tab) and available via the [AppService]({{site.baseurl}}core/injectables/AppService.html) (post-login).

The components of Vanilla Search described above use three configuration objects:

- `FEATURES`: a list of `string` that controls which features are activated in the app. This list is used to determine which facets are displayed in the homepage, which menus are displayed in the search page and which objects are searched by the autocomplete.
- `FACETS`: a list of [`FacetConfig`]({{site.baseurl}}components/interfaces/FacetConfig.html) objects that determines the facets displayed within the [`sq-facet-multi`]({{site.baseurl}}components/components/BsFacetMultiComponent.html) component. Each object contains a number of options that are passed to the corresponding facet components.

    For example:

    ```ts
    {
        name: "geo",
        title: "msg#facet.geo.title",
        type: "list",
        aggregation: "Geo",
        icon: "fas fa-globe-americas",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    }
    ```

    Of course, these facets require a corresponding [**Aggregation**](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-ws-queries.html) to exist on the Sinequa server, and consequently within the [`Results`]({{site.baseurl}}core/interfaces/Results.html) object.

- `METADATA`: a list of metadata fields displayed in the "mini-preview", within a [`sq-metadata`]({{site.baseurl}}components/components/Metadata.html) component (More information in the [Custom Metadata]({{site.baseurl}}tipstricks/metadata.html) section).

The three objects above can be customized statically in the `src/config.ts` file. It is also possible to override their value dynamically, via the "Customization (JSON)" tab of your App (See [Configuration]({{site.baseurl}}tipstricks/configuration.html)). For example, you could configure the following object to override the metadata:

```json
{
    "metadata": [
        "authors", "docformat", "modified", "size", "treepath", "filename"
    ]
}
```

The reason this works is that Vanilla Search always implement the following logic:

```bash
if server-configuration exists
    use server-configuration
else
    use config.ts
```

For example, in [`search.component.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.ts) the metadata displayed in the "mini-preview" comes from the following method:

```ts
import { METADATA } from '../../config'; // src/config.ts

...
public get metadata(): string[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.metadata){
        return <string[]> <any> this.appService.app.data.metadata;
    }
    return METADATA;
}
```

## Styles

The styles of Vanilla Search come from various sources:

1. **Third-Party stylesheets**, in particular [**Bootstrap**](https://getbootstrap.com/). Third-Party stylesheets are imported in the app's global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)):

    ```scss
    // Bootstrap styles
    @import "~bootstrap/scss/bootstrap"; 

    // Fontawesome
    $fa-font-path: "@fortawesome/fontawesome-free/webfonts";
    @import "~@fortawesome/fontawesome-free/scss/fontawesome";
    @import "~@fortawesome/fontawesome-free/scss/brands";
    @import "~@fortawesome/fontawesome-free/scss/regular";
    @import "~@fortawesome/fontawesome-free/scss/solid";
    ```

    Note that Bootstrap is used throughout the app (and the [`@sinequa/components`]({{site.baseurl}}modules/components/components.html) library) via [well documented](https://getbootstrap.com/docs/4.4/getting-started/introduction/) class names. See [Responsive Design]({{site.baseurl}}tipstricks/responsive-design.html#bootstrap).

2. **Sinequa Modules stylesheets**, which are global-level styles that could not be encapsulated in the Angular components (for good reasons). Like Third-Party stylesheets, they are imported in the app's global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)):

    ```scss
    // Sinequa components stylesheets
    @import "../../../components/action/bootstrap/action.scss";
    @import "../../../components/notification/bootstrap/notification.scss";
    @import "../../../components/preview/bootstrap/preview.scss";
    @import "../../../components/metadata/metadata.scss";
    ```

3. **Components stylesheets**, like [`home.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.scss), [`search.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.scss), [`preview.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/preview/preview.component.scss).

    This is generally the preferred way of styling components (besides Bootstrap), since the CSS is well encapsulated in your component scope (there cannot be side-effects to other components) and it alleviates the global stylesheet.

4. **The app's global stylesheet** ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)) itself. This stylesheet contains many rules that *override* the rules in the above stylesheets. For example, we restyle the tabs component:

    ```scss
    sq-tabs {
        .nav-item .count {
            font-size: 0.9em;
            color: $secondary-color;
        }
    }
    ```

5. Other styles imported by the global stylesheets:

- `styles/icons.scss` contains mappings between metadata names and Font Awesome icons (see [Custom Metadata]({{site.baseurl}}tipstricks/metadata.html)).
- `styles/preview.scss` contains the styles of the preview (See [Custom Entities]({{site.baseurl}}tipstricks/entities.html)). Note that this stylesheet is built independently into `preview.css` (which gets injected in the HTML preview), but it *also* imported in the global stylesheet (which allows to have consistent color highlighting for entities between the app and the preview).
- `styles/metadata.scss` is a dependencies of `preview.scss` where the styling of the highlights are defined.
- `styles/dark-mode.scss` contains the rules that override the normal styles to produce a "dark mode". It is imported at the very end of the global stylesheet.
  