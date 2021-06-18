import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IntlModule} from '@sinequa/core/intl';
import {ModalModule} from '@sinequa/core/modal';

import {BsPreviewModule} from '@sinequa/components/preview';
import {BsLabelsModule} from '@sinequa/components/labels';
import {ResultModule} from '@sinequa/components/result';
import {BsFacetModule} from '@sinequa/components/facet';
import {BsActionModule} from '@sinequa/components/action';
import {UtilsModule} from '@sinequa/components/utils';
import {MetadataModule} from '@sinequa/components/metadata';
import {BsUserSettingsModule} from '@sinequa/components/user-settings';
import {BsFeedbackModule} from '@sinequa/components/feedback';
import {BsSelectionModule} from '@sinequa/components/selection';
import {BsBasketsModule} from '@sinequa/components/baskets';
import {BsAlertsModule} from '@sinequa/components/alerts';
import {BsSavedQueriesModule} from '@sinequa/components/saved-queries';
import {BsSearchModule} from "@sinequa/components/search";

import {SearchComponent} from './search.component';
import {SharedModule} from '../shared.module';

const routes: Routes = [
  {path:'', component: SearchComponent}
]

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    
    SharedModule,
    
    IntlModule,
    ModalModule,
    BsSearchModule,
    BsFacetModule,
    BsActionModule,
    UtilsModule,
    BsLabelsModule,
    BsUserSettingsModule,
    ResultModule,
    BsFeedbackModule,
    BsPreviewModule,
    MetadataModule,
    BsSelectionModule,
    BsBasketsModule,
    BsAlertsModule,
    BsSavedQueriesModule,
  ]
})
export class SearchModule { }
