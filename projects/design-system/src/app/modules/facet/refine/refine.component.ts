import { Component, OnInit } from '@angular/core';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-refine',
  templateUrl: './refine.component.html'
})
export class RefineComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-refine [results]="results"></sq-refine>`;

  constructor() { }

  ngOnInit(): void {
  }

}
