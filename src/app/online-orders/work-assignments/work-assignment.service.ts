import { Injectable } from '@angular/core';
import {WorkerRequest} from './models/worker-request';
import {Observable} from 'rxjs/Observable';
import { Log } from "oidc-client";

@Injectable()
export class WorkAssignmentService {
  requests: WorkerRequest[] = new Array<WorkerRequest>();

  constructor() {
    Log.info('online-orders.work-assignment.service: ' + JSON.stringify(this.getAll()));
  }
  
  getAll(): WorkerRequest[] {
    return this.requests;
  }

  create(request: WorkerRequest) {
    this.requests.push(request);
  }

  save(request: WorkerRequest) {
    const index = this.findSelectedRequestIndex(request);
    this.requests[index] = request;
  }

  getNextRequestId() {
    const sorted: WorkerRequest[] =  this.requests.sort(this.sort);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
  }

  private sort(a: WorkerRequest, b: WorkerRequest) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
  delete(request: WorkerRequest) {
    const index: number = this.requests.indexOf(request);
    if (index > -1) {
      this.requests.splice(index, 1);
    }
  }

  clear() {}

  findSelectedRequestIndex(request: WorkerRequest): number {
    return this.requests.findIndex(a => a.id === request.id);
  }

}
