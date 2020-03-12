import {Component} from "@angular/core";
import {Action} from "@sinequa/components/action";
import {Utils} from "@sinequa/core/base";
import {Subscription} from "rxjs";
import {UIService} from "@sinequa/components/utils";

@Component({
    selector: "sq-fullscreen-activator",
    templateUrl: "./fullscreen-activator.html"
})
export class BsFullscreenActivator {
    action: Action;
    resizeSubscription: Subscription | undefined;

    constructor(
        private uiService: UIService) {
        this.buildAction();
    }

    getFullscreenIcon(): string {
        return !this.isFullscreen() ? "fas fa-expand" : "fas fa-compress";
    }
    
    getFullscreenTitle(): string {
        return !this.isFullscreen() ? "msg#statusbar.fullscreenTitleEnter" : "msg#statusbar.fullscreenTitleExit";
    }
        
    buildAction() {
        this.action = new Action({
            icon: this.getFullscreenIcon(),
            title: this.getFullscreenTitle(),
            action: (item, $event) => {
                this.toggleFullscreen();
                item.icon = this.getFullscreenIcon();
                item.title = this.getFullscreenTitle();
            },
            init: (item) => {
                
                this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent,
                    (event) => {
                        this.action.icon = this.getFullscreenIcon();
                        this.action.title = this.getFullscreenTitle();
                    });
                
            },
            destroy: (item) => {
                
                if (this.resizeSubscription) {
                    this.resizeSubscription.unsubscribe();
                    this.resizeSubscription = undefined;
                }
                
            }
        });        
    }
    
    requestFullscreen() {
        let doc = window.document;
        let docEl = doc.documentElement;
        let requestFullScreen = docEl["requestFullscreen"] || docEl["mozRequestFullScreen"] || docEl["webkitRequestFullScreen"] || docEl["msRequestFullscreen"];
        if (requestFullScreen) {
            requestFullScreen.call(docEl);
        }
    }

    cancelFullscreen() {
        let doc = window.document;
        let cancelFullScreen = doc["exitFullscreen"] || doc["mozCancelFullScreen"] || doc["webkitExitFullscreen"] || doc["msExitFullscreen"];
        if (cancelFullScreen) {
            cancelFullScreen.call(doc);
        }
    }

    isFullscreen() {
        let doc = window.document;
        return doc["fullscreenElement"] || doc["mozFullScreenElement"] || doc["webkitFullscreenElement"] || doc["msFullscreenElement"];
    }

    toggleFullscreen() {
        if (!this.isFullscreen()) {
            this.requestFullscreen();
        }
        else {
            this.cancelFullscreen();
        }
    }     
}