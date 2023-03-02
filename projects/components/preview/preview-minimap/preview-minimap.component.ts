import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface MinimapItem {
  id: string;
  top: number;
  height: number | undefined;
  text: string;
}

@Component({
  selector: 'sq-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: [`./preview-minimap.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewMinimapComponent {
  @Input() locations?: MinimapItem[];
  @Input() passageLocation?: MinimapItem;
  @Input() selectedId?: string;
  @Output() select = new EventEmitter<string>();

}
