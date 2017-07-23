import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from "../online-orders.service";
import { WorkOrder } from "../work-order/models/work-order";

@Component({
  selector: 'app-final-confirm',
  templateUrl: './final-confirm.component.html',
  styleUrls: ['./final-confirm.component.css']
})
export class FinalConfirmComponent implements OnInit {
  order: WorkOrder;
  constructor(private ordersService: OnlineOrdersService) { }

  ngOnInit() {
    this.order = this.ordersService.getOrder();
  }

}
