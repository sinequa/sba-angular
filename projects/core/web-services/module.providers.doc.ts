import {AppWebService} from "./app.web.service";
import {AuditWebService} from "./audit.web.service";
import {DownloadWebService} from "./download.web.service";
import {JsonMethodPluginService} from "./json-method-plugin.web.service";
import {LabelsWebService} from "./labels.web.service";
import {PreviewWebService} from "./preview.web.service";
import {PrincipalWebService} from "./principal.web.service";
import {QueryExportWebService} from "./query-export.web.service";
import {QueryWebService} from "./query.web.service";
import {RecentQueriesWebService} from "./recent-queries.web.service";
import {RfmWebService} from "./rfm.web.service";
import {SimilarDocumentsWebService} from "./similar-documents.web.service";
import {SponsoredLinksWebService} from "./sponsored-links.web.service";
import {SqHttpClient} from "./http-client";
import {StartConfigWebService} from "./start-config.web.service";
import {SuggestFieldWebService} from "./suggest-field.web.service";
import {SuggestQueryWebService} from "./suggest-query.web.service";
import {UserRatingsWebService} from "./user-ratings.web.service";
import {UserSettingsWebService} from "./user-settings.web.service";

const WEB_SERVICES_MODULE_PROVIDERS = [
    AppWebService,
    AuditWebService,
    DownloadWebService,
    JsonMethodPluginService,
    LabelsWebService,
    PreviewWebService,
    PrincipalWebService,
    QueryExportWebService,
    QueryWebService,
    RecentQueriesWebService,
    RfmWebService,
    SimilarDocumentsWebService,
    SponsoredLinksWebService,
    SqHttpClient,
    StartConfigWebService,
    SuggestFieldWebService,
    SuggestQueryWebService,
    UserRatingsWebService,
    UserSettingsWebService,
];

export {WEB_SERVICES_MODULE_PROVIDERS};
