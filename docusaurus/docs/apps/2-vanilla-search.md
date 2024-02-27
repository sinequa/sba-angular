---
layout: default
title: Vanilla Search
parent: Applications
nav_order: 2
---

# Vanilla Search

*Vanilla Search* is a standard Enterprise Search app designed to be simple, efficient and easy to customize into a much more complex application.

If you complete the [Tutorial](/docs/tutorial/tutorial.md), you should notice a lot of similarities between your final app and Vanilla Search. This is intentional, to make it easy for developers to transition from [Hello Search](/docs/apps/1-hello-search.md) and the tutorial, to a full-fledged Enterprise Search app.

The application has **three routes** made of **five components** (of course, these components include many subcomponents from the [`@sinequa/components`](/docs/libraries/components/components.md) library):

- The **App** component, which is essentially a wrapper for the [`<router-outlet>`](https://angular.io/api/router/RouterOutlet).
- A **Home** route, greeting users with a search bar and some quick-access facets.
- A **Search** route, allowing users to browse and refine search results and access other features.
- A **Preview** route, allowing users to see the details of a document and navigate its relevant extracts and entities.
- Additionally, a **Search Form** component (which includes the autocomplete) is used within both the Home and Search routes.

The routes are configured in the [`app.module.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/app.module.ts) file:

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

![Home route](/assets/modules/vanilla-home.png)

You can also switch to a dark theme, by clicking the button under the search bar.

![Home route](/assets/modules/vanilla-dark.png)

You can easily change the logo at the top of the [template](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.html):

```html
<!-- Home page logo -->
<img src="{{ (isDark$ | async) ? 'assets/sinequa-logo-dark-lg.png' : 'assets/sinequa-logo-light-lg.png' }}" id="logo" class="mb-5">
```

This is followed by the [search form](#search-form) in the center.

Then, by default, the homepage includes four facets:

- Recent documents: `sq-facet-recent-documents`
- Recent queries: `sq-facet-recent-queries`
- Saved queries: `sq-facet-saved-queries`
- Collections (aka "Baskets"): `sq-facet-baskets`

These facets can of course be added or removed, directly in the component template, or via [configuration](#configuration).

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.ts) manages:

- Login and Logout, via the `LoginService`.
- Light / Dark theme toggling.
- The list of facets to display and their responsive sizing.

## Search route

The [Search route](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search) has a *navbar* on top, which includes a search bar ([Search Form component](#search-form)), and user menus coming from various libraries of [`@sinequa/components`](/docs/libraries/components/components.md). Under it are a facet bar (with two facets) and the search results. It is also possible to open a preview of a document on the right, by selecting it in the results.

![Search route](/assets/modules/vanilla-search.png)

The [template](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.html) starts with the **navbar**, which contains:

- A responsive logo (`<img id="logo" src=...>`)
- The [search form](#search-form)
- User menus, which include by default:
  - Collections (aka "Baskets"): `sq-baskets-menu`
  - Saved Queries: `sq-saved-queries-menu`
  - Alerts: `sq-alerts-menu`
  - Labels: `sq-labels-menu`
  - General User Menu: `sq-user-menu`
- The navbar also includes responsive buttons to toggle the visibility of the menu and the facets. The implementation is similar to the one in the [tutorial](/docs/tutorial/responsive-design.md).

The main view under the navbar includes:

- A Facet Bar on the left, with by default:
  - A hierarchical source facet: `sq-facet-list`
  - A multiple metadata facet: `sq-facet-multi`
- In the center, a list of results, including:
  - Tabs: `sq-tabs`
  - A "Did you mean?" component: `sq-did-you-mean`
  - Sponsored links: `sq-sponsored-results`
  - The filters list applied to the query: `sq-filters-view`
  - A facet displaying the top passages: `sq-facet-card` containing `sq-top-passages`
  - A Results counter: `sq-results-counter`
  - A Sort selector: `sq-sort-selector`
  - For each document:
    - A selector (checkbox): `sq-result-selector`
    - The document's title: `sq-result-title`
    - The document's source: `sq-result-source`
    - The document's relevant extracts: `sq-result-extracts`
    - The document's missing terms: `sq-result-missing-terms`
    - The document's labels: `sq-labels`
    - The document's duplicates: `sq-result-duplicates`
    - The document's thumbnail: `sq-result-thumbnail`
  - An infinite scroller: `sq-scroller`
- On the right, an `sq-facet-card` containing:
  - An image and description when no document is currently selected
  - Document details when one is selected:
    - The document's icon: `sq-result-icon`
    - The document's title: `sq-result-title`
    - The document's metadata: `sq-metadata`
    - The document's passages (in a view tab): `sq-passage-list`
    - The document's preview (in a view tab): `sq-preview`
    - The document's duplicates (in a view tab): `sq-result-duplicates-list`
- And at the bottom left corner:
  - A list of actions available for the currently selected document(s): `sq-results-selector`

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.ts) manages:

- The list of facets displayed within `sq-facet-multi` (which can be modified via [configuration](#configuration)).
- The list of menus displayed in the navbar (which can be modified via [configuration](#configuration)).
- The list of metadata displayed by the "mini-preview" (which can be modified via [configuration](#configuration)).
- The opening and closing of documents in the "mini-preview" on the right.
- The (responsive) visibility of facets, results and menus, based on screen size and user actions.

## Preview route

The [Preview route](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview) displays the HTML preview of the document on the right. On the left, a panel contains various tools to interact with the document:

- A search bar (`sq-preview-search-form`), to search and highlight text within the document (note that it uses Sinequa NLP to recognize the language and find words in all their possible forms).
- A list of relevant extracts (`sq-preview-extracts-panel`), to quickly navigate to the important parts of the document.
- A list of entities and relevant keywords (`sq-preview-entity-panel`), to visualize the diversity of topics, navigate between them and control their highlighting.

On the right, the HTML preview is displayed within the `sq-preview` component. Additionally, a dynamic tooltip (`sq-preview-tooltip`) is inserted in the HTML preview to provide additional functionality when users hover their mouse over entities or select text, and a minimap (`sq-preview-minimap`) is also inserted to add a right bar to preview container that allows to identify the extracts' locations more easily.

![Preview route](/assets/modules/vanilla-preview.png)

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/preview/preview.component.ts) manages:

- Navigation events (fetch the preview data when the page is reloaded, or when we search for text within the document).
- Preview Tooltip custom actions (like the search button when text is selected)
- The list of entities highlights that `sq-preview`, `sq-preview-extracts-panel` and `sq-preview-entity-panel` have to display (which can be modified via [configuration](#configuration)).

## Search form

The [Search Form component](https://github.com/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search-form) uses `sq-search-form` as the one developed in the [tutorial](/docs/tutorial/completed-app.md#search-form-component), but with a more advanced [Autocomplete component](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete.component.ts) allowing to search into User Settings objects, such as the recent queries, documents, baskets, etc.

![Search form](/assets/modules/search-form.png)

The [controller](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/search-form.component.ts) includes a search method with `onAutocompleteSearch()` triggered when the [autocomplete component](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete.component.ts) emits that it should trigger the search. Additionally, it manages the list of custom features that the autocomplete can search into, like the recent documents, the recent queries, the baskets and the saved queries (this list can be [configured](#configuration)).

The [autocomplete component](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete.component.ts) is responsible for getting the suggestions when typing.

- The `getSuggests()` method can search in custom objects, as mentioned above (in addition to the classical "Suggest Queries" configured on the server). Notice that, to merge the different sources of autocomplete, we use the [`forkJoin`](https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin) operator from [`rxjs`](https://www.learnrxjs.io/):

    ```ts
    // The forkJoin method allows to merge the suggestions into a single array, so the parent
    // directive only sees a single source.
    return forkJoin(dataSources).pipe(
      map(suggests => suggests
        .flat()
        .sort(this.sortComparator)
        .slice(0, this.maxItems)
      )
    );
    ```

    Notice that each data source has a custom search method, leveraging the `SuggestService`'s `searchData()` method. For example:

    ```ts
    searchRecentDocuments(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData(
        'recent-document',
        text,
        this.recentDocumentsService.recentdocuments,
        doc => doc.title,
        doc => ([] as string[]).concat(doc.url1, doc.treepath, doc.authors),
        "msg#searchForm.recentDocument");
    }
    ```

- The `selectItem()` method performs custom actions, depending on the category of suggestion. For example, recent documents are directly opened, via `previewService.openRoute()`, saved queries are searched in the `/search` route, etc.

## Configuration

Vanilla Search can be configured via two methods (as described in [Configuration](/docs/tipstricks/configuration.md)):

- A central Typescript source file: [`src/config.ts`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/config.ts), which is built with your application.
- A JSON object downloaded from the Sinequa server on start-up (configured in your App's "Customization (JSON)" tab) and available via the `AppService` (post-login).

The components of Vanilla Search described above use three configuration objects:

- `FEATURES`: a list of `string` that controls which features are activated in the app. This list is used to determine which facets are displayed in the homepage, which menus are displayed in the search page, which objects are searched by the autocomplete, and which options are available in the search form, such as the advanced search form or the voice recognition button.
- `FACETS`: a list of `FacetConfig` objects that determines the facets displayed within the `sq-facet-multi` component. Each object contains a number of options that are passed to the corresponding facet components.

    For example:

    ```ts
    {
        name: "geo",
        aggregation: "Geo",
        title: "msg#facet.geo.title",
        type: "list",
        icon: "fas fa-fw fa-globe-americas",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    }
    ```

    Of course, these facets require a corresponding [**Aggregation**](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-ws-queries.html) to exist on the Sinequa server, and consequently within the `Results` object.

- `METADATA_CONFIG`: a list of `MetadataConfig` to be displayed in the "mini-preview", within a `sq-metadata` component (More information in the [Custom Metadata](/docs/tipstricks/metadata.md) section).
- `PREVIEW_HIGHLIGHTS`: a list of `PreviewHighlightColors` used in the preview related components to define the highlights colors for the different entities (More information in the [Custom Entities](/docs/tipstricks/entities.md) section).

The four objects above can be customized statically in the `src/config.ts` file. It is also possible to override their value dynamically, via the "Customization (JSON)" tab of your App (See [Configuration](/docs/tipstricks/configuration.md)). For example, you could configure the following object to override the features:

```json
{
    "features": [
        "recent-queries", "saved-queries", "baskets", "labels", "alerts", "suggests"
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
import { FEATURES } from '../../config'; // src/config.ts

...
public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
}
```

## Styles

The styles of Vanilla Search come from various sources:

1. **Third-Party stylesheets**, in particular [**Bootstrap**](https://getbootstrap.com/). Third-Party stylesheets are imported in the `minimal` and `sinequa` theme from [`Sinequa Theme`](/docs/libraries/components/theme.md) that you can import in your global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)):

    ```scss
    // Sinequa global theme (contains Bootstrap imports)
    // @import "../../../components/theme/minimal";
    @import "../../../components/theme/sinequa";
    ```

    Note that Bootstrap is used throughout the app (and the [`@sinequa/components`](/docs/libraries/components/components.md) library) via [well documented](https://getbootstrap.com/docs/4.4/getting-started/introduction/) class names. See [Responsive Design](/docs/tipstricks/responsive-design.md#bootstrap).

2. **Sinequa Modules stylesheets**, which are global-level styles that could not be encapsulated in the Angular components (for good reasons). They are imported in the app's global stylesheet ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)):

    ```scss
    @import "../../../components/theme/breakpoints";
    ```

3. **Components stylesheets**, like [`home.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/home/home.component.scss), [`search.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search/search.component.scss), [`preview.component.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/preview/preview.component.scss).

    This is generally the preferred way of styling components (besides Bootstrap), since the CSS is well encapsulated in your component scope (there cannot be side-effects to other components) and it alleviates the global stylesheet.

4. **The app's global stylesheet** ([`src/styles/app.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/app.scss)). This file is mostly used to setup the variables and handling imports. Even though it is possible to make changes there, we advise to use [`src/styles/vanilla.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/vanilla.scss) to make custom changes. This stylesheet contains many rules that *override* the rules in the above stylesheets. For example, we restyle the tabs component:

    ```scss
    sq-tabs {
        .nav-tabs {
            margin-bottom: 0.5rem;
        }
        .nav-item .count {
            font-size: 0.875em;
            color: $secondary;
        }
    }
    ```

5. Other styles imported by the global stylesheets:

- `styles/icons.scss` contains many classes defining icons.
- `styles/vanilla.scss` contains the overrides as described above.
- `styles/dark.scss` contains the rules that override the normal styles to produce a "dark mode". It is imported at the very end of `styles/vanilla.scss`.
