import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AppService, Query } from "@sinequa/core/app-utils";
import { CCScope } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-scope',
    template: `<li *ngIf="scopeAction" [sq-action-item]="{item: scopeAction, autoAdjust: true}" class="list-inline-item me-2"></li>`,
    standalone: false
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
    if(this.appService.ccquery?.scopesActive) {
      const scopes = [...this.appService.ccquery.scopes];
      const defaultScope = scopes.find(s => s.isDefault);
      // If a default scope is not set by default, we add "all scopes"
      // which corresponds to the default behavior
      if(!defaultScope) {
        scopes.unshift(this.allScopes);
      }
      // Current scope can be explicitly defined in the query, or it is default scope
      const currentScopeName = this.query.scope ?? defaultScope?.name ?? "";
      const currentScope = scopes.find(s => s.name === currentScopeName);

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
