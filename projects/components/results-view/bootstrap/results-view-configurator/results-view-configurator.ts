import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import {ResultsView} from '../../results-view.service';

/**
 * Component for choosing the page size of the results view in customize mode.
 *
 */
@Component({
    selector: 'sq-results-view-configurator',
    templateUrl: './results-view-configurator.html'
})
export class BsResultsViewConfigurator implements OnChanges {
    @Input() resultsView: ResultsView;
    private pageSize: number | undefined;

    public form: FormGroup;
    public resultsViewName: string;

    constructor(
        private formBuilder: FormBuilder,
        private searchService: SearchService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.resultsViewName = this.resultsView.name;

        this.form = this.formBuilder.group({
            'pageSize': [this.pageSize, Validators.min(1)]
        });    
    }

    /**
     * Updates the view page size in user settings and resets the results view if needed.
     *
     */
    public updatePageSize(): void {
        const formValue = this.form.value['pageSize'];
        const resultViewPageSize = (!Utils.isUndefined(formValue) && !Utils.isEmpty(formValue))
            ? Utils.asNumber(formValue)
            : undefined;
        if (this.pageSize !== resultViewPageSize) {
            this.pageSize = resultViewPageSize;

            this.searchService.query.pageSize = resultViewPageSize;
            this.searchService.search();
        }
    }
}
