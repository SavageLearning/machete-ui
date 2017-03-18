import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JobsDispatchedCount } from './models/jobs-dispatched-count';
import { SearchOptions } from './models/search-options';
import {Observable} from "rxjs";

@Injectable()
export class ReportsService {

  constructor(private http: Http) {}

  getJobsDispatchedCount(o: SearchOptions): Observable<JobsDispatchedCount[]> {

    //return this.http.get('../../assets/jobs-dispatched-count.json')
    return this.http.get('/api/reports')
              .map(res => res.json().data as JobsDispatchedCount[])
              .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
}

