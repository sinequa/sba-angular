import { Component, Input, OnInit } from "@angular/core";
import { defaultSummarizerConfig, SummarizerConfig } from "./summary.component";

@Component({
  selector: 'sq-summary-settings',
  template: `
  <div class="card-body small">
    <h5>General parameters</h5>
    <div class="mb-2">
      <label for="temperature" class="form-label">Temperature: {{config.modelTemperature}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="2" step="0.1" id="temperature" [(ngModel)]="config.modelTemperature">
    </div>
    <div class="mb-2">
      <label for="top-p" class="form-label">Top P: {{config.modelTopP}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="1" step="0.05" id="top-p" [(ngModel)]="config.modelTopP">
    </div>
    <div class="mb-2">
      <label for="max-tokens" class="form-label">Max tokens: {{config.modelMaxTokens}}</label>
      <input type="range" class="form-range form-range-sm" min="1" max="2048" step="1" id="max-tokens" [(ngModel)]="config.modelMaxTokens">
    </div>

    <h5>Parameters specific to summarization</h5>
    <div class="form-check mb-1">
      <input class="form-check-input" type="checkbox" id="remove-dups" [(ngModel)]="config.removeDuplicates">
      <label class="form-check-label" for="remove-dups">Remove duplicates</label>
    </div>
    <div class="form-check mb-1">
      <input class="form-check-input" type="checkbox" id="remove-overlap" [(ngModel)]="config.removeOverlap">
      <label class="form-check-label" for="remove-overlap">Remove overlap</label>
    </div>
    <div class="mb-2">
      <label for="top-passages" class="form-label">Number of top passages: {{config.topPassages}}</label>
      <input type="range" class="form-range form-range-sm" min="1" max="10" step="1" id="top-passages" [(ngModel)]="config.topPassages">
    </div>
    <div class="mb-2">
      <label for="extend-before" class="form-label">Number of passages to prepend before: {{config.extendBefore}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="3" step="1" id="extend-before" [(ngModel)]="config.extendBefore">
    </div>
    <div class="mb-2">
      <label for="extend-after" class="form-label">Number of passages to append after: {{config.extendAfter}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="3" step="1" id="extend-after" [(ngModel)]="config.extendAfter">
    </div>
    <div class="mb-2">
      <label for="prompt-before" class="form-label">Promp inserted before the paragraphs</label>
      <textarea class="form-control form-control-sm" id="prompt-before" rows="4" [(ngModel)]="config.promptInsertBeforePassages"></textarea>
    </div>
    <div class="mb-2">
      <label for="prompt-after" class="form-label">Promp inserted after the paragraphs</label>
      <textarea class="form-control form-control-sm" id="prompt-after" rows="4" [(ngModel)]="config.promptInsertAfterPassages"></textarea>
    </div>
  </div>  `
})
export class SummarySettingsComponent implements OnInit {
  @Input() config: SummarizerConfig;

  ngOnInit() {
    if(!this.config.modelMaxTokens) {
      this.config = defaultSummarizerConfig;
    }
  }
}
