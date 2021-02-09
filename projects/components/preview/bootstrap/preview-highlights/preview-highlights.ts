import { Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import { HighlightDataPerCategory, CategoryHighlightData, HighlightDataPerLocation, PreviewData } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { PreviewDocument, HighlightCategoryFilterState, HighlightCategoryFilterChoice } from "../../preview-document";


export interface HighlightNavigationState {
    current: number;
    filters: { [key: string] : HighlightCategoryFilterState };
}


@Component({
    selector: "sq-preview-highlights",
    templateUrl: "./preview-highlights.html",
    styleUrls: ["./preview-highlights.scss"]
})
export class BsPreviewHighlights implements OnChanges {

    @Input() previewDocument: PreviewDocument;
    @Input() previewData: PreviewData;

    // Highlight data retrieved by the server
    public highlightDataPerCategory?: HighlightDataPerCategory;
    private highlightDataPerLocation?: HighlightDataPerLocation;

    // Selected entity & filters (the .filters[category] are the NgModel of the select elements)
    public navigationState: HighlightNavigationState;

    // highlight data resulting from filtering
    private filteredHighlightData?: HighlightDataPerLocation;


    ngOnChanges(changes: SimpleChanges) {
        if(changes["previewData"]){
            this.initialize();
        }
        if (changes["previewDocument"]) {
            if (this.previewReady) {
                this.moveToFirstSearchTerm();
            }
        }
    }

    private initialize(): void {
        this.highlightDataPerCategory = !this.previewData ? undefined : this.previewData.highlightsPerCategory;
        this.highlightDataPerLocation = !this.previewData ? undefined : this.previewData.highlightsPerLocation;
        this.navigationState = new SimpleHighlightNavigationState(this.nonEmptyCategoryIds);
        this.reset();
    }

    /**
     * Called on init and when non-value filters are clicked
     * Resets the navigationState entity selection.
     * Applies the filters to the preview document.
     * Updates the filtered data.
     */
    public reset(): void {
        this.navigationState.current = -1;  // Resets the navigationState entity selection.
        if(this.previewReady)               // Applies the filters to the preview document.
            this.previewDocument.filterHighlights(this.navigationState.filters);
        // Updates the filtered data.
        this.filteredHighlightData = this.highlightDataPerLocation ?
            new FilteredHighlightDataPerLocation(this.highlightDataPerLocation, this.navigationState.filters) : undefined;
    }

    /**
     * Selects the first match location (highlight classes and scrolls to it)
     */
    private moveToFirstSearchTerm(): void {
        if (this.filteredHighlightData) {
            for (let i = 0, ic = this.total; i < ic; i++) {
                const highlight = this.filteredHighlightData[i];
                if (highlight.positionInCategories) {
                    let category = "term1";
                    let position = highlight.positionInCategories[category];
                    if (!Utils.isNumber(position)) {
                        category = "matchlocations";
                        position = highlight.positionInCategories[category];
                    }
                    if (Utils.isNumber(position)) {
                        this.navigationState.current = i;
                        this.previewDocument.selectHighlight(category, position);
                        break;
                    }
                }
            }
        }
    }

    /**
     * Index of currently selected entity (from 1)
     */
    get current(): number {
        return this.navigationState.current + 1;
    }

    /**
     * No categories to highlight
     */
    get noData(): boolean {
        return this.nonEmptyCategoryIds.length === 0;
    }

    /**
     * Total number of highlights
     */
    get total(): number {
        return this.filteredHighlightData ? this.filteredHighlightData.size() : 0;
    }

    /**
     * @returns true when the document is ready to be interacted with
     */
    get previewReady(): boolean {
        return !!this.previewDocument;
    }

    /**
     * Returns the currently selected entity/match/extract based on the PreviewData
     * or potentially by fetching it directly from the HTML document.
     */
    get currentValue(): string {
        if (this.navigationState.current < 0 || !this.filteredHighlightData) {
            return "";
        }
        const result: string = this.filteredHighlightData[this.navigationState.current].displayValue;
        if (result) {
            return result;
        }
        const values: string[] = this.filteredHighlightData[this.navigationState.current].values;
        if (values && values.length > 0 && values[0] && values[0].length > 0) {
            return values[0];
        }
        if (Object.keys(this.filteredHighlightData[this.navigationState.current].positionInCategories).length === 1
                && this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]) {
            return this.previewDocument.getHighlightText(
                "extractslocations",
                this.filteredHighlightData[this.navigationState.current].positionInCategories["extractslocations"]);
        }
        return "";
    }

    /**
     * Get categories of the currently selected entity/match/extract
     * based on the filtered Highlight data per location
     */
    get currentCategories(): string[] {
        const result: string[] = [];
        if (this.navigationState.current < 0 || !this.filteredHighlightData || this.navigationState.current >= this.filteredHighlightData.size()) {
            return result;
        }
        for (const categoryId in this.filteredHighlightData[this.navigationState.current].positionInCategories) {
            result.push(categoryId);
        }
        return result;
    }

    public categoryIconClass(categoryId: string): string {
        if (categoryId.startsWith("term")) {
            return "far fa-flag";
        }
        return "sq-icon-" + categoryId;
    }

    public getCategoryHighlightData(categoryId: string): CategoryHighlightData | undefined {
        return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId] : undefined;
    }

    public categoryDisplayLabel(categoryId: string): string {
        return this.highlightDataPerCategory ? this.highlightDataPerCategory[categoryId].categoryDisplayLabel : "";
    }

    public categoryLabelPipeParams(categoryId: string): any {
        if (!categoryId.startsWith("term")) {
            return {};
        }
        const index = Number(categoryId.slice("term".length));
        if (isNaN(index)) {
            return {};
        }
        return {values: {index: index}};
    }


    /**
     * Returns the list of entity categories that contain values
     */
    get nonEmptyCategoryIds(): string[] {
        const result: string[] = [];
        for (const categoryId in this.highlightDataPerCategory) {
            if (!this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
                result.push(categoryId);
            }
        }
        return result;
    }

    private categoryIsEmpty(categoryId: string, highlightData : HighlightDataPerCategory): boolean {
        return highlightData[categoryId] == null
            || highlightData[categoryId].values == null
            || highlightData[categoryId].values.length <= 0;
    }

    /**
     * @returns true if there is more than one option per category
     * @param categoryId the category id
     */
    public categoryHasMultipleValues(categoryId: string): boolean {
        return this.getHighlightValueCount(categoryId) > 1;
    }

    /**
     * @returns the number of options per category
     * @param categoryId the category id
     */
    public getHighlightValueCount(categoryId: string): number {
        if (!this.highlightDataPerCategory || this.categoryIsEmpty(categoryId, this.highlightDataPerCategory)) {
            return 0;
        }
        const values = this.highlightDataPerCategory[categoryId].values;
        if (values == null) {
            return 0;
        }
        return values.length;
    }


    // Navigation buttons handlers

    first() {
        if (this.navigationState.current > 0) {
            this.navigationState.current = 0;
            this.selectHighlight();
        }
    }

    previous() {
        if (this.navigationState.current > 0) {
            this.navigationState.current--;
            this.selectHighlight();
        }
    }

    next() {
        if (this.navigationState.current < this.total - 1) {
            this.navigationState.current++;
            this.selectHighlight();
        }
    }

    last() {
        if (this.navigationState.current !== this.total - 1) {
            this.navigationState.current = this.total - 1;
            this.selectHighlight();
        }
    }

    private selectHighlight(): void {
        if (this.filteredHighlightData) {
            const positionInCategories: { [categoryId: string]: number } = this.filteredHighlightData[this.navigationState.current].positionInCategories;
            const firstCategory: string = Object.keys(positionInCategories)[0];
            this.previewDocument.selectHighlight(firstCategory, positionInCategories[firstCategory]);
        }
    }

    public selectAll(): void {
        for (const categoryId in this.navigationState.filters) {
            this.navigationState.filters[categoryId] = this.keepAllFilter;
        }
        this.reset();
    }

    public selectNone(): void {
        for (const categoryId in this.navigationState.filters) {
            this.navigationState.filters[categoryId] = this.keepNoneFilter;
        }
        this.reset();
    }

    get allSelected(): boolean {
        for (const categoryId in this.navigationState.filters) {
            const filter: HighlightCategoryFilterState = this.navigationState.filters[categoryId];
            if (filter && filter.choice !== HighlightCategoryFilterChoice.All) {
                return false;
            }
        }
        return true;
    }

    get noneSelected(): boolean {
        for (const categoryId in this.navigationState.filters) {
            const filter: HighlightCategoryFilterState = this.navigationState.filters[categoryId];
            if (!filter || filter.choice !== HighlightCategoryFilterChoice.None) {
                return false;
            }
        }
        return true;
    }


    // Entity filters

    // Trivial filters
    public keepAllFilter: HighlightCategoryFilterState = new SimpleHighlightCategoryFilterState();
    public keepNoneFilter: HighlightCategoryFilterState = new SimpleHighlightCategoryFilterState(HighlightCategoryFilterChoice.None);

    // Filter created for each option
    public newFilter(value: string) {
        return new SimpleHighlightCategoryFilterState(value);
    }

    // A filter was clicked
    selectFilter(categoryId: string, value: HighlightCategoryFilterState){
        //console.log(categoryId, value);

        // If a specific entity/extract is selected we want to select it, rather than filter other entities
        if(value.choice === HighlightCategoryFilterChoice.Value){

            // First, let's cancel value filters EXCEPT the one that was just selected
            for(const key in this.navigationState.filters){
                if(key !== categoryId && this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter){
                    this.navigationState.filters[key] = this.keepAllFilter;
                }
            }

            // Search the entity ID
            let highlight;
            for(const key in this.highlightDataPerLocation){
                highlight = this.highlightDataPerLocation[key];
                if(highlight.positionInCategories[categoryId] && highlight.values.includes(value.filterValue)){
                    break;
                }
            }

            if(highlight){
                this.previewDocument.selectHighlight(categoryId, highlight.positionInCategories[categoryId]);
            }

        }
        else {

            // Cancel value filters
            for(const key in this.navigationState.filters){
                if(this.navigationState.filters[key] !== this.keepAllFilter && this.navigationState.filters[key] !== this.keepNoneFilter){
                    this.navigationState.filters[key] = this.keepAllFilter;
                }
            }

            // Reset just applies the (non-value) filters as they are and removes selection
            this.reset();

        }
    }

    /**
     * Comparator allowing to sort the filters in the select
     */
    public compareFilters(filter1: HighlightCategoryFilterState, filter2: HighlightCategoryFilterState): boolean {
        return SimpleHighlightCategoryFilterState.compare(filter1, filter2);
    }


}




