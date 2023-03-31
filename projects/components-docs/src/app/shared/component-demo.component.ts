import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-component-demo',
  templateUrl: './component-demo.component.html'
})
export class DocComponentDemoComponent {

  @Input() title: string;
  @Input() html: string;
  @Input() ts: string;

}
