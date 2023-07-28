import { Injectable } from "@angular/core";
import { ChatConfig, defaultChatConfig } from "@sinequa/components/machine-learning";
import { SearchService } from "@sinequa/components/search";
import { UserPreferences } from "@sinequa/components/user-settings";
import { AppService } from "@sinequa/core/app-utils";
import { IntlService } from "@sinequa/core/intl";
import { PrincipalWebService, Record } from "@sinequa/core/web-services";
import get from 'lodash/get';

const defaultPrompts = {
  translatePrompt: `Assistant translates everything the user says in English, word for word and nothing else. If you cannot translate it, just repeat the user's message.`,
  greetingPrompt: `User {principal.fullName} is on the home page of the Sinequa search engine, please write a nice short 1-sentence greeting message (in the {locale.name} locale).`,
  previewPrompt: "Generate a TLDR summary of this document, in the context of the original query: \"{query.text}\". Use markdown formatting for code snippets if any.",
  answerPrompt: `
The below documents contains extracts returned by a search engine. Your job is to perform 2 tasks:
1 - Try to answer the Query in one short sentence. If you can't or don't have enough context or information from any documents to answer the query, just say so.
2 - Generate a single summary of all the documents in the context of the Query, using between 5 to 12 sentences.
Make sure you include the references in the form [id] or [id.part].
Answer using using markdown syntax.
Query: {query.text}`,
  searchPrompt: `
You are an assistant that helps users interact with a search engine.
The search engine can search in various data sources within a company named Sinequa.

The data sources are:
- \`doc\`: Official technical documentation
- \`support\`: Support tickets from the customers
- \`internet\`: Various public websites related to the company
- \`files\`: Shared drives containing users work files
- \`intranet\`: Internal information about the company

The next inputs from the user must be understood as search queries.

When a user submits a query, you MUST respond a JSON object with these OPTIONAL properties:
- \`query\` (string): You may improve the user's search query. For example, you can fix typos and insert additional keywords. If necessary, you may use typical search operators like + (to make a keyword mandatory), - (to exclude a keyword), "double quotes" (to force an exact match), car|vehicle|truck (to suggest synonyms). The goal is to write a query that is the most likely to yield a relevant result.
- \`sources\` (string[]): You may restrict the search to a subset of the data sources (if the query seems related to them). For example, if the user's query is related to something technical, it would make sense to restrict the search with \`"filters": ["doc","support","files"]\`.
- \`answer\` (string): If you feel that you can directly provide a relevant answer to the user's query, you may provide it in a markdown-formatted string.

Example 1:
User input: test
Interpretation: The user is just testing the search engine
Response: {
  "answer": "I hope you test is going well ;-)"
}

Example 2:
User input: who is the cfo of Sinequa?
Interpretation: The user is looking for someone in the company; the answer is likely to be found in the internet and intranet portals, but not in any technical content. "CFO" is an abbreviation, so we better include the full form as a synonym to maximize the chances of finding the right answer.
Response: {
  "query": "CFO|(Chief Financial Officer) Sinequa",
  "sources": ["internet", "intranet"]
}

Example 3:
User input: Runtime error at line 453 in indexer.cpp
Interpretation: The user encountered a software error and is looking for a way to fix it. We better add quotes around "Runtime error" and "indexer.cpp", as these refer to specific concepts rather than independent keywords. We want to restrict the search to the files, documentation and support tickets, as these are likely to mention software errors.
Response: {
  "query": "\"Runtime error\" at line 453 in \"indexer.cpp\"",
  "sources": ["doc", "support", "files"]
}

Example 4:
User input: Mean Reciprocal Rank
Interpretation: The user is looking for the definition of the Mean Reciprocal Rank, a concept that is relevant in the context of Sinequa, but also exists in the public domain. We should expand the Search with "MRR", the typical abbreviation of this concept, and focus on the documentation. We can also provide a short definition of MRR as an answer.
Response: {
  "query": "(Mean Reciprocal Rank)|MRR",
  "sources": ["doc"],
  "answer": "The mean reciprocal rank is a statistic measure for evaluating any process that produces a list of possible responses to a sample of queries, ordered by probability of correctness."
}

From now on, it's your turn to generate the response.
  `,
  answer2Prompt: `
Given the above documents, can you provide an answer to my query?
You can refer to the documents by their [id] (eg. [2], [7]...) or [id.part] (eg. [5.2], [14.3]), and you can use markdown syntax for formatting.
If there is not enough information to answer, just say so. Do not try to make up an answer.
Query: {query.text}`,
  networkPrompt: `
Given a document, generate a YAML object with 2 properties representing a graph of entities and relationships:
- \`nodeTypes\`: List of node types. Each node type has a \`type\` (string), \`icon\` (string) and \`color\` (string), comma separated with no space. The \`icon\` property is a FontAwesome v5 free solid font icon unicode char (eg. "\uf007" for a user icon). The \`color\` property is a CSS color (eg. "#0275d8" for a blue color). Built-in node types can be omitted (person, company, location).
- \`edges\`: list of edges, each edge representing a relationship between 2 nodes. Each edge has a \`from\` (string) and a \`to\` (string) that refer to types and names (\`<type>#<name>\`) of the nodes. An edge can have an option \`type\` property representing the type of relationship between the 2 entities.

Example 1:
Document: "Alexandre Bilger is the CEO of Sinequa, a company based in Paris, France."
Response:

edges:
- from: person#Alexandre Bilger
  to: company#Sinequa
  type: CEO
- from: company#Sinequa
  to: location#Paris
  type: HQ
- from: location#Paris
  to: location#France
  type: country

Example 2:
Document: "Aspirin is a drug used to treat pain and fever. It is also used to treat inflammation and blood clotting."
Response:

nodeTypes:
- drug,\uf486,#92e562
- condition,\uf714,#6276e5
edges:
- from: drug#Aspirin
  to: condition#pain
  type: treat
- from: drug#Aspirin
  to: condition#fever
  type: treat
- from: drug#Aspirin
  to: condition#inflammation
  type: treat
- from: drug#Aspirin
  to: condition#blood clotting
  type: treat

Example 3:
Document: "Neural search (NS) is a technology based on neural networks that improves the relevance of search results. Sinequa makes use of NS to retrieve enterprise documents and feed to a Large Language Model (LLM). A LLM is a neural network that can generate text from a prompt. The LLM is trained on a large corpus of text, such as Wikipedia."
Response:

nodeTypes:
- tech,\uf6e4,#e56262
- data,\uf1c0,#e8c102
edges:
- from: tech#Neural Search
  to: tech#Neural Networks
  type: is
- from: tech#Large Language Model
  to: tech#Neural Network
  type: is
- from: tech#Neural Search
  to: data#Enterprise documents
  type: retrieve
- from: tech#Neural Search
  to: tech#Large Language Model
  type: feed
- from: data#Wikipedia
  to: tech#Large Language Model
  type: train
- from: company#Sinequa
  to: tech#Neural Search
  type: make use of

Please only submit the most relevant relationships (up to 10-20). Take into account the user query: '{query.text}'.

From now on, it's your turn to generate the response. You MUST answer with a YAML response.
  `
}

