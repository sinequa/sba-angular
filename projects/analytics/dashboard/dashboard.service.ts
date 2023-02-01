import { Injectable } from '@angular/core';
import { ConfirmType, ModalButton, ModalResult, ModalService } from '@sinequa/core/modal';
import { AddWidgetModal, AddWidgetModel } from './add-widget.modal';
import { Widget, WidgetOption } from './widget.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public modalService: ModalService
  ) {}

  createWidget(option: WidgetOption, x=0, y=0): Widget {
    const widget = {
      state: {
        type: option.type,
        x, y, rows: option.rows, cols: option.cols,
        title: option.text,
        ...option.state
      },
      icon: option.icon,
      renamable: option.renamable,
      maximizable: option.maximizable,
      removable: option.removable
    };
    option.init?.(widget);
    return widget;
  }

  async promptAdd(options: WidgetOption[]): Promise<Widget|undefined> {
    const model: AddWidgetModel = {options};
    return this.modalService.open(AddWidgetModal, {model}).then(res => {
      if(res === ModalResult.OK && model.selectedOption) {
        return this.createWidget(model.selectedOption);
      }
      return undefined;
    });
  }

  async promptReset(): Promise<boolean> {
    return this.modalService.confirm({
      confirmType: ConfirmType.Warning,
      title: "msg#dashboard.deleteConfirmTitle",
      message: "msg#dashboard.deleteConfirmMessage",
      buttons: [
        new ModalButton({result: ModalResult.Cancel, primary: true}),
        new ModalButton({result: ModalResult.OK}),
      ]
    }).then(res => res === ModalResult.OK);
  }
}
