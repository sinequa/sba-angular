import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderService } from './uploader.service';
import { IndexingService, TokenData, TokenInfo } from './indexing.service';
import { forkJoin } from 'rxjs';
import { Record } from '@sinequa/core/web-services';
import { Action, BsActionModule } from '@sinequa/components/action';
import { IntlModule } from '@sinequa/core/intl';
import { AbstractFacet, BsFacetModule } from '../facet';
import { ConfirmType, ModalButton, ModalResult, ModalService } from '@sinequa/core/modal';
import { BsModalModule } from '../modal';

@Component({
  selector: 'sq-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  standalone: true,
  imports: [CommonModule, IntlModule, BsActionModule, BsFacetModule, BsModalModule]
})
export class UploaderComponent extends AbstractFacet implements OnInit {

  refreshAction: Action;
  deleteAction: Action;
  clearAction: Action;
  viewAction: Action;

  records: Record[];
  idsToDelete: string[] = [];

  dragging: boolean = false;
  uploading: boolean = false;
  uploadView: boolean = false;

  pendingTokens: { token: TokenInfo, tokenData: TokenData }[] = [];
  refreshInterval = 3000; // the interval to refresh the documents that have not yet been indexed

  constructor(
    private uploaderService: UploaderService,
    private indexingService: IndexingService,
    private modalService: ModalService
  ) {
    super();

    this.refreshAction = new Action({
      icon: 'fas fa-sync-alt',
      title: 'msg#uploader.refreshUploads',
      action: () => this.getUploadsList(),
      updater: action => action.hidden = this.uploadView
    });

    this.deleteAction = new Action({
      icon: 'fas fa-trash',
      title: 'msg#uploader.deleteUploads',
      hidden: !this.idsToDelete.length,
      action: () => this.delete(),
      updater: action => action.hidden = this.uploadView || !this.idsToDelete.length
    });

    this.clearAction = new Action({
      icon: 'fas fa-trash',
      title: 'msg#uploader.clearUploads',
      hidden: this.idsToDelete.length > 0,
      action: () => this.clearAll(),
      updater: action => action.hidden = this.uploadView || this.idsToDelete.length > 0
    });

    this.viewAction = new Action({
      icon: 'fas fa-upload',
      title: 'msg#uploader.switchUploader',
      action: action => {
        this.uploadView = !this.uploadView;
        action.icon = this.uploadView ? 'fas fa-list' : 'fas fa-upload';
        action.title = this.uploadView ? 'msg#uploader.switchList' : 'msg#uploader.switchUploader';
        this.refreshAction.update();
        this.deleteAction.update();
        this.clearAction.update();
      }
    });

  }

  ngOnInit(): void {
    this.getUploadsList();
    this.indexingService.fetchTokens();
    this.fetchTokensData();
  }

  override get actions(): Action[] {
    return [this.viewAction, this.refreshAction, this.deleteAction, this.clearAction];
}

  /**********************
   * UPLOADER
   *********************/

  /** Set dragging status to animate the drag & drop area */
  dragEvent(dragging: boolean, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = dragging;
  }

  /** Upload file via drop */
  onDrop(event) {
    if (this.uploading) return;
    const fileList: FileList = event.dataTransfer?.files;
    if (fileList.length) {
      const files: File[] = [];
      for (let i = 0; i < fileList.length; i++) {
        files.push(fileList[i]);
      }
      this.upload(files);
    }
  }

  /** Regular input file upload */
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    this.upload(files);
  }

  /** Upload files */
  upload(files: File[]): void {
    this.uploading = true;

    this.uploaderService.index(files)
      .subscribe(res => {
        const name = files.map(file => file.name).join(' - ')
        this.indexingService.addToken({ token: res.token, name });
        this.fetchTokensData();
        this.uploading = false;
      }, () => this.uploading = false);
  }

  /**********************
   * UPLOADS STATUS
   *********************/

  /** Get pending tokens data */
  fetchTokensData(): void {
    this.pendingTokens = [];

    if (!this.indexingService.tokens.length) return;

    this.indexingService.readTokens().subscribe((data: (TokenData | undefined)[]) => {
      const tokensData = (data.filter(d => d !== undefined) as TokenData[]).map((d, index) => ({ token: this.indexingService.tokens[index], tokenData: d }));
      this.pendingTokens = tokensData.filter(t => !!t.tokenData.docs.find(d => !d.reindexed));

      // remove already indexed documents
      const indexedTokens = tokensData.filter(t => !t.tokenData.docs.find(d => !d.reindexed));
      if (indexedTokens.length) {
        this.indexingService.removeTokens(indexedTokens.map(token => token.token));
      }

      this.verifyTokens()
    })
  }

  /** Verify pending token status */
  verifyTokens(): void {
    if (this.pendingTokens.length) {
      const observables = this.pendingTokens.map(token => this.indexingService.readToken(token.token.token));
      forkJoin(observables).subscribe((data: TokenData[]) => {
        this.pendingTokens.map((tokenData, index) => tokenData.tokenData = data[index]);

        // detect token for which all docs have been indexed to remove them from the pending list
        const indexedTokens = this.pendingTokens.filter(token => !token.tokenData.docs.find(d => !d.reindexed)).map(t => t.token);
        if (indexedTokens.length) {
          this.pendingTokens = this.pendingTokens.filter(token => !!token.tokenData.docs.find(d => !d.reindexed));
          this.indexingService.removeTokens(indexedTokens);
          this.getUploadsList();
        }
        setTimeout(() => this.verifyTokens(), this.refreshInterval);
      })
    }
  }

  /** Get the indexing count for a token ("0/1", "1/3", ...) */
  indexingCount(tokenData: TokenData): string {
    const count = tokenData.docs.filter(doc => doc.reindexed).length;
    const nb = tokenData.docs.length;
    return `${count}/${nb}`;
  }

  /**********************
   * UPLOADS LIST
   *********************/

  /** Retrieve all uploads from the user */
  getUploadsList(): void {
    this.uploaderService.list()
      .subscribe(res => {
        this.records = res.records;
      });
  }

  /** Add document to idsToDelete list */
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

  /** Delete documents from idsToDelete list */
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

  /** Clear all uploads */
  clearAll(): void {
    this.modalService.confirm({
      confirmType: ConfirmType.Warning,
      title: "msg#uploader.clearConfirmTitle",
      message: "msg#uploader.clearConfirmMessage",
      buttons: [
        new ModalButton({ result: ModalResult.Cancel, primary: true }),
        new ModalButton({ result: ModalResult.OK }),
      ]
    }).then(res => {
      if (res === ModalResult.OK) {
        this.uploaderService.clear()
          .subscribe(() => {
            this.getUploadsList();
          });
      }
    });
  }

}
