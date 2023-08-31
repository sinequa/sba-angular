import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderService } from './uploader.service';
import { IndexingService, TokenData, TokenInfo } from './indexing.service';
import { forkJoin } from 'rxjs';
import { Record } from '@sinequa/core/web-services';
import { Action, BsActionModule } from '@sinequa/components/action';
import { IntlModule } from '@sinequa/core/intl';
import { BsFacetModule } from '../facet';
import { BsModalModule } from '../modal';

@Component({
  selector: 'sq-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  standalone: true,
  imports: [CommonModule, IntlModule, BsActionModule, BsFacetModule, BsModalModule]
})
export class UploaderComponent implements OnInit {

  refreshAction: Action;
  deleteAction: Action;
  clearAction: Action;

  records: Record[];
  idsToDelete: string[] = [];

  dragging: boolean = false;
  uploading: boolean = false;

  pendingTokens: { token: TokenInfo, tokenData: TokenData }[] = [];
  refreshInterval = 3000; // the interval to refresh the documents that have not yet been indexed

  constructor(
    private uploaderService: UploaderService,
    private indexingService: IndexingService
  ) {

    this.refreshAction = new Action({
      icon: 'fas fa-sync-alt',
      title: 'msg#uploader.refreshUploads',
      action: () => this.getUploadsList()
    });

    this.deleteAction = new Action({
      icon: 'fas fa-trash',
      text: 'msg#uploader.deleteUploads',
      hidden: !this.idsToDelete.length,
      action: () => this.delete(),
      updater: action => action.hidden = !this.idsToDelete.length
    });

    this.clearAction = new Action({
      icon: 'fas fa-trash',
      text: 'msg#uploader.clearUploads',
      hidden: this.idsToDelete.length > 0,
      action: () => this.clearAll(),
      updater: action => action.hidden = this.idsToDelete.length > 0
    });

  }

  ngOnInit(): void {
    this.getUploadsList();
    this.indexingService.fetchTokens();
    this.fetchTokensData();
  }

  /**
   * UPLOADER
   */
  dragEvent(dragging: boolean, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = dragging;
  }

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

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    this.upload(files);
  }

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

  /**
   * UPLOADS STATUS
   */
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

  indexingCount(tokenData: TokenData): string {
    const count = tokenData.docs.filter(doc => doc.reindexed).length;
    const nb = tokenData.docs.length;
    return `${count}/${nb}`;
  }

  /**
   * UPLOADS LIST
   */
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
