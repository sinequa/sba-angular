import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectorRef, AfterViewInit, ElementRef } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { ChatAttachmentOpen, ChatMessage } from "./types";

import { unified, Processor } from "unified";
import remarkParse from "remark-parse";
import { visit, CONTINUE, EXIT } from "unist-util-visit";
import { Text, Parent, Content } from "mdast";
import { Node } from "unist";
import { UIService } from "@sinequa/components/utils";

declare module Prism {
  function highlightAllUnder(el: HTMLElement): void;
}

@Component({
    selector: "sq-chat-message",
    templateUrl: "./chat-message.component.html",
    styleUrls: ["./chat-message.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChatMessageComponent implements OnChanges, AfterViewInit {
  @Input() message: ChatMessage;
  @Input() conversation: ChatMessage[];
  @Input() assistantIcon: string;
  @Input() streaming: boolean;
  @Input() canEdit: boolean = false;
  @Input() canRegenerate: boolean = false;
  @Output() referenceClicked = new EventEmitter<Record>();
  @Output() edit = new EventEmitter<ChatMessage>();
  @Output() regenerate = new EventEmitter<ChatMessage>();
  @Output() openPreview = new EventEmitter<ChatAttachmentOpen>();

  processor: Processor;

  references: string[] = [];
  referenceMap = new Map<string, ChatAttachmentOpen>();

  constructor(
    public searchService: SearchService,
    public ui: UIService,
    public cdr: ChangeDetectorRef,
    public el: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.message && this.message.role === "assistant") {
      this.references = [];
      this.referenceMap.clear();
      for(let m of this.conversation) {
        if(m.$attachment) {
          for(let i = 0; i < m.$attachment.chunks.length; i++) {
            const refId = `${m.$refId}.${i+1}`;
            this.referenceMap.set(refId, {...m.$attachment, $chunkIndex: i});
          }
          this.referenceMap.set(''+m.$refId!, {...m.$attachment, $chunkIndex: 0});
        }
      }

      this.processor = unified()
        .use(remarkParse)
        .use(() => this.referencePlugin);

      if(this.streaming) {
        this.processor = this.processor.use(() => this.placeholderPlugin);
      }
    }
  }

  ngAfterViewInit(): void {
    Prism?.highlightAllUnder?.(this.el.nativeElement);
  }

  onReferenceClicked(record: Record, event: MouseEvent) {
    const url = record.url1 || record.originalUrl;
    if(!url) {
      event.preventDefault();
    }
    this.referenceClicked.emit(record);
  }

  /**
   * This Unified plugin looks a text nodes and replaces any reference in the
   * form [1], [2.3], etc. with custom nodes of type "chat-reference".
   */
  referencePlugin = (tree: Node) => {

    const references = new Set<number>();

    // Visit all text nodes
    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      let text = node.value;

      text = this.reformatReferences(text);
      const matches = this.getReferenceMatches(text);

      // Quit if no references were found
      if(matches.length === 0) {
        return CONTINUE;
      }

      const nodes: (Content & {end: number})[] = [];

      for(let match of matches) {
        const refId = match[1].trim();
        const [ref] = refId.split(".");
        // We find a valid reference in the text
        if(!isNaN(+ref)) {
          references.add(+ref); // Add it to the set of used references

          // If needed, insert a text node before the reference
          const current = nodes.at(-1) ?? {end: 0};
          if (match.index! > current.end) {
            nodes.push({ type: "text", value: text.substring(current.end, match.index!), end: match.index! });
          }

          // Add a custom reference node
          nodes.push({ type: "chat-reference", refId, end: match.index! + match[0].length } as any);
        }
      }

      // Quit if no references were found
      if(nodes.length === 0) {
        return CONTINUE;
      }

      if(nodes.at(-1)!.end < text.length) {
        nodes.push({ type: "text", value: text.substring(nodes.at(-1)!.end, text.length), end: text.length });
      }

      // Delete the current text node from the parent and replace it with the new nodes
      parent.children.splice(index, 1, ...nodes);

      return index + nodes.length; // Visit the next node after the inserted ones
    });

    if(references.size > 0) {
      this.references = Array.from(references.values())
        .sort((a,b) => a-b)
        .map(r => ''+r);
      this.cdr.detectChanges();
    }

    return tree;
  }

  placeholderPlugin = (tree: Node) => {

    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      parent.children.push({type: "streaming-placeholder"} as any);
      return EXIT;
    }, true);

    return tree;
  }

  /**
   * Reformat [ids: 12.2, 42.5] to [12.2][42.5]
   */
  reformatReferences(content: string) {
    return content.replace(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\s*(?:,?\s*\d+(?:\.\d+)?\s*)+)\]/g,
      (str, match: string) => `[${match.split(',').join("] [")}]`
    );
  }

  /**
   * Match all references in a given message
   */
  getReferenceMatches(content: string) {
    return Array.from(content.matchAll(/\[(\s*\d+(?:\.\d+)?\s*)\]/g));
  }

  copyToClipboard(text: string) {
    this.ui.copyToClipboard(text);
  }
}
