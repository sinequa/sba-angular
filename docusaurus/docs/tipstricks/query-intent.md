---
layout: default
title: Query Intent Detection
parent: Tips and Tricks
sidebar_position: 17
---

# Query Intent Detection

The Sinequa platform can analyze user queries to determine their intent and perform pre-determined actions for pre-determined intents. Query intent detection can be based on a trained Deep Learning model, or based on more simple and deterministic rules (like the presence of an entity in the query).

## Query Intent Web Service

This functionality is exposed as a web service. The service takes in a user query and returns one or several intents, including the entities (or their Machine Learning equivalent, "slots") that have been matched.

In the Sinequa administration, the Query Intents are configured in the _Search-Based Applications > App Dependencies > Query Intent Sets_ section. Once configured there, the Query Intent Set must be attached to the SBA's query web service (Under the _Search settings_ tab and _Query Options - Intents_ section).

Requesting the intent of a query can then be done easily, by using `QueryIntentWebService` from the [`@sinequa/core/web-services`](/libraries/core/web-services.md) module:

```ts
this.queryIntentWebService.getQueryIntent(this.query);
```

In this example, `this.query` is a `Query` object. The method returns an observable of `QueryIntentMatch[]`.

## Integration in the Search process

Query Intent detection is already integrated in the search process orchestrated by the `SearchService`. It is automatically triggered when you configure a Query Intent Set in your query web service on the back-end.

However, there are two possible processes:

- Asynchronous detection (by default): The Query Intent detection is performed **in parallel** with Search. This process is well suited when query intent is needed for displaying information in addition to the search results, like for example in an info-card. This process is analogous to how **sponsored links** work.
- Synchronous detection: The Query Intent detection is performed **before** Search, which allows to potentially modify or cancel the query, and/or perform other actions before Search is actually executed. This process is analogous to how the **Did You Mean** functionality works. Note that this process involves an additional round-trip with the Sinequa platform, so it slows down search a little bit.

![Query Intent modes](/assets/tipstricks/queryintents.png)

Synchronous detection can be activated by setting the `queryIntentsSync` property of the `SearchOptions` in your `AppModule`:

```ts
@NgModule({
    imports: [
        ...,
        BsSearchModule.forRoot({queryIntentsSync: true})
```

The `SearchService` emits a `new-query-intents` event when results are in. Other components and services can listen to this event and perform custom actions depending on the presence and type of intents.

```ts
this.searchService.events.subscribe(event => {
    if(event.type === 'new-query-intents') {
        const events = event.intents.filter(intent => intent.name === "my-intent");
        if(events.length > 0) {
            ...
        }
    }
}
```

## Examples

### Managing Query Intents

A good idea is to centralize the management of Query Intents in one place. We can create a service that listens to the `SearchService` events, and performs custom actions, depending on the type of intent that is detected.

```ts
@Injectable({providedIn: 'root'})
export class QueryIntentService  {

    constructor(
        public searchService: SearchService,
        public exprBuilder: ExprBuilder
    ){
        this.init();
    }

    init() {
        this.searchService.events.subscribe(event => {
            if(event.type === 'new-query-intents') {
                // Perform custom actions here
            }
        });
    }
}
```

It is important that this service be created from the start of the application life. You can force that by including it in the constructor of your `AppComponent`:

```ts
    constructor(
        ...,
        public queryIntentService: QueryIntentService
    ){}
```

### Example 1: Displaying an info-card

Displaying an info-card is independent from the main search process, so we can work in asynchronous mode.

Let's say we have configured an intent named "people" on the backend. When we search for "who is John Doe?", this intent matches and we can display an info-card about that person.

In our `QueryIntentService` let's add a method that looks for the "people" intent and fetches data about that person:

```ts

    // People Query intent data
    person?: string;
    personData = new ReplaySubject<Results|undefined>(1);

    processPeople(event: SearchService.NewQueryIntentsEvent) {
        // Look for the "people" intent
        const people = event.intents.filter(intent => intent.name === "people")
            .map(intent => intent.globalEntities?.[0]?.normalization as string)
            .filter(f => !!f);

        // If any (and if not already processed)
        if(people.length > 0 && this.person !== people[0]) {
            // Create a query for this person
            const query = this.searchService.makeQuery();
            query.text = people[0];
            query.action = "aggregate";
            query.aggregations = ["geo", "company", "person"];
            this.searchService.getResults(query)
                .subscribe(r => {
                    this.person = people[0];
                    this.personData.next(r); // Emits the data for the infocard
                });
        }

        // If none, we want to stop displaying the infocard, if any
        else if(people.length === 0) {
            this.person = undefined;
            this.personData.next(undefined);
        }
    }
```

