import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-component-demo',
  templateUrl: './component-demo.component.html',
  styles: [`:host {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  /* override just-the-docs.css for docs */

  :host ::ng-deep li::before,
  :host ::ng-deep li::marker {
    content: none;
  }`]
})
export class DocComponentDemoComponent {

  @Input() title: string;
  @Input() html: string;
  @Input() ts: string;

}
