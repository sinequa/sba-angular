import { extractReferences } from "./references"
import { ChatAttachment, ChatMessage } from "./types"

const conversation: ChatMessage[] = [
  {role: 'user', display: true, content: '', $content: '', $refId: 1, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 2, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 3, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 4, $attachment: {}            as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 5, $attachment: {$record: {}} as ChatAttachment}
]

describe("Extract references", () => {

  it("should extract simple references", () => {
    const message: ChatMessage = {
      role: 'user',
      content: '',
      $content: 'document [3] and document [1]',
      display: true
    }
    extractReferences(message, conversation);
    expect(message.$references).toBeTruthy();
    expect(message.$references?.length).toEqual(2);
    expect(message.$references?.[0].refId).toEqual(1);
    expect(message.$references?.[1].refId).toEqual(3);
  });

  it("should ignore when missing record references", () => {
    const message: ChatMessage = {
      role: 'user',
      content: '',
      $content: 'document [4] and document [1]',
      display: true
    }
    extractReferences(message, conversation);
    expect(message.$references).toBeTruthy();
    expect(message.$references?.length).toEqual(1);
    expect(message.$references?.[0].refId).toEqual(1);
  });

  it("should handle the comma format", () => {
    const message: ChatMessage = {
      role: 'user',
      content: '',
      $content: 'documents [3,2,1] and document [1]',
      display: true
    }
    extractReferences(message, conversation);
    expect(message.$references).toBeTruthy();
    expect(message.$references?.length).toEqual(3);
    expect(message.$references?.[0].refId).toEqual(1);
    expect(message.$references?.[1].refId).toEqual(2);
    expect(message.$references?.[2].refId).toEqual(3);
  });

  it("should handle other formats", () => {
    const message: ChatMessage = {
      role: 'user',
      content: '',
      $content: 'document [id: 2] and [document:1 ] but also [documents: 3, 5]',
      display: true
    }
    extractReferences(message, conversation);
    expect(message.$references).toBeTruthy();
    expect(message.$references?.length).toEqual(4);
    expect(message.$references?.[0].refId).toEqual(1);
    expect(message.$references?.[1].refId).toEqual(2);
    expect(message.$references?.[2].refId).toEqual(3);
    expect(message.$references?.[3].refId).toEqual(5);
  });

  it("should handle range formats", () => {
    const message: ChatMessage = {
      role: 'user',
      content: '',
      $content: 'documents [2-5]',
      display: true
    }
    extractReferences(message, conversation);
    expect(message.$references).toBeTruthy();
    expect(message.$references?.length).toEqual(3);
    expect(message.$references?.[0].refId).toEqual(2);
    expect(message.$references?.[1].refId).toEqual(3);
    expect(message.$references?.[2].refId).toEqual(5);
  });
})
