# Components Docs

## Description

This project is meant to allow easier testing for all of the library components. It has two different uses:
1. **an application that can be launched locally as any Angular application**
    - it contains pages for all components modules from the `components` and `analytics` projects
    - on these pages are all of the corresponding module's exported components, defined so they can be easily tested live, some example code is also available for each of them (HTML and/or TypeScript according to what is needed)
    - the app calls a testing server by default, but it also includes some mocked data that can be used instead using the `mock` configuration (`ng serve components-docs --configuration=mock`), which can be better since it provides relevant data so all components have what they require
2. **export all components using Angular Elements to be included inside the public documentation inside `docs`**
    - to build the components to be updated inside the `docs` project, you can use the command `npm run builddocs` which builds `components-docs` and exports it directly inside `docs/assets/sq-doc-app`
    - all components have to be defined one by one in their module this way in order to be available for `docs`, this is where you define its tag:

```ts
import { Injector } from '@angular/core';
import { DocDidYouMeanComponent } from './modules/search-module/did-you-mean/did-you-mean.component';

export class AppModule {
    constructor(private injector: Injector) {
        const didYouMean = createCustomElement(DocDidYouMeanComponent, { injector: this.injector });

        customElements.define('doc-did-you-mean', didYouMean);
    }
}
```

Then you can just add it like this in the `md` file:
```html
<doc-did-you-mean></doc-did-you-mean>
```

## Architecture

