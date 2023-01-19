import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html'
})
export class UserRatingComponent {

  code = `<sq-user-rating
    [record]="record"
    [ratingsColumn]="'column'">
</sq-user-rating>`;

  constructor(public globalService: GlobalService) { }

}
