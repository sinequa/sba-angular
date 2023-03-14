import { Component } from '@angular/core';
import { DocMapComponent } from './map/map.component';

@Component({
  selector: 'doc-googlemaps-module',
  templateUrl: '../../module-template.html'
})
export class DocGooglemapsModuleComponent {

  title = 'Googlemaps Module';
  description = ``;

  components = [
    DocMapComponent
  ];

  constructor() { }

}
