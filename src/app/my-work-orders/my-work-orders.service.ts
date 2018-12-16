
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WorkOrder } from '../shared/models/work-order';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class MyWorkOrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<WorkOrder[]> {
    let uri = environment.dataUrl + '/api/onlineorders';

    return this.http.get(uri).pipe(
      map(o => o['data'] as WorkOrder[]));
  }

  getOrder(id: number): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders/' + id;
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<WorkOrder>(url, {
      headers: postHeaders
    }).pipe(map(
      (data) => {
        let wo = data['data'];
        console.log('getOrder received:', wo);
        return wo as WorkOrder;
      }, (err: HttpErrorResponse) => {
        // TODO error
        console.error('online-orders.getOrder returned', err);
      }
    ));
  }

  executePaypal(orderID: number, payerID: string, paymentID: string, token: string): Observable<any> {
    let url = environment.dataUrl + '/api/onlineorders/' + orderID + '/paypalexecute';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, 
      JSON.stringify({
        payerID: payerID,
        paymentID: paymentID,
        paymentToken: token
      }), 
      { headers: postHeaders }).pipe(
      map(data => {
        return data;
      }));
  }
}
