import { Component, EventEmitter, Output } from '@angular/core';
import { IndexStats, UploaderService } from '../uploader.service';

@Component({
  selector: 'sq-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  @Output() uploadedToken = new EventEmitter<{ token: string, name: string }>();

  stats?: IndexStats;

  dragging: boolean = false;
  uploading: boolean = false;

  get uploaded(): boolean {
    return !!this.stats?.nbDocAdded || !!this.stats?.nbDocUpdated || !!this.stats?.nbDocWarning;
  }

  constructor(private uploaderService: UploaderService) { }

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
      this.stats = undefined;
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
        const name = files.map(file => file.name).join(', ')
        this.uploadedToken.emit({ token: res.token, name });
        this.stats = res.indexCollection.stats;
        this.uploading = false;
      }, () => this.uploading = false);
  }
}
