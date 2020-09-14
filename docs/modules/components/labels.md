---
layout: default
title: Labels Module
parent: Components
grand_parent: Modules
nav_order: 10
---

# Labels Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/LabelsModule.html) auto-generated from source code.

## Features
This module provides functionality to display the labels of a document, as well as components to manage them:

- [`LabelsService`]({{site.baseurl}}components/injectables/LabelsService.html): manages the different operations that can be applied to the labels of a document in Sinequa.
- A list of components to display and control the labels. These components are styled with the Bootstrap library, and their class names start with `Bs`.

![Labels]({{site.baseurl}}assets/modules/labels/displayed-labels-of-document.png){: .d-block .mx-auto }

## Import

```typescript
import { BsLabelsModule } from '@sinequa/components/labels';

@NgModule({
  imports: [
      /*....*/
      BsLabelsModule,
      /*....*/
  ],
  /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enLabels} from "@sinequa/components/labels";

const messages = Utils.merge({}, ..., enLabels, appMessages);
```
## Labels Service

The [`LabelsService`]({{site.baseurl}}components/injectables/LabelsService.html) provides a variety of methods.

So far, if your component wants to know the index columns, use the following :

- `publicLabelsField(): string | undefined`

    This method returns the index column for the public labels.

- `privateLabelsField(): string | undefined`

    This method returns the index column for the private labels.

**Public** labels can have specific access rules. If your components need to respect users rights and the label's configuration on the server side, use the following : 

- `allowPublicLabelsManagement(): boolean`

    This method indicates if the configuration of the Sinequa server is **globally** allowing to manage (create/rename/delete) **public** labels.

- `allowPublicLabelsEdition(): boolean`

    This method indicates if the configuration of the Sinequa server is **globally** allowing to edit (add/remove/bulkAdd/bulkRemove) **public** labels.

- `userLabelsRights(): LabelsRights`

    This method retrieves the logged in user's rights to manage and edit **public** labels.

Actually, the [`Labels Module`] defines three levels of actions that could be applied to labels.
As for **global** actions, the menu in the top navbar could perform.

## API usage

### LabelsService

The [`LabelsService`]({{site.baseurl}}components/inj/ResultLabels.html) is the interface between the different
UI components of the App and the server labels endpoit API.

It provides a variety of methods to

* display the Labels, the menus relating document labels
* add and remove document labels

#### Display the labels and labels menu

##### Knowing the label index column

If your component wants to know the index columns, use the following properties:

* `LabelsService.publicLabelsField`: returns the index column for the public labels,
* `LabelsService.privateLabelsField`: returns the index column for the private labels.

##### Changing the label menu in the navigation bar

If your component are to override the UI component that backs the labels menu component in the navigation bar,
here are the methods that you may need for your component:

* `selectLabel(item: Action, $event: UIEvent)`: the menu action to assign labels to a document.
The method expects that `item.data` is an [`IFormData`]({{site.baseurl}}components/interfaces/IFormData.html).
This object in turn needs to be

```typescript
{
  labelRef: IRef<string>, // A semicolon-delimited string representing the labels to add
  public?: boolean        // Whether the labels are public or private
}
```

* `renameLabel(item: Action, $event: UIEvent)`: the menu action to change the labels of a document from a list of old labels
to a new one.
The method expects that `item.data` is an [`IFormData`]({{site.baseurl}}components/interfaces/IFormData.html).
This object in turn needs to be

```typescript
{
  labelRef: IRef<string>, // A semicolon-delimited labels list, with the first element being the new label,
                          // and the rest are the old labels to be replaced
  public?: boolean        // Whether the labels are public or private
}
```

* `deleteLabel(item: Action, $event: UIEvent)`: the menu action to remove the labels of a document.
The method expects that `item.data` is an [`IFormData`]({{site.baseurl}}components/interfaces/IFormData.html).
This object in turn needs to be

```typescript
{
  labelRef: IRef<string>, // A semicolon-delimited labels list,
  public?: boolean        // Whether the labels are public or private
}
```

This action first opens a modal to ask for user confirmation before actually executing the deletion.

* `bulkAddLabel(item: Action, $event: UIEvent)`: the menu action to assign labels to the documents **matching the current query** in bulk.
The method expects that `item.data` is an [`IFormData`]({{site.baseurl}}components/interfaces/IFormData.html).
This object in turn needs to be

```typescript
{
  labelRef: IRef<string>, // A semicolon-delimited string representing the labels to add
  public?: boolean        // Whether the labels are public or private
}
```

This action first opens a modal to ask for user confirmation before actually executing the label assignment.

* `bulkRemoveLabel(item: Action, $event: UIEvent)`: the menu action to remove the given labels from the documents **matching the current query** in bulk.
The method expects that `item.data` is an [`IFormData`]({{site.baseurl}}components/interfaces/IFormData.html).
This object in turn needs to be

```typescript
{
  labelRef: IRef<string>, // A semicolon-delimited string representing the labels to remove
  public?: boolean        // Whether the labels are public or private
}
```

This action first opens a modal to ask for user confirmation before actually executing the label assignment.

##### Changing the label menu for selected documents

If your component is to override the label menu component for selected documents, here are some methods that you should know:

* `buildLabelsMenu()`: builds the label menu,
The signature of this method is

```typescript
buildLabelsMenu(
  addLabels: (items: Action[], _public: boolean) => void, // The action to add the labels
  icon = "fas fa-tags",                                   // The menu icon
  labelsText?,                                            // The tooltip of the menu,
  labelsTitle = "msg#labels.labels",                      // The menu title
  publicLabelsText = "msg#labels.publicLabels",           // The title for public label submenu
  privateLabelsText = "msg#labels.privateLabels"          // The title for the private label submenu
): Action | undefined
```

