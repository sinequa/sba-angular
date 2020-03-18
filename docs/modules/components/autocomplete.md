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

- A **directive** applied to the form's `<input>` to listen to user inputs, send autocomplete queries and process the results.
- A **service** that sends the autocomplete queries to the backend server and provides additional services.
- A **component** that displays these results (styled with the [Bootstrap](https://getbootstrap.com/) library).

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

## Autocomplete Directive

The [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive (applied to the `<input>` element) listens to user interactions (keyboard inputs, mouse inputs, blur and focus events), sends autocomplete queries to the backend (via the [`SuggestService`]({{site.baseurl}}components/injectables/SuggestService.html)) and controls the dropdown component (what to display, when to display it and what to do when an item is selected).

The directive has several inputs:

- `dropdown`: A reference to the dropdown component. This component is not necessarily [`sq-autocomplete-list`]({{site.baseurl}}components/components/BsAutocompleteList.html), but it needs to implement the [`AutocompleteComponent`]({{site.baseurl}}components/interfaces/AutocompleteComponent.html) interface.
- `suggestQuery`: The name of the "Suggest Query" configured on the server. This value can be hard-coded, or provided by via the `AppService.suggestQueries` list (post-login).
- `off` (default: `false`): Whether the directive is turned off or not.
- `suggestDelay` (default: `200`): Number of milliseconds between queries sent to the server.
- `fieldSearch` (default: `false`): Whether fielded search is enabled or not.
- `excludedFields` (default: `['concept']`): If fielded search is enabled, defines the list of fields that are excluded from fielded search.

It also provides the following outputs (Event emitters):

- `stateChange`: Emits the state of the autocomplete (`OFF`, `INIT`, `START`, `ACTIVE`, `OPENED`, `SELECTED`)
- `submit`: Fires when the users "submits" the query (by typing Enter)
- `parse`: Fires when the query is parsed for wrong syntax (fielded search mode only)

Of course, other attributes and directives may be applied along with the [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive. For example the code in Vanilla Search is the following:

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

- `getSuggests()`: Makes a call to the [`SuggestService`]({{site.baseurl}}components/injectables/SuggestService.html) to obtain suggestions, which are then passed to `processSuggests()`. It can be overridden to obtain suggestions in a different way (this is the case in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html)).
- `processSuggests(items)`: Update the dropdown component with the suggestions. This method can be overridden to post process or filters the suggestions before they are displayed.
- `select(item)` or `setAutocompleteItem(item)`: Methods called when an item is selected from the dropdown panel (either with the mouse or keyboard navigation). By default, the `<input>` text is set to the value of the autocomplete item, but other behavior can be implemented (opening a document, searching a custom query, etc.; this is the case in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html))
- `parseQuery()`: Parse the current query to detect errors and manipulate the search terms.
- State change methods: `init()`, `start()`, `active()`, `open()`, `select()`. They can be overriden to insert new states or execute some custom code in specific states.

The transition between the different states is depected below:

![Autocomplete states]({{site.baseurl}}assets/modules/autocomplete/autocomplete-states.png){: .d-block .mx-auto }

## Suggest Service

The `SuggestService` provides the following methods:

- `get(suggestQuery: string, text: string, fields?: string | string[], query?: Query): Observable<Suggestion[]>`:

    This method uses both [`SuggestQueryWebService`]({{site.baseurl}}core/injectables/SuggestQueryWebService.html) and [`SuggestFieldWebService`]({{site.baseurl}}core/injectables/SuggestFieldWebService.html) to obtain suggestions from the server. It combines actual suggestions from suggest queries with suggestions of fields (when fielded search is active).

- `async searchData<T>(category: string, query: string, data: T[], primaryText: (obj:T) => string, secondaryText?: (obj:T) => string[], label?: string) : Promise<AutocompleteItem[]>`:

    This method allows to search within a list of objects of any type (`T`). It is useful to search within a small number of user objects on the client side. For example, in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), it is used to search within the recent queries, recent documents, saved queries and baskets.

    It expects the following inputs:

    1. `category`: The name of the [`AutocompleteItem`]({{site.baseurl}}components/interfaces/AutocompleteItem.html) category to be created as a result of this search.
    2. `query`: The text you want to search for.
    3. `data`: The list of objects you want to search in.
    4. `primaryText`: A function that takes in an object and outputs the primary text field to search in (eg. if objects are records, the primary field could be the title).
    5. `secondaryText` (optional): A function that takes in an object and outputs a list of secondary text fields to search in.
    6. `label` (optional): The label of the [`AutocompleteItem`]({{site.baseurl}}components/interfaces/AutocompleteItem.html) category to be created as a result of this search.

## Autocomplete List Component

The `sq-autocomplete-list` component is a fairly simple component that displays the list of suggestions from the directive. This component expects a `ng-template` named `#itemTpl` to be passed by transclusion, to actually display the items:

```html
{% raw %}<sq-autocomplete-list #mydropdown>
    <ng-template #itemTpl let-item>
        {{ item.display }}
    </ng-template>
</sq-autocomplete-list>{% endraw %}
```

In the [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html) application, the template (in [search-form.component.html](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/app/search-form/search-form.component.html)) looks like this:

```html
{% raw %}<ng-template #itemTpl let-item>
    <div class="autocomplete-item p-2">
        <i class="{{autocompleteIcon(item.category)}}"></i><!--
        --><span class="mx-2" [innerHTML]="item.displayHtml || item.display"></span><!--
        --><small *ngIf="item.category" class="autocomplete-category ml-2">{{(item.label || item.category) | sqMessage}}</small>
    </div>
</ng-template>{% endraw %}
```

You can customize the component by customizing the content of`#itemTpl`. Note that `item` is an [`AutocompleteItem`]({{site.baseurl}}components/interfaces/AutocompleteItem.html) passed by the directive.

You can also write you own component entirely, as long as:

- You tag it and pass it to the directive (`#mydropdown` in the example above).
- Your component implements the [`AutocompleteComponent`]({{site.baseurl}}components/interfaces/AutocompleteComponent.html) interface. This interface requires you to implement the following methods:
  - `hasItems(boolean)`: Whether there are any item to display
  - `clicked(EventEmitter<AutocompleteItem>)`: Event emitter for clicks on an autocomplete item
  - `selectedValue(AutocompleteItem)`: The currently selected item, if any
  - `update(active: boolean, items?: AutocompleteItem[])`: Method called to pass data to this component. If `active==false`, the component should be closed.
  - `selectNext()`: Select and return the next `AutocompleteItem` in the list.
  - `selectPrevious()`: Select and return the previous `AutocompleteItem` in the list.
