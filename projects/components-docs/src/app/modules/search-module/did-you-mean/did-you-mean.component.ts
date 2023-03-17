import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-did-you-mean',
  templateUrl: './did-you-mean.component.html'
})
export class DocDidYouMeanComponent {

  code = `<sq-did-you-mean
    [results]="results">
</sq-did-you-mean>`;

  constructor(public globalService: GlobalService) { }

}
