import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";
import { AbstractFacet } from "../../abstract-facet";
import {
    Results,
    AggregationItem,
    Aggregation,
} from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { FacetService } from "../../facet.service";
import { Utils } from "@sinequa/core/base";

export interface TagCloudItem {
    aggregation: Aggregation;
    item: AggregationItem;
    weight: number;
}

@Component({
    selector: "sq-facet-tag-cloud",
    templateUrl: "./facet-tag-cloud.html",
    styleUrls: ["./facet-tag-cloud.scss"],
})
export class BsFacetTagCloud extends AbstractFacet implements OnChanges {
    /** search results */
    @Input() results: Results;
    /** list of aggregations to be considered in collecting tag-cloud data */
    @Input() aggregations: string | string[];
    /** maximum number of data to be displayed in tag-cloud */
    @Input() limit = 50;
    /** the way data are collected from given aggregations: equal repartition between them or most relevant among all of them */
    @Input() uniformRepartition = false;
    /** show/hide number of occurrences of each item*/
    @Input() showCount = false;
    /** define the size of each displayed item: common size for all or proportional size based on their count */
    @Input() proportionalWeight = true;
    /** lowest count under which items will not be taken into account in tag-cloud data */
    @Input() countThreshold = 0;
    /** wether data are rendered following their count sorting or randomly */
    @Input() shuffleData = false;
    /** Isolate filtering results from other facets available in the app */
    @Input() isolateFacetFilters = false;

    aggregationsData: Aggregation[] = [];
    tagCloudData: TagCloudItem[] = [];
    private filtered: AggregationItem[] = [];

    // Actions enabled within the facet
    private readonly clearFilters: Action;
    // Default weight to be applied if proportionalWeight = false
    private readonly defaultWeight = 2;
    // Prefix for tag-cloud facet name to be used if isolateFacetFilters = true
    private readonly tagCloudFacetPrefix = "tag-cloud_";

    constructor(private facetService: FacetService) {
        super();

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                if (Utils.isArray(this.aggregations)) {
                    for (const aggregation of this.aggregations) this.facetService.clearFiltersSearch(this.getName(aggregation), true);
                } else { 
                    this.facetService.clearFiltersSearch(this.getName(this.aggregations), true);
                }
            },
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            /* reset filtered items */
            this.filtered = [];

