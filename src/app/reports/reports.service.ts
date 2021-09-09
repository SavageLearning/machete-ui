
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Report } from './models/report';
import { SearchOptions } from './models/search-options';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../shared/components/messages/messages.service';
import { Router } from '@angular/router';
import { SimpleAggregateRow } from './models/simple-aggregate-row';

@Injectable()
export class ReportsService {
  constructor(
    private http: HttpClient,
    private appMessages: MessagesService,
    private router: Router) {}
  getReportData(reportName: string, o: SearchOptions): Observable<any[]> {
    const params = this.encodeData(o);
    let uri = environment.dataUrl + '/api/reports';
    if (reportName) {
      uri = uri + '/' + reportName;
    }
    if (reportName && params) {
      uri = uri + '?' + params;
    }
    console.log('getReportData: ' + uri);
    return this.http.get(uri, { withCredentials: true }).pipe(
      catchError(error => {
        this.appMessages.showErrors("Unable to retreive results.")
        return throwError(error);
      }),
      map(res => res['data'] as SimpleAggregateRow[]));
  }

  public encodeData(data: any): string {
    return Object.keys(data).map((key) => [key, data[key]].map(encodeURIComponent).join('=')).join('&');
  }

}

