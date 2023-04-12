import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { IntlService } from "@sinequa/core/intl";
import { PrincipalWebService, Record } from "@sinequa/core/web-services";
import get from 'lodash/get';

const defaultPrompts = {
  translatePrompt: `Assistant translates everything the user says in English, word for word and nothing else. If you cannot translate it, just repeat the user's message.`,
  greetingPrompt: `User {principal.fullName} is on the home page of the Sinequa search engine, please write a nice short 1-sentence greeting message in {locale.display}.`,
  previewSummaryPrompt: "The following snippets are extracted from a document titled \"{record.title}\". Please summarize this document as best as possible, taking into account that the user's original search query was \"{query.text}\".",
  previewPrompt: `The text below is extracted from a document retrieved by a search engine. Generate a summary of this text in 5 sentences.`,
  answerPrompt: ` The below documents contains extracts returned by a search engine. Your job is two perform 2 tasks:
  1 - Try to answer the Query in one short sentence. If you can't or don't have enough context or information from any documents to answer the query, just say so.
  2 - Generate a single summary of all the documents in the context of the Query, using between 5 to 12 sentences.
  Make sure you include the reference in the form [id].
  Answer using using markdown syntax.
  Query: {query.text}`
}

@Injectable({providedIn: 'root'})
export class PromptService {


  constructor(
    public appService: AppService,
    public searchService: SearchService,
    public principalService: PrincipalWebService,
    public intlService: IntlService
  ) {}

  getPrompt(name: keyof typeof defaultPrompts, record?: Record) {
    const context = {
      results: this.searchService.results,
      query: this.searchService.query,
      principal: this.principalService.principal,
      locale: this.intlService.currentLocale,
      record,
    }
    let prompt = this.appService.app?.data?.[name];
    if(typeof prompt !== 'string') {
      prompt = defaultPrompts[name];
    }
    return this.formatPrompt(prompt, context);
  }

  /**
   * Takes a text prompt that may contain placeholders for variables
   * and replaces these placeholders if it finds a match in the given
   * context object.
   */
  formatPrompt(prompt: string, context: any) {
    return prompt.replace(/{(.*?)}/g, (match, expr) => get(context, expr) ?? match)
  }
}
