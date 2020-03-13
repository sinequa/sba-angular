---
layout: default
title: Custom entities
parent: Tips and Tricks
nav_order: 3
---

# Custom entities

Entities work just like [metadata](metadata.html), with additional characteristics:
- Entities are extracted from text, we would like to highlight them in the HTML preview.
- Entities normally have a display form ("Président") and a normalized form ("PRESIDENT"):

    ![Entities]({{site.baseurl}}assets/tipstricks/entities.png){: .d-block .mx-auto }

We will assume a new entity was extracted and stored in a column of the index (via a whitelist, TMA, or any other mean).

## Back-end configuration

As in the [previous chapter](metadata.html#back-end-configuration), you can configure an *alias* and an *aggregation* for your custom entity.

Additionally, you need to configure your *Preview web service* to highlight this new entity. This is done via the administration in *Search-Based Applications > Web Services > Your preview configuration*. Add your entity in *Highlights to display*:

![List of highlights]({{site.baseurl}}assets/tipstricks/highlights.png){: .d-block .mx-auto }

You also need to define a *.css file name*. By default it should be `preview.css`, although you can name it differently and/or use an absolute URL.

## Highlighting entities

If you open a document's HTML preview, your entity should not appear as highlighted (yet). You need to add some CSS rules, so that the entities marked with HTML tags are highlighted (eg. `<span class="person">Barack Obama</span>`).

Your app needs to generate a `preview.css` (as mentioned above) with these types of rules. If you use [Vanilla-Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), it already contains such a file ready to be customized. If you are starting from scratch, you can create a new `styles/preview.scss` file. In order to build it, you need to customize your `angular.json` file. For your app, instead of:

```json
"styles": [
    "projects/your-app/src/styles/app.scss"
],
```

Write the following (to make sure the preview.scss gets built as its own preview.css file):

```json
"extractCss": true,
"styles": [
    {
        "input": "projects/your-app/src/styles/app.scss",
        "bundleName": "app"
    },
    {
        "input": "projects/your-app/src/styles/preview.scss",
        "bundleName": "preview",
        "lazy": true
    }            
],
```

You can write any type of CSS rules in this file. It will be loaded in your HTML preview (which itself is wrapped in an iframe).

If you use [Vanilla-Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), the `preview.scss` file already contain default rules, which you can feel free to edit. You can also add rules in `styles/metadata.scss` (which is imported by `preview.scss`). For example, to add a color and background color to your entity, you may write the following:

```scss
$metadata : (
    ...
    your-entity-alias: (
        main-color: #FF7675,
        background-color: #FF7675,
        color: black
    ),   
```

## Troubleshooting

If you followed the above steps but cannot see highlights in the preview, consider the following failure cases:
- Entities might not be indexed properly: In the inspector, look at the content of a record, and check whether it contains your entity:

![Entity]({{site.baseurl}}assets/tipstricks/entity-values.png){: .d-block .mx-auto }

- Entities might not be highlighted by the preview web service: In the inspector, inspect the HTML preview to check whether your entities are properly surrounded by `<span>` tags:

![Entity]({{site.baseurl}}assets/tipstricks/entity.png){: .d-block .mx-auto }

- Your `preview.css` might not be loaded in the HTML preview: In the inspector, look for the CSS file.

![Preview CSS]({{site.baseurl}}assets/tipstricks/preview-network.png){: .d-block .mx-auto }

- Your CSS rules might be incorrect or overriden: Make sure that the `<span>` tags are properly targetted by the rules.

![Preview CSS]({{site.baseurl}}assets/tipstricks/preview-css.png){: .d-block .mx-auto }
