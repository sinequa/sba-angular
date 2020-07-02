import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsSelectionModule} from "@sinequa/components/selection";
import {BsModalModule} from "@sinequa/components/modal";
import {BsActionModule} from "@sinequa/components/action";

import {SAVEDQUERY_COMPONENTS} from "../saved-queries.service";
import {BsEditSavedQuery} from "./edit-saved-query/edit-saved-query";
import {BsManageSavedQueries} from "./manage-saved-queries/manage-saved-queries";
import {BsExportQuery} from "./export-query/export-query";
import {BsQueryExporter} from "./query-exporter/query-exporter";
import {BsSavedQueriesMenuComponent} from "./saved-queries-menu/saved-queries-menu.component";
import {BsFacetSavedQueries} from "./facet-saved-queries/facet-saved-queries";
import {BsFacetRecentQueries} from "./facet-recent-queries/facet-recent-queries";
import {BsFacetRecentDocuments} from "./facet-recent-documents/facet-recent-documents";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,

        BsModalModule,

        IntlModule,
        ValidationModule,

        BsSelectionModule,
        BsModalModule,
        UtilsModule,
        BsActionModule
    ],
    declarations: [
        BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
    ],
    exports: [
        BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
    ],
    providers: [
        {
            provide: SAVEDQUERY_COMPONENTS,
            useValue: {
                editSavedQueryModal: BsEditSavedQuery,
                manageSavedQueriesModal: BsManageSavedQueries,
                exportSavedQueryModal: BsExportQuery
            }
        }
    ]
})
export class BsSavedQueriesModule {
}
