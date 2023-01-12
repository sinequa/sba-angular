import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsFacetModule, FacetConfig, FacetListParams, FacetState, FacetTreeParams } from "@sinequa/components/facet";
import { IntlModule, Locale, LocaleData, LocalesConfig } from "@sinequa/core/intl";
import { START_CONFIG } from "@sinequa/core/web-services";
import { MODAL_LOGIN } from "@sinequa/core/login";
import { MODAL_CONFIRM, MODAL_PROMPT } from "@sinequa/core/modal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ResultModule } from "@sinequa/components/result";
import { BsSelectionModule } from "@sinequa/components/selection";
import { BsLabelsModule } from "@sinequa/components/labels";
import { ResultsComponent } from './results/results.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BsActionModule } from "@sinequa/components/action";
import { FormsModule } from "@angular/forms";
import { InputsComponent } from './inputs/inputs.component';
import { SearchComponent } from './search/search.component';
import { BsSearchModule } from "@sinequa/components/search";
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { HIGHLIGHT_OPTIONS, HighlightModule } from "ngx-highlightjs";
import { UtilsModule } from "@sinequa/components/utils";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { MetadataModule } from "@sinequa/components/metadata";
import { CollapseModule } from "@sinequa/components/collapse";
import { BsPreviewModule } from "@sinequa/components/preview";
import { FacetComponent } from './modules/facet/facet/facet.component';
import { AlertsComponent } from './alerts/alerts.component';
import { BsNotificationModule } from "@sinequa/components/notification";
import { PreviewComponent } from './preview/preview.component';
import { SqPreviewComponent } from './preview/sq-preview/sq-preview.component';
import { CodeComponent } from './code/code.component';
import { FacetModuleComponent } from './modules/facet/facet-module.component';
import { FacetTreeComponent } from './modules/facet/facet-tree/facet-tree.component';
import { FacetListComponent } from './modules/facet/facet-list/facet-list.component';
import { FacetFiltersComponent } from './modules/facet/facet-filters/facet-filters.component';
import { FacetRangeComponent } from './modules/facet/facet-range/facet-range.component';
import { FacetBarComponent } from './modules/facet/facet-bar/facet-bar.component';
import { FacetMultiComponent } from './modules/facet/facet-multi/facet-multi.component';
import { MySearchComponent } from './modules/facet/my-search/my-search.component';
import { FacetTagCloudComponent } from './modules/facet/facet-tag-cloud/facet-tag-cloud.component';
import { RefineComponent } from './modules/facet/refine/refine.component';
import { PreviewModuleComponent } from './modules/preview/preview-module.component';
import { PreviewHighlightsComponent } from './modules/preview/preview-highlights/preview-highlights.component';
import { PreviewLinksComponent } from './modules/preview/preview-links/preview-links.component';
import { PreviewPopupComponent } from './modules/preview/preview-popup/preview-popup.component';
import { PreviewPanelComponent } from './modules/preview/preview-panel/preview-panel.component';
import { ResultLinkPreviewComponent } from './modules/preview/result-link-preview/result-link-preview.component';
import { FacetPreviewComponent } from './modules/preview/facet-preview/facet-preview.component';
import { SimilarDocumentsComponent } from './modules/preview/similar-documents/similar-documents.component';
import { PreviewEntityFacetComponent } from './modules/preview/preview-entity-facet/preview-entity-facet.component';
import { PreviewEntityPanelComponent } from './modules/preview/preview-entity-panel/preview-entity-panel.component';
import { PreviewExtractsPanelComponent } from './modules/preview/preview-extracts-panel/preview-extracts-panel.component';
import { PreviewSearchFormComponent } from './modules/preview/preview-search-form/preview-search-form.component';
import { PreviewPagesPanelComponent } from './modules/preview/preview-pages-panel/preview-pages-panel.component';
import { PreviewPageFormComponent } from './modules/preview/preview-page-form/preview-page-form.component';
import { PreviewMinimapComponent } from './modules/preview/preview-minimap/preview-minimap.component';
import { FacetPreviewComponentComponent } from './modules/preview/facet-preview-component/facet-preview-component.component';

// List of facet configurations (of type list and tree)
export const allFacets: FacetConfig<FacetListParams | FacetTreeParams>[] = [
    {
        name: "facet1",
        title: "Modified",
        type: "list",
        icon: "fas fa-calendar-day",
        parameters: {
            aggregation: "Modified"
        }
    },
    {
        name: "facet2",
        title: "Tree path",
        type: "tree",
        icon: "fas fa-sitemap",
        parameters: {
            aggregation: "Treepath"
        }
    },
    {
        name: "facet3",
        title: "Person",
        type: "list",
        icon: "fas fa-user",
        parameters: {
            aggregation: "Person"
        }
    }
];

// List of default facets displayed (only facet2 is displayed here)
export const defaultFacets: FacetState[] = [
    { name: "facet1", position: 0 },
    { name: "facet2", position: 1 },
    { name: "facet3", position: 2 }
];

const data: LocaleData = {
    intl: {
        locale: "en-US"
    },
    messages: {}
};

export class AppLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];

    constructor() {
        this.locales = [
            { name: "en", display: "msg#locale.en", data },
            { name: "fr", display: "msg#locale.fr", data },
            { name: "de", display: "msg#locale.de", data },
        ];
        this.defaultLocale = this.locales[0];
    }
}

@NgModule({
    declarations: [
        AppComponent,
        ResultsComponent,
        ButtonsComponent,
        InputsComponent,
        SearchComponent,
        MenuComponent,
        NavbarComponent,
        FacetComponent,
        AlertsComponent,
        PreviewComponent,
        SqPreviewComponent,
        CodeComponent,
        FacetModuleComponent,
        FacetTreeComponent,
        FacetListComponent,
        FacetFiltersComponent,
        FacetRangeComponent,
        FacetBarComponent,
        FacetMultiComponent,
        MySearchComponent,
        FacetTagCloudComponent,
        RefineComponent,
        PreviewModuleComponent,
        PreviewHighlightsComponent,
        PreviewLinksComponent,
        PreviewPopupComponent,
        PreviewPanelComponent,
        ResultLinkPreviewComponent,
        FacetPreviewComponent,
        SimilarDocumentsComponent,
        PreviewEntityFacetComponent,
        PreviewEntityPanelComponent,
        PreviewExtractsPanelComponent,
        PreviewSearchFormComponent,
        PreviewPagesPanelComponent,
        PreviewPageFormComponent,
        PreviewMinimapComponent,
        FacetPreviewComponentComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BsFacetModule.forRoot(allFacets, defaultFacets),
        IntlModule.forRoot(AppLocalesConfig),
        ResultModule,
        BsSelectionModule,
        BsLabelsModule,
        BsActionModule,
        FormsModule,
        BsSearchModule,
        // HighlightModule,
        BsPreviewModule,
        MetadataModule,
        CollapseModule,
        UtilsModule,
        BsAutocompleteModule,
        BsNotificationModule
    ],
    providers: [
        { provide: START_CONFIG, useValue: { app: 'sinequa-design-system' } },
        { provide: MODAL_LOGIN, useValue: {} },
        { provide: MODAL_CONFIRM, useValue: {} },
        { provide: MODAL_PROMPT, useValue: {} },
        // {
        //     provide: HIGHLIGHT_OPTIONS,
        //     useValue: {
        //         coreLibraryLoader: () => import('highlight.js/lib/core'),
        //         languages: {
        //             typescript: () => import('highlight.js/lib/languages/typescript'),
        //             xml: () => import('highlight.js/lib/languages/xml')
        //         },
        //         themePath: 'assets/vs.css'
        //     }
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
