---
layout: default
title: Search Form Component
parent: Components
grand_parent: Libraries
nav_order: 22
---

# Search Form Component

## Features

This standalone component offers an input with a dropdown and many options such as the voice recognition and a Neural Search toggle.

![Document metadata]({{site.baseurl}}assets/modules/search-form.png){: .d-block .mx-auto }
*Search Form Component in Vanilla Search*
{: .text-center }

## Import

```typescript
import { SearchFormComponent } from "@sinequa/components/search-form";

@NgModule({
  imports: [
      /*....*/
      SearchFormComponent,
      /*....*/
  ],
  /*....*/
})
```

This component is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enSearchForm} from "@sinequa/components/search-form";

const messages = Utils.merge({}, ..., enSearchForm, appMessages);
```

## API usage

The `SearchFormComponent` can be used with the `sq-search-form` selector which expects these inputs:

**Required parameters:**

* `query`: The search query.

**Optional parameters:**

* `searchRoute` (default: `search`): The route provided to the `SearchService` to navigate to after a search.
* `autoApply` (default: `true`): Whether a filter change is to be applied automatically.
* `autoSubmit` (default: `true`): Whether hitting enter performs a submit.
* `showFilterCount` (default: `false`): Whether the filters count should be displayed.
* `enableVoiceRecognition` (default: `true`): Whether the voice recognition button should be displayed (the service will also require to be available). When clicking on the linked button, it triggers the voice recognition.
* `enableNeuralSearch` (default: `true`): Whether the Neural Search button should be displayed (Neural Search should also be enabled in the query). When clicking on the linked button, it toggles Neural Search on or off for the performed search.
* `neuralSearchPref` (default: `neural-search`): The name of the Neural Search preference to fetch and update in `UserPreferences`.

The component also emits two events:

* `search`: When a search has been performed. It contains a boolean on whether the text has changed compared to the input query.
* `expanded`: When the dropdown is being expanded or collapsed. It returns in a boolean value whether it is expanded or not.

Additionally, the component also requires you to provide a template for the dropdown as displayed on the example just below, or in the [Autocomplete tutorial]({{site.baseurl}}tutorial/autocomplete.html).

## Example

<doc-search-form></doc-search-form>