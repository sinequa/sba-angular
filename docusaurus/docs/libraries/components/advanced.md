---
layout: default
title: Advanced Module
parent: Components
grand_parent: Libraries
sidebar_position: 13
---

# Advanced Module

## Features
This module provides a bench of advanced-search functionalities, as well as components to build custom advanced-search forms:

- `AdvancedService`: manages the different operations that can be used to perform an advanced-search in Sinequa.
- A list of components seen as basic bricks to build a custom advanced-search form . These components are styled with the Bootstrap library, and their class names start with `Bs`.

## Import

```typescript
import { BsAdvancedModule } from '@sinequa/components/advanced';

@NgModule({
  imports: [
      /*....*/
      BsAdvancedModule,
      /*....*/
  ],
  /*....*/
})
```
This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enAdvanced} from "@sinequa/components/advanced";

const messages = Utils.merge({}, ..., enAdvanced, appMessages);
```
## Advanced Service

The `AdvancedService` exposes a variety of methods and interfaces.

If you want to create your own advanced-search form, you will need to define a list of [FormControl](https://angular.io/api/forms/FormControl). Here, a set of dedicated methods is provided :

- `createSelectControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard select. Behind the scenes, this method uses **getValue(...)** to initialize the value of the returned FormControl.

- `createInputControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard input. Behind the scenes, this method uses **getValue(...)** to initialize the value of the returned FormControl.

- `createCheckboxControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard checkbox. Behind the scenes, this method uses **getBooleanValue(...)** to initialize the value of the returned FormControl.

- `createMultiInputControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to an input supporting multi values. Behind the scenes, this method uses **getValue(...)** to initialize the value of the returned FormControl.

- `createRangeControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a custom element supporting a **range** definition (a coupled elements used as **from .. to** ). Behind the scenes, this method uses **getRangeValue(...)** to initialize the value of the returned FormControl.

Notice that the field parameter represents the **column / alias** to which we are applying our filter.

All above methods invokes the generic helper :

