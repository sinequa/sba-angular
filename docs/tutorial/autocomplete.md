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
Hello world!
    `,
    styles: [`

    `]
})
export class Autocomplete implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
```

## Display the Autocomplete component

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
    <ng-template>
        <autocomplete></autocomplete>
    </ng-template>
</sq-search-form>
```

You should now see a "Hello world!" appear when you click on the input:

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete-helloworld.png)

## Add the user input

`sq-search-form` allows to pass variables to its template, so you now can add a new input to `autocomplete` to retrieve the query text.

Let's start by adding the input to the component:

```ts
{% raw %}@Component({
    selector: "autocomplete",
    template: `
Hello world! {{queryText}}
    `,
    ...
})
export class Autocomplete implements OnInit {

    @Input() queryText: string;
    ...{% endraw %}
```

Then you can provide it to `<autocomplete>`:

```html
<sq-search-form [query]="searchService.query" [searchRoute]="''">
    <ng-template let-query>
        <autocomplete [queryText]="query.text"></autocomplete>
    </ng-template>
</sq-search-form>
```

It should properly appear:

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete-input.png)

## Retrieve the suggestions

You now need to get the proper suggestions from what you type. Here's some code that will allow you to get the suggestions when you change the input:

```ts
{% raw %}import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";

@Component({
    ...
    template: `
<ul *ngIf="items$ | async; let items">
    <li *ngFor="let item of items">
        {{item.display}}
        <small *ngIf="item.category" class="ms-auto text-muted">
            {{item.category | sqMessage}}
        </small>
    </li>
</ul>
    `
})
export class Autocomplete implements OnChanges, OnInit {

    ...

    inputChange$ = new ReplaySubject(1);
    items$: Observable<AutocompleteItem[] | undefined>;

    constructor(private suggestService: SuggestService) {
    }

    ngOnInit() {
        this.items$ = this.inputChange$
            .pipe(
                switchMap(() => this.suggestService.get(undefined, this.queryText)) // retrieve the suggestions
            );
    }

    ngOnChanges() {
        this.inputChange$.next(this.queryText);
    }
}{% endraw %}
```

This way, when the query text changes (detected through `ngOnChanges()`), we can notify `inputChange$` of the new value, triggering the `pipe` content defined in `ngOnInit()`.

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete-suggestions.png)

Notice that if you clear the input content, it looks odd. You can deactivate the triggering of the suggestions search using `filter`:

```ts
this.items$ = this.inputChange$
    .pipe(
        filter(text => !!text), // prevents searching if there is no query text
        switchMap(() => this.suggestService.get(undefined, this.queryText)) // retrieve the suggestions
    );
```

Another thing to notice is that a call is performed at every input change (so 4 calls if you try searching "test"). The `debounceTime` method can be useful here since it adds a delay before performing what follows it to make sure no more changes is expected:

```ts
this.items$ = this.inputChange$
    .pipe(
        filter(text => !!text), // prevents searching if there is no query text
        debounceTime(200), // add a slight wait before retrieving the suggestions to avoid making calls at each change
        switchMap(() => this.suggestService.get(undefined, this.queryText)) // retrieve the suggestions
    );
```

That's great that we now see the suggestions, but you need to be able to choose them to replace your query. You need to incorporate the `SearchService` on the click action for each suggestions:

```ts
{% raw %}import { SearchService } from "@sinequa/components/search";

@Component({
    selector: "autocomplete",
    template: `
<ul *ngIf="items$ | async; let items">
    <li *ngFor="let item of items" (click)="search(item.display)">
        {{item.display}}
        <small *ngIf="item.category" class="ms-auto text-muted">
            {{item.category | sqMessage}}
        </small>
    </li>
</ul>
    `
    ...
})
export class Autocomplete implements OnChanges, OnInit {

    constructor(private suggestService: SuggestService,
        private searchService: SearchService) {
    }

    ...

    search(value: string) {
        this.searchService.query.text = value;
        this.searchService.searchText();
    }
}{% endraw %}
```

Congratulations, your autocomplete works!

## Improve the styling

There's still one thing you may want to improve: the styling. Bootstrap provides handy classes to handle that like `list-group`. You can update `template` and `styles` like this:

```ts
{% raw %}@Component({
    selector: "autocomplete",
    template: `
<div class="list-group list-group-flush" *ngIf="items$ | async; let items">
    <a role="button" *ngFor="let item of items" class="list-group-item list-group-item-action" (click)="search(item.display)">

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
}){% endraw %}
```

Now it's fully complete!

![Autocomplete]({{site.baseurl}}assets/tutorial/autocomplete.png)

---

Next: [Preview & Modals](preview.html)
{: style="float: right;" }

Previous: [Internationalization](intl.html)
