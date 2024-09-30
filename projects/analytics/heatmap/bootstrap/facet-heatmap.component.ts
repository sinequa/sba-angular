import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Optional, OnDestroy, inject, DoCheck } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import {FieldValue, Utils} from '@sinequa/core/base';
import { AppService, Query } from '@sinequa/core/app-utils';
import { AbstractFacet, BsFacetCard, FacetService } from '@sinequa/components/facet';
import { Results, ListAggregation, AggregationItem, Filter } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { Action } from '@sinequa/components/action';
import { UserPreferences } from '@sinequa/components/user-settings';
import { SelectionService } from '@sinequa/components/selection';

import {HeatmapItem} from './heatmap.component';

@Component({
    selector: "sq-facet-heatmap",
    templateUrl: './facet-heatmap.component.html'
})
export class BsFacetHeatmapComponent extends AbstractFacet implements OnChanges, OnDestroy, DoCheck {
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation= "Heatmap";
    @Input() name?: string;

    // Fields primarily used for a cross-distribution heatmap
    @Input() fieldX?: string;
    @Input() fieldY?: string;
    @Input() fieldsX?: string[];
    @Input() fieldsY?: string[];

    // Field used for a cooccurrence heatmap (optionally fieldX and fieldY can be used for filtering based on axes)
    @Input() fieldCooc?: string;

    // Graphical settings
    @Input() height = 600; // Height of the SVG viewbox (will adjust to container while preserving aspect ratio)
    @Input() width = 600; // Width of the SVG viewbox (will adjust to container while preserving aspect ratio)
    @Input() allowResizeOption = true; // The resize option allows to adjust the actual width/height in function of the number of items on each axis. If set to false, the tiles are resized so that the heatmap always matches the input width/height.
    @Input() margin = {top: 100, bottom: 20, left: 100, right: 40};
    @Input() transition = 1000; // Transition time in ms (0 to avoid transitions)
    @Input() buckets = 9; // Color buckets
    @Input() colorScheme = "schemeBlues"; // Color scheme from D3
    @Input() maxX = 20; // Max items on X
    @Input() maxY = 20; // Max items on Y
    @Input() theme: "light" | "dark" = "light";

    // Interaction settings
    @Input() itemsClickable = true;
    @Input() axisClickable = true;
    @Input() highlightSelected = true;

    // Data
    aggregationData?: ListAggregation;
    data?: HeatmapItem[];

    // Actions
    selectFieldX?: Action;
    selectFieldY?: Action;
    clearFilters: Action;

    // Settings form
    form: UntypedFormGroup;

    // Selected items
    readonly selectedItems = new Set<string>();

    // A flag to wait for the parent component to actually display this child, since creating
    // the heatmap component without displaying causes strange bugs...
    ready = false;

    // A flag to check if the data is currently loading or not
    loading = false;

    private subs = new Subscription();

    protected readonly appService = inject(AppService);
    protected readonly searchService = inject(SearchService);
    protected readonly facetService = inject(FacetService);
    protected readonly selectionService = inject(SelectionService);
    protected readonly formBuilder = inject(UntypedFormBuilder);
    protected readonly cdRef = inject(ChangeDetectorRef);
    protected readonly prefs = inject(UserPreferences);

    constructor(@Optional() public cardComponent?: BsFacetCard){
        super();

        this.subs.add(this.cardComponent?.facetCollapsed.subscribe(value => {
            this.ready = value === "expanded" ? true : false
        }));

        // Listen to selection changes & update the heatmap items accordingly
        this.subs.add(this.selectionService.events.subscribe(() => {
            if(this.highlightSelected) {
                // Update the selectedItems set
                this.updateSelectedItems();

                // Update the data
                if(this.data){
                    for(let item of this.data) {
                        item.selected = this.isSelected(item.x.value, item.y.value);
                    }
                    this.cdRef.markForCheck();
                }
            }
        }));

    }

    // The name of the heatmap is used to identify it in the list of breadcrumbs and the user preferences
    get _name(): string{
        return this.name || 'heatmap-'+this.aggregation.toLowerCase();
    }