We can call this method from the `init()` method we defined above.

Then, to display the infocard, we simply create a component that displays the `personData`, if any. This can be as simple as the following:

```ts
@Component({
    selector: 'sq-query-intent-people',
    template: `
<sq-facet-card *ngIf="queryIntentsService.personData | async; let results"
    [title]="queryIntentsService.person"
    [icon]="'fas fa-user'">

    <sq-facet-tag-cloud #facet
        [results]="results"
        [aggregations]="['Company','Geo','Person']">
    </sq-facet-tag-cloud>

</sq-facet-card>
    `
})
export class QueryIntentPeopleComponent {

    constructor(
        public queryIntentsService: QueryIntentService
    ){}
}
```

With the example above we display a tag-cloud with terms related to a person. This infocard can be displayed, for example, on the right side of the user interface. This component has no input, and it manages its own visibility, so it's enought to embed it with something as simple as:

```html
<sq-query-intent-people></sq-query-intent-people>
```

![Query intent people](/assets/tipstricks/queryintents-people.png)
_Result of searching "who is Barack Obama?"_


### Example 2: Automatic filters

Another use-case for Query Intent is to detect the intent of applying a specific filter. For example, if a user searches for _"earnings report pdf"_, we can detect that they really means _"earnings report"_ and format = pdf.

Let's say we have configured an intent named "format" that detects a file format in the query. Now, since we want to modify the search query, we need to work in synchronous mode. So, in our `AppModule`, let's start by adding the `queryIntentSync` option, as explained above:

```ts
export const searchOptions: SearchOptions = {
    ...,
    queryIntentsSync: true
};
```

In our `QueryIntentService` let's add a method that looks for the "format" intent, modifies the query, cancels the current search and performs a new query:

```ts
    formats: string[];

    processFormats(event: SearchService.NewQueryIntentsEvent) {
        // Activate only if user has not already created a docformat filter
        if(!event.query.findSelect("docformat")) {

            // Look for the "format" intents
            this.formats = event.intents.filter(intent => intent.name === "format")
                    .map(intent => intent.globalEntities?.[0]?.value.toLowerCase() as string)
                    .filter(f => !!f);

            // If any...
            if(this.formats.length > 0) {
                // Add a format filter to the query and remove the format from the searched text
                event.query.addSelect(this.exprBuilder.makeOrExpr("docformat", this.formats), "docformat");
                for(let format of this.formats){
                    event.query.text = event.query.text?.replace(new RegExp("\\s*\\b"+format+"\\b\\s*", "i"), " ").trim();
                }
                // Cancel the current search
                event.cancelSearch = true;
                // Create a new search
                this.searchService.search();
            }
        }
    }
```

Notice that we cancel the current search and create a new one. This is not stricly mandatory, and it would also work to only modify the query. But the problem with that is that the URL would contain the old query, not the modified query. The URL would reflect the actual search parameters only on the next search, which is not very satisfying.

One limit of this type of Query Intent is that the user may have actually meant to search for the term "pdf". Therefore, it is important to give them the possibility of forcing that search and ignoring the Query Intent. To do so, we can develop a component similar to the "Did you mean" component:

```ts
@Component({
    selector: 'sq-query-intent-format',
    template: `
<div *ngIf="queryIntentService.formats?.length">
    Did you mean to filter by formats?
    <a href="#" (click)="cancel()">cancel</a>
</div>
    `
})
export class QueryIntentFormatComponent {

    constructor(
        public queryIntentService: QueryIntentService
    ){}

    cancel() {
        this.queryIntentService.cancelFormats();
        return false;
    }
}
```

This component is displayed only when the `QueryIntentService` has detected `formats` and modified the query. We just need to implement the `cancelFormats()` method on the service. This can be done in different ways, but in our case, let's assume we want to disable the format detection once and for all (until the app is reloaded):

```ts
    ignoreFormat = false;

    cancelFormats() {
        // Remove the docformat selection
        this.searchService.query.removeSelect("docformat");
        // Put back the format name in the query text
        const text = this.searchService.query.text? [this.searchService.query.text] : [];
        this.searchService.query.text = text.concat(this.formats).join(" ");
        // Search again
        this.searchService.search();
        // Set a flat to turn off format detection
        this.ignoreFormat = true;
        this.formats = [];
    }

    processFormats(event: SearchService.NewQueryIntentsEvent) {
        // Turn off the format detection in our existing processFormats() method
        if(!event.query.findSelect("docformat") && !this.ignoreFormat) {
            ...
        }
    }
```

![Query intent formats](/assets/tipstricks/queryintents-formats.png)
_Result of searching "code civil pdf"_

