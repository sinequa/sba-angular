import { Component, Input, OnChanges } from "@angular/core";
import { AbstractFacet } from "../../abstract-facet";
import {
    Results,
    AggregationItem,
    Aggregation,
} from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { FacetService } from "../../facet.service";
import { Query } from "@sinequa/core/app-utils";
import { FacetConfig } from "../../facet-config";

export interface FacetTagCloudParams {
    limit?: number;
    uniformRepartition?: boolean;
    showCount?: boolean;
    proportionalWeight?: boolean;
    countThreshold?: number;
    shuffleData?: boolean;
    isolateFacetFilters?: boolean;
}

export interface FacetTagCloudConfig extends FacetConfig<FacetTagCloudParams> {
    type: 'tag-cloud';
}

export interface TagCloudItem {
    aggregation: Aggregation;
    item: AggregationItem;
    weight: number;
}

@Component({
    selector: "sq-facet-tag-cloud",
    templateUrl: "./facet-tag-cloud.html",
    styleUrls: ["./facet-tag-cloud.scss"],
    standalone: false
})
export class BsFacetTagCloud extends AbstractFacet implements FacetTagCloudParams, OnChanges {
    /** search results */
    @Input() results: Results;
    /** Search query modified by this facet */
    @Input() query?: Query;
    /** list of aggregations to be considered in collecting tag-cloud data */
    @Input() aggregation: string | string[];
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
    /** Optional facet name, for audit and facet customization */
    @Input() name = "tag-cloud";

    aggregationsData: Aggregation[] = [];
    tagCloudData: TagCloudItem[] = [];
    hasFiltered = false;

    // Actions enabled within the facet
    private readonly clearFilters: Action;
    // Default weight to be applied if proportionalWeight = false
    private readonly defaultWeight = 2;

    constructor(
        private facetService: FacetService
    ) {
        super();

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "sq-filter-clear",
            title: "msg#facet.clearSelects",
            action: () => {
                const fields = this.aggregationsData.map(a => a.column);
                this.facetService.clearFiltersSearch(fields, true, this.query, this.name);
            },
        });
    }

    ngOnChanges() {
        this.tagCloudData = this.getTagCloudData();
    }

    /**
     * Defines the tag-cloud data according to given inputs
     */
    getTagCloudData(): TagCloudItem[] {
        this.aggregationsData = this.getAggregationsData();
        this.hasFiltered = this.aggregationsData.some(agg => agg.$filtered.length);

        const aggregationsData = this.aggregationsData.filter(agg => agg.items?.length);
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
    filterItem(tagCloudItem: TagCloudItem, event: Event) {
        const aggregation = tagCloudItem.aggregation;
        const item = tagCloudItem.item;
        if (!item.$filtered) {
            this.facetService.addFilterSearch(aggregation, item, undefined, this.query, this.name);
        } else {
            this.facetService.removeFilterSearch(aggregation, item, this.query, this.name);
        }
        event.preventDefault();
    }

    /**
     * Define the possible actions according to the actual context
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.hasFiltered) {
            actions.push(this.clearFilters);
        }
        return actions;
    }

    /**
     * Map the initial aggregations names to a list of Aggregation
     */
    protected getAggregationsData(): Aggregation[] {
        return ([] as string[])
            .concat(this.aggregation)
            .map(a => this.facetService.getAggregation(a, this.results)!)
            .filter(a => a);
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

}
