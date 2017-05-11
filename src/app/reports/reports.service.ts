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
    listData: Report[] = new Array<Report>();
    listData$: BehaviorSubject<Report[]>;
  constructor(private http: Http) {
    this.initializeDataService();
  }

  initializeDataService() {
    if (!this.listData$) {
      this.listData$ = <BehaviorSubject<Report[]>> new BehaviorSubject(new Array<Report>());

      this.getList();
    }
  }

  subscribeToDataService(): Observable<Report[]> {
    return this.listData$.asObservable();
  }
  getReport(report: string, o: SearchOptions): Observable<SimpleAggregateRow[]> {
    // TODO throw exception if report is not populated
    const params = this.encodeData(o);
    let uri = '/api/reports';
    if (report) {
      uri = uri + '/' + report;
    }
    if (report && params) {
      uri = uri + '?' + params;
    }
    console.log('reportsService.getReport: ' + uri);
    return this.http.get(uri)
              .map(res => res.json().data as SimpleAggregateRow[])
              .catch(this.handleError);
  }

  getList() {
    let uri = '/api/reports';
    console.log('reportsService.getList: ' + uri);
    this.http.get(uri)
      .map(res => res.json().data as Report[])
      .catch(this.handleError)
      .subscribe(
        data => {
          this.listData = data;
          this.listData$.next(data);
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

