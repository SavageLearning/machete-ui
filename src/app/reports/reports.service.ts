import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Report } from './models/report';
import { SearchOptions } from './models/search-options';
import {Observable} from 'rxjs/Observable';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ReportsService {
    reportList: Report[] = new Array<Report>();
    reportList$: BehaviorSubject<Report[]>;
  constructor(private http: Http) {
    this.initializeDataService();
  }

  initializeDataService() {
    if (!this.reportList$) {
      this.reportList$ = <BehaviorSubject<Report[]>> new BehaviorSubject(new Array<Report>());
      this.getReportList();
    }
  }

  subscribeToDataService(): Observable<Report[]> {
    return this.reportList$.asObservable();
  }
  //
  getReportData(reportName: string, o: SearchOptions): Observable<SimpleAggregateRow[]> {
    // TODO throw exception if report is not populated
    const params = this.encodeData(o);
    let uri = '/api/reports';
    if (reportName) {
      uri = uri + '/' + reportName;
    }
    if (reportName && params) {
      uri = uri + '?' + params;
    }
    console.log('reportsService.getReportData: ' + uri);
    return this.http.get(uri)
              .map(res => res.json().data as SimpleAggregateRow[])
              .catch(this.handleError);
  }

  getReportList() {
    let uri = '/api/reports';
    console.log('reportsService.getReportList: ' + uri);
    this.http.get(uri)
      .map(res => res.json().data as Report[])
      .catch(this.handleError)
      .subscribe(
        data => {
          this.reportList = data;
          this.reportList$.next(data);
        },
        error => console.log('Error subscribing to DataService: ' + error)
      );
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

