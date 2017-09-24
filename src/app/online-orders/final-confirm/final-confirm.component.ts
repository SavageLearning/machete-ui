import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../work-order/models/work-order';
import { WorkOrderService } from '../work-order/work-order.service';

@Component({
  selector: 'app-final-confirm',
  templateUrl: './final-confirm.component.html',
  styleUrls: ['./final-confirm.component.css']
})
export class FinalConfirmComponent implements OnInit {
  order: WorkOrder = new WorkOrder();
  constructor(
    private ordersService: WorkOrderService,
    //private onlineService: OnlineOrdersService
  ) { }

  ngOnInit() {
    const savedOrder = this.ordersService.get();
    if (savedOrder) {
      this.order = savedOrder;
    }
  }

  submit() {
    //this.onlineService.postToApi();
  }

}
