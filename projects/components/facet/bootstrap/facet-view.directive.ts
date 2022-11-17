import { Directive, Input, TemplateRef } from "@angular/core";
import { IAction } from "@sinequa/components/action";

@Directive({selector: 'ng-template [sqFacetView]'})
export class FacetViewDirective {
  @Input("sqFacetView") viewOptions?: IAction;
  @Input() default?: boolean;
  @Input() id?: string;

  constructor(
    public readonly template: TemplateRef<any>
  ) {}
}
