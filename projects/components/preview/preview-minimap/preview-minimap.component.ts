import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { PreviewFrameService } from '../preview-frames.service';
import { Preview } from '../preview.component';

export interface MinimapItem {
  id: string;
  type: string;
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
export class PreviewMinimapComponent implements OnInit {
  /** Which highlight type should the minimap display */
  @Input() minimapType = 'extractslocations';

  locations?: MinimapItem[];
  selectedLocation?: MinimapItem;
  selectedId?: string;

  sub: Subscription;

  constructor(
    public previewFrames: PreviewFrameService,
    public preview: Preview,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const minimapChange$ = merge(
      this.preview.ready,
      this.preview.resize
    )

    this.sub = minimapChange$.subscribe(() => {
      this.initMinimap(this.preview?.url!);
    });

    this.sub.add(this.preview.selectedId$.subscribe(id => {
      this.selectedId = id;
      this.selectedLocation = undefined; // SelectedLocation is updated asynchronously
      this.cdr.detectChanges();
    }));

    // Manually make space for the minimap in the parent preview component
    this.preview.el.nativeElement.style.paddingRight = "1rem";
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Minimap management

  initMinimap(url: string) {
    this.preview.sendMessage({action: 'get-positions', highlight: this.minimapType});
    this.previewFrames.subscribe<MinimapItem[]>(url, 'get-positions-results', locations => {
      this.locations = locations;
      this.cdr.detectChanges();
    });
    this.previewFrames.subscribe<MinimapItem>(url, 'selected-position', location => {
      this.selectedLocation = location;
      this.cdr.detectChanges();
    });
  }

}
