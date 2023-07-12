import { Component } from '@angular/core';
import { DocFiltersEditorComponent } from './filters-editor/filters-editor.component';
import { DocFiltersViewComponent } from './filters-view/filters-view.component';
import { DocFiltersComponent } from './filters/filters.component';

@Component({
  selector: 'doc-filters-module',
  templateUrl: '../../module-template.html'
})
export class DocFiltersModuleComponent {

  title = 'Filters Module';

  components = [
    DocFiltersComponent,
    DocFiltersEditorComponent,
    DocFiltersViewComponent,
  ];

}