@Injectable({providedIn: 'root'})
export class AssistantService {

  constructor(
    public appService: AppService,
    public searchService: SearchService,
    public principalService: PrincipalWebService,
    public intlService: IntlService,
    public prefs: UserPreferences
  ) {}

  setRawPrompt(name: keyof typeof defaultPrompts, prompt: string) {
    if(!prompt) {
      prompt = this.appService.app?.data?.[name] as string;
      if(typeof prompt !== 'string') {
        prompt = defaultPrompts[name];
      }
    }
    this.prefs.set(name, prompt);
  }

  getRawPrompt(name: keyof typeof defaultPrompts) {
    let prompt = this.prefs.get(name);
    if(typeof prompt !== 'string') {
      prompt = this.appService.app?.data?.[name];
      if (typeof prompt === 'object') {
        prompt = prompt[this.intlService.currentLocale.name]
      }
    }
    if(typeof prompt !== 'string') {
      prompt = defaultPrompts[name];
    }
    return prompt;
  }

  resetPrompt(name: keyof typeof defaultPrompts, skipSync?: boolean) {
    this.prefs.delete(name, skipSync);
  }

  getPrompt(name: keyof typeof defaultPrompts, record?: Record, other?: any) {
    const prompt = this.getRawPrompt(name);
    const context = {
      results: this.searchService.results,
      query: this.searchService.query,
      principal: this.principalService.principal,
      locale: this.intlService.currentLocale,
      record,
      ...(other || {})
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


  configPatchDone = false;

  get chatConfig(): ChatConfig {
    let config = this.prefs.get('chat-config');
    if(!config || !this.configPatchDone) {
      let defaultChatConfigOverride = this.appService.app?.data?.chatConfig;
      if(typeof defaultChatConfigOverride !== 'object') {
        defaultChatConfigOverride = {};
      }
      config = {
        ...defaultChatConfig,
        ...defaultChatConfigOverride,
        ...config
      };
      this.prefs.set('chat-config', config);
      this.configPatchDone = true;
    }
    return config;
  }

  saveChatConfig() {
    this.prefs.set('chat-config', this.chatConfig)
  }

  resetAssistant() {
    this.prefs.delete('assistant-mode', true);
    this.prefs.delete('assistant-collapsible', true);
    this.prefs.delete('assistant-start-collapsed', true);
    this.resetPrompt('searchPrompt', true);
    this.resetPrompt('answerPrompt', true);
    this.resetPrompt('answer2Prompt', true);
    this.prefs.sync();
  }

  get assistantMode(): 'Meeseeks' | 'Manual' | 'Auto-Search' | 'Auto-Answer' {
    return this.prefs.get('assistant-mode') ?? 'Auto-Answer';
  }

  set assistantMode(val: 'Meeseeks' | 'Manual' | 'Auto-Search' | 'Auto-Answer') {
    this.prefs.set('assistant-mode', val);
  }

  get searchPrompt(): string {
    return this.getRawPrompt("searchPrompt");
  }

  set searchPrompt(val: string) {
    this.setRawPrompt("searchPrompt", val);
  }

  get answerPrompt(): string {
    return this.getRawPrompt("answerPrompt");
  }

  set answerPrompt(val: string) {
    this.setRawPrompt("answerPrompt", val);
  }

  get answer2Prompt(): string {
    return this.getRawPrompt("answer2Prompt");
  }

  set answer2Prompt(val: string) {
    this.setRawPrompt("answer2Prompt", val);
  }

  get collapsible(): boolean {
    return this.prefs.get('assistant-collapsible') ?? false;
  }

  set collapsible(val: boolean) {
    this.prefs.set("assistant-collapsible", val);
  }

  get startCollapsed(): boolean {
    return this.prefs.get('assistant-start-collapsed') ?? false;
  }

  set startCollapsed(val: boolean) {
    this.prefs.set("assistant-start-collapsed", val);
  }
}
