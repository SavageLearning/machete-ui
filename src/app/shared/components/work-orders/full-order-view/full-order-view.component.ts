import { Component, OnInit, Input } from '@angular/core';
import { WorkOrder } from '../../../models/work-order';

@Component({
  selector: 'full-order-view',
  templateUrl: './full-order-view.component.html',
  styleUrls: ['./full-order-view.component.css']
})
export class FullOrderViewComponent implements OnInit {
  @Input() order: WorkOrder;
  @Input() transportLabel: string;
  @Input() workerCount: number;
  @Input() transportCost: number;
  @Input() laborCost: number;

  constructor() {  
    console.log('.ctor');
   }

  ngOnInit() {
  }

}
