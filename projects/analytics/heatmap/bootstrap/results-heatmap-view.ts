import { Component, Input } from "@angular/core";
import { HeatmapItem } from "./heatmap.component";
import { ResultsViewService } from "@sinequa/components/results-view";
import { Action } from "@sinequa/components/action";
import { BsFacetHeatmapComponent } from './facet-heatmap.component';


@Component({
    selector: 'sq-results-heatmap-view',
    templateUrl: './results-heatmap-view.html'
})
export class BsResultsHeatmapView extends BsFacetHeatmapComponent {
    @Input() selectView?: string;
    @Input() override theme: "light" | "dark" = "light";

    settingsAction: Action;
    showSettings: boolean;

    constructor(public resultsViewService : ResultsViewService) {
        super();

        this.height = 1200;
        this.width = 1200;
        this.maxX = 40;
        this.maxY = 40;

        this.settingsAction = new Action({
            action: (action) => {
                this.showSettings = !this.showSettings;
                this.onOpenSettings(this.showSettings);
                action.update();
            },
            updater: (action) => {
                action.icon = this.showSettings ? "fas fa-save" : "fas fa-cog";
                action.text = this.showSettings ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
                action.title = this.showSettings ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
                action.selected = this.showSettings;
            }
        });
        this.settingsAction.update();

    }

    get _actions(): Action[] {
        const actions = this.actions;
        actions.push(this.settingsAction);
        return actions;
    }

    override onItemClicked(item: HeatmapItem){
        if(this.aggregationData){
            this.facetService.addFilterSearch(this.aggregationData, item, undefined, this.query, this._name).then(_ => {
                if(this.selectView){
                    this.resultsViewService.selectResultsViewName(this.selectView);
                }
            });
        }
    }

    override onAxisClicked(item: {value: string, axis: 'x' | 'y'}){
        this.searchService.addFieldSelect(item.axis === 'x'? this.fieldXPref : this.fieldYPref, item);
        this.searchService.search().then(_ => {
            if(this.selectView){
                this.resultsViewService.selectResultsViewName(this.selectView);
            }
        });
    }
}

