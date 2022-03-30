import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { TransportProvider } from "./shared/";
import { of } from "rxjs";
import { TransportProvidersService as TransportProvidersClient } from "machete-client";
@Injectable({
  providedIn: "root",
})
export class TransportProvidersService {
  providers = new Array<TransportProvider>();
  providersAge = 0;
  constructor(private client: TransportProvidersClient) {
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
    if (this.isNotStale()) {
      console.log("returning cache", this.providersAge);
      return of(this.providers);
    }

    return this.client.apiTransportProvidersGet().pipe(
      map((res) => {
        this.providers = res["data"] as TransportProvider[];
        this.providersAge = Date.now();
        return res["data"] as TransportProvider[];
      })
    );
  }
}
