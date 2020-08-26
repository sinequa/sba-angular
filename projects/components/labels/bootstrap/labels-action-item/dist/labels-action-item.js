"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BsLabelsActionItem = void 0;
var core_1 = require("@angular/core");
var base_1 = require("@sinequa/core/base");
/**
 * Component containing a form and autocomplete to search
 * through the list of labels and select one to filter the
 * search results.
 *
 * The component can be used a custom component in the Action
 * menus.
 */
var BsLabelsActionItem = /** @class */ (function () {
    function BsLabelsActionItem(elementRef, labelsService) {
        this.elementRef = elementRef;
        this.labelsService = labelsService;
        this.radioButtons = [];
        if (!!this.labelsService.publicLabelsField && !!this.labelsService.privateLabelsField) {
            this.radioButtons = [
                {
                    id: "publicLabel",
                    name: "msg#labels.public",
                    value: true,
                    disabled: false,
                    checked: true
                },
                {
                    id: "privateLabel",
                    name: "msg#labels.private",
                    value: false,
                    disabled: false,
                    checked: false
                }
            ];
        }
        else if (!!this.labelsService.publicLabelsField) {
            this.radioButtons = [
                {
                    id: "publicLabel",
                    name: "msg#labels.public",
                    value: true,
                    disabled: true,
                    checked: true
                }
            ];
        }
        else {
            this.radioButtons = [
                {
                    id: "privateLabel",
                    name: "msg#labels.private",
                    value: false,
                    disabled: true,
                    checked: true
                }
            ];
        }
    }
    BsLabelsActionItem.prototype.getDropdownItem = function () {
        if (this.elementRef) {
            var current = this.elementRef.nativeElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    };
    BsLabelsActionItem.prototype.keydown = function (event) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === base_1.Keys.tab) {
            var dropdownItem = this.getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    };
    BsLabelsActionItem.prototype.keypress = function (event) {
        if (event.keyCode === base_1.Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    };
    BsLabelsActionItem.prototype.updateLabelsNature = function (nature) {
        this.public = nature;
    };
    BsLabelsActionItem = __decorate([
        core_1.Component({
            selector: "sq-labels-action-item",
            templateUrl: "./labels-action-item.html",
            styles: ["\n.sq-dropdown-form {\n    min-width: 13rem;\n}\n\n.input-autocomplete{\n    display: flex;\n    flex-direction: column;\n}\n    "]
        })
    ], BsLabelsActionItem);
    return BsLabelsActionItem;
}());
exports.BsLabelsActionItem = BsLabelsActionItem;
