// Standard secondary entry point configuration including UMD module ids for ng-packagr (required from ng-package.js files)
module.exports = {
    lib: {
        entryFile: "index.ts",
        umdModuleIds: {
            "@sinequa/core/app-utils":          "sinequa.core.app-utils",
            "@sinequa/core/base":               "sinequa.core.base",
            "@sinequa/core/intl":               "sinequa.core.intl",
            "@sinequa/core/load-component":     "sinequa.core.load-component",
            "@sinequa/core/login":              "sinequa.core.login",
            "@sinequa/core/modal":              "sinequa.core.modal",
            "@sinequa/core/notification":       "sinequa.core.notification",
            "@sinequa/core/validation":         "sinequa.core.validation",
            "@sinequa/core/web-services":       "sinequa.core.web-services",
            "@sinequa/components/utils":        "sinequa.components.utils",
            "@sinequa/components/selection":    "sinequa.components.selection",
            "@sinequa/components/action":       "sinequa.components.action",
            "@sinequa/components/facet":        "sinequa.components.facet",
            "@sinequa/components/search":       "sinequa.components.search",
            "@sinequa/components/user-settings":"sinequa.components.user-settings",
            "@sinequa/components/collapse":     "sinequa.components.collapse",
            "@sinequa/components/result":       "sinequa.components.result",
            "@sinequa/components/results-view": "sinequa.components.results-view",
            "@sinequa/components/modal":        "sinequa.components.modal",
            "@sinequa/components/advanced":     "sinequa.components.advanced",
            "@swimlane/ngx-charts":             "swimlane.ngx-charts",
            "atomicjs":                         "atomic",
            "d3":                               "d3",
            "d3-format":                        "d3Format",
            "d3-time-format":                   "d3TimeFormat",
            "diacritics":                       "diacritics",
            "focus-within":                     "focusWithin",
            "intl-messageformat":               "IntlMessageFormat",
            "intl-format-cache":                "memoizeFormatConstructor",
            "jquery":                           "$",
            "jssha":                            "jsSHA",
            "jstz":                             "jstz",
            "lodash/camelCase":                 "lodash.camelCase",
            "lodash/escape":                    "lodash.escape",
            "lodash/get":                       "lodash.get",
            "lodash/isEqual":                   "lodash.isEqual",
            "lodash/kebabCase":                 "lodash.kebabCase",
            "lodash/snakeCase":                 "lodash.snakeCase",
            "lodash/unescape":                  "lodash.unescape",
            "moment":                           "moment",
            "ng2-ui-auth":                      "ng2-ui-auth",
            "@angular-slider/ngx-slider":       "ngx-slider",
            "ngx-bootstrap/datepicker":         "ngx-bootstrap.datepicker",
            "@popperjs/core":                   "popperjs.core",
            "vis":                              "vis",
            "angular-fusioncharts":             "angularFusioncharts",
            "fusioncharts":                     "FusionCharts",
            "fusioncharts/fusioncharts.charts": "charts",
            "fusioncharts/themes/fusioncharts.theme.fusion":    "FusionTheme",
            "fusioncharts/themes/fusioncharts.theme.candy":     "CandyTheme",
            "vis-data/peer/esm/vis-data":       "visData",
            "element-resize-detector":          "elementResizeDetectorMaker",
            "ag-grid-angular":                  "ag-grid-angular",
            "marked":                           "markdown"
        }
    }
};
