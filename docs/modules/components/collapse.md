---
layout: default
title: Collapse Module
parent: Components
grand_parent: Modules
nav_order: 13
---

# Collapse Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/CollapseModule.html) auto-generated from source code.

## Features

This module provides components to add collapsible panels to your components as well as collapse/expand buttons to trigger this effect.

One of the usages of this module is the collapse/expand functionality of the facets (with `collapsible = true`).

![Collapse functionality in facet]({{site.baseurl}}assets/modules/collapse/collapse-facet-example.png){: .d-block .mx-auto }
*Collapse functionality in facet*
{: .text-center }

## Import

Add [`CollapseModule`]({{site.baseurl}}components/modules/CollapseModule.html) to your Angular imports in `app.module.ts`:

```ts
import { CollapseModule } from "@sinequa/components/collapse";
/*....*/

@NgModule({
    imports: [
        /*....*/
        CollapseModule,
        /*....*/
    ],
    /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enCollapse} from "@sinequa/components/collapse";

const messages = Utils.merge({}, ..., enCollapse, appMessages);
```

## API usage

The [`sq-collapse`]({{site.baseurl}}components/components/Collapse.html) component can be used in Angular templates to create collapsible panels.

Wrap the collapsible content into `<sq-collapse>` and `<ng-template>` elements (meaning the content will be instantiated only once displayed).

Example 1: A collapsible list of element in the HTML template

```ts
{% raw %}@Component({
    /*...*/
    template: `
        <button type="button" onclick="collapsed = !collapsed">{{ collapsed ? 'Expand' : 'Collapse' }}</button>

        <sq-collapse [collapsed]="collapsed">
            <ng-template>
                <ul>
                    <li *ngFor="let element of list">
                        <span>{{ element }}</span>
                    </li>
                </ul>
            </ng-template>
        </sq-collapse>
    `,
    /*...*/
})
export class MyComponent {

    /*...*/
    public collapsed: boolean = true;
    public list: string[] = [
        'element 1',
        'element 2',
        'element 3',
    ];
    /*...*/
}{% endraw %}
```

The [`Collapse`]({{site.baseurl}}components/components/Collapse.html) component only expects a `boolean` property `collapsed`, which instructs it whether to show the collapsible content or not.

You can manage the variable/property that is used as input of this property as you like.
You can change it using an HTML button like in the above example or with any other HTML components.

`@sinequa/components/collapse` also includes two syntactic sugar components - [`sq-collapse-button`]({{site.baseurl}}components/components/CollapseButton.html) and [`sq-collapse-link`]({{site.baseurl}}components/components/CollapseLink.html) - to help you quickly create input components to toggle the `collapsed` property. By default, these components display a chevron icon (as in the image above), but the icon and text can be customized via the `icon` and `text` inputs respectively.

Example 2: Usage of the [`sq-collapse-button`]({{site.baseurl}}components/components/CollapseButton.html)

```html
{% raw %}<a href="#" (click)="collapsed = !collapsed">
    <sq-collapse-button [collapsed]="collapsed" [text]="collapsed ? 'Expand' : 'Collapse'"></sq-collapse-button>
</a>

<sq-collapse [collapsed]="collapsed">
    <ng-template>
        <ul>
            <li *ngFor="let element of list">
                <span>{{ element }}</span>
            </li>
        </ul>
    </ng-template>
</sq-collapse>{% endraw %}
```
