import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WorkOrder } from '../shared/models/work-order';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignment } from '../shared/models/work-assignment';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ScheduleRule, TransportRule } from './shared';
import { BehaviorSubject } from "rxjs";
import { Confirm } from "./shared/models/confirm";
import { loadConfirms } from "./shared/rules/load-confirms";

@Injectable()
export class OnlineOrdersService {
  private initialConfirm: Confirm[];
  private initialConfirmSource: BehaviorSubject<Confirm[]>; 
  private workOrderConfirm = false;
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);  
  private workAssignmentsConfirm = false;
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);
  private orderComplete: WorkOrder;
  private orderCompleteSource: BehaviorSubject<WorkOrder>;
  private paypalResponse: any;
  private paypalResponseSource:  BehaviorSubject<any>;

  storageKey = 'machete.online-orders-service';
  initialConfirmKey = this.storageKey + '.initialconfirm';
  workOrderConfirmKey = this.storageKey + '.workorderconfirm';
  workAssignmentConfirmKey = this.storageKey + '.workassignmentsconfirm';
  orderCompleteKey = this.storageKey + '.ordercomplete';
  paypalResponseKey = this.storageKey + '.paypalresponse';
  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
  ) {
    console.log('.ctor');
    // this loads static data from a file. will replace later.
    
    this.loadConfirmState();
  }

  getInitialConfirmedStream(): Observable<Confirm[]> {
    return this.initialConfirmSource.asObservable();
  }

  getWorkOrderConfirmedStream(): Observable<boolean> {
    return this.workOrderConfirmSource.asObservable();
  }

  getOrderCompleteStream(): Observable<WorkOrder> {
    return this.orderCompleteSource.asObservable();
  }
  getWorkAssignmentConfirmedStream(): Observable<boolean> {
    return this.workAssignmentsConfirmSource.asObservable();
  }

  getPaypalResponseStream(): Observable<any> {
    return this.paypalResponseSource.asObservable();
  }

  loadConfirmState() {
    // This pattern is ugly; should be able to simplify, perhaps use BehaviorSubjectSource instead
    // of companion private variable
    let loadedConfirms =  JSON.parse(sessionStorage.getItem(this.initialConfirmKey)) as Confirm[];
    if (loadedConfirms != null && loadedConfirms.length > 0) {
      this.initialConfirm = loadedConfirms;
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadedConfirms);
    } else {
      this.initialConfirm = loadConfirms();
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadConfirms());
    }

    let loadedCompleteOrder = JSON.parse(sessionStorage.getItem(this.orderCompleteKey)) as WorkOrder;
    if (loadedCompleteOrder != null) {
      // if we're loading from storage, make sure this record is current (may be recovering after)
      // paypalexecute started
      this.orderComplete = loadedCompleteOrder;
      this.orderCompleteSource = new BehaviorSubject<WorkOrder>(loadedCompleteOrder);
      this.getOrder(loadedCompleteOrder.id)
        .subscribe(data => {
          this.setOrderComplete(data['data'] as WorkOrder);
        });
    } else {
      this.orderComplete = new WorkOrder();
      this.orderCompleteSource = new BehaviorSubject<WorkOrder>(new WorkOrder());
    }

    let loadedPaypalResponse = JSON.parse(sessionStorage.getItem(this.paypalResponseKey)) as any;
    if (loadedPaypalResponse != null) {
      this.paypalResponse = loadedPaypalResponse;
      this.paypalResponseSource = new BehaviorSubject<any>(loadedPaypalResponse);
    } else {
      this.paypalResponse = new Object();
      this.paypalResponseSource = new BehaviorSubject<any>(new Object());
    }

    this.workOrderConfirm = (sessionStorage.getItem(this.workOrderConfirmKey) == 'true');
    this.workAssignmentsConfirm = (sessionStorage.getItem(this.workAssignmentConfirmKey) == 'true');
    // notify the subscribers
    //this.initialConfirmSource.next(this.initialConfirm);
    this.workOrderConfirmSource.next(this.workOrderConfirm);
    this.workAssignmentsConfirmSource.next(this.workAssignmentsConfirm);
    this.orderCompleteSource.next(this.orderComplete);
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
    sessionStorage.setItem(this.workOrderConfirmKey,
      JSON.stringify(choice));
    this.workOrderConfirmSource.next(choice);
  }

  setWorkAssignmentsConfirm(choice: boolean) {
    console.log('setWorkAssignmentsConfirm:', choice);
    this.workAssignmentsConfirm = choice;
    sessionStorage.setItem(this.workAssignmentConfirmKey,
      JSON.stringify(choice));
    this.workAssignmentsConfirmSource.next(choice);
  }

  setOrderComplete(order: WorkOrder) {
    console.log('setOrderComplete:', order);
    this.orderComplete = order;
    sessionStorage.setItem(this.orderCompleteKey,
      JSON.stringify(order));
    this.orderCompleteSource.next(order);
  }

  setPaypalResponse(response: any) {
    console.log(response);
    this.paypalResponse = response;
    sessionStorage.setItem(this.paypalResponseKey,
      JSON.stringify(response));
    this.paypalResponseSource.next(response);
  }

  createOrder(order: WorkOrder): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<WorkOrder>(url, JSON.stringify(order), {
      headers: postHeaders
      }).map(
      (data) => {
        // enable order completed
        this.setOrderComplete(data['data'] as WorkOrder);
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

  getOrder(id: number): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders/' + id;
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<WorkOrder>(url, {
      headers: postHeaders
    }).map((data) => {
      console.log('getOrder received:', data);
      return data;
    });
  }

  executePaypal(orderID: number, payerID: string, paymentID: string, token: string): Observable<any> {
    let url = environment.dataUrl + '/api/onlineorders/' + orderID + '/paypalexecute';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, 
      JSON.stringify({
        payerID: payerID,
        paymentID: paymentID,
        paymentToken: token
      }), 
      { headers: postHeaders })
      .map(data => {
        this.setPaypalResponse(data);
        return data;
      });
  }
}
