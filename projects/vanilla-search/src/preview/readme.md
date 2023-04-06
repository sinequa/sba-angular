# Preview resources

This folder contains CSS and JS resources injected in the HTML preview.

These styles and scripts are needed to power several functionalities of the document preview, such as entity highlighting, pagination, tooltip and minimap.

These resources are injected in the `<head>` tag of the document preview by the Sinequa platform, regardless of the type of document (it could be a web page with its own styling or a converted PDF document, and so on).

## preview.scss

The SCSS file is part of the source code of your SBA.
It is compiled during the build of the app into a CSS file, as specified in the angular.json file:

```json
{
  "input": "projects/vanilla-search/src/preview/preview.scss",
  "bundleName": "preview",
  "inject": false
}
```

- `bundleName: "preview"` means that the file is compiled as `preview.css`.
- `inject: false` means that the file is NOT injected in the `index.html` of your SBA. (it is injected only in the HTML preview).

# preview.js

The JS file is pre-compiled from a Typescript file packaged in `projects/components/preview/preview.ts`.

Since the file is pre-compiled, it is considered as an asset in the angular.json file:

```
"assets": [
  "projects/vanilla-search/src/assets",
  "projects/vanilla-search/src/preview/preview.js"
],
```

It is possible to recompile this file by running `npm run buildpreview`.

Under normal circonstances, this file doesn't need to be recompiled, but there might be special cases in which this becomes necessary:

- When the list of `TRUSTED_ORIGINS` needs to be modified. This list is a whitelist of the origin names that are permitted to interact with the HTML preview (via the [https://developer.mozilla.org/fr/docs/Web/API/Window/postMessage](Window.postMessage interface). By default it includes the default angular dev mode URLs (`http(s)://localhost:4200`) and the preview's own origin. This means that if the SBA is hosted on the same origin as the Sinequa server, it will work fine. But it the SBA is hosted on a different origin (Using [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)) then the origin of the application needs to be added to the trusted origins, so that it is allowed to interact with the document preview.
- When a new functionality needs to be added to the document preview, which requires interaction with the preview DOM.
