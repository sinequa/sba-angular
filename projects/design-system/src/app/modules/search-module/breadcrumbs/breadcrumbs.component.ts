import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {

  code = `<sq-breadcrumbs
    [results]="results">
</sq-breadcrumbs>`;

  constructor(public globalService: GlobalService) { }

}
