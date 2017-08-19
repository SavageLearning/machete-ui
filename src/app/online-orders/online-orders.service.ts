import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { WorkOrder } from './work-order/models/work-order';
import { WorkAssignment } from './work-assignments/models/work-assignment';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Log } from 'oidc-client';
import { ScheduleRule } from './shared/models/schedule-rule';

@Injectable()
export class OnlineOrdersService {
  order: WorkOrder;
  scheduleRules = new Array<ScheduleRule>();
  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
    private assignmentService: WorkAssignmentsService
  ) {
    // hardcoded schedule rules -- will come from API eventually
    this.scheduleRules.push({id: 0, leadHours: 48, minStartMin: 420, maxEndMin: 1020} as ScheduleRule); // sunday
    this.scheduleRules.push({id: 1, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
    this.scheduleRules.push({id: 2, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
    this.scheduleRules.push({id: 3, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
    this.scheduleRules.push({id: 4, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
    this.scheduleRules.push({id: 5, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
    this.scheduleRules.push({id: 6, leadHours: 48, minStartMin: 480, maxEndMin: 1020} as ScheduleRule);
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
}
