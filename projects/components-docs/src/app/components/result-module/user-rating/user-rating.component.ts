import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-user-rating',
    templateUrl: './user-rating.component.html',
    standalone: false
})
export class DocUserRatingComponent extends BaseComponent {

  code = `<sq-user-rating
    [record]="record"
    [count]="5"
    [caption]="'caption'"
    [ratingsColumn]="'engineusercsv1'"
    [averageColumn]="'enginecsv1'">
</sq-user-rating>`;

}
