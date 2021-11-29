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
                                            'data-target="#components-links-module-BsHeatmapModule-2c05f5a134b083dcb1fc47e6c43a3518d7cfd69913fd8976c8b496ac57d985b7bb456ed50c25754c870ec1d036434a1406f7c262a523899e9c9265b372d4e34a"' : 'data-target="#xs-components-links-module-BsHeatmapModule-2c05f5a134b083dcb1fc47e6c43a3518d7cfd69913fd8976c8b496ac57d985b7bb456ed50c25754c870ec1d036434a1406f7c262a523899e9c9265b372d4e34a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsHeatmapModule-2c05f5a134b083dcb1fc47e6c43a3518d7cfd69913fd8976c8b496ac57d985b7bb456ed50c25754c870ec1d036434a1406f7c262a523899e9c9265b372d4e34a"' :
                                            'id="xs-components-links-module-BsHeatmapModule-2c05f5a134b083dcb1fc47e6c43a3518d7cfd69913fd8976c8b496ac57d985b7bb456ed50c25754c870ec1d036434a1406f7c262a523899e9c9265b372d4e34a"' }>
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
                                            'data-target="#components-links-module-BsTimelineModule-d87f37e5ed8358214ca7fcfea504a12b460a224251ca0d640d906e243a9fd90d38b00957dcbed845acba678d52f8bdfd619697e81e1412a1c5073eab433d8a69"' : 'data-target="#xs-components-links-module-BsTimelineModule-d87f37e5ed8358214ca7fcfea504a12b460a224251ca0d640d906e243a9fd90d38b00957dcbed845acba678d52f8bdfd619697e81e1412a1c5073eab433d8a69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BsTimelineModule-d87f37e5ed8358214ca7fcfea504a12b460a224251ca0d640d906e243a9fd90d38b00957dcbed845acba678d52f8bdfd619697e81e1412a1c5073eab433d8a69"' :
                                            'id="xs-components-links-module-BsTimelineModule-d87f37e5ed8358214ca7fcfea504a12b460a224251ca0d640d906e243a9fd90d38b00957dcbed845acba678d52f8bdfd619697e81e1412a1c5073eab433d8a69"' }>
                                            <li class="link">
                                                <a href="components/BsFacetTimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsFacetTimelineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BsTimelineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BsTimelineComponent</a>
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
                                            'data-target="#components-links-module-FinanceModule-e15a467d4af17107a0ca8f075899f077d0924e0826731c60f3dbd78dc891a16df3ba5b9426f2e25c5432a44b4b3cba494a08125285bbdd191b1d5452616d442d"' : 'data-target="#xs-components-links-module-FinanceModule-e15a467d4af17107a0ca8f075899f077d0924e0826731c60f3dbd78dc891a16df3ba5b9426f2e25c5432a44b4b3cba494a08125285bbdd191b1d5452616d442d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceModule-e15a467d4af17107a0ca8f075899f077d0924e0826731c60f3dbd78dc891a16df3ba5b9426f2e25c5432a44b4b3cba494a08125285bbdd191b1d5452616d442d"' :
                                            'id="xs-components-links-module-FinanceModule-e15a467d4af17107a0ca8f075899f077d0924e0826731c60f3dbd78dc891a16df3ba5b9426f2e25c5432a44b4b3cba494a08125285bbdd191b1d5452616d442d"' }>
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
                                            'data-target="#components-links-module-FusionChartsModule-b30796c7219df35fd54be1f6a797b7552cdc775552e2980f9891d9f5c71b0b3192800624ff106fb095024a572d53c1bc4683e009ba001ba431df3657153a097e"' : 'data-target="#xs-components-links-module-FusionChartsModule-b30796c7219df35fd54be1f6a797b7552cdc775552e2980f9891d9f5c71b0b3192800624ff106fb095024a572d53c1bc4683e009ba001ba431df3657153a097e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FusionChartsModule-b30796c7219df35fd54be1f6a797b7552cdc775552e2980f9891d9f5c71b0b3192800624ff106fb095024a572d53c1bc4683e009ba001ba431df3657153a097e"' :
                                            'id="xs-components-links-module-FusionChartsModule-b30796c7219df35fd54be1f6a797b7552cdc775552e2980f9891d9f5c71b0b3192800624ff106fb095024a572d53c1bc4683e009ba001ba431df3657153a097e"' }>
                                            <li class="link">
                                                <a href="components/FusionChart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FusionChart</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleMapsModule.html" data-type="entity-link" >GoogleMapsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoogleMapsModule-c06be271530981d55f52c79780cf0ee43de829206e9ddff1c5b70ada917e264943711bdf046d3b99db49150833591f1eddefc5214f84ef6c7bf6ba84756d5028"' : 'data-target="#xs-components-links-module-GoogleMapsModule-c06be271530981d55f52c79780cf0ee43de829206e9ddff1c5b70ada917e264943711bdf046d3b99db49150833591f1eddefc5214f84ef6c7bf6ba84756d5028"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoogleMapsModule-c06be271530981d55f52c79780cf0ee43de829206e9ddff1c5b70ada917e264943711bdf046d3b99db49150833591f1eddefc5214f84ef6c7bf6ba84756d5028"' :
                                            'id="xs-components-links-module-GoogleMapsModule-c06be271530981d55f52c79780cf0ee43de829206e9ddff1c5b70ada917e264943711bdf046d3b99db49150833591f1eddefc5214f84ef6c7bf6ba84756d5028"' }>
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
                                            'data-target="#components-links-module-NetworkModule-0fa873d86dfce7e5855ed51a2beed6873ebefc28c48c900a1d485d01f1d4e0310dcc2085d67eac1dbc0739f6fa8a7ef0cadc2fd645a2b378b49a7edb51283dd2"' : 'data-target="#xs-components-links-module-NetworkModule-0fa873d86dfce7e5855ed51a2beed6873ebefc28c48c900a1d485d01f1d4e0310dcc2085d67eac1dbc0739f6fa8a7ef0cadc2fd645a2b378b49a7edb51283dd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NetworkModule-0fa873d86dfce7e5855ed51a2beed6873ebefc28c48c900a1d485d01f1d4e0310dcc2085d67eac1dbc0739f6fa8a7ef0cadc2fd645a2b378b49a7edb51283dd2"' :
                                            'id="xs-components-links-module-NetworkModule-0fa873d86dfce7e5855ed51a2beed6873ebefc28c48c900a1d485d01f1d4e0310dcc2085d67eac1dbc0739f6fa8a7ef0cadc2fd645a2b378b49a7edb51283dd2"' }>
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
                            </li>
                            <li class="link">
                                <a href="modules/NgxChartsModule.html" data-type="entity-link" >NgxChartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NgxChartsModule-c53d1cb64c885e1a2440f516fddfa6d6ffa64ddd2f63e6042f22865fee66dd91c8ee4b4a3cee521c4d34a121783c22a2c1fd27eea3772fb661cb68fb8ba6017e"' : 'data-target="#xs-components-links-module-NgxChartsModule-c53d1cb64c885e1a2440f516fddfa6d6ffa64ddd2f63e6042f22865fee66dd91c8ee4b4a3cee521c4d34a121783c22a2c1fd27eea3772fb661cb68fb8ba6017e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NgxChartsModule-c53d1cb64c885e1a2440f516fddfa6d6ffa64ddd2f63e6042f22865fee66dd91c8ee4b4a3cee521c4d34a121783c22a2c1fd27eea3772fb661cb68fb8ba6017e"' :
                                            'id="xs-components-links-module-NgxChartsModule-c53d1cb64c885e1a2440f516fddfa6d6ffa64ddd2f63e6042f22865fee66dd91c8ee4b4a3cee521c4d34a121783c22a2c1fd27eea3772fb661cb68fb8ba6017e"' }>
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
                                            'data-target="#components-links-module-VisTimelineModule-59596bf992dd1922d8f02eae350a9f75c31020b0e029cbf6fe89f9f43fc1a58994fb121eadd44e726405b135f8915f1629731f10ab6b52c6734d10a19189b9e9"' : 'data-target="#xs-components-links-module-VisTimelineModule-59596bf992dd1922d8f02eae350a9f75c31020b0e029cbf6fe89f9f43fc1a58994fb121eadd44e726405b135f8915f1629731f10ab6b52c6734d10a19189b9e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisTimelineModule-59596bf992dd1922d8f02eae350a9f75c31020b0e029cbf6fe89f9f43fc1a58994fb121eadd44e726405b135f8915f1629731f10ab6b52c6734d10a19189b9e9"' :
                                            'id="xs-components-links-module-VisTimelineModule-59596bf992dd1922d8f02eae350a9f75c31020b0e029cbf6fe89f9f43fc1a58994fb121eadd44e726405b135f8915f1629731f10ab6b52c6734d10a19189b9e9"' }>
                                            <li class="link">
                                                <a href="components/ResultTimeline.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultTimeline</a>
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
                                    <a href="injectables/ProviderFactory.html" data-type="entity-link" >ProviderFactory</a>
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