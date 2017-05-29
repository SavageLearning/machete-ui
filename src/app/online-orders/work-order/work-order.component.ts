import { Component, OnInit } from '@angular/core';
import {MySelectItem} from '../../reports/reports.component';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
  selectedTransportMethod: number;
  transportMethods: MySelectItem[];

  constructor() { }

  ngOnInit() {
  }

}
