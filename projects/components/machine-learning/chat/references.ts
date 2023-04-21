import { Utils } from "@sinequa/core/base";
import { Record } from "@sinequa/core/web-services";
import { ChatMessage } from "./types";


/**
 * Extract references from a given message, given the context of a conversation
 * (which includes messages/attachments that this message is refering to).
 */
export function extractReferences(message: ChatMessage, conversation: ChatMessage[]) {
  const references = new Map<number,Record>();
  // Handle the [2-8] format
  message.$content = message.$content.replace(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+)\-(\d+)\]/g, (str, first, last) => {
    if(!isNaN(+first) && !isNaN(+last) && (+last) - (+first) > 0 && (+last) - (+first) < 10) {
      str = '';
      for(let i=+first; i<=+last; i++) {
        str += `[${i}]`;
      }
    }
    return str;
  });
  // Handle normal formats [1], [3,5,8], [id:3]
  message.$content = message.$content.replace(/\[(?:ids?:?\s*)?(?:documents?:?\s*)?(\d+(,\s*[ \d]+)*\s*)\]/g, (str,match) => {
    let html = '';
    for(let ref of match.split(',')) {
      const record = conversation.find(p => p.$refId === +ref)?.$attachment?.$record;
      if(record) {
        html += `<a class="reference" href="${record.url1}" title="${Utils.escapeHtml(record.title)}">${Utils.escapeHtml(ref)}</a>`;
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
  message.$references = Array.from(references.entries())
    .map(([refId,$record]) => ({refId, $record}))
    .sort((a,b)=> a.refId - b.refId);
}
