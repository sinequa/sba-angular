---
layout: default
title: Collapse Module
parent: Components
grand_parent: Modules
nav_order: 9
---

# Collapse Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}/components/modules/CollapseModule.html) auto-generated from source code.

## Features

This module provides components to add a collapse/expand button and collapsible parts of your components.

One of the usages of this module is the filter collapse/expend button of the facets.

![Collapse functionality in facet]({{site.baseurl}}/assets/modules/collapse/collapse-facet-example.png)
*Collapse functionality in facet*
{: .text-center }

## Import

Add `import { CollapseModule } from "@sinequa/components/collapse";` into your `app.module.ts`.

Include `CollapseModule` in Angular import declaration of `app.module.ts`.

```typescript
@NgModule({
    imports: [
        /*....*/
        CollapseModule,
        /*....*/
    ],
    /*....*/
})
```

## API usage

This module introduces the [Collapse component]({{site.baseurl}}/components/components/Collapse.html) that helps creating a collapsible section for your component.

This component provides the `sq-collapse` selector that wraps the part of your component in the HTML template.

Example 1: A collapsible list of element in the HTML template

```typescript
import { /*..., */Component } from "@angular/core";

@Component({
    /*...*/
    template: `
        <div class="myListHeader">
            <button type="button" onclick="toggleCollapse()">{{ buttonText }}</button>
        </div>
        <sq-collapse [collapsed]="collapsed">
            <ng-template>
                <span class="myList">
                    <li *ngFor="let element of list" class="myList_element">
                        <span>{{ element }}</span>
                    </li>
                </span>
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

    public get buttonText(): string {
        return this.collapsed ? 'collapse' : 'expand';
    }

    public toggleCollapse(): void {
        this.collapse = !this.collapse;
    }
    /*...*/
}
```

The `Collapse` component only expects a `boolean` property `collapsed`, which instructs it whether to show the collapsible content or not.

You can manage the variable/property that is used as input of this property as you like.
You can change it using an HTML button like in the above example or with any other HTML components.

`@sinequa\components` provides two syntactic sugar components - [CollapseButton component]({{site.baseurl}}/components/components/CollapseButton.html) and [CollapseLink component]({{site.baseurl}}/components/components/CollapseLink.html) - to help you radidly create input components to toggle the `collapsed` property.

Example 2: Usage of the `CollapseButton`

```html
<div class="myListHeader">
    <a href="#" (click)="toggleCollapse()">
        <sq-collapse-button class="collapseButton" [collapsed]="collapsed">
            {{ buttonText }}
        </sq-collapse-button>
    </a>
</div>
<sq-collapse [collapsed]="collapsed">
    <ng-template>
        <span class="myList">
            <li *ngFor="let element of list" class="myList_element">
                <span>{{ element }}</span>
            </li>
        </span>
    </ng-template>
</sq-collapse>
```
