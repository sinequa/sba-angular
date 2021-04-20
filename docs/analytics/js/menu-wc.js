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
                                <a href="modules/BsHeatmapModule.html" data-type="entity-link">BsHeatmapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsHeatmapModule-6d95c4fc16f7d8c385f6ce2df1ce16c1"' : 'data-target="#xs-components-links-module-BsHeatmapModule-6d95c4fc16f7d8c385f6ce2df1ce16c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsHeatmapModule-6d95c4fc16f7d8c385f6ce2df1ce16c1"' :
                                            'id="xs-components-links-module-BsHeatmapModule-6d95c4fc16f7d8c385f6ce2df1ce16c1"' }>
                                            <li class="link">
                                                <a href="components/BsFacetHeatmapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetHeatmapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsHeatmapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsHeatmapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsResultsHeatmapView.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsResultsHeatmapView</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTooltipComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsTooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BsTimelineModule.html" data-type="entity-link">BsTimelineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BsTimelineModule-df9d346c7069edd16616acc44160d1f2"' : 'data-target="#xs-components-links-module-BsTimelineModule-df9d346c7069edd16616acc44160d1f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsTimelineModule-df9d346c7069edd16616acc44160d1f2"' :
                                            'id="xs-components-links-module-BsTimelineModule-df9d346c7069edd16616acc44160d1f2"' }>
                                            <li class="link">
                                                <a href="components/BsFacetTimelineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsFacetTimelineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTimelineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsTimelineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceModule.html" data-type="entity-link">FinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FinanceModule-ce25798f889b82db3de8c63530adbf93"' : 'data-target="#xs-components-links-module-FinanceModule-ce25798f889b82db3de8c63530adbf93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceModule-ce25798f889b82db3de8c63530adbf93"' :
                                            'id="xs-components-links-module-FinanceModule-ce25798f889b82db3de8c63530adbf93"' }>
                                            <li class="link">
                                                <a href="components/MoneyCloudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MoneyCloudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoneyTimelineComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MoneyTimelineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FusionChartsModule.html" data-type="entity-link">FusionChartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FusionChartsModule-620013bbc0095f1aca9a2d55f64d262a"' : 'data-target="#xs-components-links-module-FusionChartsModule-620013bbc0095f1aca9a2d55f64d262a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FusionChartsModule-620013bbc0095f1aca9a2d55f64d262a"' :
                                            'id="xs-components-links-module-FusionChartsModule-620013bbc0095f1aca9a2d55f64d262a"' }>
                                            <li class="link">
                                                <a href="components/FusionChart.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FusionChart</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleMapsModule.html" data-type="entity-link">GoogleMapsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoogleMapsModule-80f55861f182dafc0ea4a69679362865"' : 'data-target="#xs-components-links-module-GoogleMapsModule-80f55861f182dafc0ea4a69679362865"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoogleMapsModule-80f55861f182dafc0ea4a69679362865"' :
                                            'id="xs-components-links-module-GoogleMapsModule-80f55861f182dafc0ea4a69679362865"' }>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NetworkModule.html" data-type="entity-link">NetworkModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NetworkModule-d34481120756bc7265d6d5632402006e"' : 'data-target="#xs-components-links-module-NetworkModule-d34481120756bc7265d6d5632402006e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NetworkModule-d34481120756bc7265d6d5632402006e"' :
                                            'id="xs-components-links-module-NetworkModule-d34481120756bc7265d6d5632402006e"' }>
                                            <li class="link">
                                                <a href="components/BsEdgeInfoCard.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsEdgeInfoCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsNodeInfoCard.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BsNodeInfoCard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NetworkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NetworkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxChartsModule.html" data-type="entity-link">NgxChartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxChartsModule-c53269ff2ed66cf2036fcd93ecda28fd"' : 'data-target="#xs-components-links-module-NgxChartsModule-c53269ff2ed66cf2036fcd93ecda28fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxChartsModule-c53269ff2ed66cf2036fcd93ecda28fd"' :
                                            'id="xs-components-links-module-NgxChartsModule-c53269ff2ed66cf2036fcd93ecda28fd"' }>
                                            <li class="link">
                                                <a href="components/FacetNgxChart.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FacetNgxChart</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NgxChart.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxChart</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisTimelineModule.html" data-type="entity-link">VisTimelineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisTimelineModule-007bcb923401980021559bdf05acee95"' : 'data-target="#xs-components-links-module-VisTimelineModule-007bcb923401980021559bdf05acee95"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisTimelineModule-007bcb923401980021559bdf05acee95"' :
                                            'id="xs-components-links-module-VisTimelineModule-007bcb923401980021559bdf05acee95"' }>
                                            <li class="link">
                                                <a href="components/ResultTimeline.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultTimeline</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/AggregationProvider.html" data-type="entity-link">AggregationProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/AsyncRecordsProvider.html" data-type="entity-link">AsyncRecordsProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseProvider.html" data-type="entity-link">BaseProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicEdgeProvider.html" data-type="entity-link">DynamicEdgeProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicNodeProvider.html" data-type="entity-link">DynamicNodeProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworkDataset.html" data-type="entity-link">NetworkDataset</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecordsProvider.html" data-type="entity-link">RecordsProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectedRecordsProvider.html" data-type="entity-link">SelectedRecordsProvider</a>
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
                                    <a href="injectables/ProviderFactory.html" data-type="entity-link">ProviderFactory</a>
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
                                <a href="interfaces/AggregationData.html" data-type="entity-link">AggregationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationEdge.html" data-type="entity-link">AggregationEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationEdgeType.html" data-type="entity-link">AggregationEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartDataPoint.html" data-type="entity-link">ChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartOptions.html" data-type="entity-link">ChartOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomData.html" data-type="entity-link">CustomData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicEdge.html" data-type="entity-link">DynamicEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicEdgeType.html" data-type="entity-link">DynamicEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicNodeType.html" data-type="entity-link">DynamicNodeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Edge.html" data-type="entity-link">Edge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EdgeType.html" data-type="entity-link">EdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacetChartDataPoint.html" data-type="entity-link">FacetChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeatmapItem.html" data-type="entity-link">HeatmapItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoneyCloudDatum.html" data-type="entity-link">MoneyCloudDatum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoneyDatum.html" data-type="entity-link">MoneyDatum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetworkContext.html" data-type="entity-link">NetworkContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetworkProvider.html" data-type="entity-link">NetworkProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Node.html" data-type="entity-link">Node</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeData.html" data-type="entity-link">NodeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeType.html" data-type="entity-link">NodeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordNode.html" data-type="entity-link">RecordNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StructuralEdgeType.html" data-type="entity-link">StructuralEdgeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineAggregation.html" data-type="entity-link">TimelineAggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineCombinedAggregations.html" data-type="entity-link">TimelineCombinedAggregations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineDate.html" data-type="entity-link">TimelineDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineEvent.html" data-type="entity-link">TimelineEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineEventAggregation.html" data-type="entity-link">TimelineEventAggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineRecords.html" data-type="entity-link">TimelineRecords</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimelineSeries.html" data-type="entity-link">TimelineSeries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisEvent.html" data-type="entity-link">VisEvent</a>
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