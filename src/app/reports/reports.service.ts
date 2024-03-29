/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  catchError,
  concatMap,
  filter,
  map,
  shareReplay,
  tap,
} from "rxjs/operators";
import { Injectable } from "@angular/core";

import { SearchOptions } from "./models/search-options";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { MessagesService } from "../shared/components/messages/messages.service";
import { Router } from "@angular/router";
import { SimpleAggregateRow } from "./models/simple-aggregate-row";
import { ReportsService as ReportsClient } from "machete-client";
import { Report } from "./models/report";
/**
 * A singleton RXJS BehaviorSubject Machete Data store.
 * Returns the same list of records regardless of
 * how many times the observable is consumned until the data is mutaded
 *
 * @class ReportsStoreService
 */
@Injectable({
  providedIn: "root",
})
export class ReportsService {
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  public reports$: Observable<Report[]> = this.reportsSubject as Observable<
    Report[]
  >;
  constructor(
    private client: ReportsClient,
    private appMessages: MessagesService,
    private router: Router
  ) {
    this.getReportList();
  }
  getReportData(reportName: string, o: SearchOptions): Observable<any[]> {
    return this.client
      .apiReportsIdGet(reportName, o.beginDate, o.endDate, o.memberNumber)
      .pipe(
        catchError((error) => {
          this.appMessages.showErrors("Unable to retreive results.");
          return throwError(error);
        }),
        map((res) => res["data"] as SimpleAggregateRow[])
      );
  }

  private getReportList() {
    return this.client
      .apiReportsGet()
      .pipe(
        map((o) => o["data"] as Report[]),
        catchError((error) => {
          // only expecting one type of error
          this.appMessages.showErrors({
            Error: `${error["statusText"]}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        tap((report) => console.log("reportList fetched", report)),
        shareReplay(1)
      )
      .subscribe((reportList) => this.reportsSubject.next(reportList));
  }

  public update(report: Report): Observable<Report> {
    return this.client.apiReportsIdPut(report.name, report).pipe(
      map((o) => o["data"] as Report),
      catchError((err) => {
        this.appMessages.showErrors(err);
        console.log(err);
        return throwError(err);
      }),
      tap((updatedDbRecord: Report) => {
        const storeAsValues = this.reportsSubject.getValue();
        const storeReportIndex = storeAsValues.findIndex(
          (x) => x.id == report.id
        );
        storeAsValues.splice(storeReportIndex, 1, updatedDbRecord); // return the record from API
        storeAsValues.sort((a, b) => a.id - b.id);
        this.reportsSubject.next(storeAsValues);

        this.onModifySuccess(
          "Success",
          "Record Saved!",
          `reports/view/${updatedDbRecord.name}`
        );
      })
    );
  }

  public create(report: Report): Observable<Report> {
    return this.client.apiReportsPost(report).pipe(
      map((o) => o["data"] as Report),
      catchError((err) => {
        this.appMessages.showErrors(err);
        console.log(err);
        return throwError(err);
      }),
      tap((createdDbRecord: Report) => {
        const storeAsValues = this.reportsSubject.getValue();
        storeAsValues.push(createdDbRecord);
        storeAsValues.sort((a, b) => a.id - b.id);
        this.reportsSubject.next(storeAsValues);

        this.onModifySuccess(
          "Success",
          "Record Created!",
          `reports/view/${createdDbRecord.name}`
        );
      })
    );
  }

  public delete(name: string, navigateOnSuccess: string): Observable<any> {
    return this.client.apiReportsIdDelete(name).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.appMessages.showErrors({ errors: err });
        console.log(err);
        return throwError(err);
      }),
      tap(() => {
        const storeAsValues = this.reportsSubject.getValue();
        const storeReportIndex = storeAsValues.findIndex((x) => x.name == name);
        storeAsValues.splice(storeReportIndex, 1);
        this.reportsSubject.next(storeAsValues);
        this.onModifySuccess("Success", "Record Deleted!", navigateOnSuccess);
      })
    );
  }

  private onModifySuccess(
    label: string,
    message: string,
    navigateTo: string
  ): void {
    this.appMessages.showSuccess({ label: label, message: message });
    this.router.navigate([navigateTo]).catch((e) => console.error(e));
  }

  public getReport(id: string): Observable<Report> {
    return this.reports$.pipe(
      filter((reports) => reports.length != 0), // wait for reports to emit
      concatMap((reports) => {
        const r = reports.find((r) => r.name == id);
        r.columns = r.columns.filter((a) => a.visible);
        return of(r);
      })
    );
  }
}
