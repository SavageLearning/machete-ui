import { Component, OnInit } from '@angular/core';
import { WorkOrdersService } from './work-orders.service';
import {DataTable} from 'primeng/primeng';
import { WorkOrder } from '../shared/models/work-order';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css'],
  providers: [WorkOrdersService]
})
export class WorkOrdersComponent implements OnInit {
  orders: WorkOrder[];

  constructor(private workOrderService: WorkOrdersService) { }

  ngOnInit() {
    this.workOrderService.getOrders()
      .subscribe(
        data => {
          this.orders = data;
        });
  }

}
