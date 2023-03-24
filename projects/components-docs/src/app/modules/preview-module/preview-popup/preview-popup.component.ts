import { Component } from '@angular/core';
import { BsPreviewPopup } from '@sinequa/components/preview';
import { ModalService } from '@sinequa/core/modal';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-popup',
  templateUrl: './preview-popup.component.html'
})
export class DocPreviewPopupComponent extends BaseComponent {

  code = `this.modalService.open(BsPreviewPopup, {
    model: {
        record: record,
        query: query
    }
});`;

  constructor(private modalService: ModalService) {
    super();
  }

  openPopup() {
    this.modalService.open(BsPreviewPopup, {
      model: {
        record: this.globalService.record,
        query: this.globalService.query
      }
    });
  }

}
