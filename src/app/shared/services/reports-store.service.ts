import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, filter, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/reports/models/report';
import { MessagesService } from '../components/messages/messages.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/partition';
import 'rxjs/add/observable/merge';

@Injectable({
  providedIn: "root",
})
/**
 * A singleton RXJS Data store.
 * Returns the same list of records regardless of
 * how many times the observable us consumned until the data is mutaded
 *
 * @class ReportsStoreService
 */
export class ReportsStoreService {
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  public reports$: Observable<Report[]> = this.reportsSubject as Observable<Report[]>;

  constructor(
    private http: HttpClient,
    private appMessages: MessagesService,
    private router: Router
    ) {
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

        this.appMessages.showSuccess({label: "Success", message: "Record Saved"});
        this.router.navigate([`reports/view/${updatedDbRecord.name}`])
      })
    );
  }

  public getReport(id: string) {
    return this.reports$.pipe(
      filter(reports => reports.length != 0), // wait for reports to emit
      concatMap(reports => {
        const r = reports.find(r => r.name == id);
        r.columns = r.columns.filter(a => a.visible);
        return of(r);
      }),
    )
  }
}
