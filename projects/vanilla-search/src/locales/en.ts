import {LocaleData} from "@sinequa/core/intl";
import d3Format from "d3-format/locale/en-US.json";
import d3Time from "d3-time-format/locale/en-US.json";
import {enCore} from "@sinequa/core";
import appMessages from "./messages/en.json";
import "intl/locale-data/jsonp/en-US"; // Safari
import {Utils} from "@sinequa/core/base";
import {enAdvanced} from "@sinequa/components/advanced";
import {enAlerts} from "@sinequa/components/alerts";
import {enBaskets} from "@sinequa/components/baskets";
import {enFacet} from "@sinequa/components/facet";
import {enFeedback} from "@sinequa/components/feedback";
// import {enHeatmap} from "@sinequa/components/heatmap";
import {enLabels} from "@sinequa/components/labels";
import {enMetadata} from "@sinequa/components/metadata";
import {enNotification} from "@sinequa/components/notification";
import {enPreview} from "@sinequa/components/preview";
import {enResult} from "@sinequa/components/result";
import {enResultsView} from "@sinequa/components/results-view";
import {enSavedQueries} from "@sinequa/components/saved-queries";
import {enSelection} from "@sinequa/components/selection";
import {enSearch} from "@sinequa/components/search";
import {enStatusBar} from "@sinequa/components/status-bar";
import {enUserSettings} from "@sinequa/components/user-settings";

const messages = Utils.merge({}, enCore, enAdvanced, enAlerts, enBaskets, enFacet, enFeedback, /*enHeatmap,*/ enLabels, enMetadata,
    enNotification, enPreview, enResult, enResultsView, enSavedQueries, enSelection, enSearch, enStatusBar, enUserSettings, appMessages);

export default <LocaleData>{
    intl: {
        locale: "en-US"
    },
    d3: {
        locale: "en-US",
        format: d3Format,
        time: d3Time
    },
    messages: messages
};