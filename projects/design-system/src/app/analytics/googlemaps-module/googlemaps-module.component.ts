import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-googlemaps-module',
  templateUrl: '../../module-template.html'
})
export class GooglemapsModuleComponent {

  title = 'Googlemaps Module';

  components = [
    MapComponent
  ];

  constructor() { }

}
