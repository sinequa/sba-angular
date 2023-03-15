import { Component, Input, OnInit } from "@angular/core";
import { OpenAIModel } from "./chat/chat.service";

export interface SummarizerConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;

  promptProtection: boolean;

  summarizationModel: OpenAIModel;
  promptInsertBeforePassages: string;
  extendBefore: number;
  extendAfter: number;
  top: number;
}

export const defaultSummarizerConfig: SummarizerConfig = {
  modelTemperature: 1.0,
  modelTopP: 1.0,
  modelMaxTokens: 800,
  promptProtection: true,
  summarizationModel: 'GPT35Turbo',
  promptInsertBeforePassages: ` The below documents contains extracts returned by a search engine. Your job is two perform 2 tasks:
  1 - Try to answer the Query in one short sentence. If you can't or don't have enough context or information from any documents to answer the query, just say so.
  2 - Generate a single summary of all the documents in the context of the Query, using between 5 to 12 sentences.
  Make sure you include the reference in the form [id].
  Answer using using markdown syntax.
  Query: {queryText}`,
  extendBefore: 0,
  extendAfter: 0,
  top: 10,
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
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" role="switch" id="prompt-protection" [(ngModel)]="config.promptProtection">
      <label class="form-check-label" for="prompt-protection">Prompt protection (prevent ChatGPT from answering question unrelated to the context)</label>
    </div>

    <h5>Parameters specific to summarization</h5>

    <div class="mb-2">
      <label for="sum-model" class="form-label">Preferred model:</label>
      <select class="form-select" id="sum-model" [(ngModel)]="config.summarizationModel">
        <option>Davinci3</option>
        <option>GPT35Turbo</option>
      </select>
    </div>
    <div class="mb-2">
      <label for="prompt-before" class="form-label">Prompt inserted before the paragraphs</label>
      <textarea class="form-control form-control-sm" id="prompt-before" rows="6" [(ngModel)]="config.promptInsertBeforePassages"></textarea>
    </div>
    <div class="mb-2">
      <label for="top-passages" class="form-label">Number of top passages: {{config.top}}</label>
      <input type="range" class="form-range form-range-sm" min="1" max="10" step="1" id="top-passages" [(ngModel)]="config.top">
    </div>
    <div class="mb-2">
      <label for="extend-before" class="form-label">Number of passages to prepend before: {{config.extendBefore}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="3" step="1" id="extend-before" [(ngModel)]="config.extendBefore">
    </div>
    <div class="mb-2">
      <label for="extend-after" class="form-label">Number of passages to append after: {{config.extendAfter}}</label>
      <input type="range" class="form-range form-range-sm" min="0" max="3" step="1" id="extend-after" [(ngModel)]="config.extendAfter">
    </div>
  </div>  `
})
export class SummarySettingsComponent implements OnInit {
  @Input() config: SummarizerConfig;

  ngOnInit() {
    if(!this.config.summarizationModel) {
      Object.assign(this.config, defaultSummarizerConfig);
    }
  }
}
