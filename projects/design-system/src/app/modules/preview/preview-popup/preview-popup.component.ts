import { Component } from '@angular/core';
import { BsPreviewPopup } from '@sinequa/components/preview';
import { ModalService } from '@sinequa/core/modal';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html'
})
export class PreviewPopupComponent {

  code = `this.modalService.open(BsPreviewPopup, {
    model: {
        record: record,
        query: query
    }
});`;

  constructor(private globalService: GlobalService,
    private modalService: ModalService) { }

  openPopup() {
    this.modalService.open(BsPreviewPopup, {
      model: {
        record: this.globalService.record,
        query: this.globalService.query
      }
    });
  }

}
