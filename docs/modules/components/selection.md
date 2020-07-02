---
layout: default
title: Selection Module
parent: Components
grand_parent: Modules
nav_order: 13
---

# Selection Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/SelectionModule.html) auto-generated from source code.

## Features

This module provides a transverse service that keeps track of selected documents and records. Documents may typically be selected by a click on a button or a checkbox. Selecting documents allows other services to operate over these documents (for example, adding selected documents to a basket, or setting a label or tag onto these documents).

The module also provides components based on this service. These components allow to select one or multiple documents, and to rearrange a given selection (changing its order, removing items).

## Import

```typescript
import { BsSelectionModule, SelectionOptions, SELECTION_OPTIONS } from '@sinequa/components/selection';

/* These options override the default settings */
export const mySelectionOptions: SelectionOptions = {
    resetOnNewQuery: false,
    resetOnNewResults: false,
    storage: "record"
};

@NgModule({
  imports: [
      /*....*/
      BsSelectionModule,
      /*....*/
  ],
  providers: [
      /* If you want to the default options of the selection module */
      { provide: SELECTION_OPTIONS, useValue: mySelectionOptions },
      /*....*/
  ],
  /*....*/
})
```

## API usage

### Selection Service

The [`SelectionService`]({{site.baseurl}}components/injectables/SelectionService.html) offers a transverse solution to keep track of selected documents. Components use this service both to modify the selection (select or unselect documents), and to access this selection and be notified of its changes (via events).

Like any other service, it can be injected into components and other service by dependency injection:

```ts
import { SelectionService } from "@sinequa/components/selection";

@Component({
    selector: "my-component",
    templateUrl: "..."
})
export class MyComponent {

    constructor(
        public selectionService: SelectionService
    ){}
```

The following methods of the service are of interest:

- `getSelectedItems()`: returns the list of selected items ([`SelectionItem`]({{site.baseurl}}components/interfaces/SelectionItem.html)). A selected item contains at least the `id` property of the associated [`Record`]({{site.baseurl}}core/interfaces/Record.html) object.

    But it may contain more: If the module's [`SelectionOptions`]({{site.baseurl}}components/interfaces/SelectionOptions.html) specifies `storage: "record"` (instead of `"id"`), then the selection item is the record itself. The `storage` property may also be a function that maps a record to a custom object (which must contain at least the record's `id`).

    ⚠️ The list returned by this method is a **copy** of the list maintained by this service. Therefore modifying this list will have no effect on the selection. To add, remove or reorder items, one must use the appropriate methods listed below.

- `getSelectedIds()`: returns the list of ids (as `string`) of the selected items. This method always work in the same way regardless of the [`SelectionOptions`]({{site.baseurl}}components/interfaces/SelectionOptions.html) (it should therefore be preferred when possible, to implement new functionality based on this service).
- `haveSelectedRecords`: is `true` if there are selected records.
- `getSelectedCount()`: returns the number of selected items.
- `allRecordsSelected`: is `true` if all records in the search service results are selected.
- `toggleSelectedRecords(record?: Record, source?: string)`: This method allows to add or remove records to/from the selection. It takes two optional arguments:

  - `record`: a specific record to add or remove to/from the selection. If this parameter is omitted or undefined, all the records in the search service's results or added or removed (they are all removed only if they were all selected).
  - `source`: an identifier for the type of source which causes the selection change. The source will be included in the events emitted by the service, and it can be used by client services if they listen to these events.

    This method generates a `SELECT` or `UNSELECT` event.

- `moveSelectedRecord(record: Record, newIndex: number)`: Moves a selected record to a different index. The input record must be already in the selection. This method generates a `MOVE` event.
- `clearSelectedRecords()`: Unselect all selected records. This method generates an `UNSELECT` event.

Additionally, the service includes the following properties:

- `events`: a `Subject` emitting events of three types: `SELECT`, `UNSELECT` and `MOVE`, when the selection changes. These events ([`SelectionEvent`]({{site.baseurl}}components/interfaces/SelectionEvent.html)) include the list of records concerned by the event, as well as the (optional) source of the event.
- `selectionActions`: a list of [`Action`]({{site.baseurl}}components/classes/Action.html) (See [Action module](action.html)) that can be registered by other services. These actions are automatically updated when the selection changes. The actions are displayed by the [`sq-results-selector`]({{site.baseurl}}components/components/BsResultsSelector.html) component

    For example, the Baskets service can register an action to add the selected documents to a basket. If the action includes an update method, it can, for example, hide itself if there is no selected document.

    These actions can be registered within a service or a component, typically at the start of the application. For example, in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), the actions are registered in the `AppComponent`'s constructor:

    ```ts
    this.selectionService.selectionActions.push(this.savedQueriesService.selectedRecordsAction);
    this.selectionService.selectionActions.push(this.basketsService.selectedRecordsAction);
    ...
    ```

### Result Selector

The [`sq-result-selector`]({{site.baseurl}}components/components/BsResultSelector.html) component displays a simple checkbox associated to a record ([`Record`]({{site.baseurl}}core/interfaces/Record.html)).

It is typically meant to be displayed in a list of results for each record.

```html
<sq-result-selector [record]="record"></sq-result-selector>
```

![Result selector]({{site.baseurl}}assets/modules/selection/result-selector.png){: .d-block .mx-auto }

### Results Selector

Not to be confused with the previous component, the [`sq-results-selector`]({{site.baseurl}}components/components/BsResultsSelector.html) displays a global list of actions including:

- The `selectionActions` from the [`SelectionService`](#selection-service) (mentioned above).
- An action allowing to toggle the selection of all results in the search service's results. This action displays a checkbox and the number of selected documents.

Options are available to customize the actions' display:

- `rightAligned` (boolean): whether the actions are aligned to the right.
- `style` (string): A [Bootstrap class name](https://getbootstrap.com/docs/4.0/components/buttons/) to change the style of the action buttons (Typically, `light`, `dark`, `primary`, etc.).
- `size` (string): A Bootstrap size modifier (small: `sm`, large: `lg`).

```html
<sq-results-selector [rightAligned]="true" [style]="'light"></sq-results-selector>
```

![Results selector]({{site.baseurl}}assets/modules/selection/results-selector.png){: .d-block .mx-auto }

### Selection arranger

The [`sq-selection-arranger`]({{site.baseurl}}components/components/BsSelectionArranger.html) component displays the list of selected components (using a template passed by transclusion). It allows to rearrange the selected items by changing their order (with drag & drop) or removing them.

The component directly modifies the selection via the [`SelectionService`](#selection-service), using the methods described above.

{% raw %}

```html
<sq-selection-arranger>
    <!-- Template passed by transclusion -->
    <ng-template let-record>
        <div class="p-2">{{record.title}}</div>
    </ng-template>
</sq-selection-arranger>
```

{% endraw %}

![Selection arranger]({{site.baseurl}}assets/modules/selection/selection-arranger.png){: .d-block .mx-auto }

This component makes use of the [`DragDropModule`](https://material.angular.io/cdk/drag-drop/overview) from `@angular/cdk`.

It is also posible to display and rearrange a list of record which is **not** tied to the [`SelectionService`](#selection-service). To do so, simply bind the `records` input, and listen to selection changes via the `(changes)` event emitter:

{% raw %}

```html
<sq-selection-arranger [records]="results.record" (changes)="onChanges($event)">
    <!-- Template passed by transclusion -->
    <ng-template let-record>
        <div class="p-2">{{record.title}}</div>
    </ng-template>
</sq-selection-arranger>
```

{% endraw %}
