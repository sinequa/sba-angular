import { Injectable } from "@angular/core";

export type FrameMessage<T = undefined> = { type: string, url: string, data?: T };

@Injectable({providedIn: 'root'})
export class PreviewFrameService {

  subscribers: {
    [url: string]: {
      [type: string]: (data: any) => void
    }
  } = {};

  constructor() {
    window.addEventListener("message", (event: MessageEvent) => {
      const message = event.data as FrameMessage;
      if(message?.url && message?.type) {
        this.subscribers[message.url]?.[message.type]?.(message.data);
      }
    });
  }

  subscribe<T>(url: string, type: string, callback: (data: T) => void) {
    if(!this.subscribers[url]) {
      this.subscribers[url] = {};
    }
    this.subscribers[url][type] = callback;
  }

  unsubscribe(url: string) {
    delete this.subscribers[url];
  }

}
