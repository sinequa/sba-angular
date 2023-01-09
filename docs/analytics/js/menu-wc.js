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
                    <a href="index.html" data-type="index-link">Analytics</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                <a href="modules/AgGridModule.html" data-type="entity-link" >AgGridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AgGridModule-04d309b1ac7fb280a7aee3e934f3ba4c54a18ea625754acc3f61fdf8e83bcbbef387fd851ea4b2381f8f16acb6594998e1bb4a4ebb8acd6b47900af9ca277ca1"' : 'data-target="#xs-components-links-module-AgGridModule-04d309b1ac7fb280a7aee3e934f3ba4c54a18ea625754acc3f61fdf8e83bcbbef387fd851ea4b2381f8f16acb6594998e1bb4a4ebb8acd6b47900af9ca277ca1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AgGridModule-04d309b1ac7fb280a7aee3e934f3ba4c54a18ea625754acc3f61fdf8e83bcbbef387fd851ea4b2381f8f16acb6594998e1bb4a4ebb8acd6b47900af9ca277ca1"' :
                                            'id="xs-components-links-module-AgGridModule-04d309b1ac7fb280a7aee3e934f3ba4c54a18ea625754acc3f61fdf8e83bcbbef387fd851ea4b2381f8f16acb6594998e1bb4a4ebb8acd6b47900af9ca277ca1"' }>
                                            <li class="link">
                                                <a href="components/AgGridViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgGridViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FacetWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacetWrapperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsHeatmapModule.html" data-type="entity-link" >BsHeatmapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsHeatmapModule-8b0ab56c754c1863081fd351c0b7401124ecbeaa2ff5741e7ccbb49ca0549069a7e4555f8da2cdac8ab8c62f48e926e6cd0d2dc863c11713c9bb2b023128f5e7"' : 'data-target="#xs-components-links-module-BsHeatmapModule-8b0ab56c754c1863081fd351c0b7401124ecbeaa2ff5741e7ccbb49ca0549069a7e4555f8da2cdac8ab8c62f48e926e6cd0d2dc863c11713c9bb2b023128f5e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsHeatmapModule-8b0ab56c754c1863081fd351c0b7401124ecbeaa2ff5741e7ccbb49ca0549069a7e4555f8da2cdac8ab8c62f48e926e6cd0d2dc863c11713c9bb2b023128f5e7"' :
                                            'id="xs-components-links-module-BsHeatmapModule-8b0ab56c754c1863081fd351c0b7401124ecbeaa2ff5741e7ccbb49ca0549069a7e4555f8da2cdac8ab8c62f48e926e6cd0d2dc863c11713c9bb2b023128f5e7"' }>
                                            <li class="link">
                                                <a href="components/BsFacetHeatmapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetHeatmapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsHeatmapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsHeatmapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsHeatmapView.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsResultsHeatmapView</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsTimelineModule.html" data-type="entity-link" >BsTimelineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsTimelineModule-1edef10e391291b25ef514506dab940c9301151dcc5593fef7773c26f073a5ebe4493ef7e6d4ba82cd09335818549181121c9376c60092dfa0ab40d791473684"' : 'data-target="#xs-components-links-module-BsTimelineModule-1edef10e391291b25ef514506dab940c9301151dcc5593fef7773c26f073a5ebe4493ef7e6d4ba82cd09335818549181121c9376c60092dfa0ab40d791473684"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsTimelineModule-1edef10e391291b25ef514506dab940c9301151dcc5593fef7773c26f073a5ebe4493ef7e6d4ba82cd09335818549181121c9376c60092dfa0ab40d791473684"' :
                                            'id="xs-components-links-module-BsTimelineModule-1edef10e391291b25ef514506dab940c9301151dcc5593fef7773c26f073a5ebe4493ef7e6d4ba82cd09335818549181121c9376c60092dfa0ab40d791473684"' }>
                                            <li class="link">
                                                <a href="components/BsFacetDate.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetDate</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsFacetTimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetTimelineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTimelineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTooltipComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelineLegendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimelineLegendComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceModule.html" data-type="entity-link" >FinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FinanceModule-a3086ea96579289e74e753f894f04cd0ee92865ca8135f8caffaad70c882eeff8f47c209979ab628de1c17e72759ca2e28784c0765297eb75b596979736f268b"' : 'data-target="#xs-components-links-module-FinanceModule-a3086ea96579289e74e753f894f04cd0ee92865ca8135f8caffaad70c882eeff8f47c209979ab628de1c17e72759ca2e28784c0765297eb75b596979736f268b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceModule-a3086ea96579289e74e753f894f04cd0ee92865ca8135f8caffaad70c882eeff8f47c209979ab628de1c17e72759ca2e28784c0765297eb75b596979736f268b"' :
                                            'id="xs-components-links-module-FinanceModule-a3086ea96579289e74e753f894f04cd0ee92865ca8135f8caffaad70c882eeff8f47c209979ab628de1c17e72759ca2e28784c0765297eb75b596979736f268b"' }>
                                            <li class="link">
                                                <a href="components/BsTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTooltipComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoneyCloudComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoneyCloudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoneyTimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoneyTimelineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FusionChartsModule.html" data-type="entity-link" >FusionChartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' : 'data-target="#xs-components-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' :
                                            'id="xs-components-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' }>
                                            <li class="link">
                                                <a href="components/FusionChart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FusionChart</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiLevelPieChart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiLevelPieChart</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' : 'data-target="#xs-directives-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' :
                                        'id="xs-directives-links-module-FusionChartsModule-9e33b8bd0ecab3054872378b9b14ac64cc571d5ef9fb091256d1bf631e009f397d9bbc10de7184e186c2952fa514ad71e8566014c27c97b41d0508e0b6159a30"' }>
                                        <li class="link">
                                            <a href="directives/FusionChartsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FusionChartsDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleMapsModule.html" data-type="entity-link" >GoogleMapsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoogleMapsModule-f8c257a23ebb1f20a104e2d61eef38df4053fbf32995959f782e314b96ef1c6af418dc4c118c01f09f4cca198b54325ab535db76d780b004b402fae711569063"' : 'data-target="#xs-components-links-module-GoogleMapsModule-f8c257a23ebb1f20a104e2d61eef38df4053fbf32995959f782e314b96ef1c6af418dc4c118c01f09f4cca198b54325ab535db76d780b004b402fae711569063"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoogleMapsModule-f8c257a23ebb1f20a104e2d61eef38df4053fbf32995959f782e314b96ef1c6af418dc4c118c01f09f4cca198b54325ab535db76d780b004b402fae711569063"' :
                                            'id="xs-components-links-module-GoogleMapsModule-f8c257a23ebb1f20a104e2d61eef38df4053fbf32995959f782e314b96ef1c6af418dc4c118c01f09f4cca198b54325ab535db76d780b004b402fae711569063"' }>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NetworkModule.html" data-type="entity-link" >NetworkModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' : 'data-target="#xs-components-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' :
                                            'id="xs-components-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' }>
                                            <li class="link">
                                                <a href="components/BsEdgeInfoCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsEdgeInfoCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNodeInfoCard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsNodeInfoCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NetworkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetworkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' : 'data-target="#xs-directives-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' :
                                        'id="xs-directives-links-module-NetworkModule-8444c3bf936ae81bed701e829250d446fd169cc60e987ca1d4b49649d910549082bef746ba9f6deea5fbaffb62449cecb461575786bd38d15fc769f1b9fe5e6f"' }>
                                        <li class="link">
                                            <a href="directives/VisNetworkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisNetworkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxChartsModule.html" data-type="entity-link" >NgxChartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxChartsModule-528b2cbaa1cc104a76462ef6f348c2430ce212beec410eeb41b87c5f6d01ce1313f01a1b887906628b852216adae46a193a844ce50fd55a0740cf7a7108a29d3"' : 'data-target="#xs-components-links-module-NgxChartsModule-528b2cbaa1cc104a76462ef6f348c2430ce212beec410eeb41b87c5f6d01ce1313f01a1b887906628b852216adae46a193a844ce50fd55a0740cf7a7108a29d3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxChartsModule-528b2cbaa1cc104a76462ef6f348c2430ce212beec410eeb41b87c5f6d01ce1313f01a1b887906628b852216adae46a193a844ce50fd55a0740cf7a7108a29d3"' :
                                            'id="xs-components-links-module-NgxChartsModule-528b2cbaa1cc104a76462ef6f348c2430ce212beec410eeb41b87c5f6d01ce1313f01a1b887906628b852216adae46a193a844ce50fd55a0740cf7a7108a29d3"' }>
                                            <li class="link">
                                                <a href="components/FacetNgxChart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacetNgxChart</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxChart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NgxChart</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisTimelineModule.html" data-type="entity-link" >VisTimelineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' : 'data-target="#xs-components-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' :
                                            'id="xs-components-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' }>
                                            <li class="link">
                                                <a href="components/ResultTimeline.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultTimeline</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' : 'data-target="#xs-directives-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' :
                                        'id="xs-directives-links-module-VisTimelineModule-0cc435f80806f8dbc9834bdfc6adb963c29429173bf8717d11bdd90595c0ad577024108a080d7d414ad8bc30602ca1a61a168cc8ba23dc401594fd4c3bccb744"' }>
                                        <li class="link">
                                            <a href="directives/VisTimelineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisTimelineDirective</a>
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
                                <a href="components/BsTooltipComponent.html" data-type="entity-link" >BsTooltipComponent</a>
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
                                <a href="classes/AggregationProvider.html" data-type="entity-link" >AggregationProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/AsyncRecordsProvider.html" data-type="entity-link" >AsyncRecordsProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseProvider.html" data-type="entity-link" >BaseProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicEdgeProvider.html" data-type="entity-link" >DynamicEdgeProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicNodeProvider.html" data-type="entity-link" >DynamicNodeProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworkDataset.html" data-type="entity-link" >NetworkDataset</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecordsProvider.html" data-type="entity-link" >RecordsProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectedRecordsProvider.html" data-type="entity-link" >SelectedRecordsProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/SqDatasource.html" data-type="entity-link" >SqDatasource</a>
                            </li>
                            <li class="link">
                                <a href="classes/TooltipManager.html" data-type="entity-link" >TooltipManager</a>
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
                                    <a href="injectables/FusionChartsService.html" data-type="entity-link" >FusionChartsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FusionChartsStatic.html" data-type="entity-link" >FusionChartsStatic</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleMapsService.html" data-type="entity-link" >GoogleMapsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProviderFactory.html" data-type="entity-link" >ProviderFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisNetworkService.html" data-type="entity-link" >VisNetworkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisTimelineService.html" data-type="entity-link" >VisTimelineService</a>
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
                                <a href="interfaces/AggregationData.html" data-type="entity-link" >AggregationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationEdge.html" data-type="entity-link" >AggregationEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationEdgeType.html" data-type="entity-link" >AggregationEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartDataPoint.html" data-type="entity-link" >ChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartOptions.html" data-type="entity-link" >ChartOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Column.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomData.html" data-type="entity-link" >CustomData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicEdge.html" data-type="entity-link" >DynamicEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicEdgeType.html" data-type="entity-link" >DynamicEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicNodeType.html" data-type="entity-link" >DynamicNodeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Edge.html" data-type="entity-link" >Edge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EdgeType.html" data-type="entity-link" >EdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetChartDataPoint.html" data-type="entity-link" >FacetChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetDateConfig.html" data-type="entity-link" >FacetDateConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetDateParams.html" data-type="entity-link" >FacetDateParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FusionChartInstance.html" data-type="entity-link" >FusionChartInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FusionChartsEvent.html" data-type="entity-link" >FusionChartsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeoRecord.html" data-type="entity-link" >GeoRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeatmapItem.html" data-type="entity-link" >HeatmapItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoneyCloudDatum.html" data-type="entity-link" >MoneyCloudDatum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoneyDatum.html" data-type="entity-link" >MoneyDatum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetworkContext.html" data-type="entity-link" >NetworkContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetworkProvider.html" data-type="entity-link" >NetworkProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Node.html" data-type="entity-link" >Node</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeData.html" data-type="entity-link" >NodeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeType.html" data-type="entity-link" >NodeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordNode.html" data-type="entity-link" >RecordNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StructuralEdgeType.html" data-type="entity-link" >StructuralEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineAggregation.html" data-type="entity-link" >TimelineAggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineCombinedAggregations.html" data-type="entity-link" >TimelineCombinedAggregations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineDate.html" data-type="entity-link" >TimelineDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineEvent.html" data-type="entity-link" >TimelineEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineEventAggregation.html" data-type="entity-link" >TimelineEventAggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineEventType.html" data-type="entity-link" >TimelineEventType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineRecords.html" data-type="entity-link" >TimelineRecords</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineSeries.html" data-type="entity-link" >TimelineSeries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisEvent.html" data-type="entity-link" >VisEvent</a>
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