---
layout: default
title: Intl Module
parent: Core
grand_parent: Libraries
nav_order: 2
---

# Intl Module

## Overview

This module provides internationalization (i18n) support to an application. Core functionality is provided by the `IntlService`
which manages locales and formats dates, numbers and strings depending on the current locale. It is based on the standard
[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API and an implementation of the
ICU Message syntax provided by [FormatJS](https://formatjs.io/).

## Registering locales

A Sinequa locale defines the `name` and `display` and the `data` associated with the locale. At a minimum the `data` will define
the locale for the `Intl` library and the messages in the locale's language. Locale data for additional 3rd party libaries
(eg D3.js, Moment.js) can also be included. The supported locales for an application are defined by passing a class derived from
`LocalesConfig` to the `IntlModule.forRoot` static method when importing the `IntlNodule` in your application's `NgModule`:

```ts
import { LocalesConfig, Locale } from "@sinequa/core/intl";
import enLocale from "../locales/en";
...
export class AppLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];
    constructor() {
        this.locales = [
            { name: "en", display: "msg#locale.en", data: enLocale},
            { name: "fr", display: "msg#locale.fr", data: frLocale},
            { name: "de", display: "msg#locale.de", data: deLocale},
        ]
        this.defaultLocale = this.locales[0];
    }
}
...
@NgModule({
    imports: [
        ...
        IntlModule.forRoot(AppLocalesConfig),
    ]
})
```

Alternatively, the `Core` library includes a default (en-US) locale that can be used to quickly get started:

```ts
import { DefaultLocalesConfig } from '@sinequa/core';
...
@NgModule({
    imports: [
        ...
        IntlModule.forRoot(DefaultLocalesConfig),
    ]
})
```

## Locale files

The data for a locale is typically defined in its own file and follows the following structure:

`./locales/de.ts`
```ts
import { LocaleData } from '@sinequa/core/intl';
import 'intl/locale-data/jsonp/de-DE'; // Safari
import '@formatjs/intl-relativetimeformat/dist/locale-data/de'; // relative time format support
import 'moment/locale/de'; // Moment.js
import d3Format from 'd3-format/locale/en-US.json'; // D3.js
import d3Time from 'd3-time-format/locale/en-US.json'; // D3.js
import { enCore } from '@sinequa/core'; // Core language files
// Load language files for those components used...
import { deAdvanced } from '@sinequa/components/advanced';
...
import appMessages from './messages/en.json';
import { Utils } from '@sinequa/core/base';

// Merge the messages
const messages = Utils.merge({}, deCore, deAdvanced, ..., appMessages);

// Export the LocaleData
export default {
    intl: {
        locale: 'de-DE'
    },
    moment: {
        locale: 'de'
    },
    d3: {
        locale: 'de-DE',
        format: d3Format,
        time: d3Time
    },
    messages: messages
} as LocaleData;

```

## Current locale

The current locale is initialized at application startup. It is set in this order:
- the previously selected locale retrieved from local storage (key = 'sinequa-locale')
- a locale matching the browser language
- the deafault locale as specified in `LocalesConfig`

The `IntlService` can change the current locale to one of the values in the
configured `LocalesConfig`. By default, the passed value will be persistent (stored in
local storage).

```ts
this.intlService.use('fr');
```

Each time the locale is changed an event is raised which can be subscribed to like this:

```ts
this.intlService.events.subscribe(
    (event) => {
        console.log('new locale selected:', event.locale);
    }
);
```

## Messages

Messages defined in locale message files can be accessed by `IntlService.formatMessage`.
The keys must be prefixed by `msg#` and the remainder of the key is then a simple JSON path
lookup into the messages object for the current locale. So, for a messages object with the
following structure:

```json
{
    "sectionOne": {
        "greeting1": "This is greeting one",
        "greeting2": "This is greeting two"
    },
    "sectionTwo": {
        "greeting1": "This is greeting one in sectionTwo"
    }
}
```

A call to `this.intlService.formatMessage('msg#sectionOne.greeting2')` would return `This is greeting two`.

Messages use ICU Message syntax that supports displaying variable values (strings, numbers and dates) and handles
pluralization rules according to the current locale. A map of values can be passed as the second
parameter to `IntlService.formatMessage`. For example, if `message2` above were changed to `Hello {name}` and then
formatted by calling `this.intlService.formatMessage('msg#sectionOne.greeting2', {name: 'Tom'});` the result would
be `Hello Tom`. 

For more information on the ICU Message syntax please follow this [link](https://formatjs.io/guides/message-syntax/).

The `sqMessage` pipe is provided to facilitate the formatting of messages in component templates. Internally, it calls
`IntlService.formatMessage` but also handles changes to the current locale, allowing any text displayed through the
pipe to be refreshed automatically. The above example could be rendered in a template as follows:

```html
<span>{% raw %}{{'#msgsectionOne.greeting2' | sqMessage:{values: {name: 'Tom'} } }}{% endraw %}</span>
```

Note the use of spaces between the closing curly brackets in the parameter passed to the pipe. Without these spaces they
would be interpreted as the termination of the interpolated value by the Angular template parser and an error would occur.
