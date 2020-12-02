---
layout: default
title: Advanced Module
parent: Components
grand_parent: Modules
nav_order: 7
---

# Advanced Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsAdvancedModule.html) auto-generated from source code.

## Features
This module provides a bench of advanced-search functionalities, as well as components to build custom advanced-search forms:

- [`AdvancedService`]({{site.baseurl}}components/injectables/AdvancedService.html): manages the different operations that can be used to perform an advanced-search in Sinequa.
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

The [`AdvancedService`]({{site.baseurl}}components/injectables/AdvancedService.html) exposes a variety of methods and interfaces.

If you want to create your own advanced-search form, you will need to define a list of [FormControl](https://angular.io/api/forms/FormControl). Here, a set of dedicated methods is provided :

- `createSelectControl(config: AdvancedSelect, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard select. The config parameter needs to implement `AdvancedSelect` interface.

- `createInputControl(config: AdvancedInput, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard input. The config parameter needs to implement `AdvancedInput` interface.

- `createCheckboxControl(config: AdvancedCheckbox, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a standard checkbox. The config parameter needs to implement `AdvancedCheckbox` interface.

- `createMultiInputControl(config: AdvancedInput, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to an input supporting multi values. The config parameter needs to implement `AdvancedInput` interface.

- `createRangeControl(config: AdvancedRange, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a FormControl dedicated to a custom element supporting a **range** definition (a coupled elements used as **from .. to** ). The config parameter needs to implement `AdvancedRange` interface.

All above methods invokes the generic helper :

- `createControl(config: BasicAdvancedConfig, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl`

    This method creates a generic FormControl. As you can notice, a config parameter needs to implement / extend the `BasicAdvancedConfig` interface :

    ```typescript
    {
        type: string;
        field: string;
        label: string;
        name: string;
    }
    ```

### Form Validation

The `AdvancedService` also enhance the FormControl creation experience with some packaged **Validators** which can be optionally passed to each one of the above methods. 

Those validators are accessible via the **readonly** attribute `advancedFormValidators` implementing `AdvancedFormValidators` interface :

```typescript
{
    min: (
        min: string | number | Date,
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    max: (
        max: string | number | Date,
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    number: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    date: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    range: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
}
```
 
### Extras

Actually, each created FormControl is not useful unless it is able to perform some related advanced-search lifecycle actions. For this, `AdvancedService` comes with several methods :

- `getAdvancedValue(config: BasicAdvancedConfig | AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox, query?: Query | undefined): AdvancedValue`

    This method retrieves the value to be set to a specific FormControl from the search query.

- `setAdvancedValue(value: AdvancedValue, config: BasicAdvancedConfig | AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox, query?: Query | undefined): AdvancedValue`

    This method updates the search query with a specific FormControl value.

- `removeAdvancedValue(field: string, query?: Query | undefined, searchable: boolean): void`

    This method removes a specific advanced value by its field name from a given query and then can trigger a new search event.

- `resetAdvancedValues(query?: Query | undefined, searchable: boolean): void`

    This method removes all advanced values from a given query and then can trigger a new search event.

- `getAdvancedValues(query?: Query | undefined): Object`

    This method returns an object containing all the filled (field, value) in the advanced-search form.

Other helpers methods are provided within `AdvancedService` to facilitate custom manipulations of advanced-search feature :

- `makeRangeExpr(field: string, from: AdvancedValue, to: AdvancedValue): string | undefined`

    This method returns a string expression of a range, used in a query select.

- `makeExpr(field: string, value: AdvancedValue | AdvancedValueWithOperator): string | undefined`

    This method returns a general string expression used in a query select.

- `formatAdvancedValue(value: AdvancedValue, config: BasicAdvancedConfig | AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox): AdvancedValue`

    This method formats a given advanced value according to its column definition.

- `castAdvancedValue(value: any, column: CCColumn | undefined): any`

    This method cast a given advanced value as per its column definition.

- `ensureAdvancedValue(value: AdvancedValue, config: BasicAdvancedConfig | AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox): AdvancedValue`

    This method makes type checking of a given advanced value against its column definition.

If you want create a new custom component for your advanced-search form, you can, for sure, do it and still be able to benefit of all built-in methods. You should just make sure that you always implement / extend the `BasicAdvancedConfig` configuration.

## Components

The `AdvancedModule` has a set of packaged components which serve as a basic bricks of an advanced-search form :

- The [`BsAdvancedFormSelect` component]({{site.baseurl}}components/components/BsAdvancedFormSelect.html) is used to display a select element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `config`: The configuration of this element and it is of type `AdvancedSelect`.

- The [`BsAdvancedFormInput` component]({{site.baseurl}}components/components/BsAdvancedFormInput.html) is used to display an input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `config`: The configuration of this element and it is of type `AdvancedInput`.
   - `autocompleteEnabled`: Whether the autocomplete is needed for users.
   - `suggestQuery`: The string value of the suggest query to be used for the autocomplete.

- The [`BsAdvancedFormMultiInput` component]({{site.baseurl}}components/components/BsAdvancedFormMultiInput.html) is used to display a multi-value input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `config`: The configuration of this element and it is of type `AdvancedInput`.
   - `autocompleteEnabled`: Whether the autocomplete is needed for users.
   - `suggestQuery`: The string value of the suggest query to be used for the autocomplete.

- The [`BsAdvancedFormRange` component]({{site.baseurl}}components/components/BsAdvancedFormRange.html) is used to display a range input element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `config`: The configuration of this element and it is of type `AdvancedRange`.
   - `autocompleteEnabled`: Whether the autocomplete is needed for users.
   - `suggestQuery`: The string value of the suggest query to be used for the autocomplete.

- The [`BsAdvancedFormCheckbox` component]({{site.baseurl}}components/components/BsAdvancedFormCheckbox.html) is used to display a checkbox element compatible with any advanced-search form.

  The inputs of the component are :

   - `form`: The advanced-search form.
   - `config`: The configuration of this element and it is of type `AdvancedCheckbox`.

## Directives

The `AdvancedModule` embeds its own directives to handle custom features of the advanced-search :

- The [`BsAdvancedFormAutocomplete`]({{site.baseurl}}components/directives/BsAdvancedFormAutocomplete.html) provides the `sqAdvancedFormAutocomplete` directive. It extends and overrides the main [`sqAutocomplete`]({{site.baseurl}}components/directives/Autocomplete.html) directive.

  The inputs of the directive are quiet simple :

   - `config`: The configuration of this element to which `sqAdvancedFormAutocomplete` is being applied.

- The [`BsAdvancedFormAutocompleteMultiInput`]({{site.baseurl}}components/directives/BsAdvancedFormAutocomplete.html) provides the `sqAdvancedFormAutocompleteMultiInput` directive. It extends and overrides [`sqAdvancedFormAutocomplete`]({{site.baseurl}}components/directives/BsAdvancedFormAutocomplete.html) directive.

  The inputs of the directive are :

   - `items`: Initial list of search terms already existing in the advanced search.

  This directive also emits an `itemsUpdate` event which is needed to synchronize the search terms in the parent component.

- The [`BsAdvancedFormValidation`]({{site.baseurl}}components/directives/BsAdvancedFormValidation.html) provides the `sqAdvancedFormValidation` directive. It extends and overrides the main [`sqValidation`]({{site.baseurl}}components/directives/ValidationDirective.html) directive.

  The inputs of the directive are :

   - `config`: The configuration of this element to which `sqAdvancedFormValidation` is being applied.
   - `validationForm`: The advanced-search form.

## Sample use case

A working example has been built on top of the above bricks and packaged within **vanilla-search** app.
In this section, we will go through the main keys of how to easily instantiate an advanced-search form : 

1. First of all, we need to declare the global configuration of our advanced-form. It is in the `advanced-search-form.config.ts` where it sits. Here, the configuration is a 
```typescript
  Map<string, BasicAdvancedConfig | AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox>
```
You should **carefully** note that the **key** of each item in that Map is exactly the **same as** its **name** property.

2. Second step is to build the form according to the configuration we set above. This is done via `_instantiateAdvancedForm()` in the `search-form.component.ts`. The main idea is to add each FormControl to the form object. Here, you can easily apply validators as much as you want : 
```typescript
  this.form.addControl(
    "modified",
    this.advancedService.createRangeControl(
      advancedSearchFormConfig.get("modified") as AdvancedRange,
      [
        this.advancedService.advancedFormValidators.range(
          advancedSearchFormConfig.get("modified") as AdvancedRange
        ),
        this.advancedService.advancedFormValidators.date(
          advancedSearchFormConfig.get("modified") as AdvancedRange
        ),
      ]
    )
  );
```
  In this example, we add a FormControl named **modified** and to which we apply 2 validators; **range()** and **date()**.
  You can also note that the build process of the form is set in the callback of `this.firstPageService.getFirstPage()`. Its role is to load autocompletion suggestions and whatever data needed in the initialization of advanced-search components.

3. Next step is to mutually update of the **form** and the **query** according to users interactions. Thus, the `updateFormValues()` and `updateQuery()` of the `search-form.component.ts` are used to do so.

4. The final step is to design the look & feel of your advanced-search form as you want.

The example built in the packaged sample looks like this :

![Labels]({{site.baseurl}}assets/modules/advanced/advanced-search.png){: .d-block .mx-auto }
