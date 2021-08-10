'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Components</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/BsActionModule.html" data-type="entity-link">BsActionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' : 'data-target="#xs-components-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' :
                                            'id="xs-components-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' }>
                                            <li class="link">
                                                <a href="components/BsActionButtons.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsActionButtons</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionItem.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsActionItem</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionItemContent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsActionItemContent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionMenu.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsActionMenu</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDropdownMenu.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDropdownMenu</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' : 'data-target="#xs-directives-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' :
                                        'id="xs-directives-links-module-BsActionModule-1db4542e3ffd42243b0e85d090271b7b"' }>
                                        <li class="link">
                                            <a href="directives/BsDropdownDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDropdownDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAdvancedModule.html" data-type="entity-link">BsAdvancedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' : 'data-target="#xs-components-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' :
                                            'id="xs-components-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' }>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormCheckbox.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormCheckbox</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormInput.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormInput</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormMultiInput.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormMultiInput</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormRange.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormRange</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormSelect.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormSelect</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDatePicker.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDatePicker</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDateRangePicker.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDateRangePicker</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' : 'data-target="#xs-directives-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' :
                                        'id="xs-directives-links-module-BsAdvancedModule-d936da353081b6d0ab79942776768d49"' }>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormAutocomplete.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormAutocomplete</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormAutocompleteMultiInput.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormAutocompleteMultiInput</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormValidation.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAdvancedFormValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAlertsModule.html" data-type="entity-link">BsAlertsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAlertsModule-c1378a7ddd45d2ba8e1f7a2273fff3e6"' : 'data-target="#xs-components-links-module-BsAlertsModule-c1378a7ddd45d2ba8e1f7a2273fff3e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAlertsModule-c1378a7ddd45d2ba8e1f7a2273fff3e6"' :
                                            'id="xs-components-links-module-BsAlertsModule-c1378a7ddd45d2ba8e1f7a2273fff3e6"' }>
                                            <li class="link">
                                                <a href="components/BsAlertMessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAlertMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAlertsMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAlertsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditAlert.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditAlert</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageAlerts.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsManageAlerts</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAutocompleteModule.html" data-type="entity-link">BsAutocompleteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' : 'data-target="#xs-components-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' :
                                            'id="xs-components-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' }>
                                            <li class="link">
                                                <a href="components/BsAutocompleteList.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAutocompleteList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFieldSearchItemsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFieldSearchItemsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' : 'data-target="#xs-directives-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' :
                                        'id="xs-directives-links-module-BsAutocompleteModule-3ca84d69d1804ab777cfa79c73515411"' }>
                                        <li class="link">
                                            <a href="directives/Autocomplete.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">Autocomplete</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AutocompleteFieldSearch.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutocompleteFieldSearch</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsBasketsModule.html" data-type="entity-link">BsBasketsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsBasketsModule-9ba85a25aaa44b2e368749483a641b20"' : 'data-target="#xs-components-links-module-BsBasketsModule-9ba85a25aaa44b2e368749483a641b20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsBasketsModule-9ba85a25aaa44b2e368749483a641b20"' :
                                            'id="xs-components-links-module-BsBasketsModule-9ba85a25aaa44b2e368749483a641b20"' }>
                                            <li class="link">
                                                <a href="components/BsBasketsMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsBasketsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditBasket.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditBasket</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetBasketsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetBasketsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageBaskets.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsManageBaskets</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultBaskets.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultBaskets</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectBasket.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSelectBasket</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsFacetModule.html" data-type="entity-link">BsFacetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsFacetModule-999bd4b63ddf49169113eba85c9d1353"' : 'data-target="#xs-components-links-module-BsFacetModule-999bd4b63ddf49169113eba85c9d1353"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsFacetModule-999bd4b63ddf49169113eba85c9d1353"' :
                                            'id="xs-components-links-module-BsFacetModule-999bd4b63ddf49169113eba85c9d1353"' }>
                                            <li class="link">
                                                <a href="components/BsFacetBar.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetBar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetCard.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetFilters.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetFilters</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetList.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetMultiComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetMultiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRange.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetRange</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetTagCloud.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetTagCloud</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetTree.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetTree</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsMySearch.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsMySearch</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsRefine.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsRefine</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsFeedbackModule.html" data-type="entity-link">BsFeedbackModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsFeedbackModule-1052fac5190f1889444a7f2d550087a2"' : 'data-target="#xs-components-links-module-BsFeedbackModule-1052fac5190f1889444a7f2d550087a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsFeedbackModule-1052fac5190f1889444a7f2d550087a2"' :
                                            'id="xs-components-links-module-BsFeedbackModule-1052fac5190f1889444a7f2d550087a2"' }>
                                            <li class="link">
                                                <a href="components/BsFeedbackMenu.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFeedbackMenu</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsLabelsModule.html" data-type="entity-link">BsLabelsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsLabelsModule-ef2bd9a5737170a00c850b55c7fa4a06"' : 'data-target="#xs-components-links-module-BsLabelsModule-ef2bd9a5737170a00c850b55c7fa4a06"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsLabelsModule-ef2bd9a5737170a00c850b55c7fa4a06"' :
                                            'id="xs-components-links-module-BsLabelsModule-ef2bd9a5737170a00c850b55c7fa4a06"' }>
                                            <li class="link">
                                                <a href="components/BsAddLabel.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsAddLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDeleteLabel.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDeleteLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditLabel.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLabelsAutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsLabelsAutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLabelsMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsLabelsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsRenameLabel.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsRenameLabel</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsModalModule.html" data-type="entity-link">BsModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsModalModule-5bc3cb5fba46759a996eae7973da700d"' : 'data-target="#xs-components-links-module-BsModalModule-5bc3cb5fba46759a996eae7973da700d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsModalModule-5bc3cb5fba46759a996eae7973da700d"' :
                                            'id="xs-components-links-module-BsModalModule-5bc3cb5fba46759a996eae7973da700d"' }>
                                            <li class="link">
                                                <a href="components/BsConfirm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsConfirm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditable.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditable</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsHelp.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsHelp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLogin.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsLogin</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModal.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsModal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModalFooter.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsModalFooter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModalHeader.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsModalHeader</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsOverrideUser.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsOverrideUser</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPrompt.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPrompt</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsNotificationModule.html" data-type="entity-link">BsNotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsNotificationModule-caa2bd266662bc51314ee3c219de3da2"' : 'data-target="#xs-components-links-module-BsNotificationModule-caa2bd266662bc51314ee3c219de3da2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsNotificationModule-caa2bd266662bc51314ee3c219de3da2"' :
                                            'id="xs-components-links-module-BsNotificationModule-caa2bd266662bc51314ee3c219de3da2"' }>
                                            <li class="link">
                                                <a href="components/BsNotification.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNotification</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNotifications.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNotifications</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNotificationsManager.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNotificationsManager</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsPreviewModule.html" data-type="entity-link">BsPreviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsPreviewModule-22157fe2a773cd4cd45561756c34101b"' : 'data-target="#xs-components-links-module-BsPreviewModule-22157fe2a773cd4cd45561756c34101b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsPreviewModule-22157fe2a773cd4cd45561756c34101b"' :
                                            'id="xs-components-links-module-BsPreviewModule-22157fe2a773cd4cd45561756c34101b"' }>
                                            <li class="link">
                                                <a href="components/BsFacetPreview.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetPreview</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetPreviewComponent2.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetPreviewComponent2</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewEntityFacetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewEntityFacetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewEntityPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewEntityPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewExtractsPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewExtractsPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewHighlights.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewHighlights</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewLinks.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewLinks</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPageFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewPageFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPagesPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewPagesPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPanel.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewPanel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPopup.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewPopup</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewSearchFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPreviewSearchFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultLinkPreview.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultLinkPreview</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSimilarDocuments.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSimilarDocuments</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsResultsViewModule.html" data-type="entity-link">BsResultsViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsResultsViewModule-4800abbaf3c654da8023ab0be836f96a"' : 'data-target="#xs-components-links-module-BsResultsViewModule-4800abbaf3c654da8023ab0be836f96a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsResultsViewModule-4800abbaf3c654da8023ab0be836f96a"' :
                                            'id="xs-components-links-module-BsResultsViewModule-4800abbaf3c654da8023ab0be836f96a"' }>
                                            <li class="link">
                                                <a href="components/BsResultsGridView.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultsGridView</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsViewSelector.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultsViewSelector</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsRfmModule.html" data-type="entity-link">BsRfmModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsRfmModule-335b487a83652dcd124a02bef6e7274f"' : 'data-target="#xs-components-links-module-BsRfmModule-335b487a83652dcd124a02bef6e7274f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsRfmModule-335b487a83652dcd124a02bef6e7274f"' :
                                            'id="xs-components-links-module-BsRfmModule-335b487a83652dcd124a02bef6e7274f"' }>
                                            <li class="link">
                                                <a href="components/BsRfmAction.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsRfmAction</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSavedQueriesModule.html" data-type="entity-link">BsSavedQueriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSavedQueriesModule-e4f98a36493a8c4da1c10bcd180569fd"' : 'data-target="#xs-components-links-module-BsSavedQueriesModule-e4f98a36493a8c4da1c10bcd180569fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSavedQueriesModule-e4f98a36493a8c4da1c10bcd180569fd"' :
                                            'id="xs-components-links-module-BsSavedQueriesModule-e4f98a36493a8c4da1c10bcd180569fd"' }>
                                            <li class="link">
                                                <a href="components/BsEditSavedQuery.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditSavedQuery</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsExportQuery.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsExportQuery</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRecentDocuments.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetRecentDocuments</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRecentQueries.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetRecentQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetSavedQueries.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetSavedQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageSavedQueries.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsManageSavedQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsQueryExporter.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsQueryExporter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSavedQueriesMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSavedQueriesMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSearchModule.html" data-type="entity-link">BsSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSearchModule-e3e1736526a9e95a14d41a8d717e24c4"' : 'data-target="#xs-components-links-module-BsSearchModule-e3e1736526a9e95a14d41a8d717e24c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSearchModule-e3e1736526a9e95a14d41a8d717e24c4"' :
                                            'id="xs-components-links-module-BsSearchModule-e3e1736526a9e95a14d41a8d717e24c4"' }>
                                            <li class="link">
                                                <a href="components/BsBreadcrumbs.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsBreadcrumbs</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDidYouMean.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsDidYouMean</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLoadMore.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsLoadMore</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLoadingBar.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsLoadingBar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPageSizeSelector.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPageSizeSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPager.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsPager</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsScroller.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsScroller</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSortSelector.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSortSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTabs.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsTabs</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSelectionModule.html" data-type="entity-link">BsSelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSelectionModule-27044bcccb9253b13a154248da5847ca"' : 'data-target="#xs-components-links-module-BsSelectionModule-27044bcccb9253b13a154248da5847ca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSelectionModule-27044bcccb9253b13a154248da5847ca"' :
                                            'id="xs-components-links-module-BsSelectionModule-27044bcccb9253b13a154248da5847ca"' }>
                                            <li class="link">
                                                <a href="components/BsResultSelector.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsSelector.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultsSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectionArranger.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsSelectionArranger</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsStatusBarModule.html" data-type="entity-link">BsStatusBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsStatusBarModule-be1b224b10c048214e70e370442690ae"' : 'data-target="#xs-components-links-module-BsStatusBarModule-be1b224b10c048214e70e370442690ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsStatusBarModule-be1b224b10c048214e70e370442690ae"' :
                                            'id="xs-components-links-module-BsStatusBarModule-be1b224b10c048214e70e370442690ae"' }>
                                            <li class="link">
                                                <a href="components/BsFullscreenActivator.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFullscreenActivator</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNetworkActivity.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNetworkActivity</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsThemeToggleModule.html" data-type="entity-link">BsThemeToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsThemeToggleModule-066ca2061c10e4759995b62795962e12"' : 'data-target="#xs-components-links-module-BsThemeToggleModule-066ca2061c10e4759995b62795962e12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsThemeToggleModule-066ca2061c10e4759995b62795962e12"' :
                                            'id="xs-components-links-module-BsThemeToggleModule-066ca2061c10e4759995b62795962e12"' }>
                                            <li class="link">
                                                <a href="components/BsThemeToggleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsThemeToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsUserSettingsModule.html" data-type="entity-link">BsUserSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsUserSettingsModule-cb4ba667d7f9b0408c3c7b9dd82efcfb"' : 'data-target="#xs-components-links-module-BsUserSettingsModule-cb4ba667d7f9b0408c3c7b9dd82efcfb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsUserSettingsModule-cb4ba667d7f9b0408c3c7b9dd82efcfb"' :
                                            'id="xs-components-links-module-BsUserSettingsModule-cb4ba667d7f9b0408c3c7b9dd82efcfb"' }>
                                            <li class="link">
                                                <a href="components/BsEditUserSettings.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEditUserSettings</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsUserMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsUserMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsUserSettingsEditor.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsUserSettingsEditor</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollapseModule.html" data-type="entity-link">CollapseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CollapseModule-1868c621e04bcaeec162ea08f2d09597"' : 'data-target="#xs-components-links-module-CollapseModule-1868c621e04bcaeec162ea08f2d09597"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CollapseModule-1868c621e04bcaeec162ea08f2d09597"' :
                                            'id="xs-components-links-module-CollapseModule-1868c621e04bcaeec162ea08f2d09597"' }>
                                            <li class="link">
                                                <a href="components/Collapse.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Collapse</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollapseButton.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollapseButton</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollapseLink.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollapseLink</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link">CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' : 'data-target="#xs-components-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' :
                                            'id="xs-components-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' }>
                                            <li class="link">
                                                <a href="components/CommentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' : 'data-target="#xs-pipes-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' :
                                            'id="xs-pipes-links-module-CommentsModule-f55833ab5e6572c3d0c02bd0a94e118c"' }>
                                            <li class="link">
                                                <a href="pipes/CreationDatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreationDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MarkdownPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkdownPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabelsModule.html" data-type="entity-link">LabelsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' : 'data-target="#xs-components-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' :
                                            'id="xs-components-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                            <li class="link">
                                                <a href="components/Labels.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Labels</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultLabels.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultLabels</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' : 'data-target="#xs-directives-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' :
                                        'id="xs-directives-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                        <li class="link">
                                            <a href="directives/LabelsAutocomplete.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabelsAutocomplete</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' : 'data-target="#xs-pipes-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' :
                                            'id="xs-pipes-links-module-LabelsModule-5f3271e1045787dcbe3cc169892ae399"' }>
                                            <li class="link">
                                                <a href="pipes/LabelPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabelPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetadataModule.html" data-type="entity-link">MetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MetadataModule-cfe87c58a3b146d153a400752094f59d"' : 'data-target="#xs-components-links-module-MetadataModule-cfe87c58a3b146d153a400752094f59d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MetadataModule-cfe87c58a3b146d153a400752094f59d"' :
                                            'id="xs-components-links-module-MetadataModule-cfe87c58a3b146d153a400752094f59d"' }>
                                            <li class="link">
                                                <a href="components/Metadata.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Metadata</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataAccessListsItem.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataAccessListsItem</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataAccessListsItemSingleAccessList.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataAccessListsItemSingleAccessList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataItem.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetadataItem</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MLModule.html" data-type="entity-link">MLModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-MLModule-8f306822b78aaf88fb59047fd2286142"' : 'data-target="#xs-directives-links-module-MLModule-8f306822b78aaf88fb59047fd2286142"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-MLModule-8f306822b78aaf88fb59047fd2286142"' :
                                        'id="xs-directives-links-module-MLModule-8f306822b78aaf88fb59047fd2286142"' }>
                                        <li class="link">
                                            <a href="directives/DwellTime.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DwellTime</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreviewModule.html" data-type="entity-link">PreviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PreviewModule-f94cd7b1b04c86bc961b581a35033c2c"' : 'data-target="#xs-components-links-module-PreviewModule-f94cd7b1b04c86bc961b581a35033c2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PreviewModule-f94cd7b1b04c86bc961b581a35033c2c"' :
                                            'id="xs-components-links-module-PreviewModule-f94cd7b1b04c86bc961b581a35033c2c"' }>
                                            <li class="link">
                                                <a href="components/PreviewDocumentIframe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreviewDocumentIframe</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewTooltip.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreviewTooltip</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultModule.html" data-type="entity-link">ResultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultModule-1bbcaf00d6458338470813bc39ebf84c"' : 'data-target="#xs-components-links-module-ResultModule-1bbcaf00d6458338470813bc39ebf84c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultModule-1bbcaf00d6458338470813bc39ebf84c"' :
                                            'id="xs-components-links-module-ResultModule-1bbcaf00d6458338470813bc39ebf84c"' }>
                                            <li class="link">
                                                <a href="components/ResultExtracts.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultExtracts</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultIcon.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultIcon</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultMissingTerms.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultMissingTerms</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultSource.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultSource</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultThumbnail.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultThumbnail</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultTitle.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultTitle</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultsCounter.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultsCounter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SponsoredResults.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SponsoredResults</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRating.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserRating</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link">UtilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' : 'data-target="#xs-components-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' :
                                            'id="xs-components-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                            <li class="link">
                                                <a href="components/StickyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StickyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TooltipComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' : 'data-target="#xs-directives-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' :
                                        'id="xs-directives-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                        <li class="link">
                                            <a href="directives/Autofocus.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">Autofocus</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ClickOutside.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClickOutside</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusKeyListDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusKeyListDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusKeyListItemDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusKeyListItemDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/MediaIf.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">MediaIf</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ResizeEventDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResizeEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollIntoView.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScrollIntoView</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TooltipDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">TooltipDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' : 'data-target="#xs-pipes-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' :
                                            'id="xs-pipes-links-module-UtilsModule-317d3876afb97274d2845ea38108bcde"' }>
                                            <li class="link">
                                                <a href="pipes/DatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExprPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExprPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MemorySizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemorySizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MomentPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MomentPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RelativeTimePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelativeTimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ValuePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ValuePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AbstractFacet.html" data-type="entity-link">AbstractFacet</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Action.html" data-type="entity-link">Action</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppLocalesConfig.html" data-type="entity-link">AppLocalesConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Breadcrumbs.html" data-type="entity-link">Breadcrumbs</a>
                            </li>
                            <li class="link">
                                <a href="classes/Extract.html" data-type="entity-link">Extract</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilteredHighlightDataPerLocation.html" data-type="entity-link">FilteredHighlightDataPerLocation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IAction.html" data-type="entity-link">IAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Item.html" data-type="entity-link">Item</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreviewDocument.html" data-type="entity-link">PreviewDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouterStub.html" data-type="entity-link">RouterStub</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleHighlightCategoryFilterState.html" data-type="entity-link">SimpleHighlightCategoryFilterState</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleHighlightNavigationState.html" data-type="entity-link">SimpleHighlightNavigationState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdvancedService.html" data-type="entity-link">AdvancedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertsService.html" data-type="entity-link">AlertsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasketsService.html" data-type="entity-link">BasketsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BsDropdownService.html" data-type="entity-link">BsDropdownService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentsWebService.html" data-type="entity-link">CommentsWebService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacetService.html" data-type="entity-link">FacetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FeedbackService.html" data-type="entity-link">FeedbackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirstPageService.html" data-type="entity-link">FirstPageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelsService.html" data-type="entity-link">LabelsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MlAuditService.html" data-type="entity-link">MlAuditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreviewService.html" data-type="entity-link">PreviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecentDocumentsService.html" data-type="entity-link">RecentDocumentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecentQueriesService.html" data-type="entity-link">RecentQueriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultsViewService.html" data-type="entity-link">ResultsViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RFMService.html" data-type="entity-link">RFMService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SavedQueriesService.html" data-type="entity-link">SavedQueriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SelectionService.html" data-type="entity-link">SelectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuggestService.html" data-type="entity-link">SuggestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UIService.html" data-type="entity-link">UIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPreferences.html" data-type="entity-link">UserPreferences</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VoiceRecognitionService.html" data-type="entity-link">VoiceRecognitionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Action.html" data-type="entity-link">Action</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Action-1.html" data-type="entity-link">Action</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionButtonsOptions.html" data-type="entity-link">ActionButtonsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionInitializer.html" data-type="entity-link">ActionInitializer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionItemOptions.html" data-type="entity-link">ActionItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddFilterOptions.html" data-type="entity-link">AddFilterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddSelectOptions.html" data-type="entity-link">AddSelectOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedFormValidators.html" data-type="entity-link">AdvancedFormValidators</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AfterSelectTabEvent.html" data-type="entity-link">AfterSelectTabEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertChangeEvent.html" data-type="entity-link">AlertChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertComponents.html" data-type="entity-link">AlertComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutocompleteComponent.html" data-type="entity-link">AutocompleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutocompleteItem.html" data-type="entity-link">AutocompleteItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Basket.html" data-type="entity-link">Basket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasketChangeEvent.html" data-type="entity-link">BasketChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasketComponents.html" data-type="entity-link">BasketComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeNewResultsEvent.html" data-type="entity-link">BeforeNewResultsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeSearchEvent.html" data-type="entity-link">BeforeSearchEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeSelectTabEvent.html" data-type="entity-link">BeforeSelectTabEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbsItem.html" data-type="entity-link">BreadcrumbsItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaretPosition.html" data-type="entity-link">CaretPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCQueryExport.html" data-type="entity-link">CCQueryExport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCQueryExportColumnDef.html" data-type="entity-link">CCQueryExportColumnDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClearEvent.html" data-type="entity-link">ClearEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClickOutsideOptions.html" data-type="entity-link">ClickOutsideOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollapseStateChange.html" data-type="entity-link">CollapseStateChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Column.html" data-type="entity-link">Column</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnData.html" data-type="entity-link">ColumnData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CoreComment.html" data-type="entity-link">CoreComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatePickerOptions.html" data-type="entity-link">DatePickerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateRangePickerOptions.html" data-type="entity-link">DateRangePickerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeletedComment.html" data-type="entity-link">DeletedComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownClearEvent.html" data-type="entity-link">DropdownClearEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownEvent.html" data-type="entity-link">DropdownEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownMenuOptions.html" data-type="entity-link">DropdownMenuOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownToggleEvent.html" data-type="entity-link">DropdownToggleEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DwellTimeOptions.html" data-type="entity-link">DwellTimeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entry.html" data-type="entity-link">Entry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntryInput.html" data-type="entity-link">EntryInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event-1.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportQueryModel.html" data-type="entity-link">ExportQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetChangeEvent.html" data-type="entity-link">FacetChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetConfig.html" data-type="entity-link">FacetConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetState.html" data-type="entity-link">FacetState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldSearchItemsContainer.html" data-type="entity-link">FieldSearchItemsContainer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirstPageOptions.html" data-type="entity-link">FirstPageOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetResultsOptions.html" data-type="entity-link">GetResultsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridView.html" data-type="entity-link">GridView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HighlightCategoryFilterState.html" data-type="entity-link">HighlightCategoryFilterState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HighlightNavigationState.html" data-type="entity-link">HighlightNavigationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryState.html" data-type="entity-link">HistoryState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelsComponents.html" data-type="entity-link">LabelsComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeAuditEventEvent.html" data-type="entity-link">MakeAuditEventEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeQueryEvent.html" data-type="entity-link">MakeQueryEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeQueryIntentDataEvent.html" data-type="entity-link">MakeQueryIntentDataEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageAlertsModel.html" data-type="entity-link">ManageAlertsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageBasketsModel.html" data-type="entity-link">ManageBasketsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageSavedQueriesModel.html" data-type="entity-link">ManageSavedQueriesModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalProperties.html" data-type="entity-link">ModalProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MomentParams.html" data-type="entity-link">MomentParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultiEntryInput.html" data-type="entity-link">MultiEntryInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationOptions.html" data-type="entity-link">NavigationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewQueryEvent.html" data-type="entity-link">NewQueryEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewResultsEvent.html" data-type="entity-link">NewResultsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NormalComment.html" data-type="entity-link">NormalComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenOriginalDocument.html" data-type="entity-link">OpenOriginalDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParseResult.html" data-type="entity-link">ParseResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreviewEvent.html" data-type="entity-link">PreviewEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreviewPopupModel.html" data-type="entity-link">PreviewPopupModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessQueryIntentActionEvent.html" data-type="entity-link">ProcessQueryIntentActionEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Query.html" data-type="entity-link">Query</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangeInput.html" data-type="entity-link">RangeInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentDocument.html" data-type="entity-link">RecentDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentDocumentChangeEvent.html" data-type="entity-link">RecentDocumentChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentQuery.html" data-type="entity-link">RecentQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentQueryChangeEvent.html" data-type="entity-link">RecentQueryChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Results.html" data-type="entity-link">Results</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsView.html" data-type="entity-link">ResultsView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewAfterSelectEvent.html" data-type="entity-link">ResultsViewAfterSelectEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewBeforeSelectEvent.html" data-type="entity-link">ResultsViewBeforeSelectEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewEvent.html" data-type="entity-link">ResultsViewEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewSelectCancelledEvent.html" data-type="entity-link">ResultsViewSelectCancelledEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RFMEvent.html" data-type="entity-link">RFMEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQuery.html" data-type="entity-link">SavedQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQueryChangeEvent.html" data-type="entity-link">SavedQueryChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQueryComponents.html" data-type="entity-link">SavedQueryComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollIntoViewOptions.html" data-type="entity-link">ScrollIntoViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchOptions.html" data-type="entity-link">SearchOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectBasketModel.html" data-type="entity-link">SelectBasketModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionEvent.html" data-type="entity-link">SelectionEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionItem.html" data-type="entity-link">SelectionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionOptions.html" data-type="entity-link">SelectionOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link">Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetResultsOptions.html" data-type="entity-link">SetResultsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepDef.html" data-type="entity-link">StepDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagCloudItem.html" data-type="entity-link">TagCloudItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeValueItem.html" data-type="entity-link">TreeValueItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateQueryEvent.html" data-type="entity-link">UpdateQueryEvent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});