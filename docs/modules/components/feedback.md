---
layout: default
title: Feedback Module
parent: Components
grand_parent: Modules
nav_order: 17
---

# Feedback Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsFeedbackModule.html) auto-generated from source code.

## Features

This module includes a single sample component which displays a menu letting a user send feedback to the administrator of the Sinequa server. This feedback is collected via the audit index and needs to be displayed in an **audit report**. ⚠️ No email is sent to anyone automatically.

![Feedback menu]({{site.baseurl}}assets/modules/feedback/menu.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`. Also import the Angular Google Maps module to include your Google Maps API key:

```ts
import { BsFeedbackModule } from '@sinequa/components/feedback';

@NgModule({
  imports: [
    ...
    BsFeedbackModule
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enFeedback} from "@sinequa/components/feedback";

const messages = Utils.merge({}, ..., enFeedback, appMessages);
```

## Feedback

The [`sq-feedback-menu`]({{site.baseurl}}components/components/BsFeedbackMenu.html) component can be displayed in an application with:

```html
<sq-feedback-menu></sq-feedback-menu>
```

It is possible to pass optional inputs to the component:

- `size` (`'sm'`, `'lg'` or leave `undefined`): controls the size of the action's button (will translate into the [Bootstrap classes](https://getbootstrap.com/docs/4.0/components/buttons/#sizes) `btn-sm` or `btm-lg`).
- `style` (`'light'`, `'dark'`, `'primary'`, etc.): controls the style of the action's button (will translate into the [Bootstrap classes](https://getbootstrap.com/docs/4.0/components/buttons/#examples) `btn-light`, `btn-primary`, etc.).
- `rightAligned` (default: `false`): controls the submenu alignment to the right or the left.

## Audit configuration

The component uses the Audit web service to record the user feedback. The audit record will contain the following information:

- Type of feedback: The default categories are `lang`, `content`, `ui` and `other`. The type is stored in the `message` column of the index.
- Comment from the user (stored in the column `detail`).
- Time of the comment (stored in the column `timestamp`).
- User id (stored in the column `timestamp`).

The comments can be displayed in an **audit report**, in various steps:

1. Define a query to fetch the user comments:

    ![Audit queries]({{site.baseurl}}assets/modules/feedback/audit-query.png){: .d-block .mx-auto }

2. Define a new section in the "Parameters":

    ![Audit parameters]({{site.baseurl}}assets/modules/feedback/audit-param.png){: .d-block .mx-auto }

3. The audit events are now visible in the audit report:

    ![Audit report]({{site.baseurl}}assets/modules/feedback/audit-report.png){: .d-block .mx-auto }
