import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { OnlineOrdersService } from "machete-client";
import { WorkOrder } from "src/app/shared/models/work-order";

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

  constructor(private client: OnlineOrdersService) {}

  getOrders(): Observable<WorkOrder[]> {
    return this.client.apiOnlineordersGet().pipe(
      map(
        (o) => {
          return o["data"] as WorkOrder[];
        },
        (err: HttpErrorResponse) => {
          console.error("online-orders.getOrder returned", err);
        }
      )
    );
  }

  getOrder(id: number): Observable<WorkOrder> {
    return this.client.apiOnlineordersOrderIDGet(id).pipe(
      map(
        (data) => {
          const wo = data["data"] as WorkOrder;
          console.log("getOrder received:", wo);
          return wo;
        },
        (err: HttpErrorResponse) => {
          console.error("online-orders.getOrder ID returned", id, err);
        }
      )
    );
  }

  executePaypal(
    orderID: number,
    payerID: string,
    paymentID: string,
    token: string
  ): Observable<any> {
    const jsonModel = {
      payerID,
      paymentID,
      paymentToken: token,
    };

    return this.client
      .apiOnlineordersOrderIDPaypalexecutePost(orderID, jsonModel)
      .pipe(map((data) => data));
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
