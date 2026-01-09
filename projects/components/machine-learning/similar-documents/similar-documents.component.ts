import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UtilsModule } from '@sinequa/components/utils';
import { IntlModule } from '@sinequa/core/intl';
import { DocumentSimilarityService, SimilarDocument, SimilarityParams } from '@sinequa/core/web-services';
import { BehaviorSubject, catchError, combineLatest, filter } from 'rxjs';

export type OptionsProps = {
  params?: SimilarityParams,
  expand?: string[]
};

@Component({
    selector: 'sq-similar-documents',
    imports: [CommonModule, UtilsModule, IntlModule],
    template: `
    <ng-container *ngIf="similarDocuments && similarDocuments.length > 0; else noSimilarDocuments">
      <li *ngFor="let document of similarDocuments" (click)="handleClick(document)" class="similar-document d-flex mb-2">
        <span role="button" class="similarDocument link-primary">{{ document.doc.title }}</span>
      </li>
    </ng-container>
    <ng-template #noSimilarDocuments>
      <p class="fst-italic text-muted">{{ 'msg#machine-learning.similarDocumentsNotFound' | sqMessage }}</p>
    </ng-template>
  `,
    styles: [`
    :host {
      display: block;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimilarDocumentsComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  similarityService = inject(DocumentSimilarityService);

  /**
   * Array of similar documents.
   */
  similarDocuments: SimilarDocument[];


  _documentId$ = new BehaviorSubject("");
  _queryName$ = new BehaviorSubject("");
  _options$ = new BehaviorSubject<OptionsProps>({});

  /**
   * Event emitted when a document is clicked.
   *
   * @event documentClick
   * @type {EventEmitter<SimilarDocument>}
   */
  @Output() documentClick = new EventEmitter<SimilarDocument>();

  /**
   * Sets the query name.
   * @param value The new value for the query name.
   */
  @Input() set queryName(value: string) {
    this._queryName$.next(value);
  }

  /**
   * Sets the document ID.
   *
   * @param value - The document ID value.
   */
  @Input() set documentId(id: string) {
    this._documentId$.next(id);
  }

  /**
   * Setter for the options property.
   * @param value - The options object.
   */
  @Input() set options(value: OptionsProps) {
    this._options$.next(value);
  }

  /**
   * Initializes the component and subscribes to changes in documentId, queryName, and options.
   * Fetches similar documents based on the provided inputs.
   */
  ngOnInit(): void {
    // subscribe to changes in documentId, queryName and options, just after the component is initialized
    // not in the constructor, because the inputs are not available yet
    combineLatest([this._documentId$, this._queryName$, this._options$])
      .pipe(filter(([documentId, queryName]) => !!documentId && !!queryName))
      .subscribe(([documentId, queryName, options]) => {
        this.fetchSimilarDocuments(documentId, queryName, options);
      });
  }

  /**
   * Fetches similar documents based on the provided document ID and query name.
   *
   * @param documentId - The ID of the document.
   * @param queryName - The name of the query.
   * @param options - Optional parameters for the similarity service.
   */
  fetchSimilarDocuments(documentId: string, queryName: string, options?: OptionsProps) {
    this.similarityService.get(documentId, queryName, options)
    .pipe(catchError((error) => {
      this.similarDocuments = [];
      this.cdr.detectChanges();
      return [];
    }))
    .subscribe((response) => {
      this.similarDocuments = response;
      this.cdr.detectChanges();
    });
  }

  /**
   * Handles the click event for a document.
   * @param document - The document that was clicked.
   */
  handleClick(document: SimilarDocument) {
    this.documentClick.emit(document);
  }
}
