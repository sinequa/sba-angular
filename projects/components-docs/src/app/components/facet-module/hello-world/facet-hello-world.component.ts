import { Component } from '@angular/core';

@Component({
  selector: 'doc-facet-hello-world',
  templateUrl: './facet-hello-world.component.html'
})
export class DocFacetHelloWorldComponent {

  code = `<sq-facet-card [title]="'Hello!'" [icon]="'fas fa-hand-point-right'">
    <hello-world #facet></hello-world>
</sq-facet-card>`;

  code2 = `// In <hello-world>
override get actions(): Action[] {
    return [
        new Action({
            text: "Action 1",
            title: "Action 1",
            icon: "fas fa-user",
            action: () => { }
        }),
        new Action({
            text: "Action 2",
            title: "Action 2",
            icon: "fas fa-info",
            action: () => { }
        })
    ];
}`;
}
