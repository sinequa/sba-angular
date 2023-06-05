import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-component-demo',
  templateUrl: './component-demo.component.html',
  styles: [`:host {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  // override just-the-docs.css for docs

  sq-facet-card ::ng-deep .sq-primary-actions .btn {
    box-shadow: none !important;
  }

  sq-facet-card ::ng-deep ul > li::before,
  sq-facet-card ::ng-deep ul > li::marker {
    content: initial;
  }`]
})
export class DocComponentDemoComponent {

  @Input() title: string;
  @Input() html: string;
  @Input() ts: string;

}
