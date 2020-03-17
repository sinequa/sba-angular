---
layout: default
title: Autocomplete Module
parent: Components
grand_parent: Modules
nav_order: 4
---

# Autocomplete Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsAutocompleteModule.html) auto-generated from source code.

The Autocomplete module is also documented in the [tutorial]({{site.baseurl}}tutorial/autocomplete.html).

## Features

This module provides functionality to display an autocomplete dropdown panel under a search form:

- A directive applied to the form's `<input>` to listen to user inputs, send autocomplete queries and process the results.
- A component that displays these results (styled with the [Bootstrap](https://getbootstrap.com/) library).
- A service that sends the autocomplete queries to the backend server and provides additional services.

Both the directive and the component are largely extensible and customizable (See [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html)).

![Autocomplete]({{site.baseurl}}assets/modules/autocomplete/autocomplete.png){: .d-block .mx-auto }

Schematically, the code looks as follow:

```html
{% raw %}<form>

    <input type="text" sqAutocomplete [dropdown]="mydropdown">

    <button type="submit">Search</button>

    <sq-autocomplete-list #mydropdown>
        <ng-template #itemTpl let-item>
            {{ item.display }}
        </ng-template>
    </sq-autocomplete-list>

</form>{% endraw %}
```

## Import

Import this module in your `app.module.ts`.

```ts
import { BsAutocompleteModule } from '@sinequa/components/autocomplete';

@NgModule({
  imports: [
    ...
    BsAutocompleteModule
```

## Directive

The [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive (applied to the `<input>` element) listens to user interactions (keyboard inputs, mouse inputs, blur and focus events), sends autocomplete queries to the backend (via the [`SuggestService`]({{site.baseurl}}components/injectables/SuggestService.html)) and controls the dropdown component (what to display, when to display it and what to do when an item is selected).

The directive has several inputs:

- `dropdown`: A reference to the dropdown component. This component is not necessarily [`sq-autocomplete-list`]({{site.baseurl}}components/components/BsAutocompleteList.html), but it needs to implement the [`AutocompleteComponent`]({{site.baseurl}}components/interfaces/AutocompleteComponent.html) interface.
- `suggestQuery`: The name of the "Suggest Query" configured on the server. This value can be hard-coded, or provided by via the `AppService.suggestQueries` list (post-login).
- `off` (default: `false`): Whether the directive is turned off or not.
- `suggestDelay` (default: `200`): Number of milliseconds between queries sent to the server.
- `fieldSearch` (default: `false`): Whether fielded search is enabled or not.
- `excludedFields` (default: `['concept']`): If fielded search is enabled, defines the list of fields that are excluded from fielded search.

It also provides the following outputs (Event emitters):

- `stateChange`
- `submit`
- `parse`

Of course, other attributes and directives may be applied along the [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive. For example the code in Vanilla Search is the following:

```html
<input type="text" placeholder="{{ 'msg#searchForm.searchFor' | sqMessage }}" formControlName="search" class="form-control"
    spellcheck="false" autocomplete="off"
    [sqAutofocus]="autofocus"
    [sqAutocompleteExtended]="autocompleteSources"
    [dropdown]="dropdown"
    [off]="!loginService.complete || !appService.suggestQueries"
    [suggestQuery]="appService.suggestQueries? appService.suggestQueries[0] : ''"
    (submit)="search()">
```

You can customize the behavior of the directive by extending it and enriching it. The following methods can be overriden:

- 
