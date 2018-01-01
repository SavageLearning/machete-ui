import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { WorkOrder } from '../shared/models/work-order';
import { HandleError } from '../shared/handle-error';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class WorkOrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<WorkOrder[]> {
    let uri = environment.dataUrl + '/api/onlineorders';

    return this.http.get(uri)
      .map(o => o['data'] as WorkOrder[])
      .catch(HandleError.error);
  }

  getOrder(id: number): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders/' + id;
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<WorkOrder>(url, {
      headers: postHeaders
    }).map(
      (data) => {
        console.log('getOrder received:', data);
        return data['data'] as WorkOrder;
      }, (err: HttpErrorResponse) => {
        // TODO error
        console.error('online-orders.getOrder returned', err);
      }
    );
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
      { headers: postHeaders })
      .map(data => {
        return data;
      });
  }
}
