import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { HeatmapItem } from "./heatmap.component";
import { ResultsViewService } from "@sinequa/components/results-view";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { BsFacetHeatmapComponent } from './facet-heatmap.component';
import { FacetService } from '@sinequa/components/facet';
import { SelectionService } from '@sinequa/components/selection';
import { UntypedFormBuilder } from '@angular/forms';
import { UserPreferences } from '@sinequa/components/user-settings';


@Component({
    selector: 'sq-results-heatmap-view',
    templateUrl: './results-heatmap-view.html' 
})
export class BsResultsHeatmapView extends BsFacetHeatmapComponent {
    @Input() selectView?: string;
    @Input() override theme: "light" | "dark" = "light";

    settingsAction: Action;
    showSettings: boolean;

    constructor(
        public override appService: AppService,
        public override searchService: SearchService,
        public override facetService: FacetService,
        public override selectionService: SelectionService,
        public override formBuilder: UntypedFormBuilder,
        public override cdRef: ChangeDetectorRef,
        public override prefs: UserPreferences,
        public resultsViewService : ResultsViewService
    ) {
        super(appService, searchService, facetService, selectionService, formBuilder, cdRef, prefs, undefined);
    
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
                action.icon = this.showSettings ? "far fa-save" : "fas fa-cog";
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
            this.facetService.addFilterSearch(this._name, this.aggregationData, item).then(_ => {
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

