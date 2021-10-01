import { HttpClient } from "@angular/common/http";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { TransportProvider } from "src/app/online-orders/shared";
import { environment } from "src/environments/environment";
import { MessagesService } from "../components/messages/messages.service";

/**
 * A singleton RXJS BehaviorSubject Machete Data store.
 * Returns the same list of records regardless of
 * how many times the observable is consumned until the data is mutaded
 *
 * @class TransportProvidersStoreService
 */
@Injectable({
  providedIn: "root",
})
export class TransportProvidersStoreService {
  private transportProvidersSubject = new BehaviorSubject<TransportProvider[]>(
    []
  );
  public transportProviders$: Observable<TransportProvider[]> = this
    .transportProvidersSubject as Observable<TransportProvider[]>;

  constructor(
    private http: HttpClient,
    private appMessages: MessagesService,
    private router: Router,
    @Optional() @SkipSelf() parentModule?: TransportProvidersStoreService
  ) {
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        "Machete dev error:TransportProvidersStoreService is already loaded. Additional imports not needed"
      );
    }
    this.getRecords();
  }

  private getRecords() {
    const uriBase = environment.dataUrl + "/api/transportproviders";
    console.log("getReportList: ", uriBase);
    return this.http
      .get(uriBase, { withCredentials: true })
      .pipe(
        map((o) => o["data"] as TransportProvider[]),
        catchError((error) => {
          // only expecting one type of error
          this.appMessages.showErrors({
            Error: `${error["statusText"]}: Contact Machete support.`,
          });
          console.log(error);
          return throwError(error);
        }),
        tap((transportProviders) =>
          console.log("recordsList fetched", transportProviders)
        ),
        shareReplay(1)
      )
      .subscribe((tProviders) =>
        this.transportProvidersSubject.next(tProviders)
      );
  }
}
