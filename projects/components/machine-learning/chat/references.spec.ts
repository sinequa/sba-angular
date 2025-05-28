import { Query } from "@sinequa/core/app-utils"
import { extractReferences } from "./references"
import { ChatAttachment, ChatMessage } from "./types"

const conversation: ChatMessage[] = [
  {role: 'user', display: true, content: '', $content: '', $refId: 1, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 2, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 3, $attachment: {$record: {}} as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 4, $attachment: {}            as ChatAttachment},
  {role: 'user', display: true, content: '', $content: '', $refId: 5, $attachment: {$record: {}} as ChatAttachment}
]

const query = new Query("test");

describe("Extract references", () => {

  it("should extract simple references", () => {
    const {$references} = extractReferences('document [3] and document [1]', conversation, query);
    expect($references).toBeTruthy();
    expect($references?.length).toEqual(2);
    expect($references?.[0].refId).toEqual(1);
    expect($references?.[1].refId).toEqual(3);
  });

  it("should ignore when missing record references", () => {
    const {$references} = extractReferences('document [4] and document [1]', conversation, query);
    expect($references).toBeTruthy();
    expect($references?.length).toEqual(1);
    expect($references?.[0].refId).toEqual(1);
  });

  it("should handle the comma format", () => {
    const {$references} = extractReferences('documents [3,2,1] and document [1]', conversation, query);
    expect($references).toBeTruthy();
    expect($references?.length).toEqual(3);
    expect($references?.[0].refId).toEqual(1);
    expect($references?.[1].refId).toEqual(2);
    expect($references?.[2].refId).toEqual(3);
  });

  it("should handle other formats", () => {
    const {$references} = extractReferences('document [id: 2] and [document:1 ] but also [documents: 3, 5]', conversation, query);
    expect($references).toBeTruthy();
    expect($references?.length).toEqual(4);
    expect($references?.[0].refId).toEqual(1);
    expect($references?.[1].refId).toEqual(2);
    expect($references?.[2].refId).toEqual(3);
    expect($references?.[3].refId).toEqual(5);
  });

  it("should handle range formats", () => {
    const {$references} = extractReferences('documents [2-5]', conversation, query);
    expect($references).toBeTruthy();
    expect($references?.length).toEqual(3);
    expect($references?.[0].refId).toEqual(2);
    expect($references?.[1].refId).toEqual(3);
    expect($references?.[2].refId).toEqual(5);
  });
})
