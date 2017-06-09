import { Injectable } from '@angular/core';
import {WorkerRequest} from './work-assignments/models/worker-request';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OnlineOrdersService {
  requests: WorkerRequest[] = new Array<WorkerRequest>();
  constructor() {
    console.log('online-orders.service: ' + JSON.stringify(this.getRequests()));
  }

  getRequests(): WorkerRequest[] {
    return this.requests;
  }

  createRequest(request: WorkerRequest) {
    this.requests.push(request);
  }
  saveRequest(request: WorkerRequest) {
    this.requests[this.findSelectedRequestIndex(request)] = request;
  }

  deleteRequest() {}

  clearRequest() {}

  findSelectedRequestIndex(request: WorkerRequest): number {
    return this.requests.indexOf(request);
  }
}
