import { Component } from '@angular/core';
import { CCRFM, RFMType } from '@sinequa/components/rfm';
import { AppService } from '@sinequa/core/app-utils';
import { RFMActionDisplay } from '@sinequa/core/web-services';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-rfm-action',
    templateUrl: './rfm-action.component.html',
    standalone: false
})
export class DocRfmActionComponent extends BaseComponent {

  code = `<sq-rfm-action
    [results]="results"
    [record]="record">
</sq-rfm-action>`;

config: CCRFM.Action = {
  name: 'name',
  enabled: true,
  actionEnabled: true,
  noMenu: false,
  displayUnrated: true,
  negAvailable: true
};

type: RFMType = 'click';

get rfm(): RFMActionDisplay | undefined {
  const rfm = this.globalService.record?.rfm;
  return rfm ? rfm[this.type] : undefined;
}

  constructor(public appService: AppService) {
    super();
  }

}
