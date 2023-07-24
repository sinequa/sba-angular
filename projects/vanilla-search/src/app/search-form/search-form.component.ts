import { Component, Input, ViewChild } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { SearchFormComponent } from "@sinequa/components/search-form";
import { ChatConfig, ChatService } from "@sinequa/components/machine-learning";
import { AssistantService } from "../assistant/assistant.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styles: [`
  :host {
    position: relative;
    display: block;
  }

  sq-autocomplete {
    & ::ng-deep .list-group-item {
      &:first-child {
        border-top: var(--bs-list-group-border-width) solid var(--bs-list-group-border-color) !important;
      }
      &:last-child {
        /* Apply margin to the last autocomplete item so that if there is none,
           no margin is applied and the autocomplete appears collapsed */
        margin-bottom: 1rem;
      }
    }
  }
  `],
})
export class AppSearchFormComponent {

  /** List of autocomplete sources displayed by the autocomplete */
  @Input() autocompleteSources?: string[];
  /** Route where a new search navigates to */
  @Input() searchRoute = "search";

  @ViewChild("searchForm") searchForm: SearchFormComponent;

  constructor(
    public searchService: SearchService,
    public chatService: ChatService,
    public assistantService: AssistantService
  ) {}

  onAutocompleteSearch(text: string, query: Query) {
    query.text = text;
    this.searchForm.applyFilters(); // Apply the autocomplete query and close the form
  }

  onAutocompleteSelect(text: string, query: Query) {
    query.text = text;
  }

  get chatConfig() : ChatConfig {
    return this.assistantService.chatConfig;
  }

  translating = false;
  translate(query: Query) {
    const text = query.text;
    if(text) {
      this.translating = true;
      this.chatService.fetch([
        {role: 'system', content: this.assistantService.getPrompt("translatePrompt"), display: false},
        {role: 'user', content: text, display: false},
      ], this.chatConfig.model, this.chatConfig.temperature, this.chatConfig.maxTokens, this.chatConfig.topP, this.chatConfig.googleContextPrompt, this.chatConfig.stream)
      .subscribe(res => {
        query.text = res.messagesHistory.at(-1)?.content.replace(/\"/g, '');
        this.translating = false;
      })
    }
  }
}
