import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-user-rating',
  templateUrl: './user-rating.component.html'
})
export class DocUserRatingComponent {

  code = `<sq-user-rating
    [record]="record"
    [ratingsColumn]="'column'">
</sq-user-rating>`;

  constructor(public globalService: GlobalService) { }

}
