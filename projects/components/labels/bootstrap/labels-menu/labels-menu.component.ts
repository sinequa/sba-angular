import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { LoginService } from '@sinequa/core/login';
import { LabelsService } from '../../labels.service';
import { Results } from '@sinequa/core/web-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sq-labels-menu',
  templateUrl: './labels-menu.component.html'
})
export class BsLabelsMenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() results: Results;
  @Input() icon: string = "fas fa-tags";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = 'xl';
  @Input() collapseBreakpoint: string = 'sm';
  @Input() size: string;

  menu: Action | undefined;

  constructor(
    public loginService: LoginService,
    public labelsService: LabelsService) {

  }

  ngOnInit() {
    this._loginServiceSubscription = this.loginService.events.subscribe(event => {
      if(event.type === "session-changed"){
        this.updateMenu();
      }
    });
  }

  private _loginServiceSubscription: Subscription;
  ngOnDestroy(){
      if(this._loginServiceSubscription){
          this._loginServiceSubscription.unsubscribe();
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.results) {
      this.updateMenu();
    }
  }

  updateMenu(){

    if (!this.loginService.complete) {
      this.menu = undefined;
      return;
    }
    
    this.menu = this.labelsService.buildLabelsMenu(this.addLabelsMenuItems,
      this.icon, "msg#labels.labels", "msg#labels.labels", "msg#labels.publicLabels", "msg#labels.privateLabels");

  }

  addLabelsMenuItems = (items: Action[], _public: boolean) => {
    let formItem = items[0];
    items.push(
      new Action({
        text: "msg#labels.selectLabel",
        data: formItem.data,
        action: this.labelsService.selectLabel
      }),
      new Action({
        text: "msg#labels.renameLabel",
        data: formItem.data,
        action: this.labelsService.renameLabel
      }),
      new Action({
        text: "msg#labels.deleteLabel",
        data: formItem.data,
        action: this.labelsService.deleteLabel
      }));
    if (!!this.results && !!this.results.records) {
      items.push(
        new Action({
          text: "msg#labels.bulkAddLabel",
          data: formItem.data,
          action: this.labelsService.bulkAddLabel
        }),
        new Action({
          text: "msg#labels.bulkRemoveLabel",
          data: formItem.data,
          action: this.labelsService.bulkRemoveLabel
        }));
    }
  }

}
