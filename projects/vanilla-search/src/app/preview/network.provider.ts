import { BaseProvider, NodeType, ProviderFactory, Node } from "@sinequa/analytics/network";
import { ChatService } from "@sinequa/components/machine-learning";
import { Record as SqRecord} from "@sinequa/core/web-services";
import { BehaviorSubject, filter, map, switchMap, tap } from "rxjs";
import { AssistantService } from "../assistant/assistant.service";

export interface GptNetwork {
  nodes: {id: number, type: 'person' | 'company' | 'location', name: string}[],
  edges: {from: number, to: number, type: string}[],
  nodeTypes?: {type: string, icon: string, color: string}[]
}

export class GptProvider extends BaseProvider {

  nodes: Record<string, NodeType>;
  otherNode: NodeType;
  edge: Record<string, any>;

  loading$ = new BehaviorSubject<boolean>(false);

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
    this.otherNode = factory.createFontAwesomeNodeType("other", "\uf128", "#777777", 12);
    this.edge = factory.createEdgeOptions(undefined, 3);
  }

  updateRecord(record: SqRecord) {
    this.record = record;
    this.getData(undefined);
  }

  override getData(context) {
    super.getData(this.context || context);

    this.dataset.clear();

    if(this.record && this.context) {

      // Network view
      const prompt = {
        role: 'system',
        display: false,
        content: this.assistantService.getPrompt("networkPrompt", this.record, {query: this.context.query}),
        $content: ''
      };

      this.loading$.next(true);

      // Generate an attachment from the record
      this.chatService.addDocument(this.record, [], 2048, 5, 10).pipe(
        map(attachment => [
          prompt,
          ...this.chatService.prepareAttachmentMessages([attachment], [], true)
        ]),

        // Fetch the messages from the chat service
        switchMap(messages => this.chatService.fetch(messages, "GPT4-8K", 1, 1000, 1)),

        // Extract the GPT network from the messages
        map(messages => {
          const message = messages.messagesHistory.at(-1)!.content;
          const match = message.match(/\{[^]*\}/gm)?.at(0);
          if(match) {
            try {
              return JSON.parse(match) as GptNetwork;
            }
            catch(e) {
              console.error(e);
            }
          }
          return undefined;
        }),

        tap(() => this.loading$.next(false)),

        // Filter out undefined values
        filter((data): data is GptNetwork => !!data),

        // Map the GPT network to the network dataset
        map(data => {

          const nodeTypes = {...this.nodes};

          if(data.nodeTypes) {
            const customTypes = Object.fromEntries(
              data.nodeTypes.map(type =>
                [type.type, this.factory.createFontAwesomeNodeType(type.type, type.icon, type.color, 12)]
              )
            );
            Object.assign(nodeTypes, customTypes)
          }

          // Generate the nodes
          this.dataset.addNodes(
            data.nodes.map(node => this.createNode(
              nodeTypes[node.type] ?? this.otherNode,
              ""+node.id,
              node.name
            ))
          );

          // Generate the edges
          this.dataset.addEdges(
            data.edges.map(edge => {
              let from = this.getNode(data, nodeTypes, edge.from);
              let to = this.getNode(data, nodeTypes, edge.to);
              return this.createEdge({
                edgeOptions: this.edge,
                nodeTypes: [from.type, to.type]
              }, from, to, undefined, true, undefined, 50, true, edge.type);
            })
          );
          return this.dataset;
        })
      ).subscribe(() => this.provider.next(this.dataset));
    }

  }

  /**
   * Get the node id from the node type and the node name
   */
  getNode(data: GptNetwork, nodeTypes: Record<string, NodeType>, id: number): Node {
    const n = data.nodes.find(node => node.id === id);
    if(n) {
      const nodeId = this.getNodeId(nodeTypes[n.type], ""+n.id);
      return this.dataset.getNode(nodeId)!;
    }
    const newNode = this.createNode(this.otherNode, ""+id, ""+id);
    this.dataset.addNodes([newNode]);
    return newNode;
  }
}
