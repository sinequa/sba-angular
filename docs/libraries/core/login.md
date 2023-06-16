---
layout: default
title: Login Module
parent: Core
grand_parent: Libraries
nav_order: 3
---

# Login Module

## Overview

This module manages user authentication and the overall login process. User login is initiated automatically when a web service call fails with
an `HTTP 401 unauthorized` error. This error is intercepted by an Angular `HttpInterceptor` which calls the `LoginService.getCredentials` method.
This method will either request user credentials by opening a login modal dialog or, if configured using `StartConfig.autoOAuthProvider` or
`StartConfig.autoSAMLProvider`, will initiate an OAuth or SAML authentication. In the case of a manual login via the modal dialog the original
request will be resubmitted with the entered credentials. For OAuth and SAML the browser will redirect to the authentication provider and back again
to the app. If Windows Authentication (Kerberos/NTLM) is being used then authentication will be handled at a lower level - the `HTTP 401` errors
shouldn't reach the application.

There is a default login modal dialog provided in this module but this can be replaced with a UI framework specific modal using the
`LoginModule.forRoot` static method to import the `LoginModule` in the app module:

```ts
import { BsLogin } from '@sinequa/components/modal';
...
@NgModule({
    imports: [
        ...
        LoginModule.forRoot(BsLogin),
    ]
})
```

## Working with components

The login status is maintain in the `LoginService`. Typically, the top level route components in your application that communicate with the
Sinequa platform should work with the `LoginService` to ensure that the user is logged in each time the component is instantiated and to
handle the rendering of the component according to the current login status.

Ensure that the user is logged in at component instantiation like this:

```ts
ngAfterViewInit() {
    this.loginService.login();
}
```

The `login` method of the `LoginService` makes calls to `AppService.init`, `PrincipalWebService.load` and `UserSettingsWebService.load`. A
login is successful if all three of these calls are successful. The `LoginService` maintains a boolean `complete` property that indicates the
current login status. It also emits session events when the login status changes: `session-start` (login), `session-end` (logout) and
`session-changed` (`complete` state changes).

A helper class, `ComponentWithLogin`, is provided which formalizes a way to interact with the `LoginService`. This class implements `ngAfterViewInit`
to call `this.loginService.login` and also listens to the `LoginService` events to maintain a `loginComplete` property and calls a virtual method
`onLoginComplete` each time the login status changes. An example follows:

```ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { ComponentWithLogin, LoginService } from '@sinequa/core/login';

@Component({
    selector: 'my-component',
    template: `
        <div *ngIf="loginComplete; then loginCompleteBlock else loginNotCompleteBlock"></div>
        <ng-template #loginCompleteBlock>User is logged in</ng-template>
        <ng-template #loginNotCompleteBlock>User is NOT logged in</ng-template>
    `
})
export class MyComponent extends ComponentWithLogin {
    constructor(
        loginService: LoginService,
        changeDetectorRef: ChangeDetectorRef) {
        super(loginService, changeDetectorRef);
    }
}
```
