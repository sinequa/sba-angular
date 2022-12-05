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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
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
                                <a href="modules/BsActionModule.html" data-type="entity-link" >BsActionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' : 'data-target="#xs-components-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' :
                                            'id="xs-components-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' }>
                                            <li class="link">
                                                <a href="components/BsActionButtons.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsActionButtons</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionItem.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsActionItem</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionItemContent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsActionItemContent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsActionMenu.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsActionMenu</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDropdownMenu.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDropdownMenu</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' : 'data-target="#xs-directives-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' :
                                        'id="xs-directives-links-module-BsActionModule-64b7e7db3dd0123ebe64db78ba78cc643e486b7f09aa22b8dc4865f0260185fc6e64488ea808147b10230e0dfa83ebafe1c8a610ba09499f850503d2863f9ae9"' }>
                                        <li class="link">
                                            <a href="directives/BsDropdownDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDropdownDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAdvancedModule.html" data-type="entity-link" >BsAdvancedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' : 'data-target="#xs-components-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' :
                                            'id="xs-components-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' }>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormCheckbox.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormCheckbox</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormInput.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormInput</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormMultiInput.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormMultiInput</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormRange.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormRange</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAdvancedFormSelect.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormSelect</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDatePicker.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDatePicker</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDateRangePicker.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDateRangePicker</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' : 'data-target="#xs-directives-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' :
                                        'id="xs-directives-links-module-BsAdvancedModule-a9933cafbc64334b2d10ff32536638c0f5f1afafd54c945af6c5fa48d014262fd0fb194f051ec677a49609a4ebaf07d93b0a052227cad7d622cadb9cf2f3345a"' }>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormAutocomplete.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormAutocomplete</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormAutocompleteMultiInput.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormAutocompleteMultiInput</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/BsAdvancedFormValidation.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAdvancedFormValidation</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAlertsModule.html" data-type="entity-link" >BsAlertsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAlertsModule-1af50364ffbf9ed94e15c4c1e8474e1fe8f5f2e8ecf321816cd155a52f0c008c7a719f7dc453fe3c6784de091a03bc61ad2a8414031cfb72ef1c31a1d7cfbd25"' : 'data-target="#xs-components-links-module-BsAlertsModule-1af50364ffbf9ed94e15c4c1e8474e1fe8f5f2e8ecf321816cd155a52f0c008c7a719f7dc453fe3c6784de091a03bc61ad2a8414031cfb72ef1c31a1d7cfbd25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAlertsModule-1af50364ffbf9ed94e15c4c1e8474e1fe8f5f2e8ecf321816cd155a52f0c008c7a719f7dc453fe3c6784de091a03bc61ad2a8414031cfb72ef1c31a1d7cfbd25"' :
                                            'id="xs-components-links-module-BsAlertsModule-1af50364ffbf9ed94e15c4c1e8474e1fe8f5f2e8ecf321816cd155a52f0c008c7a719f7dc453fe3c6784de091a03bc61ad2a8414031cfb72ef1c31a1d7cfbd25"' }>
                                            <li class="link">
                                                <a href="components/BsAlertMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAlertMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsAlertsMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAlertsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditAlert.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditAlert</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageAlerts.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsManageAlerts</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsAutocompleteModule.html" data-type="entity-link" >BsAutocompleteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' : 'data-target="#xs-components-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' :
                                            'id="xs-components-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' }>
                                            <li class="link">
                                                <a href="components/BsAutocompleteList.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAutocompleteList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFieldSearchItemsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFieldSearchItemsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' : 'data-target="#xs-directives-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' :
                                        'id="xs-directives-links-module-BsAutocompleteModule-17a935605d118b74a4d6469d0a5aa99f1142063b189568997f5481e9227ccf53ad66cd7cad6ab3ec5450e1b8331f27d8a62a2742f9486d6482ed83a0c9fd100e"' }>
                                        <li class="link">
                                            <a href="directives/Autocomplete.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Autocomplete</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/AutocompleteFieldSearch.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutocompleteFieldSearch</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsBasketsModule.html" data-type="entity-link" >BsBasketsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsBasketsModule-0375f0a0c99e6d771fa1db04a39fefc737fcb21bd103bcdd0becd57f6b372e96a0e99b5626214745c19111431e7f3599fcea51e4985105ec0902b9650b2daf4e"' : 'data-target="#xs-components-links-module-BsBasketsModule-0375f0a0c99e6d771fa1db04a39fefc737fcb21bd103bcdd0becd57f6b372e96a0e99b5626214745c19111431e7f3599fcea51e4985105ec0902b9650b2daf4e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsBasketsModule-0375f0a0c99e6d771fa1db04a39fefc737fcb21bd103bcdd0becd57f6b372e96a0e99b5626214745c19111431e7f3599fcea51e4985105ec0902b9650b2daf4e"' :
                                            'id="xs-components-links-module-BsBasketsModule-0375f0a0c99e6d771fa1db04a39fefc737fcb21bd103bcdd0becd57f6b372e96a0e99b5626214745c19111431e7f3599fcea51e4985105ec0902b9650b2daf4e"' }>
                                            <li class="link">
                                                <a href="components/BsBasketsMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsBasketsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditBasket.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditBasket</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetBasketsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetBasketsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageBaskets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsManageBaskets</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultBaskets.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultBaskets</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectBasket.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSelectBasket</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsFacetModule.html" data-type="entity-link" >BsFacetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' : 'data-target="#xs-components-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' :
                                            'id="xs-components-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' }>
                                            <li class="link">
                                                <a href="components/BsFacetBar.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetBar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetFilters.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetFilters</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetList.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetMultiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetMultiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRange.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetRange</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetTagCloud.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetTagCloud</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetTree.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetTree</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsMySearch.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsMySearch</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsRefine.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsRefine</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' : 'data-target="#xs-directives-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' :
                                        'id="xs-directives-links-module-BsFacetModule-a4f3a24a3a9603ef3f5f802aec928ccef0ea8f67b1f7575283d08064506745e1a53d2be1ae2b0b52e689c6b331e3e8c1ec833da588c6e93dd4d4012c200fb3b3"' }>
                                        <li class="link">
                                            <a href="directives/FacetViewDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacetViewDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsFeedbackModule.html" data-type="entity-link" >BsFeedbackModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsFeedbackModule-15f7b54741613c5b66e3563c248b29976400da778abd7b33470974f8e722ea7cb803f3ffa667075fbd8640d217849fc6ef030e4fa3ce8c337b02a850192b12c5"' : 'data-target="#xs-components-links-module-BsFeedbackModule-15f7b54741613c5b66e3563c248b29976400da778abd7b33470974f8e722ea7cb803f3ffa667075fbd8640d217849fc6ef030e4fa3ce8c337b02a850192b12c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsFeedbackModule-15f7b54741613c5b66e3563c248b29976400da778abd7b33470974f8e722ea7cb803f3ffa667075fbd8640d217849fc6ef030e4fa3ce8c337b02a850192b12c5"' :
                                            'id="xs-components-links-module-BsFeedbackModule-15f7b54741613c5b66e3563c248b29976400da778abd7b33470974f8e722ea7cb803f3ffa667075fbd8640d217849fc6ef030e4fa3ce8c337b02a850192b12c5"' }>
                                            <li class="link">
                                                <a href="components/BsFeedbackMenu.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFeedbackMenu</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsLabelsModule.html" data-type="entity-link" >BsLabelsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsLabelsModule-3a0a83853ebf4f931e8206f3dcb653646c249ac624b4ee9e2496580babee9046fee18a3957f56ea47c6b3344a4af1c9ff04d11f2339817481484341783f23b0a"' : 'data-target="#xs-components-links-module-BsLabelsModule-3a0a83853ebf4f931e8206f3dcb653646c249ac624b4ee9e2496580babee9046fee18a3957f56ea47c6b3344a4af1c9ff04d11f2339817481484341783f23b0a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsLabelsModule-3a0a83853ebf4f931e8206f3dcb653646c249ac624b4ee9e2496580babee9046fee18a3957f56ea47c6b3344a4af1c9ff04d11f2339817481484341783f23b0a"' :
                                            'id="xs-components-links-module-BsLabelsModule-3a0a83853ebf4f931e8206f3dcb653646c249ac624b4ee9e2496580babee9046fee18a3957f56ea47c6b3344a4af1c9ff04d11f2339817481484341783f23b0a"' }>
                                            <li class="link">
                                                <a href="components/BsAddLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsAddLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDeleteLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDeleteLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditLabel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLabelsAutocompleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsLabelsAutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLabelsMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsLabelsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsRenameLabel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsRenameLabel</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsModalModule.html" data-type="entity-link" >BsModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsModalModule-89adec2a293aaa62909dd4090bf0c6b7e4fae7873262b0e3b3abe46844ba203c22ca15bd195313f1a13263ea93c9809fedac8f8807cfea421e65bf142ce3e0a6"' : 'data-target="#xs-components-links-module-BsModalModule-89adec2a293aaa62909dd4090bf0c6b7e4fae7873262b0e3b3abe46844ba203c22ca15bd195313f1a13263ea93c9809fedac8f8807cfea421e65bf142ce3e0a6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsModalModule-89adec2a293aaa62909dd4090bf0c6b7e4fae7873262b0e3b3abe46844ba203c22ca15bd195313f1a13263ea93c9809fedac8f8807cfea421e65bf142ce3e0a6"' :
                                            'id="xs-components-links-module-BsModalModule-89adec2a293aaa62909dd4090bf0c6b7e4fae7873262b0e3b3abe46844ba203c22ca15bd195313f1a13263ea93c9809fedac8f8807cfea421e65bf142ce3e0a6"' }>
                                            <li class="link">
                                                <a href="components/BsConfirm.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsConfirm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsEditable.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditable</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsHelp.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsHelp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLogin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsLogin</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModal.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsModal</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModalFooter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsModalFooter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsModalHeader.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsModalHeader</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsOverrideUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsOverrideUser</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPrompt.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPrompt</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsNotificationModule.html" data-type="entity-link" >BsNotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsNotificationModule-a64195f12dff527239b5ee888f432a1b87a6ed1eadc4dee0c9a7703191ce5cbd4c8f296c17d229d1382d6cb2be22fdf1ff63929a4c8632bbe2e7e301a1645192"' : 'data-target="#xs-components-links-module-BsNotificationModule-a64195f12dff527239b5ee888f432a1b87a6ed1eadc4dee0c9a7703191ce5cbd4c8f296c17d229d1382d6cb2be22fdf1ff63929a4c8632bbe2e7e301a1645192"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsNotificationModule-a64195f12dff527239b5ee888f432a1b87a6ed1eadc4dee0c9a7703191ce5cbd4c8f296c17d229d1382d6cb2be22fdf1ff63929a4c8632bbe2e7e301a1645192"' :
                                            'id="xs-components-links-module-BsNotificationModule-a64195f12dff527239b5ee888f432a1b87a6ed1eadc4dee0c9a7703191ce5cbd4c8f296c17d229d1382d6cb2be22fdf1ff63929a4c8632bbe2e7e301a1645192"' }>
                                            <li class="link">
                                                <a href="components/BsNotification.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsNotification</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNotifications.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsNotifications</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNotificationsManager.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsNotificationsManager</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsPreviewModule.html" data-type="entity-link" >BsPreviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsPreviewModule-e800f057238728d87f828dc067adced18505815198c0534cbcbb0323379b63bc899bf5d62713782b5ddceb1fc2e32055854b61a8b054ea688a4fc3b33ddbf76e"' : 'data-target="#xs-components-links-module-BsPreviewModule-e800f057238728d87f828dc067adced18505815198c0534cbcbb0323379b63bc899bf5d62713782b5ddceb1fc2e32055854b61a8b054ea688a4fc3b33ddbf76e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsPreviewModule-e800f057238728d87f828dc067adced18505815198c0534cbcbb0323379b63bc899bf5d62713782b5ddceb1fc2e32055854b61a8b054ea688a4fc3b33ddbf76e"' :
                                            'id="xs-components-links-module-BsPreviewModule-e800f057238728d87f828dc067adced18505815198c0534cbcbb0323379b63bc899bf5d62713782b5ddceb1fc2e32055854b61a8b054ea688a4fc3b33ddbf76e"' }>
                                            <li class="link">
                                                <a href="components/BsFacetPreview.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetPreview</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetPreviewComponent2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetPreviewComponent2</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewEntityFacetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewEntityFacetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewEntityPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewEntityPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewExtractsPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewExtractsPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewHighlights.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewHighlights</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewLinks.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewLinks</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewMinimapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewMinimapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPageFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewPageFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPagesPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewPagesPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPanel.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewPanel</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewPopup.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewPopup</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPreviewSearchFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPreviewSearchFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultLinkPreview.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultLinkPreview</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSimilarDocuments.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSimilarDocuments</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsResultsViewModule.html" data-type="entity-link" >BsResultsViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsResultsViewModule-f6d727a0e47f0fbc5d9c31ce75326faf336c3cfeeec65acbb6ebbac654aa4c67488617466b52834475e30d389729f8511eed3df3c2b444d60d6fa40f26744ca4"' : 'data-target="#xs-components-links-module-BsResultsViewModule-f6d727a0e47f0fbc5d9c31ce75326faf336c3cfeeec65acbb6ebbac654aa4c67488617466b52834475e30d389729f8511eed3df3c2b444d60d6fa40f26744ca4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsResultsViewModule-f6d727a0e47f0fbc5d9c31ce75326faf336c3cfeeec65acbb6ebbac654aa4c67488617466b52834475e30d389729f8511eed3df3c2b444d60d6fa40f26744ca4"' :
                                            'id="xs-components-links-module-BsResultsViewModule-f6d727a0e47f0fbc5d9c31ce75326faf336c3cfeeec65acbb6ebbac654aa4c67488617466b52834475e30d389729f8511eed3df3c2b444d60d6fa40f26744ca4"' }>
                                            <li class="link">
                                                <a href="components/BsResultsGridView.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultsGridView</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsViewSelector.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultsViewSelector</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsRfmModule.html" data-type="entity-link" >BsRfmModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsRfmModule-7f4f2ffd29bd1b589f1cb8a6c4ce7a94585ec3f80cac7ebbe4c2c5619044a7b580c713cd6fdd586db7eeee637e3c6fa7d0193a4df33bfaaff3e51dae566d25b1"' : 'data-target="#xs-components-links-module-BsRfmModule-7f4f2ffd29bd1b589f1cb8a6c4ce7a94585ec3f80cac7ebbe4c2c5619044a7b580c713cd6fdd586db7eeee637e3c6fa7d0193a4df33bfaaff3e51dae566d25b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsRfmModule-7f4f2ffd29bd1b589f1cb8a6c4ce7a94585ec3f80cac7ebbe4c2c5619044a7b580c713cd6fdd586db7eeee637e3c6fa7d0193a4df33bfaaff3e51dae566d25b1"' :
                                            'id="xs-components-links-module-BsRfmModule-7f4f2ffd29bd1b589f1cb8a6c4ce7a94585ec3f80cac7ebbe4c2c5619044a7b580c713cd6fdd586db7eeee637e3c6fa7d0193a4df33bfaaff3e51dae566d25b1"' }>
                                            <li class="link">
                                                <a href="components/BsRfmAction.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsRfmAction</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSavedQueriesModule.html" data-type="entity-link" >BsSavedQueriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSavedQueriesModule-d1763d2d685464428962fb852dfeb61010efb964605eeff2aa34b272cee4a364b6909cbcb2e35c98878c846a01401087d524cac591aeaf95ff8a0c9222b787bd"' : 'data-target="#xs-components-links-module-BsSavedQueriesModule-d1763d2d685464428962fb852dfeb61010efb964605eeff2aa34b272cee4a364b6909cbcb2e35c98878c846a01401087d524cac591aeaf95ff8a0c9222b787bd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSavedQueriesModule-d1763d2d685464428962fb852dfeb61010efb964605eeff2aa34b272cee4a364b6909cbcb2e35c98878c846a01401087d524cac591aeaf95ff8a0c9222b787bd"' :
                                            'id="xs-components-links-module-BsSavedQueriesModule-d1763d2d685464428962fb852dfeb61010efb964605eeff2aa34b272cee4a364b6909cbcb2e35c98878c846a01401087d524cac591aeaf95ff8a0c9222b787bd"' }>
                                            <li class="link">
                                                <a href="components/BsEditSavedQuery.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditSavedQuery</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsExportQuery.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsExportQuery</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRecentDocuments.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetRecentDocuments</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetRecentQueries.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetRecentQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetSavedQueries.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetSavedQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsManageSavedQueries.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsManageSavedQueries</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsQueryExporter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsQueryExporter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSavedQueriesMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSavedQueriesMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSearchModule.html" data-type="entity-link" >BsSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSearchModule-3e29410e976b695611d10cc36091bc4dd9f978e83910f0d2a075bd3a75d3c3101fb26eb33c88157e2eb5e5a5c71ca9bb2549173fcf8a7350cdf9278d8bee5c7d"' : 'data-target="#xs-components-links-module-BsSearchModule-3e29410e976b695611d10cc36091bc4dd9f978e83910f0d2a075bd3a75d3c3101fb26eb33c88157e2eb5e5a5c71ca9bb2549173fcf8a7350cdf9278d8bee5c7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSearchModule-3e29410e976b695611d10cc36091bc4dd9f978e83910f0d2a075bd3a75d3c3101fb26eb33c88157e2eb5e5a5c71ca9bb2549173fcf8a7350cdf9278d8bee5c7d"' :
                                            'id="xs-components-links-module-BsSearchModule-3e29410e976b695611d10cc36091bc4dd9f978e83910f0d2a075bd3a75d3c3101fb26eb33c88157e2eb5e5a5c71ca9bb2549173fcf8a7350cdf9278d8bee5c7d"' }>
                                            <li class="link">
                                                <a href="components/BsBreadcrumbs.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsBreadcrumbs</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsDidYouMean.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsDidYouMean</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLoadMore.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsLoadMore</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsLoadingBar.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsLoadingBar</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPageSizeSelector.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPageSizeSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsPager.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsPager</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsScopeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsScopeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsScroller.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsScroller</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSortSelector.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSortSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTabs.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTabs</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsSelectionModule.html" data-type="entity-link" >BsSelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsSelectionModule-2828259dff8b3a365c5a5e27ad9b1e1a73951879c3b8376d6822ffc909fd55117fe10c0d519635eb5c9c41c2066ecec3a88bd077d3d92366285145741b7384ec"' : 'data-target="#xs-components-links-module-BsSelectionModule-2828259dff8b3a365c5a5e27ad9b1e1a73951879c3b8376d6822ffc909fd55117fe10c0d519635eb5c9c41c2066ecec3a88bd077d3d92366285145741b7384ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsSelectionModule-2828259dff8b3a365c5a5e27ad9b1e1a73951879c3b8376d6822ffc909fd55117fe10c0d519635eb5c9c41c2066ecec3a88bd077d3d92366285145741b7384ec"' :
                                            'id="xs-components-links-module-BsSelectionModule-2828259dff8b3a365c5a5e27ad9b1e1a73951879c3b8376d6822ffc909fd55117fe10c0d519635eb5c9c41c2066ecec3a88bd077d3d92366285145741b7384ec"' }>
                                            <li class="link">
                                                <a href="components/BsResultSelector.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsSelector.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultsSelector</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsSelectionArranger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsSelectionArranger</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsStatusBarModule.html" data-type="entity-link" >BsStatusBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsStatusBarModule-1e831452e21575413af8c049d7a7f26b24d75c0e12b3e8fac08e13d9b884edba95ab789c5044a01033da1afea11be279102e8dce3d517c90c4b5c3d8fa8f8875"' : 'data-target="#xs-components-links-module-BsStatusBarModule-1e831452e21575413af8c049d7a7f26b24d75c0e12b3e8fac08e13d9b884edba95ab789c5044a01033da1afea11be279102e8dce3d517c90c4b5c3d8fa8f8875"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsStatusBarModule-1e831452e21575413af8c049d7a7f26b24d75c0e12b3e8fac08e13d9b884edba95ab789c5044a01033da1afea11be279102e8dce3d517c90c4b5c3d8fa8f8875"' :
                                            'id="xs-components-links-module-BsStatusBarModule-1e831452e21575413af8c049d7a7f26b24d75c0e12b3e8fac08e13d9b884edba95ab789c5044a01033da1afea11be279102e8dce3d517c90c4b5c3d8fa8f8875"' }>
                                            <li class="link">
                                                <a href="components/BsFullscreenActivator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFullscreenActivator</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNetworkActivity.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsNetworkActivity</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsThemeToggleModule.html" data-type="entity-link" >BsThemeToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsThemeToggleModule-259e2a652d982b576bbee10d923258c87e236b7d290ead2f43b7b38ce41928a5990d0188f1e4030b2ad9366473422f9fc8f1c2b9afbd05dd3ad7009db6491281"' : 'data-target="#xs-components-links-module-BsThemeToggleModule-259e2a652d982b576bbee10d923258c87e236b7d290ead2f43b7b38ce41928a5990d0188f1e4030b2ad9366473422f9fc8f1c2b9afbd05dd3ad7009db6491281"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsThemeToggleModule-259e2a652d982b576bbee10d923258c87e236b7d290ead2f43b7b38ce41928a5990d0188f1e4030b2ad9366473422f9fc8f1c2b9afbd05dd3ad7009db6491281"' :
                                            'id="xs-components-links-module-BsThemeToggleModule-259e2a652d982b576bbee10d923258c87e236b7d290ead2f43b7b38ce41928a5990d0188f1e4030b2ad9366473422f9fc8f1c2b9afbd05dd3ad7009db6491281"' }>
                                            <li class="link">
                                                <a href="components/BsThemeToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsThemeToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsUserSettingsModule.html" data-type="entity-link" >BsUserSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsUserSettingsModule-5b6a1e75b44abfb867747106a22cbcec4881799c2f695a2de66e8164905209d433abfa2c3a0206a483c9dde22b690c4dc47b146042ad4d0fa6d2d49159284f8d"' : 'data-target="#xs-components-links-module-BsUserSettingsModule-5b6a1e75b44abfb867747106a22cbcec4881799c2f695a2de66e8164905209d433abfa2c3a0206a483c9dde22b690c4dc47b146042ad4d0fa6d2d49159284f8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsUserSettingsModule-5b6a1e75b44abfb867747106a22cbcec4881799c2f695a2de66e8164905209d433abfa2c3a0206a483c9dde22b690c4dc47b146042ad4d0fa6d2d49159284f8d"' :
                                            'id="xs-components-links-module-BsUserSettingsModule-5b6a1e75b44abfb867747106a22cbcec4881799c2f695a2de66e8164905209d433abfa2c3a0206a483c9dde22b690c4dc47b146042ad4d0fa6d2d49159284f8d"' }>
                                            <li class="link">
                                                <a href="components/BsEditUserSettings.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEditUserSettings</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsUserMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsUserMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsUserSettingsEditor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsUserSettingsEditor</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CollapseModule.html" data-type="entity-link" >CollapseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CollapseModule-99e1390259828a511b1e6301eccc5ebf862abac996ac5d25ee8c579617dc2f4e1b904ae0b523b80d4f2f9ec757540cdacf520bcd34f440c230831fece8ce0997"' : 'data-target="#xs-components-links-module-CollapseModule-99e1390259828a511b1e6301eccc5ebf862abac996ac5d25ee8c579617dc2f4e1b904ae0b523b80d4f2f9ec757540cdacf520bcd34f440c230831fece8ce0997"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CollapseModule-99e1390259828a511b1e6301eccc5ebf862abac996ac5d25ee8c579617dc2f4e1b904ae0b523b80d4f2f9ec757540cdacf520bcd34f440c230831fece8ce0997"' :
                                            'id="xs-components-links-module-CollapseModule-99e1390259828a511b1e6301eccc5ebf862abac996ac5d25ee8c579617dc2f4e1b904ae0b523b80d4f2f9ec757540cdacf520bcd34f440c230831fece8ce0997"' }>
                                            <li class="link">
                                                <a href="components/Collapse.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Collapse</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollapseButton.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollapseButton</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollapseLink.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollapseLink</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' : 'data-target="#xs-components-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' :
                                            'id="xs-components-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' }>
                                            <li class="link">
                                                <a href="components/CommentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' : 'data-target="#xs-pipes-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' :
                                            'id="xs-pipes-links-module-CommentsModule-0a287bfdc4e167c88cd8dc0d0f3c50fc9d4c2e80c42858261e855129e10817cb2d4771472a29862a357ee1f75ee2c7da1392db2d4c8b308840f83a159c064e19"' }>
                                            <li class="link">
                                                <a href="pipes/CreationDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreationDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MarkdownPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MarkdownPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabelsModule.html" data-type="entity-link" >LabelsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' : 'data-target="#xs-components-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' :
                                            'id="xs-components-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                            <li class="link">
                                                <a href="components/Labels.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Labels</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultLabels.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultLabels</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' : 'data-target="#xs-directives-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' :
                                        'id="xs-directives-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                        <li class="link">
                                            <a href="directives/LabelsAutocomplete.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabelsAutocomplete</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' : 'data-target="#xs-pipes-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' :
                                            'id="xs-pipes-links-module-LabelsModule-f344935eb2159957d7257f51b6ff317af4c10aaf067b2a6be13930e358b3b2d4dde817b3858f688a2dfb0d34796c10666ae321b59be0382adc3fab5a455a54d4"' }>
                                            <li class="link">
                                                <a href="pipes/LabelPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabelPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetadataModule.html" data-type="entity-link" >MetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MetadataModule-21da43eb60f6f460c985760b9d2049ed8ccb3197ac7d6a64656a197fe6126e8605266ec9fa5472cf6aa1b70086dfcea1ba76dd8c1d5fdd2578e74c20f44193af"' : 'data-target="#xs-components-links-module-MetadataModule-21da43eb60f6f460c985760b9d2049ed8ccb3197ac7d6a64656a197fe6126e8605266ec9fa5472cf6aa1b70086dfcea1ba76dd8c1d5fdd2578e74c20f44193af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MetadataModule-21da43eb60f6f460c985760b9d2049ed8ccb3197ac7d6a64656a197fe6126e8605266ec9fa5472cf6aa1b70086dfcea1ba76dd8c1d5fdd2578e74c20f44193af"' :
                                            'id="xs-components-links-module-MetadataModule-21da43eb60f6f460c985760b9d2049ed8ccb3197ac7d6a64656a197fe6126e8605266ec9fa5472cf6aa1b70086dfcea1ba76dd8c1d5fdd2578e74c20f44193af"' }>
                                            <li class="link">
                                                <a href="components/Metadata.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Metadata</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataAccessListsItem.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataAccessListsItem</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataAccessListsItemSingleAccessList.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataAccessListsItemSingleAccessList</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataItem.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataItem</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MLModule.html" data-type="entity-link" >MLModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MLModule-de8dbde0f8530bdc4cb24ad791af872d7982ab56334299eb1d8960ca6efb85200bbb76dd43c047bf89b7308f3b0d4ad04bec3c3373655abe2c95cd6e16345625"' : 'data-target="#xs-components-links-module-MLModule-de8dbde0f8530bdc4cb24ad791af872d7982ab56334299eb1d8960ca6efb85200bbb76dd43c047bf89b7308f3b0d4ad04bec3c3373655abe2c95cd6e16345625"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MLModule-de8dbde0f8530bdc4cb24ad791af872d7982ab56334299eb1d8960ca6efb85200bbb76dd43c047bf89b7308f3b0d4ad04bec3c3373655abe2c95cd6e16345625"' :
                                            'id="xs-components-links-module-MLModule-de8dbde0f8530bdc4cb24ad791af872d7982ab56334299eb1d8960ca6efb85200bbb76dd43c047bf89b7308f3b0d4ad04bec3c3373655abe2c95cd6e16345625"' }>
                                            <li class="link">
                                                <a href="components/AnswerCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswerCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PassageListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PassageListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopPassagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopPassagesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PreviewModule.html" data-type="entity-link" >PreviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PreviewModule-2385028e23838a05e25e63f054df92796494e46564e816a82d2d9141c1ef6e9d744ab9151bcbd8e5747ac6c2ae5513e8d785eda100821755a0ad2a87b690e425"' : 'data-target="#xs-components-links-module-PreviewModule-2385028e23838a05e25e63f054df92796494e46564e816a82d2d9141c1ef6e9d744ab9151bcbd8e5747ac6c2ae5513e8d785eda100821755a0ad2a87b690e425"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PreviewModule-2385028e23838a05e25e63f054df92796494e46564e816a82d2d9141c1ef6e9d744ab9151bcbd8e5747ac6c2ae5513e8d785eda100821755a0ad2a87b690e425"' :
                                            'id="xs-components-links-module-PreviewModule-2385028e23838a05e25e63f054df92796494e46564e816a82d2d9141c1ef6e9d744ab9151bcbd8e5747ac6c2ae5513e8d785eda100821755a0ad2a87b690e425"' }>
                                            <li class="link">
                                                <a href="components/PreviewDocumentIframe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewDocumentIframe</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewTooltip.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewTooltip</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultModule.html" data-type="entity-link" >ResultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResultModule-1abaa6269e0c19e67c46b700dc891657b9ed4f1748c6a2440e78e7b01c77fc51bd817b8de8a7c2c04ffd7d6adbcbfc33189668f3840fbb3fb5e2c489659b83ac"' : 'data-target="#xs-components-links-module-ResultModule-1abaa6269e0c19e67c46b700dc891657b9ed4f1748c6a2440e78e7b01c77fc51bd817b8de8a7c2c04ffd7d6adbcbfc33189668f3840fbb3fb5e2c489659b83ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultModule-1abaa6269e0c19e67c46b700dc891657b9ed4f1748c6a2440e78e7b01c77fc51bd817b8de8a7c2c04ffd7d6adbcbfc33189668f3840fbb3fb5e2c489659b83ac"' :
                                            'id="xs-components-links-module-ResultModule-1abaa6269e0c19e67c46b700dc891657b9ed4f1748c6a2440e78e7b01c77fc51bd817b8de8a7c2c04ffd7d6adbcbfc33189668f3840fbb3fb5e2c489659b83ac"' }>
                                            <li class="link">
                                                <a href="components/ResultExtracts.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultExtracts</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultIcon.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultIcon</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultMissingTerms.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultMissingTerms</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultSource.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultSource</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultThumbnail.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultThumbnail</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultTitle.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultTitle</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultsCounter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsCounter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SponsoredResults.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SponsoredResults</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRating.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRating</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlideBuilderModule.html" data-type="entity-link" >SlideBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SlideBuilderModule-f9cd90fa5ab3feb45e826665c2c676cfd647c8537c236ce6cfde1dccd32c5f38dee55ab5c353da5d4f02455908aa21e5e87a8839efbe1fcf9517585bdbbd68d9"' : 'data-target="#xs-components-links-module-SlideBuilderModule-f9cd90fa5ab3feb45e826665c2c676cfd647c8537c236ce6cfde1dccd32c5f38dee55ab5c353da5d4f02455908aa21e5e87a8839efbe1fcf9517585bdbbd68d9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlideBuilderModule-f9cd90fa5ab3feb45e826665c2c676cfd647c8537c236ce6cfde1dccd32c5f38dee55ab5c353da5d4f02455908aa21e5e87a8839efbe1fcf9517585bdbbd68d9"' :
                                            'id="xs-components-links-module-SlideBuilderModule-f9cd90fa5ab3feb45e826665c2c676cfd647c8537c236ce6cfde1dccd32c5f38dee55ab5c353da5d4f02455908aa21e5e87a8839efbe1fcf9517585bdbbd68d9"' }>
                                            <li class="link">
                                                <a href="components/SlideBuilderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlideBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SlideListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlideListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SlideTileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlideTileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link" >UtilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' : 'data-target="#xs-components-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' :
                                            'id="xs-components-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                            <li class="link">
                                                <a href="components/StickyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StickyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' : 'data-target="#xs-directives-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' :
                                        'id="xs-directives-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                        <li class="link">
                                            <a href="directives/Autofocus.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Autofocus</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ClickOutside.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickOutside</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusKeyListDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FocusKeyListDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FocusKeyListItemDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FocusKeyListItemDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ResizeEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResizeEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollIntoView.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollIntoView</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TooltipDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TooltipDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' : 'data-target="#xs-pipes-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' :
                                            'id="xs-pipes-links-module-UtilsModule-593e39a3d034455a7a7a4fb095041c28858825fed004506879d5dab3acff2dee917044b12045e254be11a6e78994fcdad7ef8c182e3e03a610e7a928c9ea0977"' }>
                                            <li class="link">
                                                <a href="pipes/DatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExprPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExprPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MemorySizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MemorySizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MomentPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">MomentPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RelativeTimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelativeTimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ValuePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValuePipe</a>
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
                                <a href="components/AbstractFacet.html" data-type="entity-link" >AbstractFacet</a>
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
                                <a href="classes/Action.html" data-type="entity-link" >Action</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppLocalesConfig.html" data-type="entity-link" >AppLocalesConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Breadcrumbs.html" data-type="entity-link" >Breadcrumbs</a>
                            </li>
                            <li class="link">
                                <a href="classes/Extract.html" data-type="entity-link" >Extract</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilteredHighlightDataPerLocation.html" data-type="entity-link" >FilteredHighlightDataPerLocation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IAction.html" data-type="entity-link" >IAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Item.html" data-type="entity-link" >Item</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreviewDocument.html" data-type="entity-link" >PreviewDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouterStub.html" data-type="entity-link" >RouterStub</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleHighlightCategoryFilterState.html" data-type="entity-link" >SimpleHighlightCategoryFilterState</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleHighlightNavigationState.html" data-type="entity-link" >SimpleHighlightNavigationState</a>
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
                                    <a href="injectables/AdvancedService.html" data-type="entity-link" >AdvancedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertsService.html" data-type="entity-link" >AlertsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasketsService.html" data-type="entity-link" >BasketsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BsDropdownService.html" data-type="entity-link" >BsDropdownService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentsWebService.html" data-type="entity-link" >CommentsWebService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacetService.html" data-type="entity-link" >FacetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FeedbackService.html" data-type="entity-link" >FeedbackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirstPageService.html" data-type="entity-link" >FirstPageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelsService.html" data-type="entity-link" >LabelsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreviewService.html" data-type="entity-link" >PreviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecentDocumentsService.html" data-type="entity-link" >RecentDocumentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecentQueriesService.html" data-type="entity-link" >RecentQueriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultsViewService.html" data-type="entity-link" >ResultsViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RFMService.html" data-type="entity-link" >RFMService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SavedQueriesService.html" data-type="entity-link" >SavedQueriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SelectionService.html" data-type="entity-link" >SelectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuggestService.html" data-type="entity-link" >SuggestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UIService.html" data-type="entity-link" >UIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPreferences.html" data-type="entity-link" >UserPreferences</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VoiceRecognitionService.html" data-type="entity-link" >VoiceRecognitionService</a>
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
                                <a href="interfaces/Action.html" data-type="entity-link" >Action</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionButtonsOptions.html" data-type="entity-link" >ActionButtonsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionItemOptions.html" data-type="entity-link" >ActionItemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddFilterOptions.html" data-type="entity-link" >AddFilterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddSelectOptions.html" data-type="entity-link" >AddSelectOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedFormValidators.html" data-type="entity-link" >AdvancedFormValidators</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AfterSelectTabEvent.html" data-type="entity-link" >AfterSelectTabEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertChangeEvent.html" data-type="entity-link" >AlertChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertComponents.html" data-type="entity-link" >AlertComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutocompleteComponent.html" data-type="entity-link" >AutocompleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutocompleteItem.html" data-type="entity-link" >AutocompleteItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Basket.html" data-type="entity-link" >Basket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasketChangeEvent.html" data-type="entity-link" >BasketChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasketComponents.html" data-type="entity-link" >BasketComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeNewResultsEvent.html" data-type="entity-link" >BeforeNewResultsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeSearchEvent.html" data-type="entity-link" >BeforeSearchEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BeforeSelectTabEvent.html" data-type="entity-link" >BeforeSelectTabEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbsItem.html" data-type="entity-link" >BreadcrumbsItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaretPosition.html" data-type="entity-link" >CaretPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCQueryExport.html" data-type="entity-link" >CCQueryExport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CCQueryExportColumnDef.html" data-type="entity-link" >CCQueryExportColumnDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClearEvent.html" data-type="entity-link" >ClearEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClickOutsideOptions.html" data-type="entity-link" >ClickOutsideOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollapseStateChange.html" data-type="entity-link" >CollapseStateChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Column.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnData.html" data-type="entity-link" >ColumnData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CoreComment.html" data-type="entity-link" >CoreComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateParams.html" data-type="entity-link" >DateParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatePickerOptions.html" data-type="entity-link" >DatePickerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateRangePickerOptions.html" data-type="entity-link" >DateRangePickerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeletedComment.html" data-type="entity-link" >DeletedComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownActiveEvent.html" data-type="entity-link" >DropdownActiveEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownClearEvent.html" data-type="entity-link" >DropdownClearEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownEvent.html" data-type="entity-link" >DropdownEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownMenuOptions.html" data-type="entity-link" >DropdownMenuOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownToggleEvent.html" data-type="entity-link" >DropdownToggleEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entry.html" data-type="entity-link" >Entry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntryInput.html" data-type="entity-link" >EntryInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link" >Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportQueryModel.html" data-type="entity-link" >ExportQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetChangeEvent.html" data-type="entity-link" >FacetChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetConfig.html" data-type="entity-link" >FacetConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetFiltersConfig.html" data-type="entity-link" >FacetFiltersConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetListConfig.html" data-type="entity-link" >FacetListConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetListParams.html" data-type="entity-link" >FacetListParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetMultiConfig.html" data-type="entity-link" >FacetMultiConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetMySearchConfig.html" data-type="entity-link" >FacetMySearchConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetMySearchParams.html" data-type="entity-link" >FacetMySearchParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetRangeConfig.html" data-type="entity-link" >FacetRangeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetRangeParams.html" data-type="entity-link" >FacetRangeParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetRefineConfig.html" data-type="entity-link" >FacetRefineConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetRefineParams.html" data-type="entity-link" >FacetRefineParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetState.html" data-type="entity-link" >FacetState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetTagCloudConfig.html" data-type="entity-link" >FacetTagCloudConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetTagCloudParams.html" data-type="entity-link" >FacetTagCloudParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetTreeConfig.html" data-type="entity-link" >FacetTreeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetTreeParams.html" data-type="entity-link" >FacetTreeParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldSearchItemsContainer.html" data-type="entity-link" >FieldSearchItemsContainer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirstPageOptions.html" data-type="entity-link" >FirstPageOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetResultsOptions.html" data-type="entity-link" >GetResultsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridView.html" data-type="entity-link" >GridView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HighlightCategoryFilterState.html" data-type="entity-link" >HighlightCategoryFilterState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HighlightNavigationState.html" data-type="entity-link" >HighlightNavigationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryState.html" data-type="entity-link" >HistoryState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LabelsComponents.html" data-type="entity-link" >LabelsComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeAuditEventEvent.html" data-type="entity-link" >MakeAuditEventEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeQueryEvent.html" data-type="entity-link" >MakeQueryEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MakeQueryIntentDataEvent.html" data-type="entity-link" >MakeQueryIntentDataEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageAlertsModel.html" data-type="entity-link" >ManageAlertsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageBasketsModel.html" data-type="entity-link" >ManageBasketsModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManageSavedQueriesModel.html" data-type="entity-link" >ManageSavedQueriesModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalProperties.html" data-type="entity-link" >ModalProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultiEntryInput.html" data-type="entity-link" >MultiEntryInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationOptions.html" data-type="entity-link" >NavigationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewQueryEvent.html" data-type="entity-link" >NewQueryEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewQueryIntentsEvent.html" data-type="entity-link" >NewQueryIntentsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewResultsEvent.html" data-type="entity-link" >NewResultsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NormalComment.html" data-type="entity-link" >NormalComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenOriginalDocument.html" data-type="entity-link" >OpenOriginalDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParseResult.html" data-type="entity-link" >ParseResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreviewEvent.html" data-type="entity-link" >PreviewEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreviewPopupModel.html" data-type="entity-link" >PreviewPopupModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessQueryIntentActionEvent.html" data-type="entity-link" >ProcessQueryIntentActionEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangeInput.html" data-type="entity-link" >RangeInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentDocument.html" data-type="entity-link" >RecentDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentDocumentChangeEvent.html" data-type="entity-link" >RecentDocumentChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentQuery.html" data-type="entity-link" >RecentQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecentQueryChangeEvent.html" data-type="entity-link" >RecentQueryChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsView.html" data-type="entity-link" >ResultsView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewAfterSelectEvent.html" data-type="entity-link" >ResultsViewAfterSelectEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewBeforeSelectEvent.html" data-type="entity-link" >ResultsViewBeforeSelectEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewEvent.html" data-type="entity-link" >ResultsViewEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultsViewSelectCancelledEvent.html" data-type="entity-link" >ResultsViewSelectCancelledEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RFMEvent.html" data-type="entity-link" >RFMEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQuery.html" data-type="entity-link" >SavedQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQueryChangeEvent.html" data-type="entity-link" >SavedQueryChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedQueryComponents.html" data-type="entity-link" >SavedQueryComponents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollIntoViewOptions.html" data-type="entity-link" >ScrollIntoViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchOptions.html" data-type="entity-link" >SearchOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectBasketModel.html" data-type="entity-link" >SelectBasketModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionEvent.html" data-type="entity-link" >SelectionEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionItem.html" data-type="entity-link" >SelectionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionOptions.html" data-type="entity-link" >SelectionOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetResultsOptions.html" data-type="entity-link" >SetResultsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepDef.html" data-type="entity-link" >StepDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagCloudItem.html" data-type="entity-link" >TagCloudItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeValueItem.html" data-type="entity-link" >TreeValueItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateQueryEvent.html" data-type="entity-link" >UpdateQueryEvent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/DateFnsPipe.html" data-type="entity-link" >DateFnsPipe</a>
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