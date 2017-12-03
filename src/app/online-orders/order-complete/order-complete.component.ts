import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../../shared/models/work-order';
import { LookupsService } from '../../lookups/lookups.service';
import { LCategory } from '../../lookups/models/lookup';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  order = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number;
  laborCost: number;

  constructor(
    private onlineService: OnlineOrdersService,
    private lookups: LookupsService,
  ) { }

  ngOnInit() {
    Observable.combineLatest(
      this.lookups.getLookups(LCategory.TRANSPORT),
      this.onlineService.getOrderCompleteStream(),
      
    ).subscribe(([l,o])=>{
      console.log(l,o);
      this.order = o;
      this.transportLabel = l.find(ll => ll.id == o.transportMethodID).text_EN;
      let wa = o.workAssignments;
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
    },
    error => console.error('error', error));
  }

}
