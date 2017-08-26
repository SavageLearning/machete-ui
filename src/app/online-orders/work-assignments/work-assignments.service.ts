import { Injectable } from '@angular/core';
import {WorkAssignment} from './models/work-assignment';
import {Observable} from 'rxjs/Observable';
import { Log } from 'oidc-client';
import { OnlineOrdersService } from "../online-orders.service";
import { TransportRule } from "../shared/index";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();
  static storageKey = 'machete.workassignments';
  transportRules: TransportRule[];
  transportRules$: BehaviorSubject<TransportRule[]>;

  constructor(
    private onlineService: OnlineOrdersService
  ) {
    Log.info('work-assignment.service: ctor called');
    this.initializeTransports();
  }

  initializeTransports() {
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
    Log.info('work-assignments.service.getAll: called');
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
    const index = this.findSelectedRequestIndex(request);
    if (index === -1) {
      this.requests.push(request); // create
    } else {
      this.requests[index] = request; // replace
    }
    sessionStorage.setItem(WorkAssignmentsService.storageKey, JSON.stringify(this.requests));
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
    let index = this.requests.findIndex(r => r.id === request.id);
    if (index < 0) {
      throw new Error('Can\'t find request (WorkAssignment) by id; failed to delete request.');
    }
    this.requests.splice(index, 1);
    sessionStorage.setItem(WorkAssignmentsService.storageKey, JSON.stringify(this.requests));
  }

  clear() {}

  findSelectedRequestIndex(request: WorkAssignment): number {
    return this.requests.findIndex(a => a.id === request.id);
  }



}
