import { Component, Renderer2 } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
    selector: 'doc-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: false
})
export class DocMenuComponent {

  fontSize: number;

  routes: Routes;

  constructor(
    public router: Router,
    private renderer: Renderer2
  ) {
    const fontSize = localStorage.getItem('fontSize');
    this.fontSize = fontSize ? Number(fontSize) : 14;
    this.changedFontSize();

    this.routes = router.config.filter(r => r.path !== '**');
  }

  changedFontSize(): void {
    const html = this.renderer.selectRootElement('html', true);
    this.renderer.setStyle(html, 'font-size', `${this.fontSize}px`);
    this.renderer.setStyle(html, '--bs-body-font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', String(this.fontSize));
  }

}
