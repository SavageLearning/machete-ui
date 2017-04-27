import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JobsDispatchedCount } from './models/jobs-dispatched-count';
import { SearchOptions } from './models/search-options';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReportsService {

  constructor(private http: Http) {}

  getJobsDispatchedCount(o: SearchOptions): Observable<JobsDispatchedCount[]> {
    o.reportName = 'JobsDispatched';
    return this.http.get(`/api/reports?${this.encodeData(o)}`)
              .map(res => res.json().data as JobsDispatchedCount[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }

  public encodeData(data: any): string {
    return Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}

