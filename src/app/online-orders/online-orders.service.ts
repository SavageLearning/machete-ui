import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WorkOrder } from './work-order/models/work-order';
import { HttpClient } from '@angular/common/http';
import { WorkOrderService } from './work-order/work-order.service';
import { WorkAssignmentService } from './work-assignments/work-assignment.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Log } from 'oidc-client';

@Injectable()
export class OnlineOrdersService {
  order: WorkOrder;

  private activeStepSource = new Subject<number>();
  activeStep$ = this.activeStepSource.asObservable();

  private initialConfirm = false;
  private initialConfirmSource = new Subject<boolean>();
  initialConfirmed$ = this.initialConfirmSource.asObservable();

  private finalConfirm = false;

  constructor(
    private http: HttpClient,
    private orderService: WorkOrderService,
    private assignmentService: WorkAssignmentService
  ) {  
    Log.info('online-orders.service.ctor: called');
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
}
