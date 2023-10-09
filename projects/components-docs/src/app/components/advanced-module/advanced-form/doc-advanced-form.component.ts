import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { AdvancedService } from "@sinequa/components/advanced";
import { FirstPageService, SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { Subscription, debounceTime } from "rxjs";
import { BaseComponent } from "src/app/shared/base.component";
import { environment } from "src/environments/environment";
import { RESULTS } from "src/mocks/data/results";

@Component({
    selector: 'doc-advanced-form',
    templateUrl: './doc-advanced-form.component.html'
})
export class DocAdvancedFormComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
    @Input() query: Query;
    @Output() filterEdit = new EventEmitter<Query>();

    form: UntypedFormGroup;
    formInit = false;

    private subscriptions: Subscription = new Subscription();

    code1 = `<div *ngIf="!firstPageService.firstPage" class="d-flex flex-column align-items-stretch ps-3 pe-2 py-1">
    <span class="fas fa-sync fa-spin fa-fw"></span>
</div>
<div *ngIf="firstPageService.firstPage && formInit" class="d-flex flex-column align-items-stretch ps-3 pe-2 py-1">
    <form novalidate [formGroup]="form">
        <sq-advanced-form-select [form]="form" [field]="'treepath'" [multiple]="true"></sq-advanced-form-select>
        <sq-advanced-form-select [form]="form" [field]="'authors'" [multiple]="true"></sq-advanced-form-select>
        <sq-advanced-form-range [form]="form" [field]="'size'"></sq-advanced-form-range>
        <sq-advanced-form-range [form]="form" [field]="'modified'"></sq-advanced-form-range>
        <sq-advanced-form-multi-input [form]="form" [field]="'person'" [suggestQuery]="appService.suggestQueries? appService.suggestQueries[0] : ''"></sq-advanced-form-multi-input>
        <sq-advanced-form-input [form]="form" [field]="'docformat'" [suggestQuery]="appService.suggestQueries? appService.suggestQueries[0] : ''"></sq-advanced-form-input>
    </form>
</div>`;

    code2 = `@Input() query: Query;
@Output() filterEdit = new EventEmitter<Query>();

form: UntypedFormGroup;
formInit = false;

private subscriptions: Subscription = new Subscription();
constructor(
    public appService: AppService,
    public searchService: SearchService,
    public firstPageService: FirstPageService,
    public advancedService: AdvancedService,
    private formBuilder: UntypedFormBuilder
) {}

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.initAdvancedForm();
    this.subscriptions.add(this.form.valueChanges.pipe(debounceTime(1000)).subscribe(() => this.updateQuery()));
}

ngOnChanges(changes: SimpleChanges): void {
    if(changes.query && this.formInit) {
        this.updateFormOnQueryChange();
    }
}

ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
}

/** Initialize the advanced form with all the controls */
initAdvancedForm() {
    this.firstPageService.getFirstPage().pipe(take(1)).subscribe(
    () => {},
    () => {},
    () => {
        this.form.addControl('treepath', this.advancedService.createSelectControl('treepath', undefined, undefined, this.query));
        this.form.addControl('authors', this.advancedService.createSelectControl('authors', undefined, undefined, this.query));
        this.form.addControl('size', this.advancedService.createRangeControl('size',
            [ this.advancedService.validators.range('size') ], undefined, this.query
        ));
        this.form.addControl('modified', this.advancedService.createRangeControl('modified',
            [
            this.advancedService.validators.range('modified'),
            this.advancedService.validators.date('modified')
            ], undefined, this.query
        ));
        this.form.addControl('person', this.advancedService.createMultiInputControl('person', undefined, undefined, this.query));
        this.form.addControl('docformat', this.advancedService.createInputControl('docformat', undefined, undefined, this.query));
        this.formInit = true;
    });
}

/** Update form values according to changes at query level */
updateFormOnQueryChange() {
    this.form.get('treepath')?.setValue(this.advancedService.getValue('treepath', this.query), {emitEvent: false});
    this.form.get('authors')?.setValue(this.advancedService.getValue('authors', this.query), {emitEvent: false});
    this.form.get('size')?.setValue(this.advancedService.getRangeValue('size', this.query), {emitEvent: false});
    this.form.get('modified')?.setValue(this.advancedService.getRangeValue('modified', this.query), {emitEvent: false});
    this.form.get('person')?.setValue(this.advancedService.getValue('person', this.query), {emitEvent: false});
    this.form.get('docformat')?.setValue(this.advancedService.getValue('docformat', this.query), {emitEvent: false});
}

/** Update the query with user inputs */
updateQuery() {
    this.advancedService.setSelect('treepath', this.form.get('treepath')?.value, this.query);
    this.advancedService.setSelect('authors', this.form.get('authors')?.value, this.query);
    this.advancedService.setRangeSelect('size', this.form.get('size')?.value, this.query);
    this.advancedService.setRangeSelect('modified', this.form.get('modified')?.value, this.query);
    this.advancedService.setSelect('person', this.form.get('person')?.value, this.query);
    this.advancedService.setSelect('docformat', this.form.get('docformat')?.value, this.query);
    this.filterEdit.emit(this.query);
}

}`;

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public firstPageService: FirstPageService,
        public advancedService: AdvancedService,
        private formBuilder: UntypedFormBuilder
    ) {
        super();
        if (environment.mock) {
            this.firstPageService.firstPage = RESULTS as any;
        }
        this.globalService.loading.subscribe((state) => {
            if (!state) {
                this.query = this.globalService.query;
                this.form = this.formBuilder.group({});
                this.initAdvancedForm();
            }
        });
    }

    ngOnInit() {
        this.subscriptions.add(this.form.valueChanges.pipe(debounceTime(1000)).subscribe(() => this.updateQuery()));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.query && this.formInit) {
            this.updateFormOnQueryChange();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /** Initialize the advanced form with all the controls */
    initAdvancedForm() {
        this.form.addControl('treepath', this.advancedService.createSelectControl('treepath', undefined, undefined, this.query));
        this.form.addControl('authors', this.advancedService.createSelectControl('authors', undefined, undefined, this.query));
        this.form.addControl('size', this.advancedService.createRangeControl('size',
            [ this.advancedService.validators.range('size') ], undefined, this.query
        ));
        this.form.addControl('modified', this.advancedService.createRangeControl('modified',
            [
            this.advancedService.validators.range('modified'),
            this.advancedService.validators.date('modified')
            ], undefined, this.query
        ));
        this.form.addControl('person', this.advancedService.createMultiInputControl('person', undefined, undefined, this.query));
        this.form.addControl('docformat', this.advancedService.createInputControl('docformat', undefined, undefined, this.query));
        this.formInit = true;
    }

    /** Update form values according to changes at query level */
    updateFormOnQueryChange() {
        this.form.get('treepath')?.setValue(this.advancedService.getValue('treepath', this.query), {emitEvent: false});
        this.form.get('authors')?.setValue(this.advancedService.getValue('authors', this.query), {emitEvent: false});
        this.form.get('size')?.setValue(this.advancedService.getRangeValue('size', this.query), {emitEvent: false});
        this.form.get('modified')?.setValue(this.advancedService.getRangeValue('modified', this.query), {emitEvent: false});
        this.form.get('person')?.setValue(this.advancedService.getValue('person', this.query), {emitEvent: false});
        this.form.get('docformat')?.setValue(this.advancedService.getValue('docformat', this.query), {emitEvent: false});
    }

    /** Update the query with user inputs */
    updateQuery() {
        this.advancedService.setSelect('treepath', this.form.get('treepath')?.value, this.query);
        this.advancedService.setSelect('authors', this.form.get('authors')?.value, this.query);
        this.advancedService.setRangeSelect('size', this.form.get('size')?.value, this.query);
        this.advancedService.setRangeSelect('modified', this.form.get('modified')?.value, this.query);
        this.advancedService.setSelect('person', this.form.get('person')?.value, this.query);
        this.advancedService.setSelect('docformat', this.form.get('docformat')?.value, this.query);
        this.filterEdit.emit(this.query);
    }

}
