# Components Docs

## Description

This project is meant to allow easier testing for all of the library components. It has two different uses:
1. **an application that can be served locally as any Angular application**
    - it contains pages for all components modules from the `components` and `analytics` projects
    - on these pages are all of the corresponding module's exported components, defined so they can be easily tested live, some example code is also available for each of them
    - the app calls a testing server by default, but it also includes some mocked data that can be used instead using the `mock` configuration (`ng serve components-docs --configuration=mock`), which can be better since it provides relevant data so all components have what they require
2. **export all components using Angular Elements to be included inside the public documentation inside `docs`**
    - to build the components to be updated inside the `docs` project, you can use the command `npm run builddocs` which builds `components-docs` and exports it directly inside `docs/assets/sq-doc-app`
    - all components have to be defined one by one in their module this way in order to be available for `docs`, this is where you define its tag:

```ts
import { Injector } from '@angular/core';
import { DocDidYouMeanComponent } from './components/search-module/did-you-mean/did-you-mean.component';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

export class SearchModule extends CustomElementModule {
    constructor() {
        super();
        this.createElement('doc-did-you-mean',  DocDidYouMeanComponent);
    }
}
```

Note that the Angular Elements definition part has been simplified using a custom function ``createElement`` available when extending the ``CustomElementModule`` class.

Then you can just add it like this in the `md` file:
```html
<doc-did-you-mean></doc-did-you-mean>
```

---

## Architecture

All documented components can be found respectively under ``components-docs/src/app/analytics`` and ``components-docs/src/app/components`` according to their original package.

In order to have everything harmonized and to avoid any code duplication, there are many shared templates and components to handle the layout and behaviors.

The basic architecture for a module is as follow:
- example-module
    - component _--- (the folder for a component from the module)_
        - component-1.component.html
        - component-1.component.ts
    - example-module.component.ts _--- (the page displaying all components for this module when serving the app locally)_
    - example.module.ts _--- (the angular module)_

All modules are included in their own Angular module which imports all necessary modules, and declare in its constructor all of the custom elements to export that will be used in the ``docs`` app. The declarations are slightly simplified by extending the module with the ``CustomElementModule`` class which provides a custom function to handle it.

Each module then has a ``component-module.component.ts`` file that uses the ``components-docs/src/app/shared/module-template.html`` template which just requires the component to define its title and components list.

Finally, all components are defined in their own folder. They share a similar view using the ``<doc-component-demo>`` component that handles the layout for which we can provide the component  title, plus the HTML and/or TypeScript code.