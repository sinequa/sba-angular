import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IntlModule} from '@sinequa/core/intl';
import {BsPreviewModule} from '@sinequa/components/preview';
import {UtilsModule} from '@sinequa/components/utils';

import {PreviewComponent} from './preview.component';

const routes: Routes = [
  {path: '', component: PreviewComponent}
]

@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    IntlModule,
    UtilsModule,
    BsPreviewModule,
  ]
})
export class PreviewModule { }