    /**
     * On changes triggers when the results change (following a new query)
     */
    ngOnChanges(changes: SimpleChanges) {
        this.updateActions();
        // Create the heatmap data
        if(changes['results'] || changes['aggregation']) {
            this.updateData();
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }


    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngDoCheck(){
        // We check that the parent component (if any) as been expanded at least once so that the fusioncharts
        // gets created when it is visible (otherwise, there can be visual bugs...)
        this.ready = !this.cardComponent?._collapsed;
    }


    /**
     * Update the actions for selecting the X or Y fields
     */
    updateActions() {
        // Create or update the actions to change the X and Y axis
        if(this.fieldsX){
            if(!this.selectFieldX){
                this.selectFieldX = this.selectField('x');
            }
            this.selectFieldX.update();
        }
        if(this.fieldsY){
            if(!this.selectFieldY){
                this.selectFieldY = this.selectField('y');
            }
            this.selectFieldY.update();
        }
    }

    /**
     * Updates the heatmap data
     */
    updateData() {
        this.loading = true;
        if(this.results) {
            this.updateSelectedItems();
            this.aggregationData = this.facetService.getAggregation(this.aggregation, this.results) as ListAggregation;
            if(!this.aggregationData){
                this.getHeatmapData();
            }
            else {
                this.data = this.processAggregation();
            }
        }
        else {
            this.data = undefined;
            this.loading = false;
        }
    }

    /**
     * This method is called by the parent sq-facet-card when the settings
     * button is clicked. This has the effect of displaying the settingsTpl template
     * instead of the heatmap.
     * @param opened if true settings are opened, if false they are closed
     */
    override onOpenSettings(opened: boolean){
        if(opened) {

            const maxXControl = new UntypedFormControl(this.maxXPref);
            const maxYControl = new UntypedFormControl(this.maxYPref);
            const rescaleControl = new UntypedFormControl(!!this.prefs.get(this._name+'-rescale'));
            const colorControl = new UntypedFormControl(this.colorSchemePref);

            this.form = this.formBuilder.group({
                maxX: maxXControl,
                maxY: maxYControl,
                scaleAxes: rescaleControl,
                colors: colorControl
            });

            this.form.valueChanges.subscribe(_ => {
                this.prefs.set(this._name+'-max-x', maxXControl.value, true);
                this.prefs.set(this._name+'-max-y', maxYControl.value, true);
                this.prefs.set(this._name+'-rescale', rescaleControl.value, true);
                this.prefs.set(this._name+'-color-scheme', colorControl.value, true);
                this.debounceSync();
            });
        }
        else {
            this.updateData();
        }
    }

    // Debounce syncing to avoid many calls to the user settings web service
    debounceSync = Utils.debounce(() => {
        this.prefs.sync();
    }, 1000);

    /**
     * This method resets all the user preferences and rebuilds the settings form,
     * so that the values displayed are up-to-date
     */
    setDefaults() {
        this.prefs.delete(this._name+'-field-x', true);
        this.prefs.delete(this._name+'-field-y', true);
        this.prefs.delete(this._name+'-max-x', true);
        this.prefs.delete(this._name+'-max-y', true);
        this.prefs.delete(this._name+'-rescale', true);
        this.prefs.delete(this._name+'-color-scheme', true);
        this.prefs.sync();
        this.onOpenSettings(true);
    }

    /**
     * Returns the list of actions to display for this facet component
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.selectFieldY) {
            actions.push(this.selectFieldY);
        }
        if(this.selectFieldX) {
            actions.push(this.selectFieldX);
        }
        return actions;
    }

    /**
     * Queries the server for the heatmap data via the Search Service
     */
    getHeatmapData() {
        if(!this.appService.getCCAggregation(this.aggregation)) {
            throw new Error(`Aggregation ${this.aggregation} does not exist in the Query web service configuration`);
        }
        const query = (this.query || this.searchService.query).copy();
        query.action = "aggregate";
        query.aggregations = [this.aggregation];
        if(!this.fieldCooc) {
            query["heatmapField1"] = this.fieldXPref;
            query["heatmapField2"] = this.fieldYPref;
        }

        this.searchService.getResults(query).subscribe(
            results => {
                this.aggregationData = results.aggregations[0] as ListAggregation;
                this.data = this.processAggregation();
            }
        );
    }

    /**
     * Transform an aggregation into a list of HeatmapItem objects
     */
    processAggregation(): HeatmapItem[] | undefined {
        this.loading = false;
        if (!this.aggregationData || !this.aggregationData.items) {
            return undefined;
        }
        if(this.fieldCooc) {
            return this.aggregationData.items.map(this.parseCooccurrenceItem);
        }
        else {
            return this.aggregationData.items.map(this.parseCrossDistributionItem);
        }
    }

    /**
     * Default parsing method for cross-distribution aggregation data
     */
    @Input() parseCrossDistributionItem: (i:AggregationItem) => HeatmapItem
    = item => {
        if(!item.display){
            throw new Error(`Aggregation Item '${item.value}' has no display value`);
        }
        // Default parsing, assuming cross-distribution format ("Apple/Steve Jobs")
        const keySeparator = this.aggregationData?.$ccaggregation?.keySeparator || "/";
        const displays = item.display.split(keySeparator);
        // Expr has following syntax `display`:(column1:`value1` AND column2:`value2`)
        const expr = String(item.value);
        const subExpr = expr.substring((Utils.escapeExpr(item.display)+":(").length, expr.length-1).split(" AND ");
        const values = subExpr.map(v => Utils.unescapeExpr(v.split(':')[1]));
        if(values.length < 2 || displays.length < 2 || !values[0] || !values[1]) {
            throw new Error(`Incorrect aggregation item (${item.value}, ${item.display})`);
        }
        const x = {display: displays[0], value: values[0]};
        const y = {display: displays[1], value: values[1]};
        return {
            x, y, count: item.count,
            selected: this.isSelected(x.value, y.value)
        };
    }

    /**
     * Default parsing method for cooccurrence aggregation data
     */
    @Input() parseCooccurrenceItem: (i:AggregationItem) => HeatmapItem
    = item => {
        const values = String(item.value);
        const displays = item.display || values;
        const valueParts = values.substring(1, values.length-1).split(")#(");
        const displayParts = displays.substring(1, displays.length-1).split(")#(");
        if(valueParts.length !== 2 || displayParts.length !== 2){
            throw new Error(`'${values}' is not formatted as a co-occurrence: (value 1)#(value 2)`);
        }
        const x = {display: displayParts[0], value: valueParts[0]};
        const y = {display: displayParts[1], value: valueParts[1]};
        return {
            x, y, count: item.count,
            selected: this.isSelected(x.value, y.value)
        };
    }

    /**
     * Callback when a heatmap time is clicked
     * @param item
     */
    onItemClicked(item: HeatmapItem) {
        const display = `${item.x.display} - ${item.y.display}`;
        let filter: Filter;
        if(this.fieldCooc) {
            filter = {field: this.fieldCooc, value: `(${item.x.value})#(${item.y.value})`, display};
        }
        else {
            filter = {
                operator: "and", display,
                filters: [
                    {field: this.fieldXPref, value: item.x.value},
                    {field: this.fieldYPref, value: item.y.value},
                ]
            }
        }
        this.facetService.applyFilterSearch(filter, this.query, false, this._name);
    }

    /**
     * Callback when a value of an axis is clicked
     * @param item
     */
    onAxisClicked(item: {value: string, display: string, axis: 'x' | 'y'}){
        if(this.fieldCooc) {
            return; // We only know the field of the cooccurrence, but we don't know the field of each axis
        }
        const filter: Filter = {
            field: item.axis === 'x'? this.fieldXPref : this.fieldYPref,
            value: item.value,
            display: item.display
        }
        this.facetService.applyFilterSearch(filter, this.query, false, this._name);
    }

    /**
     * Helper method to build the actions for selecting each dimension
     * @param axis
     */
    selectField(axis: 'x' | 'y'): Action {
        return new Action({
            title: "Select field",
            scrollable: true,
            updater: (action) => {
                action.name = axis === 'x'? this.fieldXPref : this.fieldYPref;
                action.text = this.appService.getPluralLabel(axis === 'x'? this.fieldXPref : this.fieldYPref);
                action.icon = "sq-icon-"+(axis === 'x'? this.fieldXPref : this.fieldYPref);
                action.children = ((axis === 'x'? this.fieldsX : this.fieldsY) || [])
                    .filter(f => f !== (axis === 'x'? this.fieldXPref : this.fieldYPref))
                    .map(f => new Action({
                        name: f,
                        text: this.appService.getPluralLabel(f),
                        icon: "sq-icon-"+f,
                        action : () => {
                            this.prefs.set(this._name+'-field-'+axis, f);
                            this.updateActions();
                            this.updateData();
                        }
                    }));
            }
        });
    }

    /**
     * When the list of selected record changes we need to refresh the
     * selectedItems Set (which can then be used to set the 'selected'
     * property of HeatmapItem)
     */
    updateSelectedItems() {

        this.selectedItems.clear();

        for(let record of this.results.records.filter(r => r.$selected)) {
            if(this.fieldCooc) {
                for(let v of this.getFieldValues(record[this.fieldCooc])) {
                    this.selectedItems.add(v.toLowerCase());
                }
            }

            else {
                const xx = this.getFieldValues(record[this.fieldXPref]);
                const yy = this.getFieldValues(record[this.fieldYPref]);
                for(let x of xx) {
                    for(let y of yy) {
                        this.selectedItems.add(`(${x})#(${y})`.toLowerCase());
                    }
                }
            }
        }
    }

    getFieldValues(field: FieldValue|undefined): string[] {
        if(!field) {
            return [];
        }
        if(Array.isArray(field)) {
            return field.map(v => Utils.isString(v)? v : v.value);
        }
        else {
            return [String(field)];
        }
    }

    isSelected(x: string, y: string) {
        return this.selectedItems.has(`(${x})#(${y})`.toLowerCase());
    }

    // Accessor methods to get the preferred or default values of the heatmap parameters

    get fieldXPref(): string {
        return this.prefs.get(this._name+'-field-x') || this.fieldX;
    }

    get fieldYPref(): string {
        return this.prefs.get(this._name+'-field-y') || this.fieldY;
    }

    get maxXPref(): number {
        return this.prefs.get(this._name+'-max-x') || this.maxX;
    }

    get maxYPref(): number {
        return this.prefs.get(this._name+'-max-y') || this.maxY;
    }

    get colorSchemePref(): string {
        return this.prefs.get(this._name+'-color-scheme') || this.colorScheme;
    }

    get widthPref(): number {
        if(this.prefs.get(this._name+'-rescale')){
            return ((this.width - this.margin.left - this.margin.right) * this.maxXPref / this.maxX) + this.margin.left + this.margin.right
        }
        return this.width;
    }

    get heightPref(): number {
        if(this.prefs.get(this._name+'-rescale')){
            return ((this.height - this.margin.top - this.margin.bottom) * this.maxYPref / this.maxY) + this.margin.top + this.margin.bottom
        }
        return this.height;
    }
}
