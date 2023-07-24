import { BaseProvider, NodeType, ProviderFactory, Node } from "@sinequa/analytics/network";
import { ChatConfig, ChatService } from "@sinequa/components/machine-learning";
import { Query } from "@sinequa/core/app-utils";
import { Record as SqRecord} from "@sinequa/core/web-services";
import { BehaviorSubject, filter, finalize, map, switchMap } from "rxjs";
import { AssistantService } from "../assistant/assistant.service";
import { parse } from "yaml"

export interface GptNetwork {
  edges: {from: string, to: string, type?: string}[],
  nodeTypes?: string[]
}

export class GptProvider extends BaseProvider {

  nodes: Record<string, NodeType>;
  edge: Record<string, any>;

  loading$ = new BehaviorSubject<boolean>(false);

  query?: Query;

  constructor(
    public factory: ProviderFactory,
    public assistantService: AssistantService,
    public chatService: ChatService,
    public record?: SqRecord
  ) {
    super('');
    this.nodes = {
      person: factory.createFontAwesomeNodeType('person', "\uf007", "#0275d8", 12),
      company: factory.createFontAwesomeNodeType('company', "\uf1ad", "#f0ad4e", 12),
      location: factory.createFontAwesomeNodeType('location', "\uf57d", "#5cb85c", 12),
    }
    this.edge = factory.createEdgeOptions(undefined, 3);
  }

  updateRecord(record: SqRecord, query: Query) {
    this.record = record;
    this.query = query;
    this.getData(undefined);
  }

  get chatConfig() : ChatConfig {
    return this.assistantService.chatConfig;
  }

  override getData(context) {
    super.getData(this.context || context);

    this.dataset.clear();

    if(this.record && this.context) {

      // Network view
      const prompt = {
        role: 'system',
        display: false,
        content: this.assistantService.getPrompt("networkPrompt", this.record, {query: this.query}),
      };

      this.loading$.next(true);

      // Generate an attachment from the record
      this.chatService.addDocument(this.record, [], 2048, 5, 10).pipe(
        map(attachment => [
          prompt,
          ...this.chatService.prepareAttachmentMessages([attachment], [], true)
        ]),

        // Fetch the messages from the chat service
        switchMap(messages => this.chatService.fetch(messages, this.chatConfig.model, this.chatConfig.temperature, this.chatConfig.maxTokens, this.chatConfig.topP, this.chatConfig.googleContextPrompt, this.chatConfig.stream)),

        // Extract the GPT network from the messages
        map(messages => {
          const message = messages.messagesHistory.at(-1)!.content;
          let start = message.indexOf('nodeTypes:');
          if(start === -1) {
            start = message.indexOf('edges:');
          }
          let end = message.lastIndexOf('\n');
          if(message.substring(end+1).match(/^\s*type: .+$/)) {
            end = message.length;
          }
          if(start !== -1) {
            const yaml = message.substring(start, end);
            return parse(yaml) as GptNetwork;
          }
          return undefined;
        }),

        // Filter out undefined values
        filter((data): data is GptNetwork => !!data),

        // Map the GPT network to the network dataset
        map(data => {

          const nodeTypes = {...this.nodes};

          if(data.nodeTypes) {
            data.nodeTypes
              .map(type => type.trim().split(','))
              .filter(type => type.length === 3)
              .forEach(type => nodeTypes[type[0]] = this.factory.createFontAwesomeNodeType(type[0], type[1], type[2], 12));
          }

          const edges = data.edges?.filter(edge => edge?.from && edge?.to);

          if(edges?.length) {
            for(let edge of edges) {
              const from = this.getNode(nodeTypes, edge.from);
              const to = this.getNode(nodeTypes, edge.to);
              if(from && to) {
                const newedge = this.createEdge({
                  edgeOptions: this.edge,
                  nodeTypes: [from.type, to.type]
                }, from, to, undefined, true, undefined, 50, true, edge.type);
                if(!this.dataset.hasEdge(newedge.id)) {
                  this.dataset.addEdges(newedge);
                }
              }
            }
          }

          return this.dataset;
        }),

        finalize(() => this.loading$.next(false))

      ).subscribe(() => this.provider.next(this.dataset));
    }

  }

  /**
   * Get the node id from the node type and the node name
   */
  getNode(nodeTypes: Record<string, NodeType>, id: string): Node|undefined {
    const [type, value] = id.split('#');
    if(type && value) {
      let nodeType = nodeTypes[type];
      if(!nodeType) {
        nodeType = this.factory.createFontAwesomeNodeType(type, "\uf128", "#777777", 12);
        nodeTypes[type] = nodeType;
      }
      const node = this.createNode(nodeType, value);
      if(this.dataset.hasNode(node.id)) {
        return this.dataset.getNode(node.id);
      }
      this.dataset.addNodes(node);
      return node;
    }
    return undefined;
  }
}
