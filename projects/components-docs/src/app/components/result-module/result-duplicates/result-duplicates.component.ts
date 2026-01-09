import { Component } from "@angular/core";
import { BaseComponent } from "src/app/shared/base.component";

@Component({
    selector: 'doc-result-duplicates',
    templateUrl: './result-duplicates.component.html',
    styles: [`
  li.duplicate sq-result-duplicates-spacer {
    margin-right: 1em;
    --sq-v-offset: 1em;
  }
  li:has(+.duplicate) sq-result-duplicates-spacer {
    height: auto;
  }
  `],
    standalone: false
})
export class DocResultDuplicatesComponent extends BaseComponent {

  records = [
    {
      title: "Record 1",
      groupcount: 5,
      $duplicateCount: 3,
    },
    {
      title: "Record 2",
      $isDuplicate: true,
    },
    {
      title: "Record 3",
      groupcount: 2,
      $isDuplicate: true,
    },
    {
      title: "Record 4",
      $isDuplicate: true,
    },
    {
      title: "Record 5"
    }
  ];

  html =
`<ul>
  <li *ngFor="let record of records" class="d-flex m-0" [ngClass]="{duplicate: record.$isDuplicate}">
    <sq-result-duplicates-spacer [record]="record"></sq-result-duplicates-spacer>
    <div class="d-flex flex-column">
      <sq-result-title [record]="record"></sq-result-title>
      <sq-result-duplicates [record]="record" class="small text-muted"></sq-result-duplicates>
    </div>
  </li>
</ul>
`;

  ts =
`records = [
  {
    title: "Record 1",
    groupcount: 5,
    $duplicateCount: 3,
  },
  {
    title: "Record 2",
    $isDuplicate: true,
  },
  {
    title: "Record 3",
    groupcount: 2,
    $isDuplicate: true,
  },
  {
    title: "Record 4",
    $isDuplicate: true,
  },
  {
    title: "Record 5"
  }
];`;

  css =
`li.duplicate sq-result-duplicates-spacer {
  margin-right: 1em;
}
li:has(+.duplicate) sq-result-duplicates-spacer {
  height: auto;
}`;
}
