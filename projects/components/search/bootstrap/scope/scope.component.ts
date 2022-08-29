import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AppService, Query } from "@sinequa/core/app-utils";
import { CCScope } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-scope',
  template: `<div *ngIf="scopeAction" [sq-action-item]="{item: scopeAction, autoAdjust: true}"></div>`
})
export class BsScopeComponent implements OnChanges {
  @Input() query: Query;
  @Output() queryChange = new EventEmitter<Query>();

  scopeAction: Action;

  allScopes: CCScope = {
    name: "",
    display: "msg#scopes.allScopes"
  };

  constructor(
    public appService: AppService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateAction();
  }

  updateAction() {
    if(this.appService.ccquery) {
      const scopes = [this.allScopes, ...this.appService.ccquery.scopes];
      const currentScope = scopes.find(s => s.name === (this.query?.scope || ""));

      if(currentScope) {
        this.scopeAction = new Action({
          text: currentScope.display || currentScope.name,
          children: scopes
            .filter(s => s !== currentScope)
            .map(s => this.getScopeAction(s))
        });
      }
    }
  }

  getScopeAction(scope: CCScope): Action {
    return new Action({
      text: scope.display || scope.name,
      title: scope.description,
      action: () => this.selectScope(scope.name)
    });
  }

  selectScope(scope: string) {
    this.query.scope = scope;
    this.queryChange.next(this.query);
    this.updateAction();
  }

}
