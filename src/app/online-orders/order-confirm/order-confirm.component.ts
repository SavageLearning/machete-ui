import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../work-order/models/work-order';
import { WorkOrderService } from '../work-order/work-order.service';
import { LookupsService } from "../../lookups/lookups.service";
import { LCategory } from "../../lookups/models/lookup";
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { Observable } from "rxjs/Observable";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  order: WorkOrder = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number;
  laborCost: number;

  constructor(
    private ordersService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private lookups: LookupsService,
    private assignmentService: WorkAssignmentsService,
    private router: Router
  ) { }

  ngOnInit() {    
    Observable.combineLatest(
      this.lookups.getLookups(LCategory.TRANSPORT),
      this.ordersService.getStream(),
      this.assignmentService.getStream()
    ).subscribe(([l, o, wa]) => {
      console.log('ngOnInit', l, o, wa);
      this.order = o;
      this.transportLabel = l.find(ll => ll.id == o.transportMethodID).text_EN;
      if (wa != null && wa.length > 0) {
        // sums up the transport  costs
        this.transportCost = 
          wa.map(wa => wa.transportCost)
            .reduce((a, b) => a + b);
        this.workerCount = wa.length;
        // sums up the labor costs
        this.laborCost = 
          wa.map(wa => wa.hourlyWage * wa.hours)
            .reduce((a, b) => a + b);      
      } else {
        this.workerCount = 0;
        this.transportCost = 0;
        this.laborCost = 0;
      }

      this.order.workAssignments = wa;


    },
    error => console.error('error', error));

  }

  submit() {
    this.onlineService.createOrder(this.order)
      .subscribe(
        (data) => {
          console.log('Returned from POST', data); 
          this.router.navigate(['/online-orders/order-complete']);
          
        },
        (err: HttpErrorResponse) => {
          console.error('POST error', err);
        }
      );
  }

}
