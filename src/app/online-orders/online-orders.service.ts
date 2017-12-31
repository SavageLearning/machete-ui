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
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';

@Injectable()
export class OnlineOrdersService {
  private initialConfirmSource: BehaviorSubject<Confirm[]>; 
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);  
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);
  // private orderCompleteSource: BehaviorSubject<WorkOrder>;
  private paypalResponseSource:  BehaviorSubject<any>;

  storageKey = 'machete.online-orders-service';
  initialConfirmKey = this.storageKey + '.initialconfirm';
  workOrderConfirmKey = this.storageKey + '.workorderconfirm';
  workAssignmentConfirmKey = this.storageKey + '.workassignmentsconfirm';
  //orderCompleteKey = this.storageKey + '.ordercomplete';
  paypalResponseKey = this.storageKey + '.paypalresponse';
  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
    //private assignmentService: WorkAssignmentsService
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

  // getOrderCompleteStream(): Observable<WorkOrder> {
  //   return this.orderCompleteSource.asObservable();
  // }
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
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadedConfirms);
    } else {
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadConfirms());
    }

    // let loadedCompleteOrder = JSON.parse(sessionStorage.getItem(this.orderCompleteKey)) as WorkOrder;
    // if (loadedCompleteOrder != null) {
    //   // if we're loading from storage, make sure this record is current (may be recovering after)
    //   // paypalexecute started
    //   this.orderCompleteSource = new BehaviorSubject<WorkOrder>(loadedCompleteOrder);
    //   this.getOrder(loadedCompleteOrder.id)
    //     .subscribe(data => {
    //       this.setOrderComplete(data['data'] as WorkOrder);
    //     });
    // } else {
    //   this.orderCompleteSource = new BehaviorSubject<WorkOrder>(new WorkOrder());
    // }

    let loadedPaypalResponse = JSON.parse(sessionStorage.getItem(this.paypalResponseKey)) as any;
    if (loadedPaypalResponse != null) {
      this.paypalResponseSource = new BehaviorSubject<any>(loadedPaypalResponse);
    } else {
      this.paypalResponseSource = new BehaviorSubject<any>(new Object());
    }

    // this.workOrderConfirm = (sessionStorage.getItem(this.workOrderConfirmKey) == 'true');
    // this.workAssignmentsConfirm = (sessionStorage.getItem(this.workAssignmentConfirmKey) == 'true');
    // notify the subscribers
    this.workOrderConfirmSource.next(sessionStorage.getItem(this.workOrderConfirmKey) == 'true');
    this.workAssignmentsConfirmSource.next(sessionStorage.getItem(this.workAssignmentConfirmKey) == 'true');
    //this.orderCompleteSource.next(this.orderComplete);
  }

  clearState() {
    console.log('OnlineOrdersService.clearState-----');
    this.setInitialConfirm(loadConfirms());
    this.setWorkorderConfirm(false);
    this.setWorkAssignmentsConfirm(false);
    this.setPaypalResponse(new Object());
    //this.orderService.clearState();
    //this.assignmentService.clearState();
  }

  setInitialConfirm(choice: Confirm[]) {
    //console.log('setInitialConfirm:', choice);
    //this.initialConfirm = choice;
    sessionStorage.setItem(this.initialConfirmKey, JSON.stringify(choice));
    this.initialConfirmSource.next(choice);
  }

  setWorkorderConfirm(choice: boolean) {
    //console.log('setWorkOrderConfirm:', choice);
    //this.workOrderConfirm = choice;
    sessionStorage.setItem(this.workOrderConfirmKey,
      JSON.stringify(choice));
    this.workOrderConfirmSource.next(choice);
  }

  setWorkAssignmentsConfirm(choice: boolean) {
    console.log('setWorkAssignmentsConfirm:', choice);
    //this.workAssignmentsConfirm = choice;
    sessionStorage.setItem(this.workAssignmentConfirmKey,
      JSON.stringify(choice));
    this.workAssignmentsConfirmSource.next(choice);
  }

  // setOrderComplete(order: WorkOrder) {
  //   console.log('setOrderComplete:', order);
  //   this.orderComplete = order;
  //   sessionStorage.setItem(this.orderCompleteKey,
  //     JSON.stringify(order));
  //   this.orderCompleteSource.next(order);
  // }

  setPaypalResponse(response: any) {
    console.log(response);
    //this.paypalResponse = response;
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
        return data['data'] as WorkOrder;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.error('Client-side error occured.', err.error);
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
    }).map(
      (data) => {
        console.log('getOrder received:', data);
        return data['data'] as WorkOrder;
      }, (err: HttpErrorResponse) => {
        // TODO error
        console.error('online-orders.getOrder returned', err);
      }
    );
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
