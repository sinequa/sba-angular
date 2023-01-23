import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

export interface MenuItem {
    name: string;
    selected: boolean;
    enabled: boolean;
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
        {selected: false, name: 'buttons', enabled: true},
        {selected: false, name: 'inputs', enabled: true},
    ];

    components: MenuItem[] = [
        {selected: false, name: 'action', enabled: false},
        {selected: false, name: 'advanced', enabled: false},
        {selected: false, name: 'alerts', enabled: true},
        {selected: false, name: 'autocomplete', enabled: false},
        {selected: false, name: 'baskets', enabled: true},
        {selected: false, name: 'collapse', enabled: false},
        {selected: false, name: 'comments', enabled: false},
        {selected: false, name: 'facet', enabled: true},
        {selected: false, name: 'feedback', enabled: false},
        {selected: false, name: 'labels', enabled: false},
        {selected: false, name: 'machine-learning', enabled: false},
        {selected: false, name: 'metadata', enabled: false},
        {selected: false, name: 'modal', enabled: false},
        {selected: false, name: 'notification', enabled: false},
        {selected: false, name: 'preview', enabled: true},
        {selected: false, name: 'result', enabled: true},
        {selected: false, name: 'results-view', enabled: false},
        {selected: false, name: 'rfm', enabled: false},
        {selected: false, name: 'saved-queries', enabled: false},
        {selected: false, name: 'search', enabled: true},
        {selected: false, name: 'selection', enabled: false},
        {selected: false, name: 'slide-builder', enabled: false},
        {selected: false, name: 'status-bar', enabled: false},
        {selected: false, name: 'theme-toggle', enabled: false},
        {selected: false, name: 'user-settings', enabled: false},
        {selected: false, name: 'utils', enabled: false}
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
