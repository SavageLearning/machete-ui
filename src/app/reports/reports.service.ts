import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JobsDispatchedCount } from './models/jobs-dispatched-count';

@Injectable()
export class ReportsService {

  constructor(private http: Http) {}

  getJobsDispatchedCount(): Promise<JobsDispatchedCount[]> {
      return this.http.get('../../assets/jobs-dispatched-count.json')
              .toPromise()
              .then(res => res.json().data as JobsDispatchedCount[])
              .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
}

