import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../work-order/models/work-order';
import { WorkOrderService } from '../work-order/work-order.service';
import { LookupsService } from "../../lookups/lookups.service";
import { LCategory } from "../../lookups/models/lookup";
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-final-confirm',
  templateUrl: './final-confirm.component.html',
  styleUrls: ['./final-confirm.component.css']
})
export class FinalConfirmComponent implements OnInit {
  order: WorkOrder = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number;
  laborCost: number;

  constructor(
    private ordersService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private lookups: LookupsService,
    private assignmentService: WorkAssignmentsService
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
      this.workerCount = wa.length;
      this.transportCost = 
        wa.map(wa => wa.transportCost)
        .reduce((a, b) => a + b);
      this.order.workAssignments = wa;
      this.laborCost = 
        wa.map(wa => wa.wage * wa.hours)
        .reduce((a, b) => a + b);
    },
    error => console.error('error', error)
  );

  }

  submit() {
    this.onlineService.postToApi(this.order);
  }

}
