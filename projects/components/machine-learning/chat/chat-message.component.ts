import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { ChatAttachment, ChatMessage } from "./types";

import { unified, Processor } from "unified";
import remarkParse from "remark-parse";
import { visit, CONTINUE, EXIT } from "unist-util-visit";
import { Text, Parent, Content } from "mdast";
import { Node } from "unist";

@Component({
  selector: "sq-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnChanges {
  @Input() message: ChatMessage;
  @Input() conversation: ChatMessage[];
  @Input() assistantIcon: string;
  @Input() streaming: boolean;
  @Input() canEdit: boolean = false;
  @Input() canRegenerate: boolean = false;
  @Output() referenceClicked = new EventEmitter<Record>();
  @Output() edit = new EventEmitter<ChatMessage>();
  @Output() regenerate = new EventEmitter<ChatMessage>();

  processor: Processor;

  references: number[] = [];
  referenceMap = new Map<number, ChatAttachment>();

  constructor(
    public searchService: SearchService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.message && this.message.role === "assistant") {
      this.references = [];
      this.referenceMap.clear();
      for(let m of this.conversation) {
        if(m.$attachment) {
          this.referenceMap.set(m.$refId!, m.$attachment);
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

  onReferenceClicked(record: Record, event: MouseEvent) {
    const url = record.url1 || record.originalUrl;
    if(!url) {
      event.preventDefault();
    }
    this.referenceClicked.emit(record);
  }

  /**
   * This Unified plugin looks a text nodes and replaces any reference in the
   * form [1], [2,3,4], [3-5], etc. with custom nodes of type "chat-reference".
   */
  referencePlugin = (tree: Node) => {

    const references = new Set<number>();

    // Visit all text nodes
    visit(tree, "text", (node: Text, index: number, parent: Parent) => {
      const text = node.value;

      const matches = this.getReferenceMatches(text);

      // Quit if no references were found
      if(matches.length === 0) {
        return CONTINUE;
      }

      const nodes: (Content & {end: number})[] = [];

      for(let match of matches) {
        const refId = +match[1];
        // We find a valid reference in the text
        if(!isNaN(refId)) {
          references.add(refId); // Add it to the set of used references

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
      this.references = Array.from(references.values()).sort((a,b) => a-b);
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
   * Replace any occurrence of the range pattern (eg. [2-8]) with an explicit
   * list of references (eg. [2][3][4][5][6][7][8])
   */
  replaceRangeFormat(content: string): string {
    return content.replace(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+)\-(\d+)\]/g, (str, first, last) => {
      if(!isNaN(+first) && !isNaN(+last) && (+last) - (+first) > 0 && (+last) - (+first) < 10) {
        str = '';
        for(let i=+first; i<=+last; i++) {
          str += `[${i}]`;
        }
      }
      return str;
    });
  }

  /**
   * Match all references in a given message
   */
  getReferenceMatches(content: string) {
    content = this.replaceRangeFormat(content);
    return Array.from(content.matchAll(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+(,\s*[ \d]+)*\s*)\]/g));
  }

}
