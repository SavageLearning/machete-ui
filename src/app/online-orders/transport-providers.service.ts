import { Observable, throwError } from "rxjs";

import { catchError, map, pluck, shareReplay, tap } from "rxjs/operators";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { TransportProvider } from "./shared/";
import { of } from "rxjs";
import { MessagesService } from "../shared/components/messages/messages.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TransportProvidersService as TransportProvidersClient } from "machete-client";
@Injectable({
  providedIn: "root",
})
export class TransportProvidersService {
  providers = new Array<TransportProvider>();
  providersAge = 0;
  constructor(
    private client: TransportProvidersClient,
    private appMessages: MessagesService,
    @Optional() @SkipSelf() parentModule?: TransportProvidersService
  ) {
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        `Machete dev error:${TransportProvidersService.name} is already loaded. Additional imports not needed`
      );
    }
    console.log(".ctor");
  }

  isStale(): boolean {
    if (this.providersAge > Date.now() - 300 * 1000) {
      return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportProviders(): Observable<TransportProvider[]> {
    const cache = sessionStorage.getItem("tranportProviders");
    if (this.isNotStale() && cache) {
      console.log("returning cache", this.providersAge);
      return of(JSON.parse(cache) as TransportProvider[]);
    }

    return this.client.apiTransportProvidersGet().pipe(
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
      pluck("data"),
      map((data) => data as TransportProvider[]),
      tap((data: TransportProvider[]) => {
        sessionStorage.setItem("tranportProviders", JSON.stringify(data));
        this.providersAge = Date.now();
      })
    );
  }
}