// Implementation of data structures

class SimpleHighlightNavigationState {

    current: number;
    filters: { [key: string] : HighlightCategoryFilterState};

    constructor(categories: string[]) {
        this.current = -1;  // No selection
        this.filters = {};
        for (const category of categories) {
            this.filters[category] = new SimpleHighlightCategoryFilterState(); // All entities visible by default
        }
    }
}


class SimpleHighlightCategoryFilterState implements HighlightCategoryFilterState {
    readonly choice: HighlightCategoryFilterChoice = HighlightCategoryFilterChoice.All;
    private _filterValue: string = "";

    constructor(param?: string | HighlightCategoryFilterChoice) {
        if (param == null) {
            return;
        }
        if (typeof param === "string") {
            this.choice = HighlightCategoryFilterChoice.Value;
            this._filterValue = param;
        } else {
            this.choice = param;
        }
    }

    get filterValue(): string {
        if (this.choice === HighlightCategoryFilterChoice.Value) {
            return this._filterValue;
        }
        return "";
    }

    public static compare(filter1: HighlightCategoryFilterState, filter2: HighlightCategoryFilterState) {
        if(filter1 && filter2) {
            if(filter1.choice !== filter2.choice) {
                return false;
            }
            return filter1.choice !== HighlightCategoryFilterChoice.Value
                || filter1.filterValue === filter2.filterValue;
        }
        return filter1 === filter2;
    }
}


class FilteredHighlightDataPerLocation implements HighlightDataPerLocation {

    [index: number]: {
        start: number,
        length: number,
        values: string[],
        displayValue: string,
        positionInCategories: { [category: string]: number }
    };

    public constructor(baseData: HighlightDataPerLocation, filters: { [key: string] : HighlightCategoryFilterState }) {
        let counter: number = 0;
        for (const i in baseData) {
            const categories = !baseData[i].positionInCategories ? undefined : Object.keys(baseData[i].positionInCategories);
            if (categories && this.locationIsIncluded(baseData[i].values, categories, filters)) {
                this[counter] = baseData[i];
                counter++;
            }
        }
    }

    size(): number {
        return Object.keys(this).length;
    }

    public locationIsIncluded(values: string[], categories: string[], filters: { [key: string] : HighlightCategoryFilterState }): boolean {
        if (!categories) {
            return false;
        }
        for (const category of categories) {
            if (filters[category] &&
                (filters[category].choice === HighlightCategoryFilterChoice.All
                || filters[category].choice === HighlightCategoryFilterChoice.Value && values != null && values.includes(filters[category].filterValue))) {
                return true;
            }
        }
        return false;
    }
}
