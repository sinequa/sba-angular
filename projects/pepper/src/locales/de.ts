import {LocaleData} from "@sinequa/core/intl";
import {deCore} from "@sinequa/core/messages";
import appMessages from "./messages/de.json";
import "intl/locale-data/jsonp/de-DE"; // Safari
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import {Utils} from "@sinequa/core/base";
import {deUtils} from "@sinequa/components/utils";
import {deAdvanced} from "@sinequa/components/advanced";
import {deAlerts} from "@sinequa/components/alerts";
import {deBaskets} from "@sinequa/components/baskets";
import {deFacet} from "@sinequa/components/facet";
import {deFeedback} from "@sinequa/components/feedback";
import {deHeatmap} from "@sinequa/analytics/heatmap";
import {deLabels} from "@sinequa/components/labels";
import {deMetadata} from "@sinequa/components/metadata";
import {deNotification} from "@sinequa/components/notification";
import {dePreview} from "@sinequa/components/preview";
import {deResult} from "@sinequa/components/result";
import {deResultsView} from "@sinequa/components/results-view";
import {deSavedQueries} from "@sinequa/components/saved-queries";
import {deSelection} from "@sinequa/components/selection";
import {deSearch} from "@sinequa/components/search";
import {deStatusBar} from "@sinequa/components/status-bar";
import {deUserSettings} from "@sinequa/components/user-settings";
import {deNetwork} from "@sinequa/analytics/network";
import {deGooglemaps} from "@sinequa/analytics/googlemaps";
import {deFinance} from "@sinequa/analytics/finance";
import {deTimeline} from "@sinequa/analytics/timeline";
import {deFilters} from "@sinequa/components/filters";
import {deSearchForm} from "@sinequa/components/search-form";
import {deDashboard} from "@sinequa/analytics/dashboard";

const messages = Utils.merge({}, deCore, deUtils, deAdvanced, deAlerts, deBaskets, deFacet, deFeedback, deHeatmap, deLabels, deMetadata,
    deNotification, dePreview, deResult, deResultsView, deSavedQueries, deSelection, deSearch, deStatusBar, deUserSettings, deNetwork,
    deGooglemaps, deFinance, deTimeline, deFilters, deSearchForm, deDashboard, appMessages);

export default <LocaleData>{
    intl: {
        locale: "de-DE"
    },
    moment: {
        locale: "de"
    },
    d3: {
        locale: "de-DE",
        format: require('d3-format/locale/de-DE'),
        time: require('d3-time-format/locale/de-DE')
    },
    messages: messages
};
