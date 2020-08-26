"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LabelsAutocomplete = void 0;
var core_1 = require("@angular/core");
var autocomplete_1 = require("@sinequa/components/autocomplete");
var base_1 = require("@sinequa/core/base");
var LabelsAutocomplete = /** @class */ (function (_super) {
    __extends(LabelsAutocomplete, _super);
    function LabelsAutocomplete(elementRef, suggestService, appService, uiService, labelsWebService) {
        var _this = _super.call(this, elementRef, suggestService, appService, uiService) || this;
        _this.labelsWebService = labelsWebService;
        /** Stores the selected labels items selected via Tab */
        _this.labelsItems = [];
        return _this;
    }
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    LabelsAutocomplete.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var _a;
        _super.prototype.ngOnChanges.call(this, changes);
        // Subscribe to the labels items's container
        if (changes["labelsItemsContainer"] && this.labelsItemsContainer) {
            if (this._labelsSubscription) {
                this._labelsSubscription.unsubscribe();
            }
            this._labelsSubscription = this.labelsItemsContainer.itemRemoved.subscribe(function (item) {
                _this.labelsItems.splice(_this.labelsItems.indexOf(item), 1);
                _this.updatePlaceholder();
                _this.submit.next();
            });
        }
        // If labels category changes, we must remove the labels items
        if (changes["public"] && this.labelsItems.length > 0) {
            this.labelsItems.splice(0);
            this.setInputValue("");
        }
        this.updatePlaceholder();
        (_a = this.labelsItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.labelsItems);
    };
    /**
     * Unsubscribe when destroying the component
     */
    LabelsAutocomplete.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._labelsSubscription) {
            this._labelsSubscription.unsubscribe();
        }
    };
    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    LabelsAutocomplete.prototype.getSuggests = function () {
        var _this = this;
        var value = this.getInputValue();
        if (value) { // If there is text
            // parse
            var labels = value.split(";");
            // find label at caret location
            var position = this.getInputPosition();
            var length = 0;
            var val = void 0;
            for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                var label = labels_1[_i];
                if (position >= length && position <= length + label.length) {
                    val = {
                        value: label,
                        start: length,
                        length: label.length
                    };
                    break;
                }
                length += label.length + 1;
            }
            // Get suggestions from web service
            if (val) {
                this.labelsWebService.list(val.value, this.public).subscribe(function (labels) {
                    if (_this.getState() === autocomplete_1.AutocompleteState.ACTIVE || _this.getState() === autocomplete_1.AutocompleteState.OPENED) {
                        _this.dropdown.update(true, labels.labels.map(function (label) {
                            return {
                                display: label,
                                category: ""
                            };
                        }));
                    }
                }, function (err) {
                    _this.dropdown.update(false);
                }, function () {
                    if (_this.dropdown.hasItems && _this.getState() === autocomplete_1.AutocompleteState.ACTIVE) {
                        _this.open(); // Switch from ACTIVE to OPENED (if not already)
                    }
                    else if (!_this.dropdown.hasItems && _this.getState() === autocomplete_1.AutocompleteState.OPENED) { // No data
                        _this.active(); // Switch from OPENED to ACTIVE (if not already)
                    }
                });
            }
        }
        else { // If empty input, restart autocomplete
            this.start();
        }
    };
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns fqlse since lqbels items don't need to be searched
     */
    LabelsAutocomplete.prototype.setAutocompleteItem = function (item) {
        var _a;
        if (item) {
            // Store the autocomplete item that will be used to create a selection
            this.setInputValue("");
            this.labelsItems.push(item);
            this.updatePlaceholder();
            (_a = this.labelsItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.labelsItems);
        }
        return false;
    };
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove labels items.
     * @param event the keyboard
     */
    LabelsAutocomplete.prototype.keydown = function (event) {
        var _a;
        var keydown = _super.prototype.keydown.call(this, event);
        if (keydown === undefined) {
            //We can remove selections by typing <backspace> when the input is empty
            if (event.keyCode === base_1.Keys.backspace) {
                if (this.getInputValue() === '') {
                    this.labelsItems.pop();
                    this.updatePlaceholder();
                    (_a = this.labelsItemsContainer) === null || _a === void 0 ? void 0 : _a.update(this.labelsItems);
                }
            }
        }
        return keydown;
    };
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    LabelsAutocomplete.prototype.updatePlaceholder = function () {
        this._placeholder = this.labelsItems.length > 0 ? '' : this.placeholder;
    };
    __decorate([
        core_1.Input()
    ], LabelsAutocomplete.prototype, "labelsItemsContainer");
    __decorate([
        core_1.Input()
    ], LabelsAutocomplete.prototype, "public");
    LabelsAutocomplete = __decorate([
        core_1.Directive({
            selector: "[sqAutocompleteLabels]"
        })
    ], LabelsAutocomplete);
    return LabelsAutocomplete;
}(autocomplete_1.Autocomplete));
exports.LabelsAutocomplete = LabelsAutocomplete;
