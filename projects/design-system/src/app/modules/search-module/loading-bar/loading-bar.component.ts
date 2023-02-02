import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html'
})
export class LoadingBarComponent {

  code = `<sq-loading-bar
    [active]="active">
</sq-loading-bar>`;

  constructor() { }

}
