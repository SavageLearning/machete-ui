import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Report } from './models/report';
import { SearchOptions } from './models/search-options';
import {Observable} from 'rxjs/Observable';
import {SimpleAggregateRow} from './models/simple-aggregate-row';

@Injectable()
export class ReportsService {

  constructor(private http: Http) {}

  getReport(report: string, o: SearchOptions): Observable<SimpleAggregateRow[]> {
    // TODO throw exception if begin & end date are not populated
    let params = this.encodeData(o);
    let uri = '/api/reports';
    if (report) {
      uri = uri + '/' + report;
    }
    if (report && params) {
      uri = uri + '?' + params;
    }
    return this.http.get(uri)
              .map(res => res.json().data as SimpleAggregateRow[])
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

