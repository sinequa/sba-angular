import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface MinimapItem {
  id: string;
  top: number;
  height: number | undefined;
  text: string;
}

@Component({
  selector: 'sq-preview-minimap',
  template: `
  <a *ngFor="let location of locations"
    role="button"
    class="minimap-section"
    [ngClass]="{selected: location.id === selectedId}"
    (click)="select.emit(location.id)"
    [title]="location.text"
    [style.top.%]="location.top"
    [style.height.%]="location.height">
  </a>
  <a *ngIf="passageLocation"
    role="button"
    class="minimap-section minimap-passage"
    [ngClass]="{selected: passageLocation.id === selectedId}"
    (click)="select.emit(passageLocation.id)"
    [title]="passageLocation.text"
    [style.top.%]="passageLocation.top"
    [style.height.%]="passageLocation.height">
  </a>
  `,
  styles: [`
  :host {
    width: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    .minimap-section {
      position: absolute;
      width: 100%;
      height: 1px;
      border: 1px solid orange;
      background-color: yellow;

      &.selected {
        border: 3px solid rgba(11, 117, 255, 0.5);;
        background-color: rgb(11 117 255 / 20%);
        z-index: 1;
        pointer-events: none;
      }

      &.minimap-passage {
        border-color: #0B75FF;
        background-color: transparent;
      }
    }
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewMinimapComponent {
  @Input() locations?: MinimapItem[];
  @Input() passageLocation?: MinimapItem;
  @Input() selectedId?: string;
  @Output() select = new EventEmitter<string>();

}
