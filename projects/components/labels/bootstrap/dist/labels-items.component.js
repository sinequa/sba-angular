"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BsLabelsItemsComponent = void 0;
var core_1 = require("@angular/core");
var BsLabelsItemsComponent = /** @class */ (function () {
    function BsLabelsItemsComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.itemRemoved = new core_1.EventEmitter();
        this.items = [];
    }
    BsLabelsItemsComponent.prototype.update = function (items) {
        this.items = items;
        this.changeDetectorRef.markForCheck();
    };
    BsLabelsItemsComponent.prototype.removeItem = function (item) {
        this.itemRemoved.next(item);
        this.changeDetectorRef.markForCheck();
    };
    __decorate([
        core_1.Output()
    ], BsLabelsItemsComponent.prototype, "itemRemoved");
    BsLabelsItemsComponent = __decorate([
        core_1.Component({
            selector: "sq-labels-items",
            template: "\n        <span\n            *ngFor=\"let item of items\"\n            class=\"badge badge-pill badge-info clickable align-self-center mr-1\">\n            {{ item.display }}\n            <span class=\"fas fa-times-circle clickable\" (click)=\"removeItem(item)\"></span>\n        </span>\n    ",
            styles: [
                "\n            :host {\n                display: flex;\n            }\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
            ]
        })
    ], BsLabelsItemsComponent);
    return BsLabelsItemsComponent;
}());
exports.BsLabelsItemsComponent = BsLabelsItemsComponent;
