import { Component, Input, OnInit } from "@angular/core";

export interface SummarizerConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;
  promptInsertBeforePassages: string;
}

export const defaultSummarizerConfig: SummarizerConfig = {
  modelTemperature: 1.0,
  modelTopP: 1.0,
  modelMaxTokens: 800,
  promptInsertBeforePassages: ` The below documents contains extracts returned by a search engine. Your job is two perform 2 tasks:
  1 - Try to answer the Query in one short sentence. If you can't or don't have enough context or information from any documents to answer the query, just say so.
  2 - Generate a single summary of all the documents in the context of the Query, using between 5 to 12 sentences.
  Make sure you include the reference in the form [id].
  Answer using using markdown syntax.
  Query: {queryText}`
}

@Component({
  selector: 'sq-summary-settings',
  template: `
  <div class="card-body small">

    <h5>Model parameters</h5>

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

    <div class="mb-2">
      <label for="prompt-before" class="form-label">Prompt inserted before the paragraphs</label>
      <textarea class="form-control form-control-sm" id="prompt-before" rows="6" [(ngModel)]="config.promptInsertBeforePassages"></textarea>
    </div>
  </div>  `
})
export class SummarySettingsComponent implements OnInit {
  @Input() config: SummarizerConfig;

  ngOnInit() {
    Object.assign(this.config, defaultSummarizerConfig, {...this.config});
  }
}
