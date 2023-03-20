import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-map',
  templateUrl: './map.component.html'
})
export class DocMapComponent extends BaseComponent {

  code = `<sq-googlemaps
    [results]="results">
</sq-googlemaps>`;

}
