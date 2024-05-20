import { Component, Input } from "@angular/core";

import { trigger, state, style, transition, animate } from "@angular/animations";

import { NonAclRecord } from "./incyte.types";


@Component({
    selector: "no-access-results",
    templateUrl: "./no-access-results.html",
    styleUrls: ['./no-access-results.scss'],
    animations: [
        trigger('expandCollapse', [
          state('expanded', style({
            height: '*',
            opacity: 1,
            display: 'block'
          })),
          state('collapsed', style({
            height: '0px',
            opacity: 0,
            display: 'none'
          })),
          transition('expanded <=> collapsed', [
            animate('300ms ease-in-out')
          ])
        ]),
        trigger('fadeIn', [
          state('visible', style({
            opacity: 1
          })),
          state('hidden', style({
            opacity: 0
          })),
          transition('hidden => visible', [
            animate('300ms ease-in') // 300ms delay
          ])
        ])
      ]
})
export class NoAccessResults{
    @Input() nonAclRecords: NonAclRecord[] = [];

    isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  truncateFilename(filename: string, maxLength: number): string {
    const dotIndex = filename.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === 0) {
      return filename.length > maxLength ? filename.slice(0, maxLength) + '(..)' : filename;
    }

    const name = filename.slice(0, dotIndex);
    const extension = filename.slice(dotIndex);

    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '(..)' + extension;
    }

    return filename;
  }
}
