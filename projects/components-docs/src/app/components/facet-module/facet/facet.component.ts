import { Component } from '@angular/core';
import { Action } from '@sinequa/components/action';

@Component({
    selector: 'doc-facet',
    templateUrl: './facet.component.html'
})
export class DocFacetComponent {

    code1 = `<sq-facet-card
    title="With a list-group"
    icon="fas fa-sitemap"
    [collapsible]="true">
        <ul class="list-group">
            <li class="list-group-item">
                <a class="list-group-item-action d-flex align-items-center">
                    <span class="query-name me-auto text-truncate" [title]="'title'">title</span>
                    <span class="query-text text-muted small fst-italic text-right text-truncate ms-2">
                        "additional text"
                    </span>
                    <i class="query-delete ms-2 fas fa-times" [title]="'Delete'"></i>
                </a>
            </li>
            ...
        </ul>
</sq-facet-card>`;

code2 = `<sq-facet-card
    title="With secondary and view actions"
    [collapsible]="false"
    [viewActionsAreSecondary]="true"
    [actions]="primaryActions"
    [secondaryActions]="secondaryActions">
        <ng-template [sqFacetView]="{text: 'View 1'}">
            View 1
        </ng-template>

        <ng-template [sqFacetView]="{text: 'View 2'}">
            View 2
        </ng-template>
</sq-facet-card>`;

  code2_2 = `const expandAction = new Action({
    icon: "fas fa-fw fa-expand-alt",
    action: () => {}
});

const closeAction = new Action({
    icon: "fas fa-fw fa-times",
    action: () => {}
});

this.primaryActions = [ expandAction, closeAction ];

const minimizeAction = new Action({
    icon: "fas fa-fw fa-search-minus",
    action: () => {}
});

const maximizeAction = new Action({
    icon: "fas fa-fw fa-search-plus",
    action: () => {}
});

this.secondaryActions = [ minimizeAction, maximizeAction ];`;

    primaryActions: Action[];
    secondaryActions: Action[];

    constructor() {
        const expandAction = new Action({
            icon: "fas fa-fw fa-expand-alt",
            action: () => {}
          });

          const closeAction = new Action({
            icon: "fas fa-fw fa-times",
            action: () => {}
          });

          this.primaryActions = [ expandAction, closeAction ];

          const minimizeAction = new Action({
            icon: "fas fa-fw fa-search-minus",
            action: () => {}
          });

          const maximizeAction = new Action({
            icon: "fas fa-fw fa-search-plus",
            action: () => {}
          });
          this.secondaryActions = [ minimizeAction, maximizeAction ];
    }

}
