import { Component } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { AbstractFacet } from '@sinequa/components/facet';

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent extends AbstractFacet {

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
  }

}
