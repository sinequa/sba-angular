import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-user-rating',
  templateUrl: './user-rating.component.html'
})
export class DocUserRatingComponent extends BaseComponent {

  code = `<sq-user-rating
    [record]="record"
    [ratingsColumn]="'column'">
</sq-user-rating>`;

}
