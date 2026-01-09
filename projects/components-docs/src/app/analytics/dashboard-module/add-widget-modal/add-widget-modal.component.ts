import { Component } from '@angular/core';
import { AddWidgetModal, AddWidgetModel } from '@sinequa/analytics/dashboard';
import { ModalService } from '@sinequa/core/modal';

@Component({
    selector: 'doc-add-widget-modal',
    templateUrl: './add-widget-modal.component.html',
    standalone: false
})
export class DocAddWidgetModalComponent {

  code = ``;

  constructor(private modalService: ModalService) { }

  openModal(): void {
    const defaultOptions = {
      renamable: false,
      maximizable: true,
      removable: true,
      unique: true,
      rows: 2,
      cols: 2
    };

    const model: AddWidgetModel = {
      options: [
        { type: 'map', icon: 'fas fa-globe-americas fa-fw', text: 'Map', ...defaultOptions },
        { type: 'timeline', icon: 'fas fa-chart-line fa-fw', text: 'Timeline', ...defaultOptions },
        { type: 'network', icon: 'fas fa-project-diagram fa-fw', text: 'Network', ...defaultOptions },
        { type: 'chart', icon: 'fas fa-chart-bar fa-fw', text: 'Chart', ...defaultOptions, unique: false, state: { aggregation: 'Company', chartType: 'Column2D' } },
        { type: 'heatmap', icon: 'fas fa-th fa-fw', text: 'Heatmap', ...defaultOptions, rows: 3 },
        { type: 'tagcloud', icon: 'fas fa-comments fa-fw', text: 'Tagcloud', ...defaultOptions },
        { type: 'money-timeline', icon: 'fas fa-search-dollar fa-fw', text: 'Timeline', ...defaultOptions },
        { type: 'money-cloud', icon: 'fas fa-comment-dollar fa-fw', text: 'Cloud', ...defaultOptions },
        { type: 'preview', icon: 'far fa-file-alt fa-fw', text: 'Preview', ...defaultOptions, rows: 3, renamable: false }
      ]
    };
    this.modalService.open(AddWidgetModal, { model });
  }

}
