import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sq-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class BsAlertMessageComponent implements OnInit {
  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
