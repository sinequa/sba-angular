---
layout: default
title: Autocomplete
parent: Tutorial
sidebar_position: 6
---

# Autocomplete

Now, let's try to improve our search input with an **autocomplete**: a component that displays suggestions dynamically when the user is typing.

There is an autocomplete packaged in a module from [`@sinequa/components`](/libraries/components/components.md): the [`BsAutocompleteModule`](/libraries/components/autocomplete.md), but we will design our own following what is done in Vanilla Search, using `SearchFormComponent` which still comes from [`@sinequa/components`](/libraries/components/components.md).

In order for the autocomplete to work, we assume a [**Suggest Query**](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-how-to-auto-complete.md) has been configured on the Sinequa backend server. If you are doing this tutorial with our test server as the backend, a query has been configured for you 😉.

## Importing the Search Form component

We will start by changing the search input with `SearchFormComponent`. In your `app.module.ts`, import it and add it to the `NgModule` declaration:

```ts title="app.module.ts"
import { SearchFormComponent } from '@sinequa/components/search-form';

@NgModule({
  imports: [
    ...
    SearchFormComponent
```

The component simplifies the search handling with the minimum configuration required. It also allows to provide a template in which you can provide the autocompletion.

## Refactoring the form

First, replace the whole `<form>` with the search form:

```html title="app.component.html"
<h1>Hello Search 🔍</h1>

<div class="d-flex flex-column flex-grow-1 position-relative mb-5">
    <sq-search-form [query]="searchService.query" [searchRoute]="''"></sq-search-form>
</div>

<div *ngIf="searchService.resultsStream | async; let results">
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

![Search form Bootstrap](/assets/tutorial/search-form.png)

## Create the Autocomplete component

We want to handle the autocomplete display inside its own component. Let's create a new component in `src/app/` named `autocomplete.ts`.

```ts title="autocomplete.ts"
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
    selector: "autocomplete",
    template: `
<span *ngIf="items$ | async; let items">{{items}}</span>
    `,
    styles: [`

    `]
})
export class Autocomplete implements OnInit {

    items$: Observable<string>;

    constructor() {
    }

    ngOnInit() {
        this.items$ = of('Hello world');
    }
}
```

In this code, you have `items$` being an Observable, meaning that you can watch it to retrieve in an asynchronous way some data. Here, you don't yet make any call but you pass the string "Hello world" using the rxjs `of()` method  that allows to inject some data asynchronously.

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

You should now see a "Hello world" appear when you click on the input:

![Autocomplete](/assets/tutorial/autocomplete-helloworld.png)

## Add the user input

`sq-search-form` allows to pass variables to its template, so you now can add a new input to `autocomplete` to retrieve the query text.

Let's add the input to the component and change `items$` to return the input value:

```ts title="autocomplete.ts"
import { Input, OnChanges } from "@angular/core";
import { ReplaySubject } from "rxjs";


export class Autocomplete implements OnChanges, OnInit {

    @Input() queryText: string;

    inputChange$ = new ReplaySubject(1);
    items$: any;

    ngOnInit() {
        this.items$ = this.inputChange$;
    }

    ngOnChanges() {
        this.inputChange$.next(this.queryText);
    }
    ...
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

![Autocomplete](/assets/tutorial/autocomplete-input.png)

## Alter the displayed value

If you wish to apply modifications to the input value, you can use rxjs `map()` method. Let's simply add "Hello world" before the input value:

```ts title="autocomplete.ts"
import { map } from "rxjs";

export class Autocomplete implements OnChanges, OnInit {

    items$: Observable<string>;

    ngOnInit() {
        this.items$ = this.inputChange$.pipe(map(text => "Hello world " + text));
    }
```

And here's the result:

![Autocomplete](/assets/tutorial/autocomplete-altervalue.png)

## Retrieve the suggestions

You now need to get the proper suggestions from what you type. For a better asyncronous handling of the value transformation, you can use rxjs `switchMap()` method which like `map()` allows you to change the value, but asynchronously, for example by making a call.

```ts title="autocomplete.ts"
import { switchMap } from "rxjs";
import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";

@Component({
    ...
    template: `
<ul *ngIf="items$ | async; let items">
    <li *ngFor="let item of items">
        {{item.display}}
    </li>
</ul>
    `
})
export class Autocomplete implements OnChanges, OnInit {

    ...
    items$: Observable<AutocompleteItem[] | undefined>;

    constructor(private suggestService: SuggestService) {
    }

    ngOnInit() {
        this.items$ = this.inputChange$
            .pipe(
                switchMap(text => this.suggestService.get(undefined, text as string)) // retrieve the suggestions
            );
    }

    ngOnChanges() {
        this.inputChange$.next(this.queryText);
    }
}
```

You may have a NullPointerException in the console (`TypeError: Cannot read properties of undefined`) since `ngOnChanges()` is triggered at the component creation and that the search value is empty. To fix this you can deactivate the triggering of the suggestions search using rxjs `filter()`:

```ts title="autocomplete.ts"
import { filter } from "rxjs";

this.items$ = this.inputChange$
    .pipe(
        filter(text => !!text), // prevents searching if there is no query text
        switchMap(text => this.suggestService.get(undefined, text as string)) // retrieve the suggestions
    );
```

You can now see a list of suggestions when you type:

![Autocomplete](/assets/tutorial/autocomplete-suggestions.png)

Another thing to notice is that a call is performed at every input change (so 4 calls if you try searching "test"). The `debounceTime` method can be useful here since it adds a delay before performing what follows it to make sure no more changes is expected:

```ts
this.items$ = this.inputChange$
    .pipe(
        filter(text => !!text), // prevents searching if there is no query text
        debounceTime(200), // add a slight wait before retrieving the suggestions to avoid making calls at each change
        switchMap(text => this.suggestService.get(undefined, text as string)) // retrieve the suggestions
    );
```

That's great that we now see the suggestions, but you need to be able to choose them to replace your query. You need to incorporate the `SearchService` on the click action for each suggestions:

```ts title="autocomplete.ts"
import { SearchService } from "@sinequa/components/search";

@Component({
    selector: "autocomplete",
    template: `
<ul *ngIf="items$ | async; let items">
    <li *ngFor="let item of items" (click)="search(item.display)">
        {{item.display}}
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
}
```

Congratulations, your autocomplete works!

## Improve the styling

There's still one thing you may want to improve: the styling. Bootstrap provides handy classes to handle that like `list-group`. You can update `template` and `styles` like this:

```ts title="autocomplete.ts"
@Component({
    selector: "autocomplete",
    template: `
<div class="list-group list-group-flush" *ngIf="items$ | async; let items">
    <a role="button" *ngFor="let item of items" class="list-group-item list-group-item-action" (click)="search(item.display)">
        {{item.display}}
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
```

Now it's fully complete!

![Autocomplete](/assets/tutorial/autocomplete.png)
