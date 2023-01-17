import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-facet-module',
  templateUrl: './facet-module.component.html'
})
export class FacetModuleComponent {

  constructor(public globalService: GlobalService) { }

}
