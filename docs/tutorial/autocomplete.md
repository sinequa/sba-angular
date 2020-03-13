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

⚠️ Also change the `type` of the Search button to `button` rather than `submit` (to avoid triggering double-submits caused by the autocomplete).

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

The `sq-autocomplete-list` component actually expects a input template to display the suggestions. Let's provide one with:

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

You can complete customize the display for the suggestions. The `item` object has a type of `AutocompleteItem`, which has at least the `display` and `category` properties. You can easily add icons that depend on the category, etc.

Finally some suggestions!

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete.png)

## Going further

Every aspect of the autocomplete can be deeply customized.
- The display can be customized by customizing the template passed to the `sq-autocomplete-list` component (or by implementing your own custom version of the component, which only needs to implement the `AutocompleteComponent` interface).
- The behavior of the autocomplete (change of state, source of the suggestions, etc.) can be customized by implementing your own directive, which can of course extend the `Autocomplete` directive to modify only a small part of it.

In the example below, we implement a custom directive that searches in the user's **recent queries** in addition to the suggestions coming from the server:

```ts
import { Directive, ElementRef } from '@angular/core';
import { Autocomplete, SuggestService, AutocompleteItem } from '@sinequa/components/autocomplete';
import { AppService } from '@sinequa/core/app-utils';
import { UIService } from '@sinequa/components/utils';
import { Utils } from '@sinequa/core/base';
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
     * This method overrides the Autocomplete.getSuggests() method from the sqAutocomplete directive.
     * Rather than only getting suggests from the server via the SuggestService, this directive also
     * searches for matches in the recent queries
     */
    protected getSuggests(){
        let value = this.getInputValue();
        if(value) { // If there is text, make a call to the suggest API
            let parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
            let fields: string[] | undefined;
            if(parseResult.result && this.fieldSearch){
                let position = this.getInputPosition(); // Position of the caret, if needed
                let res = parseResult.result.findValue(position);
                // Field Search suggest
                if(!!res && !!res.field){
                    fields = Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                    value = res.value;
                }
            }

            // Methods returning (observable of) suggestions from different sources

            let dataSources: Observable<AutocompleteItem[]>[] = [
                from(this.searchRecentQueries(value)),
                this.suggestService.get(this.suggestQuery, value, fields)
            ]
                                    
            this.processSuggests(
                // The forkJoin method allows to merge the suggestions into a single array, so the parent
                // directive only sees a single source.
                forkJoin(...dataSources).pipe(
                    map((suggests) => { 
                        return [].concat(...suggests); 
                    }),
                    catchError((err, caught) => {
                        console.error(err);
                        return [];
                    })
                ), fields);
            
        }
        else {  // If empty input, restart autocomplete
            this.start();
        }
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