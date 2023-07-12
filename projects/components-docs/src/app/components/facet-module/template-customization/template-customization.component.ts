import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { RESULTS } from 'src/mocks/data/results';

@Component({
  selector: 'doc-template-customization',
  templateUrl: './template-customization.component.html'
})
export class DocTemplateCustomizationComponent extends BaseComponent {

  code = `<sq-facet-card actionsClass="ms-auto">

    <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>

    <ng-template #headerTpl>Custom header</ng-template>
    <ng-template #subHeaderTpl><i>Custom sub-header</i></ng-template>
    <ng-template #footerTpl><i>Custom footer</i></ng-template>
    <ng-template #settingsTpl><i>Custom settings</i></ng-template>

</sq-facet-card>`;

  results = RESULTS;

}
