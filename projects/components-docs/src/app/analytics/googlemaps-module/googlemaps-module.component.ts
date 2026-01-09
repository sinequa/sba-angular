import { Component } from '@angular/core';
import { DocMapComponent } from './map/map.component';

@Component({
    selector: 'doc-googlemaps-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocGooglemapsModuleComponent {

  title = 'Googlemaps Module';

  components = [
    DocMapComponent
  ];

  constructor() { }

}
