import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    fontSize: number;
    currentRoute: string;

    inputs: string[] = [
        'buttons',
        'inputs',
    ];

    components: string[] = [
        'advanced',
        'alerts',
        'autocomplete',
        'baskets',
        'collapse',
        'comments',
        'facet',
        'feedback',
        'labels',
        'machine-learning',
        'metadata',
        'modal',
        'notification',
        'preview',
        'result',
        'results-view',
        'rfm',
        'saved-queries',
        'search',
        'selection',
        'slide-builder',
        'status-bar',
        'theme-toggle',
        'user-settings',
        'utils'
    ];

    analyticsComponents: string[] = [
        'ag-grid',
        'dashboard',
        'finance',
        'fusioncharts',
        'googlemaps',
        'heatmap',
        'network',
        'ngx-charts',
        'timeline',
        'tooltip',
        'vis-timeline'
    ];

    constructor(_router: Router) {
        const fontSize = localStorage.getItem('fontSize');
        this.fontSize = fontSize ? Number(fontSize) : 14;
        this.changedFontSize();

        _router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.url.slice(1);
            }
        })
    }

    changedFontSize(): void {
        document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
        document.documentElement.style.setProperty('--bs-body-font-size', `${this.fontSize}px`);
        localStorage.setItem('fontSize', String(this.fontSize));
    }

}
