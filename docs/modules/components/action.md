---
layout: default
title: Action Module
parent: Components
grand_parent: Modules
nav_order: 7
---

# Action Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}/components/modules/BsActionModule.html) auto-generated from source code.

## Features

This module provides the classes and directives to create menus and menu actions.
For example, all the menus in the navigation bar of Vanilla search are implemented using menu and action objects.

![User menu]({{site.baseurl}}assets/modules/action/action-menus-on-navbar.png)
*User menu in navigation bar*
{: .text-center }

## Import

Add `import { BsActionModule } from '@sinequa/components/action';` into your `app.module.ts`.

## API usage

The most important declaration of this module is the `Action` class.

### Action class ([reference documentation]({{site.baseurl}}/components/classes/Action.html))

The `Action` class represents an element in a dropdown menu, take for example the User menu in the above screenshot,
the button with the user icon and the two elements of the dropdown are `Action` object.

An `Action` can have zero or some children, the latter represents a dropdown menu whereas the former an action in a menu.

#### How to create a menu action

An menu action needs two things to properly works:

1. A text / display name of the action,
2. The action to perform.

Example 1: A simple menu action that performs the logout procedure

```typescript
const logoutAction = new Action({
    text: "msg#userMenu.logout",    // The text to display on the action button
    title: "msg#userMenu.logout",   // The tooltip of the action
    action: () => doLogout()        // The logout procedure to execute when the action is clicked
});
```

You can add an icon to your action, either by specifying the property `icon` or `iconAfter`.
`icon` puts the icon before the action text, while `iconAfter` puts the icon at the end.

You can also control the when the action is display, or when it is enabled via `disabled`, `hidden` properties.
Note that, each time the visualisation of the action is to be updated, the `updater` property of the action is called.

Example 2: A menu action that is shown once a condition is satisfied

```typescript
const hiddenAction = new Action({
    text: "msg#action.name",    // The text to display on the action button
    title: "msg#action.tooltip",// The tooltip of the action
    hidden: true,
    action: () => doSomething(), // The logout procedure to execute when the action is clicked
    updater: (action: Action) => {
        action.hidden = someConditionToCheck;
    }
});
```

You can change the visualisation of the action after its creation, depending on the execution of your component

Example 3: A menu action whose text is changed depending on the value of an outside variable

```typescript
someCounter = 0;

const action = new Action({
    text: "msg#action.evenName",    // The text to display on the action button
    title: "msg#action.evenTooltip",// The tooltip of the action
    action: () => doSth(),
    updater: (item: Action) => {
        item.text = someCounter / 2 === 0 ? "msg#action.evenName" : "msg#action.oddName";
        item.title = someCounter / 2 === 0 ? "msg#action.evenTooltip" : "msg#action.oddTooltip";
    }
});

/*
 *Some functions that may change the value of someCounter
*/
```

#### How to create a dropdown menu

A dropdown menu is simply an `Action` object who has children but no action to execute (i.e. `action` property is `undefined`)

Take for example the dropdown menu to manage user alert in the navigation bar, the following code snippet shows
how it is defined in the navigation bar.

![Alert menu]({{site.baseurl}}assets/modules/action/action-alert-dropdown-menu.png)
*Alert menu in navigation bar*
{: .text-center }

Example 1: Alert dropdown menu in the navigation bar

```typescript

const alertsActions: Action[] = [];

const createAction = new Action({
    text: "msg#alerts.createAlert",
    title: "msg#alerts.createAlert",
    action: () => createAlert();
});

const manageAction = new Action({
    text: "msg#alerts.manageAlerts",
    title: "msg#alerts.manageAlerts",
    action: () => manageAlert();
});

alertsActions.push(createAction);
alertsActions.push(manageAction);

const alertMenu = new Action({
    icon: this.icon,
    text: "msg#alerts.alerts",
    children: alertsActions
});
```
