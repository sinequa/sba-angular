---
layout: default
title: Routing
parent: Tutorial
nav_order: 9
---

# Routing

Typical Angular applications have multiple [routes](https://angular.io/guide/router). Routes allow to separate functionality into specific components that are served with specific URL schemes.

SBA are no expection. In a complex Entreprise Search app, we might have routes for:

- A home page
- A search page
- The document preview
- An "Expert Finder"
- Other Enterprise-specific applications
- etc.

In this tutorial, we are going to refactor our app to have 2 routes and 4 components:

- The **App** component is going to host our **router outlet**.
- The **Search** component is going to be equivalent to the current component we have at the moment.
- The **Home** component is going to be our home page.
- The **Search form** component (which displays the Search input and autocomplete) will be displayed on both the home page and the search page.

![Routing of the app]({{site.baseurl}}assets/tutorial/routing.png){: .d-block .mx-auto width="500px" }
*Our app will have four components and two routes*
{: .text-center }

## Creating the new components

In a terminal `cd` into `src/app/` and run the following commands:

    ng generate component home
    ng generate component search
    ng generate component search-form

(Use `npm run ng` if Angular CLI is not installed globally)

Note that Angular took care of add these new components to our `app.module.ts`.

## Refactoring

1. Open your `app.component.ts` and `app.component.html`, and migrate the content to `search.component.ts` and `search.component.html`, **except for the login and notifications management** (which we need to be on all routes). ⚠️ Be careful not to overwrite components class names and Angular selector with a copy-paste!

2. Add the `router-outlet` to `app.component.html`. You should have something like this (note that we positioned the notifications with `position: fixed` in the bottom right):

    ```html
    {% raw %}<router-outlet></router-outlet>

    <ng-container *ngIf="notificationsService.notificationsStream | async as notification">
        <div *ngIf="deleteNotification(notification)" class="notification position-fixed" style="bottom: 5px; right: 5px; width: 500px">
            <div *ngIf="notification.title" class="title">
                <span>{{notification.title | sqMessage}}</span>
                <hr>
            </div>
            <div>{{notification.text | sqMessage:{values: notification.params} }}</div>
        </div>
    </ng-container>{% endraw %}
    ```

3. In your `app.module.ts`, define two routes corresponding to our two new components:

    ```ts
    @NgModule({
        imports: [
            ...
            RouterModule.forRoot([
                {path: "home", component: HomeComponent},
                {path: "search", component: SearchComponent},
                {path: "**", redirectTo: "home"}
            ]),
    ```

    You should see:

    ![Home works]({{site.baseurl}}assets/tutorial/home-works.png){: .d-block .mx-auto }

4. Open your `search.component.html` and migrate all the `<form>` element to the `search-form.component.html`. Also migrate the associate dependencies and methods from the `search.component.ts` to the `search-form.component.ts` (that includes the `search()` and `clear()` methods as well as `form` initialization and the `searchService.queryStream` subscription in the constructor).

5. Insert the new search form in the `search.component.html`, where the `<form>` used to be:

    ```html
    ...
    </nav>
    <app-search-form></app-search-form>
    ```

6. Also insert the search form in your `home.component.html`, with a little formatting to make it look good:

    ```html
    <div class="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-5">Hello Search 🔍</h1>
        <app-search-form style="width: 500px;"></app-search-form>
    </div>
    ```

7. At this point, the search form should be correctly displayed on the home page, with the autocomplete working. But if you search for something, nothing happens...

    ![home page]({{site.baseurl}}assets/tutorial/home-page.png){: .d-block .mx-auto }

    The two next steps are going to fix this.

8. Modify the search form to navigate to the search route on a search:

    ```ts
    search() {
        ...
        this.searchService.searchText("/search");
    }
    ```

9. In your `app.module.ts` tell you Search module that `search` is a search route:

    ```ts
    BsSearchModule.forRoot({routes: ['search']}),
    ```

10. At this point, your app should work, but once on the Search component, it is impossible to come back to the Home component. Let's add a **router link** on the "Hello Search" Title:

    ```html
    <a [routerLink]="['/home']" class="mr-auto text-decoration-none">
        <h1>Hello Search 🔍</h1>
    </a>
    ```

## Adding new routes

The refactoring above is relatively complicated because we decided to add routes to a single-component app. More realistically, your app would have multiple routes from the start.

Adding new routes to an existing SBA is fairly simple:

- Create a new component (manually or with `ng generate component` as [above](#creating-the-new-components))
- Wire the component to your routes in your `app.module.ts`, as in **step 3**. above.
- Then create links from you existing routes to the new route:
  - Either via HTML, with a router link (as above in **step 10**)
  - Or programmatically, using `router.navigate()` (which is what the `SearchService` is doing in **step 8** above)
- If you want the `SearchService` to be active on your route (resolve search queries based on the URL), add the route to the list passed to the `BsSearchModule` (as in **step 9** above). Note that the `SearchService` does not have to be tied to routing. You can deactivate that by passing a `deactivateRouting: true` parameter to the service, via the `BsSearchModule.forRoot()` method.

---

Next: [Responsive Design](responsive-design.html)
{: style="float: right;" }

Previous: [User Settings](user-settings.html)
