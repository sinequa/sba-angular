import { Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Record } from "@sinequa/core/web-services";
import { ChatMessage } from "./types";

/**
 * Replace any occurrence of the range pattern (eg. [2-8]) with an explicit
 * list of references (eg. [2][3][4][5][6][7][8])
 */
export function replaceRangeFormat(content: string): string {
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
export function getReferenceMatches(content: string) {
  content = replaceRangeFormat(content);
  return Array.from(content.matchAll(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+(,\s*[ \d]+)*\s*)\]/g));
}

/**
 * Extract references from a given message, given the context of a conversation
 * (which includes messages/attachments that this message is refering to).
 */
export function extractReferences(content: string, conversation: ChatMessage[], query: Query): {$content: string, $references: {refId: number, $record: Record}[]} {
  const references = new Map<number,Record>();
  // Handle the [2-8] format
  let $content = replaceRangeFormat(content);
  // Handle normal formats [1], [3,5,8], [id:3]
  $content = $content.replace(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+(,\s*[ \d]+)*\s*)\]/g, (str,match) => {
    let html = '';
    for(let ref of match.split(',')) {
      const record = conversation.find(p => p.$refId === +ref)?.$attachment?.$record;
      if(record) {
        const url = record?.url1 || record?.originalUrl || `#/preview?id=${encodeURIComponent(record.id)}&query=${encodeURIComponent(query.toJsonForQueryString())}`;
        html += `<a class="reference" href="${url}" title="${Utils.escapeHtml(record.title)}" target="_blank">${Utils.escapeHtml(ref)}</a>`;
        if(!references.has(+ref)) {
          references.set(+ref, record);
        }
      }
      else {
        html += `<span class="reference">${Utils.escapeHtml(ref)}</span>`;
      }
    }
    return html;
  });
  const $references = Array.from(references.entries())
    .map(([refId,$record]) => ({refId, $record}))
    .sort((a,b)=> a.refId - b.refId);
  return {$content, $references};
}
