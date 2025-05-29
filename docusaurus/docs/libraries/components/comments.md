---
layout: default
title: Comments Module
parent: Components
grand_parent: Libraries
sidebar_position: 15
---

# Comments Module

## Features

This module provides a component to display a thread of comments attached to a document.

![Comments](/assets/modules/comments/comments.png)


Users can post comments, replies and like other comments. The author of a comment (or an admin) has the possibility to edit and delete this comment. The component supports [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax, enabling users to format their posts without the need for a complex Wysiwyg editor.

## Import

⚠️ This component requires a web service deployed on the Sinequa server, that is NOT part of the Sinequa product. The web service is provided a plugin (See below). It is also required to create a custom index to store the comments, and to manage the lifecycle of this index.

Add `CommentsModule` to your Angular imports in `app.module.ts`:

```ts
import { CommentsModule } from "@sinequa/components/comments";
/*....*/

@NgModule({
    imports: [
        /*....*/
        CommentsModule,
        /*....*/
    ],
    /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enComments} from "@sinequa/components/comments";

const messages = Utils.merge({}, ..., enComments, appMessages);
```

This component has one important dependency: the [Marked](https://marked.js.org/) library needed to render the markdown-formatted comments as HTML.

## Comments component


The `sq-comments` component displays a list of comments and replies attached to a specific document. This component can be displayed anywere as long as a document id is provided.

The component requires one mandatory input: `docid` (string), the id of the document to which the thread of comments is attached.

```html
<sq-comments [docid]="record.id"></sq-comment>
```

The component uses a service (`CommentsWebService`) to retrieve the list of `Comment` objects from the server (as well as all the other actions: create, edit, delete and like comments).

## Server-side configuration

Comments are not yet part of the Sinequa product, so a plugin needs to be deployed on the Sinequa server for the component to work properly.

The code of the plugin is provided [here](https://github.com/sinequa/sba-angular/blob/master/projects/components/comments/sample-conf/CommentsWebService.cs). The file can be simply copied in a plugin under the `data/configuration/plugins` directory on the Sinequa server.

Additionally, a custom index must be created to store the comments. The schema of this index is provided [here](https://github.com/sinequa/sba-angular/blob/master/projects/components/comments/sample-conf/comments.xml). The XML can be copied in the `data/configuration/indexes`.
