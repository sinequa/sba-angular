# Cypress tests

Cypress is a frontend testing tool for web applications. It allows to easily perform UI tests directly on a deployed application.

At Sinequa, we use it on the `projects/components-docs` application which centralizes all of Sinequa components from `projects/analytics` and `projects/components`.

---

## Prerequisites to run Cypress

In order to run the tests, you need to have `components-docs` running with the automatic authentication enabled.

To do so, you can go in your `components-docs/src/environments/environment.ts` file in which you can find a `CREDENTIALS` provider with some empty `userName` and `password` parameters that you can fill with your credentials, this will automatically authenticate you with them if you have calls ending up in a 401 (make sure you don't commit them).

Then you can simply launch the application with `npm run start:docs`.

---

## Running Cypress

### In command lines

You have 2 choices to run the tests. The first one being in a command line only way with the `npx cypress run` command, it will detect all test files (**.cy.ts) and run their tests.

### In a browser

The second one is more visual. By running `npx cypress open`, a client with open itself, choose "E2E testing" then the "Chrome" browser, and a chrome instance will open itself, showing you a dashboard.

In this dashboard, you can see all test files separately, and you just need to click on one to launch the tests it contains. The difference here is that you can see visually what the test is doing with all the steps that you can inspect, which make it easier to debug if needed.

---

## Update a base screenshot

We make screenshots comparisons in some of our tests, and it can happen that a component changes and so its new screenshot is now different.

You have in the `cypress/snapshots` folder these subfolders:
- base: where all base screenshots are contained (and the only one containing commited pictures)
- diff: visual differences between the base screenshot and the one from the last related test which has failed

Now as mentioned just before, it can be normal that a comparison fails if the change is desired (because the component or some related behavior has changed). To change the base screenshot you need to refresh the base screenshots using the `npm run cypress:base` command. Beware as it will wipe all the base screenshots to remake them, so make sure you don't commit undesired changes.

After that, run the test again and it should succeed, you can then commit the new picture from the `base` folder.