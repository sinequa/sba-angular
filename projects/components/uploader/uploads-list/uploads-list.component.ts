import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderService } from '../uploader.service';
import { Record } from '@sinequa/core/web-services';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'sq-uploads-list',
  templateUrl: './uploads-list.component.html'
})
export class UploadsListComponent implements OnInit {

  @Input() canDelete = true;

  @Output() onDocumentClicked = new EventEmitter<Record>();

  refreshAction: Action;
  deleteAction: Action;
  clearAction: Action;

  records: Record[];
  idsToDelete: string[] = [];

  constructor(private uploaderService: UploaderService) {
    this.refreshAction = new Action({
      icon: 'fas fa-sync-alt',
      title: 'msg#uploader.refreshUploads',
      action: () => this.getUploadsList()
    });
    this.deleteAction = new Action({
      icon: 'fas fa-trash',
      text: 'msg#uploader.deleteUploads',
      hidden: !this.canDelete || !this.idsToDelete.length,
      action: () => this.delete(),
      updater: action => action.hidden = !this.canDelete || !this.idsToDelete.length
    });
    this.clearAction = new Action({
      icon: 'fas fa-trash',
      text: 'msg#uploader.clearUploads',
      hidden: !this.canDelete || this.idsToDelete.length > 0,
      action: () => this.clearAll(),
      updater: action => action.hidden = !this.canDelete || this.idsToDelete.length > 0
    });
  }

  ngOnInit(): void {
    this.getUploadsList();
  }

  getUploadsList(): void {
    this.uploaderService.list()
      .subscribe(res => {
        this.records = res.records;
      });
  }

  addRecordForDelete(record: Record, event: Event): void {
    event.stopPropagation();
    const id = this.idsToDelete.find(i => i === record.id);
    if (id) { // remove if existing
      this.idsToDelete.splice(this.idsToDelete.indexOf(id), 1);
    } else { // add otherwise
      this.idsToDelete.push(record.id);
    }
    this.deleteAction.update();
    this.clearAction.update();
  }

  delete(): void {
    if (!this.idsToDelete.length) return;
    this.uploaderService.delete(this.idsToDelete)
      .subscribe(() => {
        this.idsToDelete = [];
        this.deleteAction.update();
        this.clearAction.update();
        this.getUploadsList();
      });
  }

  clearAll(): void {
    this.uploaderService.clear()
      .subscribe(() => {
        this.getUploadsList();
      })
  }

}
