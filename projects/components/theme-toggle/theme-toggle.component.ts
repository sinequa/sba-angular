import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sq-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class BsThemeToggleComponent implements OnInit {
  @Input() showLabel = true;

  labels = ['msg#theme.lightMode', 'msg#theme.darkMode'];
  tooltips = ['msg#theme.darkModeTitle', 'msg#theme.lightModeTitle']
  label: string = '';
  tooltip: string;

  theme: string = "normal"

  constructor() {}

  ngOnInit(): void {
    this.theme = localStorage.getItem('sinequa-theme') || 'normal'
    this.label = this.theme === 'normal' ? this.labels[0] : this.labels[1];
    this.tooltip = this.theme === 'normal' ? this.tooltips[0] : this.tooltips[1];
  }

  /**
  * Whether the UI is in dark or light mode
  */
  isDark(): boolean {
    return this.theme === "dark";
  }

  toggleTheme() {
    let index = 0;
    if (this.theme === 'normal') {
      this.theme = 'dark';
      index = 1;
    } else {
      this.theme = 'normal';
    }
    this.label = this.labels[index];
    this.tooltip = this.tooltips[index];

    localStorage.setItem('sinequa-theme', this.theme);
    document.body.classList.toggle("dark");
    return false;
  }
}