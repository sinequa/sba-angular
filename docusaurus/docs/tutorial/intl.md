---
layout: default
title: Internationalization
parent: Tutorial
sidebar_position: 5
---

# Internationalization

As mentioned earlier, our application looks strange because a lot of strings look like this: `msg#facet.loadMore`, or `msg#results.resultsAllTab`.

These codes refer to dictionaries or "message files" translated in various languages. At the heart of this system is the Internationalization service [`IntlService`](/libraries/core/intl.md) from [`@sinequa/core`](/libraries/core/core.md).

This service is initialized with the dictionaries on the application startup. It then takes care of translating strings in the Angular templates, via the `sqMessage` pipe. Of course if the string is not found in the dictionary, it is just displayed as is (which explains what you see in your app).

For example, if you dictionary looks like:

```json
{
    hello: "bonjour",
    fruits: {
        strawberry: "fraise",
        apple: "pomme"
    }
}
```

Then the following template is rendered as:
```html
<div class="code-example">

    <ul>
        <li>fraise</li>
        <li>pomme</li>
        <li>msg#fruits.banana</li>
    </ul>

</div>

<ul>
    <li>{{ 'msg#fruits.strawberry' | sqMessage }}</li>
    <li>{{ 'msg#fruits.apple' | sqMessage }}</li>
    <li>{{ 'msg#fruits.banana' | sqMessage }}</li>
</ul>
```

If you then tell the `IntlService` to switch to a different language, it will instantly update all the strings displayed in your app!

## Configuring the internationalization

In your `app.module.ts` file, notice that the `IntlModule` is imported from `@sinequa/core/intl`. The module is imported in the `AppModule` with:

```ts title="app.module.ts"
import {IntlModule} from "@sinequa/core/intl";
import {DefaultLocalesConfig} from "@sinequa/core/default-locales-config";

...

@NgModule({
    imports: [
        ...
        IntlModule.forRoot(DefaultLocalesConfig),
```

We want to replace the `DefaultLocalesConfig` (which contains only a few default messages) by a configuration specific to our app.

To do so, we need to create our own language files. We can start with English.

1. Create a new `src/locales/` directory.

2. In this directory, create a `en.ts` file, with the following content:

    ```ts title="en.ts"
    import {LocaleData} from "@sinequa/core/intl";
    import {enCore} from "@sinequa/core/messages";
    import "intl/locale-data/jsonp/en-US"; // Safari
    import {Utils} from "@sinequa/core/base";

    import {enFacet} from "@sinequa/components/facet";
    import {enResult} from "@sinequa/components/result";
    import {enSearch} from "@sinequa/components/search";

    const d3Format = require('d3-format/locale/en-US');
    const d3Time = require('d3-time-format/locale/en-US');

    const appMessages = {

        locale: {
            en: "English",
        },

        results: {
            resultsAllTab: "All",
            tabPeople: "People",
            tabBusiness: "Companies",
            tabLocation: "Places"
        },
    }

    export default <LocaleData> {
        intl: {
            locale: "en-US"
        },
        d3: {
            locale: "en-US",
            format: d3Format,
            time: d3Time
        },
        messages: Utils.merge({}, enCore, enFacet, enResult, enSearch, appMessages)
    };
    ```

    Notice the `appMessages`, which contains the messages specific to your app, is **merged** with the messages coming from the [`@sinequa/core`](/libraries/core/core.md) and [`@sinequa/components`](/libraries/components/components.md) libraries (`enCore`, `enFacet`, etc.).

3. Back in your `app.module.ts` file, create a new `AppLocalesConfig` class to replace `DefaultLocalesConfig`:

    ```ts title="app.module.ts"
    import {LocalesConfig, Locale} from "@sinequa/core/intl";
    import enLocale from "../locales/en";

    export class AppLocalesConfig implements LocalesConfig {
        locales: Locale[] = [{ name: "en", display: "msg#locale.en", data: enLocale }];
        defaultLocale: Locale = this.locales[0];
    }

    ...
        import: [
            ...
            IntlModule.forRoot(AppLocalesConfig),
        ]
    ```

    At this point, your app supports one locale: English, which is obviously the default.

## Adding messages

Your app still contains a lot of hard-coded strings in the `app.component.html` template ("Search", "Clear", "Login", "Logout", "Enter search terms...", "Companies", "Sources").

Replace these strings with message strings with the `sqMessage` pipe, and add the corresponding entries in your dictionary (`locales/en.ts`).

For example, replace:

```html
<button>Search</button>
```

With:

```html title="app.component.html"
<button>{{ 'msg#search.button' | sqMessage }}</button>
```

And in your `en.ts` file:

```json title="en.ts"
{
    search: {
        button: "Search"
    }
}
```

(You can do the same for the "Clear" button and the Search placehoder.)

Note that the Sinequa components that take strings as an input are already using the `sqMessage` pipe to display them. So, in the case of the facet title, you can directly write:

```html
<sq-facet-card [title]="'msg#facet.company.title'" [icon]="'fas fa-building'">
    ...
</sq-facet-card>
```

(By the way, this message is already in the Facet module dictionaries.)

Your dictionary `en.ts` should now have these extra entries:

```ts title="en.ts"
app: {
    login: "Login",
    logout: "Logout",
},

search: {
    button: "Search",
    placeholder: "Enter search terms...",
    clear: "Clear"
}
```

