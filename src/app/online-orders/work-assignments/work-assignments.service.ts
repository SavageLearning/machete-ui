import { Injectable } from '@angular/core';
import {WorkAssignment} from '../../shared/models/work-assignment';
import {Observable} from 'rxjs/Observable';

import { OnlineOrdersService } from '../online-orders.service';
import { TransportRule, CostRule } from '../shared/index';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { WorkOrderService } from '../work-order/work-order.service';
import { Lookup, LCategory } from '../../lookups/models/lookup';
import { LookupsService } from '../../lookups/lookups.service';
import { WorkOrder } from "../../shared/models/work-order";
import { Subject } from "rxjs";
import { TransportRulesService } from '../transport-rules.service';

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();
  storageKey = 'machete.workassignments';

  private transports: Lookup[];
  private transportRules: TransportRule[];
  private combinedSource: Observable<[TransportRule[], Lookup[], WorkOrder]>;
  private workOrder: WorkOrder;

  constructor(
    private onlineService: OnlineOrdersService,
    private orderService: WorkOrderService,
    private lookupsService: LookupsService,
    private transportRulesService: TransportRulesService
  ) {
    console.log('.ctor');
    let data = sessionStorage.getItem(this.storageKey);
    if (data) {
      console.log('sessionStorage:', data);
      let requests: WorkAssignment[] = JSON.parse(data);
      this.requests = requests;
    }
    this.combinedSource = Observable.combineLatest(
      this.transportRulesService.getTransportRules(),
      this.lookupsService.getLookups(LCategory.TRANSPORT),
      this.orderService.getStream());

    const subscribed = this.combinedSource.subscribe(
      values => {
        const [rules, transports, order] = values;
        this.workOrder = order;
        this.transportRules = rules;
        this.transports = transports;
        this.compactRequests();
        console.log('combined subscription::', values);
      });
  }

  getStream(): Observable<WorkAssignment[]> {
    return Observable.of(this.requests);
  }
  
  getAll(): WorkAssignment[] {
      return this.requests;
  }

  save(request: WorkAssignment) {
    Observable.zip(
      this.transportRulesService.getTransportRules(),
      this.lookupsService.getLookups(LCategory.TRANSPORT),
      this.orderService.getStream(),
      () => {}
    )
    .subscribe(() => {
      this._save(request);
    });
  }
   
  _save(request: WorkAssignment) {
    if (request.id === 0) {
      request.id = this.getNextRequestId();
    }

    const index = this.findSelectedRequestIndex(request);
    if (index === -1) {
      this.requests.push(request); // create
    } else {
      this.requests[index] = request; // replace
    }
    this.compactRequests();
    console.log('saving:', this.requests);
    sessionStorage.setItem(this.storageKey, 
      JSON.stringify(this.requests));
  }

  getNextRequestId() {
    const sorted: WorkAssignment[] =  this.requests.sort(WorkAssignment.sort);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
  }

  delete(request: WorkAssignment) {
    let index = this.findSelectedRequestIndex(request);
    if (index < 0) {
      throw new Error('Can\'t find request (WorkAssignment) by id; failed to delete request.');
    }
    this.requests.splice(index, 1);
    this.compactRequests();
    console.log('saving after delete:', this.requests);
    sessionStorage.setItem(this.storageKey, 
      JSON.stringify(this.requests));
  }

  clear() {}

  findSelectedRequestIndex(request: WorkAssignment): number {
    return this.requests.findIndex(a => a.id === request.id);
  }

  compactRequests() {
    let rule = this.getTransportRule();
    for (let i in this.requests) {
      let newid = Number(i);
      this.requests[newid].id = newid + 1;
      this.requests[newid].transportCost = 
        this.calculateTransportCost(newid + 1, rule);
        console.log('completed compactRequest');
    }
  }

  getTransportRule(): TransportRule {
    const order = this.workOrder;
    if (order === null || order === undefined) {
      throw new Error('OrderService returned an undefined order');
    }
    if (order.transportMethodID <= 0) {
      throw new Error('Order missing valid transportMethodID');
    }

    const lookup: Lookup = this.transports.find(f => f.id == order.transportMethodID);
    if (lookup === null || lookup === undefined) {
      throw new Error('LookupService didn\'t return a valid lookup for transportMethodID: ' + order.transportMethodID);
    }

    const rules = this.transportRules.filter(f => f.lookupKey == lookup.key);
    if (rules === null || rules === undefined) {
      throw new Error('No TransportRules match lookup key: ' + lookup.key);
    }

    const result = rules.find(f => f.zipcodes.includes(order.zipcode) || 
                                   f.zipcodes.includes("*"));
    if (result === null || result == undefined) {
      throw new Error(`Zipcode ${order.zipcode} does not match any rule`);
    }
    return result; 
  }

  calculateTransportCost(id: number, rule: TransportRule): number {
    // can have a cost rule for a van, with an id greater that min/max worker,
    // that then leads to no rule.
    // TODO: Handle too many ids exception
    let result = rule.costRules.find(r => id > r.minWorker && id <= r.maxWorker);
    if (result === undefined || result === null) {
      throw new Error('work assignment id outside of cost rules');
    }
    return result.cost;
  }
}
