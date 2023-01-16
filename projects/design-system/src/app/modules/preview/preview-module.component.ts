import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-preview-module',
  templateUrl: './preview-module.component.html'
})
export class PreviewModuleComponent implements OnInit {

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
