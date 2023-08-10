import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonMethodPluginService, Record } from '@sinequa/core/web-services';
import { Observable } from 'rxjs';

export interface IndexResponse {
  token: string;
  indexCollection: IndexCollection;
}

export interface IndexCollection {
  collection: string;
  action: string;
  stats?: IndexStats;
}

export interface IndexStats {
  nbDocUpdated: number;
  nbDocAdded: number;
  nbDocWarning: number;
}

export interface DocumentsListResponse {
  records: Record[];
}

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  /** Name of the UploaderJMethod plugin */
  UploaderJMethod = "UploaderJMethod";

  options: any = {
    headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
    responseType: 'json'
  };

  constructor(public jsonMethodWebService: JsonMethodPluginService) { }

  /**
   * Index new documents
   */
  index(documents: File[]): Observable<IndexResponse> {
    const formData = new FormData();
    formData.append('data', '{ "action": "index", "debug": true }');
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      formData.append(document.name, document);
    }
    return this.jsonMethodWebService.post(this.UploaderJMethod, formData, this.options)
  }

  /**
   * Get the list of all uploaded documents for the current user
   */
  list(): Observable<DocumentsListResponse> {
    const formData = new FormData();
    formData.append('data', '{ "action": "list", "debug": true }');
    return this.jsonMethodWebService.post(this.UploaderJMethod, formData, this.options);
  }

  /**
   * Delete desired documents IDs
   */
  delete(docIds: string[]): Observable<any> {
    const formData = new FormData();
    formData.append('data', `{ "action": "delete", "docIds": ${JSON.stringify(docIds)}, "debug": true }`);
    return this.jsonMethodWebService.post(this.UploaderJMethod, formData, this.options);
  }

  /**
   * Delete all documents for current user
   */
  clear() {
    const formData = new FormData();
    formData.append('data', '{ "action": "clear", "debug": true }');
    return this.jsonMethodWebService.post(this.UploaderJMethod, formData, this.options);
  }
}