            /* update tag-cloud data */
            this.tagCloudData = this.getTagCloudData();
        }
    }

    /**
     * Defines the tag-cloud data according to given inputs
     */
    getTagCloudData(): TagCloudItem[] {
        const aggregationsData = this.getAggregationsData();

        if (aggregationsData.length === 0) {
            return [];
        } else {
            let tmp: TagCloudItem[] = [];

            if (this.uniformRepartition) {
                aggregationsData.forEach((data: Aggregation) => {
                    const end = Math.floor(this.limit / aggregationsData.length);
                    // Firstly, take filtered items
                    tmp.push(
                        ...data
                            .items!.filter((item) => item.$filtered)
                            .sort((a, b) => b.count - a.count)
                            .slice(0, end)
                            .map(
                                (item: AggregationItem) =>
                                    ({
                                        aggregation: data,
                                        item: item,
                                        weight: this.proportionalWeight
                                            ? item.count
                                            : this.defaultWeight,
                                    } as TagCloudItem)
                            )
                    );
                    // add most relevant items if threshold not attenuated
                    if (tmp.length < end) {
                        tmp.push(
                            ...data
                                .items!.filter(
                                    (item) => item.count > this.countThreshold && !item.$filtered
                                )
                                .sort((a, b) => b.count - a.count)
                                .slice(0, end - tmp.length)
                                .map(
                                    (item: AggregationItem) =>
                                        ({
                                            aggregation: data,
                                            item: item,
                                            weight: this.proportionalWeight
                                                ? item.count
                                                : this.defaultWeight,
                                        } as TagCloudItem)
                                )
                        );
                    }
                });
                tmp = tmp.sort((a, b) => b.item.count - a.item.count);
            } else {
                aggregationsData.forEach((data: Aggregation) => {
                    tmp.push(
                        ...data
                            .items!.filter(
                                (item) =>
                                    item.count > this.countThreshold || item.$filtered
                            )
                            .map(
                                (item: AggregationItem) =>
                                    ({
                                        aggregation: data,
                                        item: item,
                                        weight: this.proportionalWeight
                                            ? item.count
                                            : this.defaultWeight,
                                    } as TagCloudItem)
                            )
                    );
                });
                const filtered = tmp.filter((elem) => elem.item.$filtered);
                if (filtered.length < this.limit) {
                    const notFiltered = tmp
                        .filter((elem) => !elem.item.$filtered)
                        .sort((a, b) => b.item.count - a.item.count);
                    tmp = [...filtered];
                    tmp.push(
                        ...notFiltered.slice(0, this.limit - filtered.length)
                    );
                } else {
                    tmp = filtered.slice(0, this.limit);
                }
            }

            // By default, sort the whole array with respect to its counts and update its elements weight value
            tmp = tmp
                .sort((a, b) => b.item.count - a.item.count)
                .map(
                    (elem: TagCloudItem) =>
                        ({
                            ...elem,
                            weight: this.proportionalWeight
                                ? this.scaleItemWeight(tmp, elem.item.count)
                                : this.defaultWeight,
                        } as TagCloudItem)
                );

            // Shuffle the array
            if (this.shuffleData) {
                tmp = this.shuffle(tmp);
            }

            return tmp;
        }
    }

    /**
     * Invoked on click on an item in order to update the query
     * @param tagCloudItem
     * @param event
     */
    filterItem(tagCloudItem: TagCloudItem, event) {
        const name = this.getName(tagCloudItem.aggregation.name);
        const aggregation = tagCloudItem.aggregation;
        const item = tagCloudItem.item;
        if (!this.isFiltered(aggregation, item)) {
            this.facetService.addFilterSearch(name, aggregation, item);
        } else {
            this.facetService.removeFilterSearch(name, aggregation, item);
        }
        event.preventDefault();
    }

    /**
     * Define the possible actions according to the actual context
     */
    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.isFiltering()) {
            actions.push(this.clearFilters);
        }
        return actions;
    }

    /**
     * Map the initial aggregations names to a list of Aggregation
     */
    protected getAggregationsData(): Aggregation[] {
        return []
            .concat(this.aggregations as [])
            .filter((agg: string) =>
                this.facetService.hasData(agg, this.results)
            )
            .map(
                (agg: string) =>
                    this.facetService.getAggregation(
                        agg,
                        this.results
                    ) as Aggregation
            )
            .map((data: Aggregation) => this.refreshFiltered(data));
    }

    /**
     * Update aggregation's data with respect to active filters in the query & breadcrumbs
     * @param data
     */
    protected refreshFiltered(data: Aggregation): Aggregation {
        const facetName = this.getName(data.name);
        if (this.facetService.hasFiltered(facetName)) {
            // refresh filters from breadcrumbs
            const items = this.facetService.getAggregationItemsFiltered(facetName, data.valuesAreExpressions);
            items.forEach((item) => {
                if (!this.isFiltered(data, item)) {
                    item.$filtered = true;
                    this.filtered.push(item);
                }
            });

            // double check filters from query and breadcrumb
            data.items!.forEach((item) => {
                const indx = this.facetService.filteredIndex(data, this.filtered, item);
                if (this.facetService.itemFiltered(facetName, data, item)) {
                    item.$filtered = true;
                    if (!this.isFiltered(data, item)) {
                        this.filtered.push(item);
                    }
                } else if (indx !== -1) {
                    // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                    item.$filtered = true;
                }
            });
        }
        return data;
    }

    /**
     * Returns facets names to be used according to @input() isolateFacetFilters
     * @param aggregationName
     */
    private getName(aggregationName: string): string {
        if (!this.isolateFacetFilters) {
            return aggregationName;
        }
        return this.tagCloudFacetPrefix + aggregationName;
    }

    /**
     * Linearly map the original weight to a discrete scale from 1 to 10
     * @param weight original weight
     */
    private scaleItemWeight(tagCloudData: TagCloudItem[], weight: number): number {
        return (
            Math.round(
                ((weight - tagCloudData[tagCloudData.length - 1].weight) /
                    (tagCloudData[0].weight -
                        tagCloudData[tagCloudData.length - 1].weight)) *
                    9.0
            ) + 1
        );
    }

    /**
     * Returns true if the supplied item within the given aggregation is filtering the query
     * @param data
     * @param item
     */
    private isFiltered(data: Aggregation, item: AggregationItem): boolean {
        return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
    }

    /**
     * Shuffle items of the supplied array
     * @param arr
     */
    private shuffle(arr: TagCloudItem[]): TagCloudItem[] {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const aux = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
        }
        return arr;
    }

    /**
     * Returns true if there is at least one active filter in the tag-cloud facet
     */
    private isFiltering(): boolean {
        return []
                .concat(this.aggregations as [])
                .some((aggregationName: string) =>
                    this.facetService.hasFiltered(this.getName(aggregationName))
                );
    }
}
