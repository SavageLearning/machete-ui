import { Injectable } from '@angular/core';
import {WorkAssignment} from './models/work-assignment';
import {Observable} from 'rxjs/Observable';
import { Log } from "oidc-client";

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();

  constructor() {
    Log.info('work-assignment.service: ' + JSON.stringify(this.getAll()));
  }
  
  getAll(): WorkAssignment[] {
    return this.requests;
  }

  create(request: WorkAssignment) {
    this.requests.push(request);
  }

  save(request: WorkAssignment) {
    const index = this.findSelectedRequestIndex(request);
    this.requests[index] = request;
  }

  getNextRequestId() {
    const sorted: WorkAssignment[] =  this.requests.sort(this.sort);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
  }

  private sort(a: WorkAssignment, b: WorkAssignment) {
    if (a.id < b.id) { return -1; }
    if (a.id > b.id) { return 1; }
    return 0;
  }
  delete(request: WorkAssignment) {
    const index: number = this.requests.indexOf(request);
    if (index > -1) {
      this.requests.splice(index, 1);
    }
  }

  clear() {}

  findSelectedRequestIndex(request: WorkAssignment): number {
    return this.requests.findIndex(a => a.id === request.id);
  }

}
