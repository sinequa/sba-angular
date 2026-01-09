import { Component } from '@angular/core';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { DEFAULT_FACET_COMPONENTS, FacetConfig } from '@sinequa/components/facet';
import { Query } from '@sinequa/core/app-utils';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-facet-container',
    templateUrl: './facet-container.component.html',
    standalone: false
})
export class DocFacetContainerComponent extends BaseComponent {

  query = new Query("");

  facets: FacetConfig<any>[] = [
    {
      name: "geo",
      aggregation: "Geo",
      title: "msg#facet.geo.title",
      type: "list",
      icon: "fas fa-fw fa-globe-americas",
      parameters: {
        showCount: true,
        searchable: true,
        focusSearch: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
      }
    },
    {
      name: "company",
      aggregation: "Company",
      title: "msg#facet.company.title",
      type: "list",
      icon: "fas fa-fw fa-building",
      parameters: {
        showCount: true,
        searchable: true,
        focusSearch: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
      }
    },
    {
      name: "person",
      aggregation: "Person",
      title: "msg#facet.person.title",
      type: "list",
      icon: "fas fa-fw fa-user",
      parameters: {
        showCount: true,
        searchable: true,
        focusSearch: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false,
        displayEmptyDistributionIntervals: false,
      }
    },
    {
      name: "modified",
      aggregation: "Modified",
      title: "msg#facet.modified.title",
      type: "date",
      icon: "fas fa-fw fa-calendar-day",
      parameters: {
        timelineAggregation: "Timeline",
        showCount: true,
        allowPredefinedRange: true,
        allowCustomRange: true,
        showCustomRange: true,
        replaceCurrent: true,
        displayEmptyDistributionIntervals: true,
        timelineHeight: 100,
        timelineWidth: 500
      }
    },
  ];

  facetComponents = {
    ...DEFAULT_FACET_COMPONENTS,
    "date": BsFacetDate
  }

  code1 =
`<sq-facet-container
  [results]="results"
  [query]="query"
  [facetConfigs]="facets"
  [facetComponents]="facetComponents">
</sq-facet-container>`;

  code2 = `facets: FacetConfig<any>[] = [
    {
        name: "geo",
        aggregation: "Geo",
        title: "msg#facet.geo.title",
        type: "list",
        icon: "fas fa-fw fa-globe-americas",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "company",
        aggregation: "Company",
        title: "msg#facet.company.title",
        type: "list",
        icon: "fas fa-fw fa-building",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "person",
        aggregation: "Person",
        title: "msg#facet.person.title",
        type: "list",
        icon: "fas fa-fw fa-user",
        parameters: {
            showCount: true,
            searchable: true,
            focusSearch: true,
            allowExclude: true,
            allowOr: true,
            allowAnd: false,
            displayEmptyDistributionIntervals: false,
        }
    },
    {
        name: "modified",
        aggregation: "Modified",
        title: "msg#facet.modified.title",
        type: "date",
        icon: "fas fa-fw fa-calendar-day",
        parameters: {
            timelineAggregation: "Timeline",
            showCount: true,
            allowPredefinedRange: true,
            allowCustomRange: true,
            showCustomRange: true,
            replaceCurrent: true,
            displayEmptyDistributionIntervals: true,
            timelineHeight: 100,
            timelineWidth: 500
        }
    },
  ];

  facetComponents = {
    ...DEFAULT_FACET_COMPONENTS,
    "date": BsFacetDate
  }
  `;

  ngOnInit() {
    this.query.addFilter({field: "geo", value: "FRANCE"});
  }

}
