import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsFacetModule } from "@sinequa/components/facet";
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
import { FacetComponent } from './facet/facet.component';
import { AlertsComponent } from './alerts/alerts.component';
import { BsNotificationModule } from "@sinequa/components/notification";
import { PreviewComponent } from './preview/preview.component';
import { SqPreviewComponent } from './preview/sq-preview/sq-preview.component';
import { CodeComponent } from './code/code.component';

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
        CodeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BsFacetModule,
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