## Overriding the default messages

It is of course possible to override the default messages. For example, your facets display a "Load more" link at the bottom. If you want to replace this text with something else, do the following:

1. Find what is the key for the "Load more" message. You could go look into the source code of the `sq-facet-list` component, but a quicker approach is to use the search engine of VS Code and open the dictionary file directly. In our case, searching for "Load more" quickly tells us that the message key is `msg#facet.loadMore`.

     ![Load more search](/assets/tutorial/search-load-more.png)

2. Override that key in your own dictionary:

    ```ts
    facet: {
        loadMore: "Gimme more data, please!"
    }
    ```

     ![More data please](/assets/tutorial/more-data.png)

     (This is just an example, you do not have to keep in your code.)

## Supporting multiple languages

Supporting multiple language means including these locales in your `AppLocalesConfig`. To support French, for example, copy and rename `en.ts` as `fr.ts`.

Inside this file, you need to **replace imports that point to English resources by French resources**.
For example:

```ts title="fr.ts"
import {LocaleData} from "@sinequa/core/intl";
import {frCore} from "@sinequa/core/messages";
import "intl/locale-data/jsonp/fr-FR"; // Safari
import {Utils} from "@sinequa/core/base";

import {frFacet} from "@sinequa/components/facet";
import {frResult} from "@sinequa/components/result";
import {frSearch} from "@sinequa/components/search";

const d3Format = require('d3-format/locale/fr-FR');
const d3Time = require('d3-time-format/locale/fr-FR');
```

Then you can translate all the text in `appMessages` to French. This should look like:

```ts title="fr.ts"
locale: {
    en: "English",
    fr: "Français",
},
app: {
    login: "Login",
    logout: "Logout",
},
search: {
    button: "Chercher",
    placeholder: "Termes de recherche...",
    clear: "Effacer"
},
results: {
    resultsAllTab: "Tous",
    tabPeople: "Personnes",
    tabBusiness: "Entreprises",
    tabLocation: "Lieux"
},
```

You will also need to replace the `export` section to change the `en-US` occurences into `fr-FR`, and update all the `en` messages files with their french ones (for example `enCore` into `frCore`).

Notice in this dictionary that the language names themselves ("English", "Français", etc.) need to have an entry (`locale.en`, `locale.fr`) in order to display them in the future language menu. You might want to add the `locale.fr` entry to `en.ts` as well.

Finally, import this locale and add it to your `AppLocalesConfig`:

```ts
locales: Locale[] = [
    { name: "en", display: "msg#locale.en", data: enLocale },
    { name: "fr", display: "msg#locale.fr", data: frLocale }
];
```

## Switching between languages

Now your application supports multiple language, but you have no way to easily switch between them!

Let's add a button for each language, next to the Login and Logout buttons (that you can also internationalize). We will use another module to this end: the [**Action module**](/libraries/components/action.md). This module, which is used extensively across the framework, allows to easily create dynamic lists of buttons and menus and support many useful options.

1. Import the Action module in your `app.module.ts`.

    ```ts title="app.module.ts"
    import {BsActionModule} from '@sinequa/components/action';
    ...

    @NgModule({
        imports: [
            ...
            BsActionModule,
    ```

2. Create a list of `Action` objects (one for each language) in the constructor of your `app.component.ts`:

    ```ts title="app.component.ts"
    import { Action } from '@sinequa/components/action';
    import { IntlService, Locale } from '@sinequa/core/intl';
    ...
    export class AppComponent implements AfterViewInit {
        ...
        languageActions: Action[];

        constructor(
            ...
            public intlService: IntlService) {

            ...
            // Create one action (button) for each language
            this.languageActions = this.intlService.locales.map(locale =>
                new Action({
                    text: locale.display,   // "French"
                    data: locale,   // French locale
                    selected: locale === this.intlService.currentLocale, // If this is the current locale
                    action: (item: Action, $event: UIEvent) => {    // On click, switch to this language
                        this.intlService.use((item.data as Locale).name).subscribe(
                            (value) => this.languageActions.forEach(a => a.update()));
                    },
                    updater: (action) => {  // Update the status of buttons
                        action.selected = action.data === this.intlService.currentLocale;
                    }
                })
            );
    ```

3. Insert this list of buttons in your `app.component.html` with the `sq-action-buttons` directive, next to the existing Login/Logout buttons:

    ```html title="app.component.html"
    <button ...>{{ msg#app.logout | sqMessage }}</button>
    <button ...>{{ msg#app.login | sqMessage }}</button>
    <span [sq-action-buttons]="{items: languageActions}"></span>
    ```

    ![Language buttons](/assets/tutorial/intl-buttons.png)

## Loading languages lazily

If your app supports many languages, your might not want to load all of them on startup. It is possible to modify your `AppLocalesConfig` to load a new language only when requested by the user:

- Skip the `data` field of the `Locale` object: `{name: "de", display: "msg#locale.de"}`
- Add a `loadLocale()` method to `AppLocalesConfig`, which takes care of importing the data lazily:

```ts
loadLocale(locale: string): Observable<LocaleData> {
    return from(import('../locales/'+locale).then(m => m.default));
}
```

- Ensure that lazily loaded locales are included in the compilation by including them explicitly in `tsconfig.json`:

```json title="tsconfig.json"
"include": [
    ...
    "src/locales/*.ts"
]
```