- `createControl(value: AdvancedValue | ValueItem | ValueItem[], validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a generic FormControl.

### Form Validation

The `AdvancedService` also enhance the FormControl creation experience with some packaged **Validators** which can be optionally passed to each one of the above methods.

Those validators are accessible via the **readonly** attribute `advancedFormValidators` implementing `AdvancedFormValidators` interface :

```typescript
{
    min: (min: string | number | Date, field: string) => ValidatorFn;
    max: (max: string | number | Date, field: string) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (field: string) => ValidatorFn;
    number: (field: string) => ValidatorFn;
    date: (field: string) => ValidatorFn;
    range: (field: string) => ValidatorFn;
}
```

### Extras

Actually, each created FormControl is not useful unless it is able to perform some related advanced-search lifecycle actions. For this, `AdvancedService` comes with several methods :

- `getValue(field: string, query?: Query | undefined): ValueItem | ValueItem[] | undefined`

    This method retrieves the value to be set to a specific FormControl (select, input, multi-input ...) from the query.

- `getBooleanValue(field: string, query?: Query | undefined): boolean | undefined`

    This method retrieves the value to be set to a specific FormControl (checkbox ...) from the query.

- `getRangeValue(field: string, query?: Query | undefined): AdvancedValue`

    This method retrieves the value to be set to a specific FormControl (range ...) from the query.

- `getAdvancedExpr(field: string, query?: Query | undefined): Expr | undefined`

    This method returns the expression of an advanced filter from the query.

- `getValueFromExpr(expr: Expr): ValueItem | ValueItem[]`

    This method extracts the value from the expression.

- `setSelect(field: string, value: ValueItem | ValueItem[] | undefined, query?: Query | undefined, combineWithAnd?: boolean): void`

    This method updates the query with a value of a specific FormControl (select, input, multi-input ...).

- `setBooleanSelect(field: string, value: boolean | undefined, allowFalsy?: boolean, query?: Query | undefined): void`

    This method updates the query with a value of a specific FormControl (checkbox ...).

- `setNumericalSelect(field: string, value: string | Date | number | ValueItem | undefined, operator: ">" | ">=" | "<" | "<=" | "=" | "<>", query?: Query | undefined): void`

    This method updates the query with a value of a specific FormControl (numeric-input ...).

- `setRangeSelect(field: string, range: (string | Date | number)[] | undefined, query?: Query | undefined): void`

    This method updates the query with a value of a specific FormControl (range ...).
- `setAdvancedSelect(field: string, expr: string | undefined, query?: Query | undefined): void`

    This is the helper method which update the select attribute of the query. If no expression provided, the filter of the corresponding field will be entirely removed.

- `removeAdvancedValue(field: string, search: boolean, query?: Query | undefined): void`

    This method removes a specific advanced value by its field name from a given query and then can trigger a new search event.

- `resetAdvancedValues(search: boolean, query?: Query | undefined): void`

    This method removes all advanced values from a given query and then can trigger a new search event.

- `getAdvancedValues(query?: Query | undefined): Object`

    This method returns an object containing all the filled (field, value) in the advanced-search form.

All above methods use the parameter **query** as optional. If it is not provided, **searchService.query** will be used by default.


Other helpers methods are provided within `AdvancedService` to facilitate custom manipulations of advanced-search feature :

- `asValueItems(value: ValueItem | ValueItem[], field: string): ValueItem[]`

    This method transforms a given value to a parsed ValueItem[].

- `formatValueItems(field: string, value: ValueItem | ValueItem[]): ValueItem | ValueItem[]`

    This method returns a formatted copy of the given value.

- `formatAdvancedValue(field: string, value: AdvancedValue): AdvancedValue`

    This method returns a formatted copy of the given value.

- `castAdvancedValue(value: BaseAdvancedValue, column: CCColumn | undefined): BaseAdvancedValue`

    This method cast a given advanced value as per its column definition.

If you want create a new custom component for your advanced-search form, you can, for sure, do it and still be able to benefit of all built-in methods.

## Components

The `AdvancedModule` has a set of packaged components which serve as a basic bricks of an advanced-search form :

- The `BsAdvancedFormSelect` component is used to display a select element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `field`: The column / alias of the applied filter.
   - `label`: Optional input used to override the default label in the column definition.
   - `multiple`: Whether the multiple selection is allowed or not.
   - `aggregation`: Optional input that defines the aggregation name used to fill the select options.

<doc-advanced-form-select></doc-advanced-form-select>

- The `BsAdvancedFormInput` component is used to display an input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `field`: The column / alias of the applied filter.
   - `label`: Optional input used to override the default label in the column definition.
   - `suggestQuery`: The string value of the suggest query to be used for the autocomplete.

<doc-advanced-form-input></doc-advanced-form-input>

- The `BsAdvancedFormMultiInput` component is used to display a multi-value input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `field`: The column / alias of the applied filter.
   - `label`: Optional input used to override the default label in the column definition.
   - `suggestQuery`: The string value of the suggest query to be used for the autocomplete.

<doc-advanced-form-multi-input></doc-advanced-form-multi-input>

- The `BsAdvancedFormRange` component is used to display a range input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `field`: The column / alias of the applied filter.
   - `label`: Optional input used to override the default label in the column definition.
   - `min`: The lowest possible limit.
   - `max`: The highest possible limit.

<doc-advanced-form-range></doc-advanced-form-range>

- The `BsAdvancedFormCheckbox` component is used to display a checkbox element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `field`: The column / alias of the applied filter.
   - `label`: Optional input used to override the default label in the column definition.

<doc-advanced-form-checkbox></doc-advanced-form-checkbox>

## Directives

The `AdvancedModule` embeds its own directives to handle custom features of the advanced-search :

- The `BsAdvancedFormAutocomplete` provides the `sqAdvancedFormAutocomplete` directive. It extends and overrides the main `sqAutocomplete` directive.

  The inputs of the directive are quiet simple :

   - `field`: The column / alias of the applied filter.

   This directive also emits an `UpdateItem` event which is needed to synchronize the search item in the parent component.

- The `BsAdvancedFormAutocompleteMultiInput` provides the `sqAdvancedFormAutocompleteMultiInput` directive. It extends and overrides `sqAdvancedFormAutocomplete` directive.

  The inputs of the directive are :

   - `items`: Initial list of search terms already existing in the advanced search.

  This directive also emits an `itemsUpdate` event which is needed to synchronize the search terms in the parent component.

- The `BsAdvancedFormValidation` provides the `sqAdvancedFormValidation` directive. It extends and overrides the main `sqValidation` directive.

  The inputs of the directive are :

   - `field`: The column / alias of the applied filter.
   - `validationForm`: The advanced-search form.

## Sample use case

A working example could be the integration of an *advanced search form* in the search form used in [Pepper application](../../apps/3-pepper.md#integrated-search-form).

In this section, we will go through the main keys of how to easily instantiate an advanced search form :

1. First of all, we need to build the form. The best practice is to create a new component containing all the business logic. 

<doc-advanced-form></doc-advanced-form>

The main idea is to start by adding your controls to the form object. Here, you can easily apply validators as much as you want :
```typescript
  this.form.addControl('treepath', this.advancedService.createSelectControl('treepath'));
  this.form.addControl('modified', this.advancedService.createRangeControl('modified',
    [
      this.advancedService.validators.range('modified'),
      this.advancedService.validators.date('modified')
    ]
  ));
  this.form.addControl('person', this.advancedService.createMultiInputControl('person'));
  this.form.addControl('docformat', this.advancedService.createInputControl('docformat'));
```
  In this example, we add several FormControl such as **modified**, to which we apply 2 validators; **range()** and **date()**.
  You can also note that the build process of the form is set in the callback of `this.firstPageService.getFirstPage()`. Its role is to load autocompletion suggestions and whatever data needed in the initialization of advanced-search components.
  You should **carefully** notice that the **name** of each formControl is exactly the **same as** its **field** property.

2. Next step is to mutually update of the **form** and the **query** according to users interactions. This is the role of both methods `updateFormOnQueryChange()` and `updateQuery()`.

3. Then, feel free to design the look & feel of your advanced search form as you want.

4. Once the component is ready, you can integrate it in the search form :

```html
<sq-search-form #searchForm
  [query]="searchService.query"
  [showFilterCount]="true"
  [autoSubmit]="false">

  <ng-template let-query>

    <div class="search-dropdown border-top m-2">

        ...

        <hr/>

        <div class="small fw-bold mb-1 ms-3 me-auto">Advanced Search Form:</div>
        <!-- The new advanced search form you have just created ! -->
        <sq-advanced-form
            [query]="query"
            (filterEdit)="onFiltersChange()">
        </sq-advanced-form>

        ...

    </div>

  </ng-template>

</sq-search-form>
```
