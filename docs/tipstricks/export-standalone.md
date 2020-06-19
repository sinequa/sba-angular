---
layout: default
title: Exporting Standalone Components
parent: Tips and Tricks
nav_order: 13
---

# Exporting Standalone Components

The SBA framework is designed to create *applications*. But in some cases it can be necessary to embed search functionalities (like a search bar and a result list) in another independent application. In this case, we only need one or several sub-components to be displayed within an app which may be based on very different technologies (React, Vue, ASP.NET, etc.).

Fortunately, Angular provides us with the [Angular Elements](https://angular.io/guide/elements) library, which allows to do just that. Angular Elements is based on the browser's [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) standard, which is meant to declare new HTML elements (other than `div`, `p`, `a`, `body`, etc.), controlled via JavaScript.

To install Angular Elements, run `npm install @angular/elements --save` at the root of your workspace.

## Creating an Angular Elements projects

An Angular Elements project is very similar to a regular Angular application project, with a few small differences.

For example, if you want to base our project on the [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html) application, simply copy and rename the Vanilla Search project. You will also need to copy (and rename) the project declared in the `angular.json` file, and add a build command to the `package.json` file.

At this point the project is equivalent to Vanilla Search.

Now the key difference between an "Application project" and an "Elements project" is what happens on startup. If you have a look at the `main.ts` file, you can see that it does essentially one thing: Bootstrap your `AppModule` (defined in `app.module.ts`). And if you look at the `AppModule`, you can see that it declares one `bootstrap` component, the **`AppComponent`**.

See the [documentation](https://angular.io/guide/architecture-modules#ngmodule-metadata) of the `bootstrap` property:

> `bootstrap`: The main application view, called the *root component*, which hosts all other app views. Only the root *NgModule* should set the `bootstrap` property.

In the case of an Angular Elements project, we **do not** want an application main view, and so **we can remove the `bootstrap` property**.

While we are at it, we can also completely remove the `AppComponent` from the rest of project (along with the other unneeded components from the original application). You can also remove the `<app>` element from the `index.html` file.

Instead of this `bootstrap` property, we are going to customize our `AppModule` class by adding a `ngDoBootstrap()` method where we declare the component(s) which we want to "export" as Custom Element(s):

```ts
import { NgModule, Injector} from "@angular/core";
import { createCustomElement } from '@angular/elements';

...

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        ...
    ],
    declarations: [
        SearchFormComponent,
        AutocompleteExtended,
        ...
    ],
    providers: [
        ...
    ],
    //bootstrap: [
    //    AppComponent
    //]
})
export class AppModule {

    constructor(private injector: Injector){

    }

    ngDoBootstrap() {
        const searchForm = createCustomElement(SearchFormComponent, { injector: this.injector });
        customElements.define('my-search-form', searchForm);
    }
}
```

Now, you can build your application as usual with `ng build`. The output in the `dist/` folder looks similar to a regular application build. The difference is you can now take the generated javascript files (main, polyfills and runtime), and put them into a different application. In order to instantiate your Angular component(s), simply use the name you defined in the `ngDoBoostrap()` method (note that this NOT the Angular selector of the component):

```html
<body>

    ...

    <my-search-form></my-search-form>

    ...

    <script src="runtime-es2015.js" type="module"></script>
    <script src="polyfills-es2015.js" type="module"></script>
    <script src="main-es2015.js" type="module"></script>
</body>
```

## Other considerations

### Inputs and Outputs

Note that it is also possible to pass inputs and listen to outputs to/from the element, much like in Angular, but now using native Browser syntax (See [Mappings](https://angular.io/guide/elements#mapping)).

However, you probably want to make your components truly standalone (with no Input/Output), to avoid adding additional JavaScript logic on top of built components. The exception is of course if your components do need to exchange data with the third party application.

### Wrapping

You may want to export an existing component from the [`@sinequa/components`]({{site.baseurl}}modules/components/components.html) libraries, but these components generally expect Inputs to work properly. For example, the [`sq-facet-list`]({{site.baseurl}}components/components/BsFacetList.html) component expects at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) object (and the name of an aggregation, which can be static).

In order to export such a component, wrap it inside a new component which manages the data flow to/from other components of the project. In the case of the [`sq-facet-list`]({{site.baseurl}}components/components/BsFacetList.html) component, it is simple: just inject the [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html) in the wrapper component and map the results to the child component.

```ts
@Component({
    ...,
    template: `
<sq-facet-list [results]="searchService.results" [aggregation]="aggregation"></sq-facet-list>`
})
export class FacetListWrapper {
    @Input() aggregation: string;
    constructor(public searchService: SearchService){}
}
```

Then export the wrapper component in your app module:

```ts
const facet = createCustomElement(FacetListWrapper, { injector: this.injector });
customElements.define('my-facet', facet);
```

Now you can add facets to your 3rd party app with:

```html
<my-facet aggregation="Company"></my-facet>
```

### Dependencies

Your components will generally have dependencies other than the JavaScript libraries bundled in the main JS file. For example, you may need to include CSS files and assets (images, fonts, etc.). All these static files in the `dist/` folder need to be copied to the target application and served appropriately.

### Login

In order to use the Sinequa API, you need to be logged in. This means that at least one of your components will need to call `loginService.login()`. Your component can typically extend the [`ComponentWithLogin`]({{site.baseurl}}core/classes/ComponentWithLogin.html) class from [`@sinequa/core/login`]({{site.baseurl}}modules/core/login.html) to make this automatic.

### CORS

If you embed components in a third-party application, this application will probably have a URL different from the Sinequa server's URL. This means you will need to enable CORS in your Webapp configuration (See [CORS and WebApp Configuration](https://sinequa.github.io/sba-angular/gettingstarted/server-setup.html#cors-and-webapp-configuration) and [Deploying an App on another server](https://sinequa.github.io/sba-angular/gettingstarted/dev-setup.html#deploying-an-app-on-another-server)).

Note that CORS limits certain functionalities due to security restrictions in the browser. In order to get around CORS issues, consider using a proxy or reverse-proxy (so that the app is served from the same URL as the Sinequa REST APIs).

### Optimization

In the example above, we start by copying the [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html) application. In order to minimize the size of the resulting JavaScript files, you should try to keep only the modules that your component(s) need in your `AppModule`'s imports (which should quite fewer than for an entire application).
