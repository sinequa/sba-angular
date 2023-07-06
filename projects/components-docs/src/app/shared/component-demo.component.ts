import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-component-demo',
  templateUrl: './component-demo.component.html',
  styles: [`:host {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }`]
})
export class DocComponentDemoComponent {

  @Input() title: string;
  @Input() html: string;
  @Input() ts: string;

}
