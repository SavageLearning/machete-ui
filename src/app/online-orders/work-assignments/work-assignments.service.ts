import { Injectable } from '@angular/core';
import {WorkAssignment} from './models/work-assignment';
import {Observable} from 'rxjs/Observable';
import { Log } from 'oidc-client';

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();
  storageKey = 'machete.workassignments';

  constructor() {
    Log.info('work-assignment.service: ' + JSON.stringify(this.getAll()));
  }

  getAll(): WorkAssignment[] {
    Log.info('work-assignments.service.getAll: called');
    let data = sessionStorage.getItem(this.storageKey);
    if (data) {
      let requests: WorkAssignment[] = JSON.parse(data);
      return requests;
    } else {
      return this.requests;
    }
  }

  create(request: WorkAssignment) {
    this.requests.push(request);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.requests));
  }

  save(request: WorkAssignment) {
    const index = this.findSelectedRequestIndex(request);
    this.requests[index] = request;
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.requests));
  }

  getNextRequestId() {
    const sorted: WorkAssignment[] =  this.requests.sort(WorkAssignment.sort);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
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
