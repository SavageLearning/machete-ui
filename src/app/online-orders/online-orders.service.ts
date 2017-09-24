import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WorkOrder } from './work-order/models/work-order';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignment } from './work-assignments/models/work-assignment';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ScheduleRule, TransportRule, loadScheduleRules, loadTransportRules } from './shared';

@Injectable()
export class OnlineOrdersService {
  scheduleRules = new Array<ScheduleRule>();
  transportRules = new Array<TransportRule>();

  private activeStepSource = new Subject<number>();
  activeStep$ = this.activeStepSource.asObservable();

  private initialConfirm = false;
  private initialConfirmSource = new Subject<boolean>();
  initialConfirmed$ = this.initialConfirmSource.asObservable();

  private finalConfirm = false;

  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
  ) {  
    // this loads static data from a file. will replace later.
    this.scheduleRules = loadScheduleRules();
    this.transportRules = loadTransportRules();
  }

  hasInitialConfirmation(): boolean {
    return this.initialConfirm;
  }

  hasFinalConfirmation(): boolean {
    return this.finalConfirm;
  }

  setActiveStep(step: number) {
    this.activeStepSource.next(step);
  }

  setInitialConfirm(choice: boolean) {
    this.initialConfirm = choice;
    this.initialConfirmSource.next(choice);
  }

  postToApi(order: WorkOrder) {
    let url = environment.dataUrl + '/api/onlineorders';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, JSON.stringify(order), {
      headers: postHeaders
      }).subscribe(
      (data) => {},
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.error('Client-side error occured.');
        } else {
          console.error('online-orders.service.POST: ' + err.message);
        }
      }
    );
  }

  getScheduleRules(): Observable<ScheduleRule[]> {
    return Observable.of(this.scheduleRules);
  }

  getTransportRules(): Observable<TransportRule[]> {
    return Observable.of(this.transportRules);
  }
}
