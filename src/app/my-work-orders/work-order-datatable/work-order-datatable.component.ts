import { Component, OnInit } from "@angular/core";
import { MyWorkOrdersService } from "../my-work-orders.service";
import { Router } from "@angular/router";
import { WorkOrderVM } from "machete-client";

@Component({
  selector: "app-work-order-datatable",
  templateUrl: "./work-order-datatable.component.html",
  styleUrls: ["./work-order-datatable.component.css"],
})
export class WorkOrderDatatableComponent implements OnInit {
  orders: WorkOrderVM[];
  constructor(
    private workOrderService: MyWorkOrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.workOrderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  viewOrder(order: WorkOrderVM): void {
    console.log(order);
    this.router
      .navigate([`/my-work-orders/${order.id}`])
      .catch((e) => console.error(e));
  }
}
