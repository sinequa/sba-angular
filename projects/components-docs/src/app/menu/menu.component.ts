import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'doc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class DocMenuComponent {

  fontSize: number;

  routes: Routes;

  constructor(
    public router: Router
  ) {
    const fontSize = localStorage.getItem('fontSize');
    this.fontSize = fontSize ? Number(fontSize) : 14;
    this.changedFontSize();

    this.routes = router.config.filter(r => r.path !== '**');
  }

  changedFontSize(): void {
    document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
    document.documentElement.style.setProperty('--bs-body-font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', String(this.fontSize));
  }

}
