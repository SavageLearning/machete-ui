import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { WorkOrder } from './work-order/models/work-order';
import { WorkAssignment } from './work-assignments/models/work-assignment';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Log } from 'oidc-client';
import { ScheduleRule, TransportRule, loadScheduleRules, loadTransportRules } from './shared';

@Injectable()
export class OnlineOrdersService {
  order: WorkOrder;
  scheduleRules = new Array<ScheduleRule>();
  transportRules = new Array<TransportRule>();

  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
    private assignmentService: WorkAssignmentsService
  ) {
    // this loads static data from a file. will replace later.
    this.scheduleRules = loadScheduleRules();
    this.transportRules = loadTransportRules();
  }

  validate() {}

  postToApi() {
    let url = environment.dataUrl + '/api/onlineorders';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.order = this.orderService.get();
    this.order.workAssignments = this.assignmentService.getAll();
    this.http.post(url, JSON.stringify(this.order), {
      headers: postHeaders
      }).subscribe(
      (data) => {},
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          Log.error('online-orders.service.POST: ' + err.message);
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
