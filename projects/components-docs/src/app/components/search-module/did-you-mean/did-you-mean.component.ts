import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-did-you-mean',
    templateUrl: './did-you-mean.component.html',
    standalone: false
})
export class DocDidYouMeanComponent extends BaseComponent {

  code = `<sq-did-you-mean
    [results]="results">
</sq-did-you-mean>`;

}
