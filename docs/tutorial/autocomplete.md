---
layout: default
title: Autocomplete
parent: Tutorial
nav_order: 6
---

# Autocomplete

Now, let's try to improve our search input with an **autocomplete**: a component that displays suggestions dynamically when the user is typing.

As usual, the autocomplete is packaged in a module from [`@sinequa/components`]({{site.baseurl}}modules/components/components.html): the [`BsAutocompleteModule`]({{site.baseurl}}modules/components/autocomplete.html).

Of course, this assumes a [**Suggest Query**](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-how-to-auto-complete.html) has been configured on the Sinequa backend server. If you are doing this tutorial with our test server as the backend, a query has been configured for you 😉.

## Importing the Autocomplete Module

In your `app.module.ts`, import the `BsAutocompleteModule` and add it to the `NgModule` declaration:

```ts
import { BsAutocompleteModule } from '@sinequa/components/autocomplete';

@NgModule({
  imports: [
    ...
    BsAutocompleteModule
```

The autocomplete module includes two important concepts:

- The `sqAutocomplete` directive: This directive is the "brain" of the autocomplete. It listens to the changes in the `<input>` and queries the `SuggestWebService` to get suggestions.
- The `sq-autocomplete-list` component: This component takes an input template to display the suggestions in a custom way.

## Refactoring the form

First, let's restyle our form with some Bootstrap classes:

```html
{% raw %}<form novalidate [formGroup]="form">
    <div class="input-group">
        <input class="form-control" ...>
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" ...>{{ 'msg#search.button' | sqMessage }}</button>
            <button class="btn btn-light" ...>{{ 'msg#search.clear' | sqMessage }}</button>
        </div>
    </div>
</form>{% endraw %}
```

Notice that we inserted two extra `<div>` and some Bootstrap classes (`input-group`, `form-control`, `btn`, etc.). Your form should look something like:

![Search form Bootstrap]({{site.baseurl}}assets/tutorial/search-form.png)

⚠️ Also notice the change of the `type` of the Search button from `submit` to `button` (to avoid triggering double-submits caused by the autocomplete).

## Display the Autocomplete list

We are going to add the `sq-autocomplete-list` under the `<input>`. To do so, we use the flex-layout utilities from Bootstrap:

```html
<form novalidate [formGroup]="form">
    <div class="d-flex flex-column flex-grow-1 position-relative">
        <div class="input-group">
            ...
        </div>

        <sq-autocomplete-list #dropdown>
        </sq-autocomplete-list>
    </div>
</form>
```

This doesn't change anything to the display though, because the `sq-autocomplete-list` component has no data to display...

## Respond to user inputs

Now, we insert the `sqAutocomplete` directive in the `<input>` element:

```html
<input ...
       sqAutocomplete
       [off]="!loginService.complete || !appService.suggestQueries"
       [dropdown]="dropdown"
       [suggestQuery]="appService.suggestQueries? appService.suggestQueries[0] : null"
       (submit)="search()">
```

Now, the directive is listening to user key events and getting suggestions from the backend (if the list of `suggestQueries` is not empty). Notice that we pass the `dropdown` variable to the directive: this is a reference to our `sq-autocomplete-list` component (which has a `#dropdown` tag).

However, still nothing is displayed...

## Displaying suggestions

The `sq-autocomplete-list` component actually expects a input template (`ng-template`) to display the suggestions. Let's provide one with:

```html
...
{% raw %}<sq-autocomplete-list #dropdown>
    <ng-template #itemTpl let-item>
        <div class="py-2" style="padding-left:0.75rem;">{{item.display}}
            <small *ngIf="item.category" class="ml-2 text-muted">
                {{(item.label || item.category) | sqMessage}}
            </small>
        </div>
    </ng-template>
</sq-autocomplete-list>{% endraw %}
```

You can easily customize the display of the suggestions. Here, `item` is an `AutocompleteItem` object, which has at least the `display` and `category` properties. You could easily enrich the template with some icons or images (eg. which would depend on `item.category`), etc.

Finally some autocomplete suggestions!

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete.png)

## Going further

Every aspect of the autocomplete can be deeply customized.

- The display can be customized by modifying the template (`ng-template`) passed to the `sq-autocomplete-list` component (or by implementing your own custom autocomplete component from scratch, which would require implementing the `AutocompleteComponent` interface).
- The behavior of the autocomplete (change of state, source of the suggestions, etc.) can be customized by implementing your own directive. You can do this from scratch, or more efficiently by extending the `Autocomplete` directive to modify only a small part of it.

In the example below, we implement a custom directive that searches in the user's **recent queries** in addition to the autocomplete suggestions coming from the server:

```ts
import { Directive, ElementRef } from '@angular/core';
import { Autocomplete, SuggestService, AutocompleteItem } from '@sinequa/components/autocomplete';
import { AppService } from '@sinequa/core/app-utils';
import { UIService } from '@sinequa/components/utils';
import { RecentQueriesService, RecentQuery } from '@sinequa/components/saved-queries';
import { Observable, forkJoin, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Directive({
    selector: "[sqAutocompleteCustom]"
})
export class AutocompleteCustom extends Autocomplete {

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        protected recentQueriesService: RecentQueriesService){
        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * This method overrides the Autocomplete.getSuggestsObs() method from the sqAutocomplete directive.
     * Rather than only getting suggests from the server via the SuggestService, this directive also
     * searches for matches in the recent queries
     */
    protected getSuggestsObs(value: string, fields?: string[]): Observable<AutocompleteItem[]>{

        // Methods returning (observable of) suggestions from different sources

        let dataSources: Observable<AutocompleteItem[]>[] = [
            from(this.searchRecentQueries(value)),
            this.suggestService.get(this.suggestQuery, value, fields)
        ]

            // The forkJoin method allows to merge the suggestions into a single array, so the parent
            // directive only sees a single source.
        return forkJoin(...dataSources).pipe(
            map((suggests) => {
                return [].concat(...suggests);
            }),
            catchError((err, caught) => {
                console.error(err);
                return [];
            })
        );

    }

    /**
     * Search for the input text in the recent queries and return autocomplete items asynchronously
     * @param text
     */
    searchRecentQueries(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData<RecentQuery>(
            'recent-query',
            text,
            this.recentQueriesService.recentqueries,
            (query) => query.query.text || '',
            undefined,
            "msg#searchForm.recentQuery");
    }

}
```

Notice that we directly search in the recent queries list (`recentQueriesService.recentqueries`) on the client side, without interrogating the server.

---

Next: [Preview & Modals](preview.html)
{: style="float: right;" }

Previous: [Internationalization](intl.html)
