import { Component } from '@angular/core';
import { FacetConfig } from '@sinequa/components/facet';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-facet-multi',
  templateUrl: './facet-multi.component.html'
})
export class DocFacetMultiComponent extends BaseComponent {

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
        displayEmptyDistributionIntervals: true
      }
    },
  ];

  code1 = `<sq-facet-card
    title="Multi"
    [collapsible]="false">
    <sq-facet-multi
        [results]="results"
        [facets]="facets"
        #facet>
    </sq-facet-multi>
</sq-facet-card>`;

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
            displayEmptyDistributionIntervals: true
        }
    },
  ];`;

}
