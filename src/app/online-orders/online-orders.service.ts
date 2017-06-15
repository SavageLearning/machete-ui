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
    const index = this.findSelectedRequestIndex(request);
    this.requests[index] = request;
  }

  getNextRequestId() {
    const sorted: WorkerRequest[] =  this.requests.sort(this.sortRequests);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
  }

  private sortRequests(a: WorkerRequest, b: WorkerRequest) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
  deleteRequest(request: WorkerRequest) {
    const index: number = this.requests.indexOf(request);
    if (index > -1) {
      this.requests.splice(index, 1);
    }
  }

  clearRequests() {}

  findSelectedRequestIndex(request: WorkerRequest): number {
    return this.requests.findIndex(a => a.id === request.id);
  }
}
