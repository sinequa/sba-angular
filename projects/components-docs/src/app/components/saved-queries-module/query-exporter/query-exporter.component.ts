import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-query-exporter',
    templateUrl: './query-exporter.component.html',
    standalone: false
})
export class DocQueryExporterComponent extends BaseComponent {

  code = `<sq-query-exporter
    [results]="results">
</sq-query-exporter>`;

}
