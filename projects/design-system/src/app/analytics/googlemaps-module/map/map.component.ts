import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-map',
  templateUrl: './map.component.html'
})
export class DocMapComponent {

  code = `<sq-googlemaps
    [results]="results">
</sq-googlemaps>`;

  constructor(public globalService: GlobalService) { }

}
