import { Component, Input } from "@angular/core";
import { ChatConfig } from "./chat.component";

@Component({
  selector: 'sq-chat-settings',
  template: `
  <div class="card-body small">
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
  </div>  `
})
export class ChatSettingsComponent {
  @Input() config: ChatConfig;
}
