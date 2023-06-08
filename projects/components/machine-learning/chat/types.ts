import { Action } from "@sinequa/components/action";
import { Record } from "@sinequa/core/web-services";

/**
 * Individual message sent & returned by the ChatGPT API.
 * If this message is an attachment, we attach the minimal
 * information needed to reconstruct this attachment (RawAttachment)
 * as well as the reference id computed at the moment of sending
 * the attachment to the API.
 */
export interface RawMessage {
  role: string;
  content: string;
  display: boolean;
  /** Messages from the user can have attachments */
  $attachment?: RawAttachment;
  /** Reference of this attachment in the contexte of the conversation */
  $refId?: number;
  /** Optionally include a custom action suggested by the assistant */
  $actions?: Action[];
}

/**
 * A chat message that has been processed to include the markdown-formatted
 * content for display, as well as detailed attachment data, and optionally
 * a list of the references extracted from that message
 */
export interface ChatMessage extends RawMessage {
  /** This content is formatted to be properly displayed in the UI */
  $content?: string;
  /** Messages from the user can have attachments */
  $attachment?: ChatAttachment;
  /** Messages from the assistant can have references that refer to attachments ids */
  $references?: {refId: number; $record: Record}[];
}

/**
 * Minimal information necessary to reconstruct an attachment
 */
export interface RawAttachment {
  recordId: string;
  chunks: DocumentChunk[];
}

/**
 * Chunk of text extracted from a document at a specific location
 */
export interface DocumentChunk {
  offset: number;
  length: number;
  text: string;
}

/**
 * Chat attachment for which we know the text and the source
 * record object
 */
export interface ChatAttachment extends RawAttachment {
  /** Record from which this this attachment is taken */
  $record: Record;
  /** Whether the attachment is displayed expanded of not */
  $expanded?: boolean;
}

/**
 * Chat Attachment for which we know the number
 * of tokens it consumes
 */
export interface ChatAttachmentWithTokens extends ChatAttachment {
  /** Number of tokens of this message */
  $tokenCount: number;
}

/**
 * Information provided by the API about the number of tokens consumed
 * by the current conversation
 */
export type GllmTokens = {
  used: number;
  model: number;
}

/**
 * Information provided by the API about the number of tokens consumed
 * across all conversations
 */
export type GllmTokenQuota = {
  tokenCount: number;
  periodTokens: number;
  resetHours: number;
  lastResetUTC: string;
  nextResetUTC: string;
}

/**
 * Raw response of the API
 */
export interface RawResponse {
  messagesHistory: RawMessage[];
  tokens: number;
  streaming?: boolean;
}

/**
 * Enriched response of the API
 */
export interface ChatResponse extends RawResponse {
  messagesHistory: ChatMessage[];
}

/**
 * Model names supported by the API
 */
export type GllmModel = "GPT35Turbo" | "GPT4-8K" | "GPT4-32K" | "Chat-Bison-001" | "command-xlarge-nightly";
export type GllmProvider = "OpenAI" | "Google" | "Cohere";

export interface GllmModelDescription {
  name: GllmModel;
  displayName: string;
  provider: GllmProvider;
  size: number;
  eventStream: boolean;
}

/**
 * Minimal data structure saved to reconstruct a conversation
 */
export interface SavedChat {
  name: string;
  messages: RawMessage[];
  tokens: GllmTokens;
}
