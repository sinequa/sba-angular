---
layout: default
title: Vanilla Search
parent: Modules
nav_order: 4
---

# Vanilla Search

*Vanilla Search* is a standard Enterprise Search app designed to be simple, efficient and easy to customize into a much more complex application.

If you complete the [Tutorial]({{site.baseurl}}tutorial/tutorial.html), you should notice a lot of similarities between your final app and Vanilla Search. This is intentional, to make it easy for developers to transition from [Hello Search]({{site.baseurl}}modules/hello-search/hello-search.html) and the tutorial, to a full-fledged Enterprise Search app.

The application has **three routes** made of **four components** (of course, these components include many subcomponents from the [`@sinequa/components`]({{site.baseurl}}components) library):

- A **Home** route, greeting users with a search bar and some quick-access facets.
- A **Search** route, allowing users to browse and refine search results and access other features.
- A **Preview** route, allowing users to see the details of a document and navigate its relevant extracts and entities.
- Additionally, a **Search form** component (which includes the autocomplete) is used within the Home and Search routes.

The routes are configured in the [`app.module.ts`](/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/app-module.ts) file:

```ts
export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "search", component: SearchComponent},
    {path: "preview", component: PreviewComponent},
    {path: "**", redirectTo: "home"}
];
```

## Home route

The [Home route](/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/home) has a search bar ([Search Form component](#search-form)), and a list of facets:

![Home route]({{site.baseurl}}/assets/modules/vanilla-home.png)

You can also switch to a dark theme, by click the button under the search bar.

![Home route]({{site.baseurl}}/assets/modules/vanilla-dark.png)

## Search route

The [Search route](/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search) has a *navbar* on top, which includes a search bar ([Search Form component](#search-form)), and user menus coming from various libraries of [`@sinequa/components`]({{site.baseurl}}components). Under it are a facet bar (with two facets) and the search results. It is also possible to open a preview of a document on the right, by selecting it in the results.

![Search route]({{site.baseurl}}/assets/modules/vanilla-search.png)

## Preview route

The [Preview route](/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/preview) displays the HTML preview of the document on the right. On the left, a panel contains various tools to interact with the document:

- A search bar ([`sq-preview-search-form`]({{site.baseurl}}components/components/BsPreviewSearchFormComponent.html)), to search and highlight text within the document (note that it uses Sinequa NLP to recognize the language and find words in all their possible forms).
- A list of relevant extracts ([`sq-preview-extracts-panel`]({{site.baseurl}}components/components/BsPreviewExtractsPanelComponent.html)), to quickly navigate to the important parts of the document.
- A list of entities and relevant keywords ([`sq-preview-entity-panel`]({{site.baseurl}}components/components/BsPreviewEntityPanelComponent.html)), to visualize the diversity of topics, navigate between them and control their highlighting.

![Preview route]({{site.baseurl}}/assets/modules/vanilla-preview.png)

## Search form

The [Search Form component](/sinequa/sba-angular/tree/master/projects/vanilla-search/src/app/search-form) is similar to the one you build in the [tutorial]({{site.baseurl}}tutorial/completed-app.html#search-form-component).

Additionally, a custom [Autocomplete directive](/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/autocomplete-extended.directive.ts) allows to search into User Settings objects, such as the recent queries, documents, baskets, etc.

![Search form]({{site.baseurl}}/assets/modules/search-form.png){: .d-block .mx-auto }

## Configuration

## Styles
