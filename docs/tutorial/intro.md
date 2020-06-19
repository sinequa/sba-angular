---
layout: default
title: Introduction
parent: Tutorial
nav_order: 1
---

# Introduction

The goal of this tutorial is to build a functional Search application, starting (almost) from scratch.

A Sinequa server is available for you to develop and test your application, so you don't have to worry about the back-end configuration. This tutorial is manageable by any Angular developer without specific knowledge about Sinequa (other than general concepts that are explained on this website). Developers need an account to connect to this server, so [contact us]({{site.baseurl}}contact) if you do not have one yet. You will use `ng serve` to build and serve your application on your own computer (`locahost`), while the data comes from the remote Sinequa server.

At the end of the tutorial, your application will look something like this:

![Finished app]({{site.baseurl}}assets/tutorial/finished.png)

## Starting point

The tutorial starts at the end of the ["Building the libraries"]({{site.baseurl}}gettingstarted/dev-setup.html#building-the-libraries) step of the [Developer-side setup]({{site.baseurl}}gettingstarted/dev-setup.html) section. You must have installed the required tools (NodeJs, VS Core, Git), downloaded or cloned the Angular workspace, installed the dependencies and built the `@sinequa/core` and `@sinequa/components` libraries.

Unless otherwise specified, the tutorial is based on the [**Hello Search**]({{site.baseurl}}modules/hello-search/hello-search.html) app included in the workspace inside `projects/hello-search/`.

## Methodology

We recommend doing this tutorial inside **Visual Studio Code** (with the Angular workspace root opened), and using a **modern browser** (Chrome, Firefox) to test and inspect your app. Keep one (or more) terminal(s) opened in VS Code, to run commands like `ng serve`, `git status` or `ng generate component`.

We recommend using **Git** to track the changes during the different steps of the tutorial. At the end of each chapter, commit your changes in a `tutorial` branch, to make it easy to track and revert changes, and go back in time later.

You might face runtime errors not detected during compilation. The only way to see these errors is to keep the **inspector** of your web browser opened, with an eye on the **console**.

## Modules

*Module* is an ambiguous term. It may refer to a [typescript module](https://www.typescriptlang.org/docs/handbook/modules.html), which is in fact just a `.ts` file, which *imports* variables and types from other modules and *exports* other variables and types. In contrast, an [Angular module](https://angular.io/guide/architecture-modules) is a class with a `NgModule` annotation, which *also* imports other `NgModule` and can export Angular components, directives and pipes.

**Typescript module:**

```ts
import { a } from './foo';

console.log(a);
export const b = a + 42;
```

**Angular module:**

```ts
import { AnotherModule } from './foo';

@NgModule({
    imports: [
        AnotherModule
    ]
})
export class MyModule {}
```

In this tutorial, we generally refer to the second type of modules (Angular modules).

![Sample module]({{site.baseurl}}assets/tutorial/modules.png){: .d-block .mx-auto }
*Relationships between Angular modules (blue), components (purple) and their library (green)*
{: .text-center }

Some of these modules are based on the [**Bootstrap**](https://getbootstrap.com/) library. When a module or component depends on Bootstrap, its class name is prefixed with **`Bs`** (eg. `BsSearchModule`, `BsFacetList`).

The tutorial is divided in chapters which each deals with a new Sinequa feature. These features come packaged as modules of the [`@sinequa/components`]({{site.baseurl}}modules/components/components.html) library. The illustration below depicts in more details the content of a typical module/library which you will use in this tutorial.

![Sample module]({{site.baseurl}}assets/tutorial/modules2.png){: .d-block .mx-auto width="400px" }
*Content of one of the libraries (green), including modules (blue), components (purple), services (red), styles (orange) and locales (grey)*
{: .text-center }

**This gives you a natural checklist for dealing with these modules:**

1. Take a look at the code of that module in the [`@sinequa/components`]({{site.baseurl}}modules/components/components.html) library. In this example, inside: `projects/components/facet/`. This gives you a general idea of what components, directives and services are bundled with that module.

2. Import the module you're interested in in your `app.module.ts`:

    ```ts
    import { BsFacetModule } from '@sinequa/components/facet';

    @NgModule({
      imports: [
        ...,
        BsFacetModule
      ],
      ...
    })
    ...
    ```

3. Use the components, directives and pipes in the templates of your app:

    ```html
    <sq-facet-list [results]="..."></sq-facet-list>
    ```

4. Inject the services in the constructor(s) of your component(s):

    ```ts
    import { FacetService } from '@sinequa/components/facet';

    ...
    export class MyComponent {
      constructor(
        public facetService: FacetService
      ){
        ...
      }
    }
    ```

5. Some libraries include a global stylesheet that needs to be imported so that the components are correctly displayed. Import these stylesheet in your global `styles\app.scss`:

    ```scss
    @import "../../../components/facet/bootstrap/facet.scss";
    ```

6. Some components contain strings that need to be translated in various languages, to internationalize your SBA. We provide translations in three languages (English, French and German) via "message files" which your app needs to import. Alternatively, you can ignore these files and fully rewrite the messages in your app (which is needed anyway if you are going to add additional languages). See the [Internationalization chapter](intl.html) of the tutorial for more details.

    ```ts
    import {enFacet} from "@sinequa/components/facet";
    ```

---

Next: [Connection to Sinequa](connection.html)
