import { Component, OnInit } from '@angular/core';
import {RESULTS} from "../../mocks/results";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  results: any = RESULTS;

  constructor() { }

  ngOnInit(): void {
  }

}
