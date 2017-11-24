import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WorkOrder } from './work-order/models/work-order';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignment } from './work-assignments/models/work-assignment';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ScheduleRule, TransportRule, loadTransportRules } from './shared';
import { BehaviorSubject } from "rxjs";
import { Confirm } from "./shared/models/confirm";
import { loadConfirms } from "./shared/rules/load-confirms";

@Injectable()
export class OnlineOrdersService {
  transportRules = new Array<TransportRule>();

  private initialConfirm: Confirm[];
  private initialConfirmSource: BehaviorSubject<Confirm[]>; 
  private workOrderConfirm = false;
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);  
  private workAssignmentsConfirm = false;
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);

  storageKey = 'machete.online-orders-service';
  initialConfirmKey = this.storageKey + '.initialconfirm';
  workOrderConfirmKey = this.storageKey + '.workorderconfirm';
  workAssignmentConfirmKey = this.storageKey + '.workassignmentsconfirm';
  submitResult: WorkOrder;
  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
  ) {
    console.log('.ctor');
    // this loads static data from a file. will replace later.
    
    this.loadConfirmState();
    this.transportRules = loadTransportRules();
  }

  getInitialConfirmedStream(): Observable<Confirm[]> {
    return this.initialConfirmSource.asObservable();
  }

  getWorkOrderConfirmedStream(): Observable<boolean> {
    return this.workOrderConfirmSource.asObservable();
  }

  getWorkAssignmentConfirmedStream(): Observable<boolean> {
    return this.workAssignmentsConfirmSource.asObservable();
  }

  loadConfirmState() {
    let loaded =  JSON.parse(sessionStorage.getItem(this.initialConfirmKey)) as Confirm[];
    if (loaded != null && loaded.length > 0) {
      this.initialConfirm = loaded;
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loaded);
    } else {
      this.initialConfirm = loadConfirms();
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadConfirms());

    }
    this.workOrderConfirm = (sessionStorage.getItem(this.workOrderConfirmKey) == 'true');
    this.workAssignmentsConfirm = (sessionStorage.getItem(this.workAssignmentConfirmKey) == 'true');

    // notify the subscribers
    //this.initialConfirmSource.next(this.initialConfirm);
    this.workOrderConfirmSource.next(this.workOrderConfirm);
    this.workAssignmentsConfirmSource.next(this.workAssignmentsConfirm);
  }

  getInitialConfirmValue(): Confirm[] {
    return this.initialConfirm;
  }
  setInitialConfirm(choice: Confirm[]) {
    console.log('setInitialConfirm:', choice);
    this.initialConfirm = choice;
    sessionStorage.setItem(this.initialConfirmKey, JSON.stringify(choice));
    this.initialConfirmSource.next(choice);
  }

  setWorkorderConfirm(choice: boolean) {
    console.log('setWorkOrderConfirm:', choice);
    this.workOrderConfirm = choice;
    sessionStorage.setItem(this.storageKey + '.workorderconfirm',
      JSON.stringify(choice));
    this.workOrderConfirmSource.next(choice);
  }

  setWorkAssignmentsConfirm(choice: boolean) {
    console.log('setWorkAssignmentsConfirm:', choice);
    this.workAssignmentsConfirm = choice;
    sessionStorage.setItem(this.storageKey+'.workassignmentsconfirm',
      JSON.stringify(choice));
    this.workAssignmentsConfirmSource.next(choice);
  }

  createOrder(order: WorkOrder): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<WorkOrder>(url, JSON.stringify(order), {
      headers: postHeaders
      }).map(
      (data) => {
        this.submitResult = data as WorkOrder;
        // Make decisions from the record returned from the API,
        // not what's in the UI app
        return data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.error('Client-side error occured.');
        } else {
          console.error('online-orders.service.POST: ' + err.message);
        }
      }
    );
  }

  getTransportRules(): Observable<TransportRule[]> {
    return Observable.of(this.transportRules);
  }
}
