import { Component } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { AbstractFacet } from '@sinequa/components/facet';

@Component({
  selector: 'doc-sq-preview',
  templateUrl: './sq-preview.component.html',
  styleUrls: ['./sq-preview.component.scss']
})
export class DocSqPreviewComponent extends AbstractFacet {

  record: any;
  query: any;
  metadata: string[];
  scalingFactor = 0.6;
  private readonly scaleFactorThreshold = 0.1;

  code: string = ``;

  closeAction: Action;
  expandModalAction: Action;
  toggleEntitiesAction: Action;
  toggleExtractsAction: Action;
  maximizeAction: Action;
  minimizeAction: Action;

  constructor() {
    super();

    this.record = JSON.parse(`{"id":"/movies/movies/|12527","databasealias":"moviesmetadata","flags":["h"],"title":"Strawberry and Chocolate","language":["en"],"documentweight":"default","indexationtime":"2022-09-28 12:00:23","version":"jKTP3pl2q6hfes/iiIzfdQ==","size":1191,"treepath":["/movies/movies/"],"filename":"file.htm","fileext":"htm","collection":["/movies/movies/"],"docformat":"htm","geo":[{"value":"CUBA","display":"Cuba","count":2}],"moviekeywords":["gay","cuba","artist","male friendship","havanna","homosexuality","social commentary","student"],"overview":"Havana, Cuba, 1979. Flamboyantly gay artist Diego (Jorge PerugorrÃ­a) attempts to seduce the straight and strait-laced David, an idealistic young communist, and fails dismally. But David conspires to become friends with Diego so he can monitor the artist's subversive life for the state. As Diego and David discuss politics, individuality and personal expression in Castro's Cuba, a genuine friendship develops between the two. But can it last? Strawberry and Chocolate became an instant hit when it was released, and has become a classic of Cuban cinema due to its charming and authentic exploration of a connection between two people under historical circumstances that seem levelled against them.","rank":0}`);
    this.query = JSON.parse(`{"name":"keywordsquery","text":"","tab":"all"}`);
    this.metadata = ["authors", "docformat", "modified", "size", "treepath", "filename"];

    this.closeAction = new Action({
      icon: "fas fa-times",
      title: "Close",
      hidden: false,
      action: () => { }
    });

    this.expandModalAction = new Action({
      icon: "far fa-window-maximize",
      title: "Maximize",
      hidden: false,
      action: () => { }
    });

    this.toggleEntitiesAction = new Action({
      icon: "fas fa-lightbulb",
      title: "Toggle entities highlighting",
      hidden: false,
      selected: true,
      action: (action) => {
        action.selected = !action.selected;
      }
    });

    this.toggleExtractsAction = new Action({
      icon: "fas fa-highlighter",
      title: "Toggle relevant extracts highlighting",
      hidden: false,
      selected: false,
      action: (action) => {
        action.selected = !action.selected;
      }
    });

    this.maximizeAction = new Action({
      icon: "fas fa-search-plus",
      title: "v",
      hidden: false,
      action: () => {
        this.scalingFactor = this.scalingFactor + this.scaleFactorThreshold;
      }
    });

    this.minimizeAction = new Action({
      icon: "fas fa-search-minus",
      title: "Zoom out",
      disabled: this.scalingFactor === 0.1,
      action: () => {
        this.scalingFactor = Math.round(Math.max(0.1, this.scalingFactor - this.scaleFactorThreshold) * 100) / 100;
      },
      updater: (action) => {
        action.disabled = this.scalingFactor === 0.1;
      }
    });
  }

  override get actions(): Action[] {
    const actions: Action[] = [];
    actions.push(this.expandModalAction);
    actions.push(this.closeAction);
    return actions;
  }

  get zoomActions(): Action[] {
    const actions: Action[] = [];
    this.minimizeAction.update();
    actions.push(this.minimizeAction, this.maximizeAction);
    return actions;
  }

}
