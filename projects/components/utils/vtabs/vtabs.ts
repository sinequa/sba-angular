import {Component, Input, ContentChild, TemplateRef} from "@angular/core";

@Component({
    selector: "sq-vtabs",
    templateUrl: "./vtabs.html",
    styleUrls: ["./vtabs.css"]
})
export class VTabs {

    tabs : Tab[] = [];

    selectTab(tab: Tab) {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
      tab.active = true;
      return false;
    }
  
    addTab(tab: Tab) {
      this.tabs.push(tab);
    }
    
}

@Component({
    selector: 'tab',
    template: `
<ng-container [ngTemplateOutlet]="template" *ngIf="active"></ng-container>
    `
})
export class Tab {
    @Input() tabTitle: string;
    @Input() active: boolean;
    @ContentChild(TemplateRef, {static: false}) template: TemplateRef<any>;

    constructor(tabs:VTabs) {
        tabs.addTab(this);
    }
}