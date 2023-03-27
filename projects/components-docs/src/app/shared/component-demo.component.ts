import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'doc-component-demo',
  templateUrl: './component-demo.component.html',
  styles: [`.nav-link {
    cursor: pointer;
  }

  .nav-link:hover {
    background-color: whitesmoke;
  }

  .nav-link.active {
    font-weight: bold;
    border-bottom: 3px solid var(--bs-nav-link-color);
  }`]
})
export class DocComponentDemoComponent {

  @Input() title: string;
  @Input() html: string;
  @Input() ts: string;

  showCode = false;
  codeView = 'html';

  actions: Action[] = [
    new Action({
      icon: 'fas fa-code',
      action: (action, event) => {
        this.showCode = !this.showCode;
        action.update();
      },
      updater: (action) => {
        action.title = this.showCode ? 'Hide code' : 'View code';
      }
    })
  ];

  constructor() { }

}
