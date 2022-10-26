import { Directive, Input, ContentChild, TemplateRef } from "@angular/core";
import { IAction } from "@sinequa/components/action";
import { AbstractFacet } from "../abstract-facet";

@Directive({selector: 'ng-template [sqFacetView]'})
export class FacetViewDirective {
  @Input("sqFacetView") viewOptions?: IAction;
  @Input() default?: boolean;
  @ContentChild("facet") facet?: AbstractFacet;

  constructor(
    public readonly template: TemplateRef<any>
  ) {}
}
