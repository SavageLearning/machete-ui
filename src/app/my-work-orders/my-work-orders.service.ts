
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WorkOrder } from '../shared/models/work-order';

@Injectable()
export class MyWorkOrdersService {
  apiDate: Date;
  date: number;
  fullYear: number;
  month: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  utcFomattedDate: Date;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<WorkOrder[]> {
    const uri = environment.dataUrl + '/api/onlineorders';

    return this.http.get(uri, { withCredentials: true }).pipe(
      map(o => {
        const wo = o['data'] as WorkOrder[];
        wo.map(x => {
          x.dateTimeofWork = this.toUTC(x.dateTimeofWork);
        });
        return wo;
      }
      ));
  }

  getOrder(id: number): Observable<WorkOrder> {
    const url = `${environment.dataUrl}/api/onlineorders/${id}`;
    const postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<WorkOrder>(url, { headers: postHeaders, withCredentials: true }).pipe(map(
      (data) => {
        const wo = data['data'] as WorkOrder;
        console.log('getOrder received:', wo);
        wo.dateTimeofWork = this.toUTC(wo.dateTimeofWork);
        return wo;
      }, (err: HttpErrorResponse) => {
        // TODO error
        console.error('online-orders.getOrder returned', err);
      }
    ));
  }

  executePaypal(orderID: number, payerID: string, paymentID: string, token: string): Observable<any> {

    const url = `${environment.dataUrl}/api/onlineorders/${orderID}/paypalexecute`;
    const postHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const jsonModel = JSON.stringify({
      payerID,
      paymentID,
      paymentToken: token
    });

    return this.http.post<any>(url, jsonModel, { headers: postHeaders, withCredentials: true }).pipe(
      map(data => data)
    );
  }

  //datetime returned by API has no Zone information, so it has to forced into a UTC zoned date
  toUTC(woDateTimeOfWork: Date): Date {
    this.apiDate = new Date(woDateTimeOfWork);
    this.date = this.apiDate.getDate();
    this.fullYear = this.apiDate.getFullYear();
    this.month = this.apiDate.getMonth();
    this.hours = this.apiDate.getHours();
    this.minutes = this.apiDate.getMinutes();
    this.seconds = this.apiDate.getSeconds();
    this.milliseconds = this.apiDate.getMilliseconds();

    this.apiDate.setUTCFullYear(this.fullYear);
    this.apiDate.setUTCMonth(this.month);
    this.apiDate.setUTCDate(this.date);
    this.apiDate.setUTCHours(this.hours);
    this.apiDate.setUTCMinutes(this.minutes);
    this.apiDate.setUTCMilliseconds(this.milliseconds);

    // console.log(`UTC WO Date Time with TZ ${this.apiDate}`)
    return this.apiDate;
  }
}
