import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../work-order/models/work-order';
import { WorkOrderService } from '../work-order/work-order.service';
import { LookupsService } from "../../lookups/lookups.service";
import { LCategory } from "../../lookups/models/lookup";

@Component({
  selector: 'app-final-confirm',
  templateUrl: './final-confirm.component.html',
  styleUrls: ['./final-confirm.component.css']
})
export class FinalConfirmComponent implements OnInit {
  order: WorkOrder = new WorkOrder();
  transportLabel: string;
  constructor(
    private ordersService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private lookups: LookupsService
  ) { }

  ngOnInit() {    
    this.lookups.getLookups(LCategory.TRANSPORT)
      .withLatestFrom(this.ordersService.getStream())
      .subscribe(([l, o]) => {
        console.log('final-confirm.component', l, o);
        this.order = o;
        this.transportLabel = l.find(ll => ll.id == o.transportMethodID).text_EN;
      });

  }

  submit() {
    this.onlineService.postToApi(this.order);
  }

}
