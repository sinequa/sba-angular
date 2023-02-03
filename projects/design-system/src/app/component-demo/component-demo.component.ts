import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-demo',
  templateUrl: './component-demo.component.html'
})
export class ComponentDemoComponent {

  @Input() title: string;
  @Input() code: string | string[];
  @Input() componentClass = 'col-5';
  @Input() codeClass = 'col-7';

  get isArray() {
    return Array.isArray(this.code);
  }

  constructor() { }

}
