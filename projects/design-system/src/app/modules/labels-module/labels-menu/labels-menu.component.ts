import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-labels-menu',
  templateUrl: './labels-menu.component.html'
})
export class LabelsMenuComponent {

  code = `<sq-labels-menu
    [results]="results">
</sq-labels-menu>`;

  constructor(public globalService: GlobalService) { }

}
