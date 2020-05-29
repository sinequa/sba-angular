import {Component, Input} from '@angular/core';
import {SearchService} from "../../search.service";

// From https://stackoverflow.com/questions/34773266/how-to-write-css-keyframes-to-indeterminate-material-design-progress-bar

@Component({
    selector: 'sq-loading-bar',
    template: `
<div class="slider" *ngIf="isActive()">
	<div class="line"></div>
  <div class="subline inc"></div>
  <div class="subline dec"></div>
</div>
    `,
    styles: [`

.slider{
  position:absolute;
  width:100%;
  height:3px;
  overflow-x: hidden;
  z-index: 3;
}

.line{
  position:absolute;
  opacity: 0.4;
  background:#4a8df8;
  width:150%;
  height:5px;
}

.subline{
  position:absolute;
  background:#4a8df8;
  height:5px;
}
.inc{
animation: increase 1s infinite;
}
.dec{
animation: decrease 1s 0.25s infinite;
}

@keyframes increase {
 from { left: -5%; width: 5%; }
 to { left: 130%; width: 100%;}
}
@keyframes decrease {
 from { left: -80%; width: 80%; }
 to { left: 110%; width: 10%;}
}
    `]
})
export class BsLoadingBar {
  /**
   * active can provided as a boolean to activate the loading bar.
   * If it is not provided, the SearchService searchActive property is used.
   */
  @Input() active?: boolean;

  constructor(
    public searchService: SearchService
  ) { }

  isActive() {
    return this.active === undefined ? this.searchService.searchActive : this.active;
  }
}
