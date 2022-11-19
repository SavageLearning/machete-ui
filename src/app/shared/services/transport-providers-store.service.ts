import { Injectable, Optional, SkipSelf } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { TransportProvider } from "src/app/online-orders/shared";
import { MessagesService } from "../components/messages/messages.service";
import { TransportProvidersService as TransportProvidersClient } from "machete-client";
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
    private client: TransportProvidersClient,
    private appMessages: MessagesService,
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
    return this.client
      .apiTransportProvidersGet()
      .pipe(
        map((o) => o["data"] as TransportProvider[]),
        catchError((error) => {
          // only expecting one type of error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorAsText: string = error["statusText"] as string;
          this.appMessages.showErrors({
            Error: `${errorAsText}: Contact Machete support.`,
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
