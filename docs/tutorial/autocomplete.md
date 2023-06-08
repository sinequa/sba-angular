---
layout: default
title: Autocomplete
parent: Tutorial
nav_order: 6
---

# Autocomplete

Now, let's try to improve our search input with an **autocomplete**: a component that displays suggestions dynamically when the user is typing.

There is an autocomplete packaged in a module from [`@sinequa/components`]({{site.baseurl}}modules/components/components.html): the [`BsAutocompleteModule`]({{site.baseurl}}modules/components/autocomplete.html), but we will design our own following what is done in Vanilla Search, using `SearchFormComponent` which still comes from [`@sinequa/components`]({{site.baseurl}}modules/components/components.html).

In order for the autocomplete to work, we assume a [**Suggest Query**](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-how-to-auto-complete.html) has been configured on the Sinequa backend server. If you are doing this tutorial with our test server as the backend, a query has been configured for you 😉.

## Importing the Autocomplete Module

We will start by changing the search input with `SearchFormComponent`. In your `app.module.ts`, import it and add it to the `NgModule` declaration:

```ts
import { SearchFormComponent } from '@sinequa/components/search-form';

@NgModule({
  imports: [
    ...
    SearchFormComponent
```

The component simplifies the search handling with the minimum configuration required. It also allows to provide a template in which you can provide the autocompletion.

## Refactoring the form

First, replace the whole `<form>` with the search form:

```html
{% raw %}<h1>Hello Search 🔍</h1>

<div class="d-flex flex-column flex-grow-1 position-relative mb-5">
    <sq-search-form [query]="searchService.query" [searchRoute]="''"></sq-search-form>
</div>

<div *ngIf="searchService.resultsStream | async; let results">{% endraw %}
```

Notice that we have have to provide the `searchRoute` input as an empty string since the search will redirect to this page upon submit, and the default value for the SBA is `/search`.

You can also remove the no longer used code inside `app.component.ts`:
- The `search()` method
- The `clear()` method (and its usage inside `logout()`)
- The `searchControl` and `form` variables
- Everything in the `constructor()` except for the `languageActions` setup
- The unused `UntypedFormGroup` and `UntypedFormControl` imports

There are some missing translations, to add them you need to add to your dictionaries the corresponding file:

```ts
import {enSearchForm} from "@sinequa/components/search-form";

...
    messages: Utils.merge({}, ..., enSearchForm, appMessages)
```

Your form should now look like this:

![Search form Bootstrap]({{site.baseurl}}assets/tutorial/search-form.png)

## Create the Autocomplete component

We want to handle the autocomplete display inside its own component. Let's create a new component in `src/app/` named `autocomplete.ts`.

```ts
@Component({
    selector: "autocomplete",
    template: `
<div class="list-group list-group-flush" *ngIf="items$ | async; let items">
    <a role="button" *ngFor="let item of items"
        class="list-group-item list-group-item-action"
        (click)="search(item.display)">

        {{item.display}}
        <small *ngIf="item.category" class="ms-auto text-muted">
            {{item.category | sqMessage}}
        </small>
    </a>
</div>
    `,
    styles: [`
.list-group-flush > .list-group-item:last-child {
  border-end-start-radius: 20px;
  border-end-end-radius: 20px;
}
    `]
})
export class Autocomplete implements OnChanges, OnInit {

    @Input() queryText: string;

    inputChange$ = new ReplaySubject(1);
    items$: Observable<AutocompleteItem[] | undefined>;

    constructor(private suggestService: SuggestService,
        private searchService: SearchService) {
    }

    ngOnInit() {
        this.items$ = this.inputChange$
            .pipe(
                filter(text => !!text), // make sure there is a content in the text
                debounceTime(200), // adds a slight delay before triggering the search to avoid having one call at each change
                switchMap(() => this.suggestService.get(undefined, this.queryText)), // trigger the search
            );
    }

    ngOnChanges() {
        this.inputChange$.next(this.queryText);
    }

    search(value: string) {
        this.searchService.query.text = value;
        this.searchService.searchText();
    }
}
```

In this component, the `items$` asynchronous variable listens to the input changes (e.g. when the `queryText` input gets updated), which triggers automatically `SuggestService.get` to retrieve the suggestions to display inside the autocomplete.

In the template, the asynchronicity is handled using the `*ngIf="items$ | async; let items"` instruction which listens to any updates to `items$` and applying its value to `items`.

## Display the Autocomplete list

Now that the component is defined, you have to declare it in your `app.module.ts`.

```ts
import { Autocomplete } from "./autocomplete";

@NgModule({
  declarations: [
    ...
    Autocomplete
```

Let's now add the `ng-template` containing the autocomplete inside `<sq-search-form>`:

```html
<sq-search-form [query]="searchService.query" [searchRoute]="''">
    <ng-template let-query>
        <autocomplete [queryText]="query.text"></autocomplete>
    </ng-template>
</sq-search-form>
```

Finally some autocomplete suggestions!

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete.png)

---

Next: [Preview & Modals](preview.html)
{: style="float: right;" }

Previous: [Internationalization](intl.html)
