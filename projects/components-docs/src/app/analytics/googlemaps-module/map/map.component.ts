import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-map',
    templateUrl: './map.component.html',
    standalone: false
})
export class DocMapComponent extends BaseComponent {

  code = `<sq-googlemaps
    [results]="results">
</sq-googlemaps>`;

}
