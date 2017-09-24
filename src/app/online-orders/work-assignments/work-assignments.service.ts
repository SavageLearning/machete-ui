import { Injectable } from '@angular/core';
import {WorkAssignment} from './models/work-assignment';
import {Observable} from 'rxjs/Observable';

import { OnlineOrdersService } from "../online-orders.service";
import { TransportRule, CostRule } from "../shared/index";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { WorkOrderService } from "../work-order/work-order.service";
import { Lookup, LCategory } from "../../lookups/models/lookup";
import { LookupsService } from "../../lookups/lookups.service";

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();
  static storageKey = 'machete.workassignments';
  transports: Lookup[];
  transportRules: TransportRule[];
  transportRules$: BehaviorSubject<TransportRule[]>;

  constructor(
    private onlineService: OnlineOrdersService,
    private orderService: WorkOrderService,
    private lookupsService: LookupsService,
  ) {
    console.log('.ctor');
    this.initializeTransports();
  }

  initializeTransports() {
    this.lookupsService.getLookups(LCategory.TRANSPORT)
      .subscribe(
        data => this.transports = data,
        error => console.error('initializeTranports.error: ' + JSON.stringify(error)),
        () => console.log('initializeTransport.OnComplete')
      );
    if (!this.transportRules$) {
      this.transportRules$ = new BehaviorSubject(new Array<TransportRule>());
      this.onlineService.getTransportRules()
      .subscribe(
        data => {
          this.transportRules = data;
          this.transportRules$.next(data);
        });
    }
  }

  subscribeToTransports(): Observable<TransportRule[]> {
    return this.transportRules$.asObservable();
  }

  getAll(): WorkAssignment[] {
    console.log('getAll: called');
    let data = sessionStorage.getItem(WorkAssignmentsService.storageKey);
    if (data) {
      let requests: WorkAssignment[] = JSON.parse(data);
      return requests;
    } else {
      return this.requests;
    }
  }

  getTransportRules(): Observable<TransportRule[]> {
    if (this.transportRules) {
      // TODO: cache timeout
      return Observable.of(this.transportRules); 
    } else {
      return this.transportRules$.asObservable();
    }
  }

  save(request: WorkAssignment) {
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
  }

  clear() {}

  findSelectedRequestIndex(request: WorkAssignment): number {
    return this.requests.findIndex(a => a.id === request.id);
  }

  compactRequests() {
    //let requests = this.requests.sort(WorkAssignment.sort);
    //let newRequests = new Array<WorkAssignment>();
    //let i = 0;
    let rule = this.getTransportRule();
    for (var i in this.requests) {
      let newid = Number(i);
      this.requests[newid].id = newid + 1;
      this.requests[newid].transportCost = this.calculateTransportCost(newid + 1, rule);
    }
    sessionStorage.setItem(WorkAssignmentsService.storageKey, JSON.stringify(this.requests));
    
  }

  getTransportRule(): TransportRule {
    const order = this.orderService.get();
    if (order === null || order === undefined) {
      throw new Error('OrderService returned an undefined order');
    }
    if (order.transportMethodID <= 0) {
      throw new Error('Order missing valid transportMethodID');
    }
    const lookup: Lookup = this.transports.find(f => f.id == order.transportMethodID);
    if (lookup === null || lookup === undefined) {
      throw new Error('LookupService didn\'t return a valid lookup for transportMethodID: '+ order.transportMethodID);
    }

    const rules= this.transportRules.filter(f => f.lookupKey == lookup.key);
    if (rules === null || rules === undefined) {
      throw new Error('No TransportRules match lookup key: '+ lookup.key);
    }

    const result = rules.find(f => f.zipcodes.includes(order.zipcode));
    if (result === null || result == undefined) {
      throw new Error('Zipcode does not match any rule');
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