* `buildSelectionAction()`: the syntactic sugar to build the label menu,
* `addLabels(labels: string[], docIds: string[], _public: boolean): Observable<void>`: an async method to assign labels to the given documents,
* `removeLabels(labels: string[], docIds: string[], _public: boolean): Observable<void>`: an async method to unassign labels of the given documents,
* `selectLabels(labels: string[], _public: boolean): Promise<boolean>`: an async method to filter the current results page while keeping documents whose labels are given in the list,
* `renameLabels(labels: string[], newLabel: string, _public: boolean): Observable<void>`: an async method to rename all the labels in the given list to the `newLabel` name,
* `deleteLabels(labels: string[], _public: boolean): Observable<void>`: an async method to delete all the labels in the given list,
* `getCurrentRecordIds(): string[]`: retrieves the records in the current results,
* `getRecordFromId(id: string) : Record | undefined`: retrieves the record corresponding to the given id,
* `bulkAddLabels(labels: string[], _public: boolean): Observable<void>`: an async method to assign labels to the documents **matching the current query** in bulk,
* `bulkRemoveLabels(labels: string[], _public: boolean): Observable<void>`: an async method to unassign the labels of the documents **matching the current query** in bulk,

##### Manipulating the labels of a document

If your component wants to manipulate the labels of the a document itself, without using the `LabelPipe` (ie `sqLabel`),
here are some methods that you should know:

* `LabelsService.privateLabelsPrefix`: returns the prefix that are to be prepended to private label value,
* `addPrivatePrefix(labels: string|string[]): string|string[]`: prepends the private label prefix to the given label list,
* `removePrivatePrefix(labels: string|string[]): string|string[]`: removes the private label prefix from the given label list,
* `split(labels: string): string[]`: transform a semicolon-delimited label list string into a list of labels.
* `sort(labels: string[], _public: boolean): string[]`: sorts the labels list in ascending order w.r.t the current locale.

#### LABELS_COMPONENTS

The `LabelsService` also provides the `LABELS_COMPONENTS` injection token which can be used to override the UI component
to display the document labels.

To do that you need to declare your component with the Angular providers in `app.module.ts`

```typescript
/* ... */
import { NgModule } from "@angular/core";
import { LABELS_COMPONENTS } from "@sinequa/components/labels.service";
import { MyLabelsComponent } from "./path/to/my.labels.component";
/* ... */

@NgModule({
  /* ... */
  providers: [
    /* ... */
    { provide: LABELS_COMPONENTS, useValue: MyLabelsComponent },
    /* ... */
  ]
  /* ... */
})
/* ... */
```

### Components

#### ResultLabels

The [`ResultLabels` component]({{site.baseurl}}components/components/ResultLabels.html) is used to display
the assigned labels of a document.

This component is backed by `Labels` component.

The inputs of the component are:

* `record`: The record whose labels are to be displayed,
* `caption`: The caption for the labels,
* `public`: Whether the labels are public,
* `field`: The index column where the labels are stored.

#### Labels

The [`Labels` component]({{site.baseurl}}components/components/Labels.html) is used to display and to manage
the assigned labels of a document.

The inputs of the component are:

* `record`: The record whose labels are to be displayed,
* `class`: The classes to put on the component,
* `public`: Whether the labels are public,
* `field`: The index column where the labels are stored.

#### LabelsMenu

The [`LabelsMenu` component]({{site.baseurl}}components/components/LabelsMenu.html) is used to display dropdown menu
that manages public and private labels.

You can see this menu either on the navigation bar or when selecting one or more documents in the results page.

![Labels menu in navigation bar]({{site.baseurl}}assets/modules/labels/labels-navbar-menu.png)
{: .d-block .mx-auto }
*Labels menu in navigation bar*
{: .text-center }

![Labels menu for selected documents]({{site.baseurl}}assets/modules/labels/labels-menu-for-selected-documents.png)
{: .d-block .mx-auto }
*Labels menu for selected documents*
{: .text-center }

The inputs of the component are:

* `results`: The current search results,
* `icon`: The menu icon,
* `autoAdjust`: Whether the component will adjust its display when the application is resized,
* `autoAdjustBreakpoint`: The threshold of the application size at which the display of the component changes,
* `collapseBreakpoint`: The threshold of the application size at which the display of the component changes when it is inside a parent menu,
* `size`: The display size of the component,

### LabelsAutocomplete directive

The [`LabelsAutocomplete`]({{site.baseurl}}components/directives/LabelsAutocomplete.html) provides
the `sqAutocompleteLabels` directive that when put to an input component, suggests user the existing labels as they type.
This is very useful because the components that display labels like `Labels` and `LabelsMenu` do not show all the available
labels.

Example:

```html
<input type="text" class="sq-label-input"
    name="newLabel" [(ngModel)]="newLabelRef.value"
    autocomplete="off" spellcheck="off"
    sqAutocompleteLabels [public]="public" >
```

### LabelPipe

Private labels are encoded before being stored in index columns.
The [`LabelPipe`]({{site.baseurl}}components/pipes/LabelPipe.html) (`sqLabel`) is introduced to help you with displaying
the labels assigned to a document without worrying about the decoding procedure and eventually, formatting the value.

Example:
{% raw %}

```html
<span>Private label: </span><span style="color: red;">{{privateLabel | sqLabel:false}}</span>
<span>Public label: </span><span style="color: red;">{{publicLabel | sqLabel:true}}</span>
```

{% endraw %}

With a document whose private label is `'My private label'` and `'My public label'`, the example yields

<span>Private label: </span><span style="color: red;">My private label</span>
<span>Public label: </span><span style="color: red;">My public label</span>
