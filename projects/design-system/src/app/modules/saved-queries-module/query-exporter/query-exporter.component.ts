import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-query-exporter',
  templateUrl: './query-exporter.component.html'
})
export class QueryExporterComponent {

  code = `<sq-query-exporter
    [results]="results">
</sq-query-exporter>`;

  constructor(public globalService: GlobalService) { }

}
