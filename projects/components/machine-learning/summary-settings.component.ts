import { Component, Input } from "@angular/core";
import { SummarizerConfig } from "./summary.component";

@Component({
  selector: 'sq-summary-settings',
  template: `
  <div class="card-body">
    <div class="mb-3">
      <label for="prompt-before" class="form-label">Promp Before</label>
      <textarea class="form-control" id="prompt-before" rows="4" [(ngModel)]="config.promptBefore"></textarea>
    </div>
    <div class="mb-3">
      <label for="prompt-after" class="form-label">Prompt After</label>
      <textarea class="form-control" id="prompt-after" rows="4" [(ngModel)]="config.promptAfter"></textarea>
    </div>
    <div class="mb-3">
      <label for="temperature" class="form-label">Temperature: {{config.modelTemperature}}</label>
      <input type="range" class="form-range" min="0" max="2" step="0.1" id="temperature" [(ngModel)]="config.modelTemperature">
    </div>
    <div class="mb-3">
      <label for="extend-before" class="form-label">Extend before: {{config.extendBefore}}</label>
      <input type="range" class="form-range" min="0" max="3" step="1" id="extend-before" [(ngModel)]="config.extendBefore">
    </div>
    <div class="mb-3">
      <label for="extend-after" class="form-label">Extend after: {{config.extendAfter}}</label>
      <input type="range" class="form-range" min="0" max="3" step="1" id="extend-after" [(ngModel)]="config.extendAfter">
    </div>
  </div>  `
})
export class SummarySettingsComponent {
  @Input() config: SummarizerConfig;
}
