import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

export interface MenuItem {
    name: string;
    enabled: boolean;
    selected?: boolean;
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    showDisabled: boolean = false;
    fontSize: number;

    inputs: MenuItem[] = [
        {name: 'buttons', enabled: true},
        {name: 'inputs', enabled: true},
    ];

    components: MenuItem[] = [
        {name: 'advanced', enabled: true},
        {name: 'alerts', enabled: true},
        {name: 'autocomplete', enabled: true},
        {name: 'baskets', enabled: true},
        {name: 'collapse', enabled: true},
        {name: 'comments', enabled: true},
        {name: 'facet', enabled: true},
        {name: 'feedback', enabled: true},
        {name: 'labels', enabled: true},
        {name: 'machine-learning', enabled: true},
        {name: 'metadata', enabled: true},
        {name: 'modal', enabled: true},
        {name: 'notification', enabled: true},
        {name: 'preview', enabled: true},
        {name: 'result', enabled: true},
        {name: 'results-view', enabled: true},
        {name: 'rfm', enabled: true},
        {name: 'saved-queries', enabled: true},
        {name: 'search', enabled: true},
        {name: 'selection', enabled: true},
        {name: 'slide-builder', enabled: true},
        {name: 'status-bar', enabled: true},
        {name: 'theme-toggle', enabled: true},
        {name: 'user-settings', enabled: true},
        {name: 'utils', enabled: true}
    ];

    private _previousMenu: MenuItem | undefined;

    constructor(private _router: Router) {
        const fontSize = localStorage.getItem('fontSize');
        this.fontSize = fontSize ? Number(fontSize) : 14;
        this.changedFontSize();
        this.showDisabled = localStorage.getItem('showDisabled') === 'true';

        _router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this._previousMenu) {
                    this._previousMenu.selected = false;
                }
                this._previousMenu = this.inputs.find(item => item.enabled && `/${item.name}` === event.urlAfterRedirects)
                    || this.components.find(item => item.enabled && `/${item.name}` === event.urlAfterRedirects);
                if (this._previousMenu) {
                    this._previousMenu.selected = true;
                }
            }
        });
    }

    get getComponents(): any[] {
        return this.showDisabled ? this.components : this.components.filter(c => c.enabled);
    }


    changedFontSize(): void {
        document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
        document.documentElement.style.setProperty('--bs-body-font-size', `${this.fontSize}px`);
        localStorage.setItem('fontSize', String(this.fontSize));
    }

    changedShowDisabled(): void {
        localStorage.setItem('menuShowDisabled', String(this.showDisabled));
    }

    onClick(item: MenuItem): void {
        if (!item.enabled) return;
        this._router.navigate([`/${item.name}`]);
    }

}
