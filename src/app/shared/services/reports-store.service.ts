import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, filter, first, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/reports/models/report';
import { MessagesService } from '../components/messages/messages.service';
import { Router } from '@angular/router';

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

export class ReportsStoreService {
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  public reports$: Observable<Report[]> = this.reportsSubject as Observable<Report[]>;

  constructor(
    private http: HttpClient,
    private appMessages: MessagesService,
    private router: Router,
    @Optional() @SkipSelf() parentModule?: ReportsStoreService
    ) {
      // enforce app singleton pattern
      if (parentModule) {
        throw new Error(
          'Machete dev error:ReportsStoreService is already loaded. Additional imports not needed');
      }
    this.getReportList();
  }

  private getReportList() {
    let uri = environment.dataUrl + "/api/reports";
    console.log("getReportList: ", uri);
    return this.http
      .get(uri, { withCredentials: true }).pipe(
        map((o) => o["data"] as Report[]),
        catchError((error) => {
          // only expecting one type of error
          this.appMessages.showErrors({
            Error: `${error["statusText"]}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        tap((report) => console.log("reportList fetched")),
        shareReplay(1)
      )
      .subscribe((reportList) => this.reportsSubject.next(reportList));
  }

  public update(report: Report): Observable<Report>  {
    const uri = environment.dataUrl + '/api/reports';
    return this.http.put(`${uri}/${report.name}`, report, { withCredentials: true }).pipe(
      map(o => o['data'] as Report),
      catchError(err => {
        this.appMessages.showErrors(err);
        console.log(err);
        return throwError(err);
      }),
      tap((updatedDbRecord: Report) => {
        const storeAsValues = this.reportsSubject.getValue();
        const storeReportIndex = storeAsValues.findIndex(x => x.id == report.id);
        storeAsValues.splice(storeReportIndex, 1, updatedDbRecord); // return the record from API
        storeAsValues.sort((a, b) => a.id - b.id);
        this.reportsSubject.next(storeAsValues);

        this.onModifySuccess('Success', 'Record Saved!', `reports/view/${updatedDbRecord.name}`)
      })
    );
  }

  public create(report: Report): Observable<Report> {
    const uri = environment.dataUrl + '/api/reports';
    return this.http.post(`${uri}`, report, { withCredentials: true }).pipe(
      map(o => o['data'] as Report),
      catchError(err => {
        this.appMessages.showErrors(err);
        console.log(err);
        return throwError(err);
      }),
      tap((createdDbRecord: Report) => {
        const storeAsValues = this.reportsSubject.getValue();
        storeAsValues.push(createdDbRecord);
        storeAsValues.sort((a, b) => a.id - b.id);
        this.reportsSubject.next(storeAsValues);

        this.onModifySuccess('Success', 'Record Created!', `reports/view/${createdDbRecord.name}`);
      })
    );
  }

  public delete(name: string, navigateOnSuccess: string): Observable<any> {
    const uri = environment.dataUrl + '/api/reports';
    return this.http.delete(`${uri}/${name}`, { withCredentials: true }).pipe(
      catchError(err => {
        this.appMessages.showErrors({errors: err});
        console.log(err);
        return throwError(err);
      }),
      tap(data => {
        const storeAsValues = this.reportsSubject.getValue();
        const storeReportIndex = storeAsValues.findIndex(x => x.name == name);
        storeAsValues.splice(storeReportIndex, 1);
        this.reportsSubject.next(storeAsValues);
        this.onModifySuccess('Success', 'Record Deleted!', navigateOnSuccess);
      })
    );
  }

  private onModifySuccess(label: string, message: string, navigateTo: string): void {
    this.appMessages.showSuccess({label: label, message: message});
    this.router.navigate([navigateTo])
  }

  public getReport(id: string) {
    return this.reports$.pipe(
      filter(reports => reports.length != 0), // wait for reports to emit
      first(),
      concatMap(reports => {
        const r = reports.find(r => r.name == id);
        r.columns = r.columns.filter(a => a.visible);
        return of(r);
      }),
    )
  }
}
