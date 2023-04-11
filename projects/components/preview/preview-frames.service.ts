import { Inject, Injectable } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { StartConfig, START_CONFIG } from "@sinequa/core/web-services";

export type FrameMessage<T = undefined> = { type: string, url: string, data?: T };

@Injectable({providedIn: 'root'})
export class PreviewFrameService {

  subscribers: {
    [url: string]: {
      [type: string]: (data: any) => void
    }
  } = {};

  constructor(
    public appService: AppService,
    @Inject(START_CONFIG) public startConfig: StartConfig
  ) {
    window.addEventListener("message", (event: MessageEvent) => {
      const message = event.data as FrameMessage;
      if(message?.url && message?.type) {
        this.subscribers[message.url]?.[message.type]?.(message.data);
      }
    });
  }

  subscribe<T>(url: string, type: string, callback: (data: T) => void) {
    if(!Utils.isUrlAbsolute(url)) {
      url = Utils.addUrl(this.appService.origin, url);
    }
    if(!this.subscribers[url]) {
      this.subscribers[url] = {};
    }
    this.subscribers[url][type] = callback;
  }

  unsubscribe(url: string) {
    delete this.subscribers[url];
  }

}
