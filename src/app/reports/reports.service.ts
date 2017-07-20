import { Injectable } from '@angular/core';
import {Http, Headers, Request, RequestMethod, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Report } from './models/report';
import { SearchOptions } from './models/search-options';
import {Observable} from 'rxjs/Observable';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Log } from 'oidc-client';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportsService {
  constructor(private http: HttpClient) {}
  getReportData(reportName: string, o: SearchOptions): Observable<any[]> {
    // TODO throw exception if report is not populated
    const params = this.encodeData(o);
    let uri = environment.dataUrl + '/api/reports';
    if (reportName) {
      uri = uri + '/' + reportName;
    }
    if (reportName && params) {
      uri = uri + '?' + params;
    }
    Log.info('reportsService.getReportData: ' + uri);
    return this.http.get(uri)
              .map(res => res['data'] as any)
              .catch(this.handleError);
  }

  getReportList(): Observable<Report[]> {
    let uri = environment.dataUrl + '/api/reports';
    Log.info('reportsService.getReportList: ' + uri);
    return this.http.get(uri)
      .map(o => o['data'] as Report[])
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

