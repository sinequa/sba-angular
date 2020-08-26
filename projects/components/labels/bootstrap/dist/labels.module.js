"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BsLabelsModule = exports.defaultLabelComponents = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var intl_1 = require("@sinequa/core/intl");
var validation_1 = require("@sinequa/core/validation");
var utils_1 = require("@sinequa/components/utils");
var selection_1 = require("@sinequa/components/selection");
var modal_1 = require("@sinequa/components/modal");
var action_1 = require("@sinequa/components/action");
var autocomplete_1 = require("@sinequa/components/autocomplete");
var labels_action_item_1 = require("./labels-action-item/labels-action-item");
var rename_label_1 = require("./rename-label/rename-label");
var labels_menu_component_1 = require("./labels-menu/labels-menu.component");
var labels_module_1 = require("../labels.module");
var labels_service_1 = require("../labels.service");
var labels_items_component_1 = require("./labels-items.component");
exports.defaultLabelComponents = {
    labelActionItem: labels_action_item_1.BsLabelsActionItem,
    renameModal: rename_label_1.BsRenameLabel
};
var BsLabelsModule = /** @class */ (function () {
    function BsLabelsModule() {
    }
    BsLabelsModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                intl_1.IntlModule,
                validation_1.ValidationModule,
                utils_1.UtilsModule,
                selection_1.BsSelectionModule,
                modal_1.BsModalModule,
                autocomplete_1.BsAutocompleteModule,
                labels_module_1.LabelsModule,
                action_1.BsActionModule
            ],
            declarations: [
                labels_action_item_1.BsLabelsActionItem, rename_label_1.BsRenameLabel, labels_menu_component_1.BsLabelsMenuComponent, labels_items_component_1.BsLabelsItemsComponent
            ],
            exports: [
                labels_action_item_1.BsLabelsActionItem, rename_label_1.BsRenameLabel, labels_menu_component_1.BsLabelsMenuComponent, labels_items_component_1.BsLabelsItemsComponent
            ],
            providers: [
                { provide: labels_service_1.LABELS_COMPONENTS, useValue: exports.defaultLabelComponents },
            ]
        })
    ], BsLabelsModule);
    return BsLabelsModule;
}());
exports.BsLabelsModule = BsLabelsModule;
