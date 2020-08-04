import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Utils } from '@sinequa/core/base';
import { AppService } from '@sinequa/core/app-utils';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { Results, ListAggregation, AggregationItem } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { Action } from '@sinequa/components/action';
import { UserPreferences } from '@sinequa/components/user-settings';
import { SelectionService } from '@sinequa/components/selection';
import { HeatmapItem } from './heatmap.component';

@Component({
    selector: "sq-facet-heatmap",
    templateUrl: './facet-heatmap.component.html'
})
export class BsFacetHeatmapComponent extends AbstractFacet implements OnChanges {
    @Input() results: Results;
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
    @Input() margin = {top: 100, bottom: 20, left: 100, right: 40};
    @Input() transition = 1000; // Transition time in ms (0 to avoid transitions)
    @Input() buckets = 9; // Color buckets
    @Input() colorScheme = "schemeBlues"; // Color scheme from D3
    @Input() maxX = 20; // Max items on X
    @Input() maxY = 20; // Max items on Y

    // Interaction settings
    @Input() itemsClickable = true;
    @Input() axisClickable = true;
    @Input() highlightSelected = true;

    // Data
    aggregationData?: ListAggregation;
    data?: HeatmapItem[];

    // Actions
    selectFieldX: Action;
    selectFieldY: Action;
    clearFilters: Action;

    // Settings form
    form: FormGroup;

    // Selected items
    readonly selectedItems = new Set<string>();

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public facetService: FacetService,
        public selectionService: SelectionService,
        public formBuilder: FormBuilder,
        public cdRef: ChangeDetectorRef,
        public prefs: UserPreferences
    ){
        super();
           
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.searchService.query.removeSelect(this._name);
                this.searchService.search();
            }
        });

        // Listen to selection changes & update the heatmap items accordingly
        this.selectionService.events.subscribe(() => {
            if(this.highlightSelected) {
                // Update the selectedItems set
                this.updateSelectedItems();
    
                // Update the data
                if(this.data){
                    this.data.forEach(item => item.selected = this.selectedItems.has(this.fieldCooc ? item.value : item.display));
                    this.cdRef.markForCheck();
                }
            }
        });
    }

    // The name of the heatmap is used to identify it in the list of breadcrumbs and the user preferences
    get _name(): string{
        return this.name || 'heatmap-'+this.aggregation.toLowerCase();
    }

    /**
     * On changes triggers when the results change (following a new query)
     */
    ngOnChanges() {
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
        // Create the heatmap data
        if(this.results) {
            this.aggregationData = this.facetService.getAggregation(this.aggregation, this.results);
            if(!this.aggregationData){
                this.getHeatmapData();
            }
            else {
                this.data = this.processAggregation();
            }
        }
    }
    
    /**
     * This method is called by the parent sq-facet-card when the settings
     * button is clicked. This has the effect of displaying the settingsTpl template
     * instead of the heatmap.
     * @param opened if true settings are opened, if false they are closed
     */
    onOpenSettings(opened: boolean){
        if(opened) {

            const maxXControl = new FormControl(this.maxXPref);
            const maxYControl = new FormControl(this.maxYPref);
            const rescaleControl = new FormControl(!!this.prefs.get(this._name+'-rescale'));
            const colorControl = new FormControl(this.colorSchemePref);

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
            this.ngOnChanges();
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
    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.facetService.hasFiltered(this._name)){
            actions.push(this.clearFilters);
        }
        actions.push(this.selectFieldY, this.selectFieldX);
        return actions;
    }

    /**
     * Queries the server for the heatmap data via the Search Service
     */
    getHeatmapData() {
        if(!this.appService.getCCAggregation(this.aggregation)) {
            throw new Error(`Aggregation ${this.aggregation} does not exist in the Query web service configuration`);
        }
        const query = Utils.copy(this.searchService.query);
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
    = value => {
        if(!value.display){
            throw new Error(`Aggregation Item '${value.value}' has no display value`);
        }
        const parts = value.display.split("/");
        if(parts.length < 2){
            throw new Error(`'${value.display}' does not contain the '/' cross-distribution separator`);
        }
        return {
            x: parts[0],
            y: parts[1],
            count: value.count,
            display: value.display,
            value: value.value as string,
            selected: this.selectedItems.has(value.display)
        };
    }
    
    /**
     * Default parsing method for cooccurrence aggregation data
     */
    @Input() parseCooccurrenceItem: (i:AggregationItem) => HeatmapItem 
    = value => {
        const val = value.display || value.value.toString();
        const parts = val.substr(1, val.length-2).split(")#(");
        if(parts.length < 2){
            throw new Error(`'${val}' is not formatted as a co-occurrence: (value 1)#(value 2)`);
        }
        return {
            x: parts[0],
            y: parts[1],
            count: value.count,
            display: `${parts[0]} - ${parts[1]}`,
            value: value.value.toString(),
            selected: this.selectedItems.has(value.value.toString())
        };
    }

    /**
     * Callback when a heatmap time is clicked
     * @param item 
     */
    onItemClicked(item: HeatmapItem){
        if(this.aggregationData){
            this.facetService.addFilterSearch(this._name, this.aggregationData, item);
        }
    }

    /**
     * Callback when a value of an axis is clicked
     * @param item 
     */
    onAxisClicked(item: {value: string, axis: 'x' | 'y'}){
        this.searchService.addFieldSelect(item.axis === 'x'? this.fieldXPref : this.fieldYPref, item);
        this.searchService.search();
    }

    /**
     * Helper method to build the actions for selecting each dimension
     * @param axis 
     */
    selectField(axis: 'x' | 'y'): Action {
        return new Action({
            title: "Select field",
            updater: (action) => {
                action.name = axis === 'x'? this.fieldXPref : this.fieldYPref;
                action.text = this.appService.getPluralLabel(axis === 'x'? this.fieldXPref : this.fieldYPref);
                action.icon = "sq-icon-"+(axis === 'x'? this.fieldXPref : this.fieldYPref),
                action.children = ((axis === 'x'? this.fieldsX : this.fieldsY) || [])
                    .filter(f => f !== (axis === 'x'? this.fieldXPref : this.fieldYPref))
                    .map(f => {
                        return new Action({
                            name: f,
                            text: this.appService.getPluralLabel(f),
                            icon: "sq-icon-"+f,
                            action : () => {
                                this.prefs.set(this._name+'-field-'+axis, f);
                                this.ngOnChanges();
                            }
                        });
                    });
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

        if(this.results){

            this.results.records
                .filter(r => r.$selected)
                .forEach(r => {

                    if(this.fieldCooc) {                
                        if(r[this.fieldCooc]){
                            r[this.fieldCooc].forEach(v => this.selectedItems.add(v.value));                                
                        }
                    }

                    else {
                        if(r[this.fieldXPref] && r[this.fieldYPref]){
                            r[this.fieldXPref].forEach(x => {
                                r[this.fieldYPref].forEach(y => {
                                    this.selectedItems.add(x.display+"/"+y.display);
                                });
                            });
                        }
                    }
            });
        }
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