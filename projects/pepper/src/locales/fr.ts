import {LocaleData} from "@sinequa/core/intl";
import {frCore} from "@sinequa/core/messages";
import appMessages from "./messages/fr.json";
import "intl/locale-data/jsonp/fr-FR"; // Safari
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import {Utils} from "@sinequa/core/base";
import {frUtils} from "@sinequa/components/utils";
import {frAdvanced} from "@sinequa/components/advanced";
import {frAlerts} from "@sinequa/components/alerts";
import {frBaskets} from "@sinequa/components/baskets";
import {frFacet} from "@sinequa/components/facet";
import {frFeedback} from "@sinequa/components/feedback";
import {frHeatmap} from "@sinequa/analytics/heatmap";
import {frLabels} from "@sinequa/components/labels";
import {frMetadata} from "@sinequa/components/metadata";
import {frNotification} from "@sinequa/components/notification";
import {frPreview} from "@sinequa/components/preview";
import {frResult} from "@sinequa/components/result";
import {frResultsView} from "@sinequa/components/results-view";
import {frSavedQueries} from "@sinequa/components/saved-queries";
import {frSelection} from "@sinequa/components/selection";
import {frSearch} from "@sinequa/components/search";
import {frStatusBar} from "@sinequa/components/status-bar";
import {frUserSettings} from "@sinequa/components/user-settings";
import {frNetwork} from "@sinequa/analytics/network";
import {frGooglemaps} from "@sinequa/analytics/googlemaps";
import {frTheme} from "@sinequa/components/theme-toggle";
import {frFinance} from "@sinequa/analytics/finance";
import {frTimeline} from "@sinequa/analytics/timeline";
import {frFilters} from "@sinequa/components/filters";
import {frSearchForm} from "@sinequa/components/search-form";
import {frDashboard} from "@sinequa/analytics/dashboard";

const d3Format = require('d3-format/locale/fr-FR');
d3Format.thousands = " "; // consistency with intl-number-format

const messages = Utils.merge({}, frCore, frUtils, frAdvanced, frAlerts, frBaskets, frFacet, frFeedback, frHeatmap, frLabels, frMetadata,
    frNotification, frPreview, frResult, frResultsView, frSavedQueries, frSelection, frSearch, frStatusBar, frUserSettings, frNetwork,
    frGooglemaps, frFinance, frTimeline, frTheme, frFilters, frSearchForm, frDashboard, appMessages);

export default <LocaleData>{
    intl: {
        locale: "fr-FR"
    },
    moment: {
        locale: "fr"
    },
    d3: {
        locale: "fr-FR",
        format: d3Format,
        time: require('d3-time-format/locale/fr-FR')
    },
    messages: messages
};
