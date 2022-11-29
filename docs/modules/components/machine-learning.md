---
layout: default
title: Machine Learning Module
parent: Components
grand_parent: Modules
nav_order: 20
---

# Machine Learning Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/MLModule.html) auto-generated from source code.

## Features

This module introduces the Neural Search components displaying Answers and Passages extracted from the documents according to your search.

## Prerequisites

The SBA framework requires some configuration on the Sinequa server in order to have access to Neural Search features. Note that it comes within the usual query API and not an additional one, so there is nothing to change there.

On the server, your application needs to be linked to a query web service with Neural Search enabled. To do so, you need to have an index with `Neural Search configuration` set, you can then link a query web service to this index and enable Neural Search in the `Search Settings` tab, you then can use it for your SBA application's query.

## Import

```typescript
import { MLModule } from '@sinequa/components/machine-learning';

@NgModule({
  imports: [
      /*....*/
      MLModule,
      /*....*/
  ],
  /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enML} from "@sinequa/components/machine-learning";

const messages = Utils.merge({}, ..., enML, appMessages);
```

## API usage

This module exports the [`AnswerCardComponent`]({{site.baseurl}}components/components/AnswerCardComponent.html), [`TopPassagesComponent`]({{site.baseurl}}components/components/TopPassagesComponent.html) and [`PassageListComponent`]({{site.baseurl}}components/components/PassageListComponent.html) components that are responsible for displaying the Neural Search data from your query.

### Answer Component

The answers are the possible direct answers the platform supposes from your query according to the documents it searches through.

**Required parameters:**

* `results`: The query's results which includes all the necessary data to display the answers

**Optional parameters:**

* `collapsed` (default: `false`): Whether the components starts collapsed
* `showLikeButtons` (default: `false`): Whether the Like/Dislike buttons should be shown

### Top Passages Component

Similar as the Answer component, the Top Passages one displays the relevant passages that Neural Search has figured from your query according to your documents.

**Required parameters:**

* `results`: The query's results which includes all the necessary data to display the passages

**Optional parameters:**

* `collapsed` (default: `false`): Whether the components starts collapsed
* `itemsPerPage` (default: `3`): The number of passages to show per page. It can be 1 as for Answer or many at once
* `lineNumber` (default: `3`): The number of lines to display per passages on collapsed state, they can be expanded afterwards

### Passage List

The passages list is used to display all of the relevant passages from the selected document in a collapsed number of lines that you can expand manually.

It is placed in the mini preview where you can switch of view between the document preview and the passages list when some are found.

**Required parameters:**

* `record`: The selected document from the results list

**Optional parameters:**

* `maxPassages`: The maximum number of passages to show from the passages list of the document
* `passageId`: The id from a passage to make it expanded automatically