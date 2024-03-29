import { Observable, BehaviorSubject, of } from "rxjs";

import { first, mergeMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Lookup, LCategory } from "../shared/models/lookup";
import { LookupsService as LookupsClient } from "machete-client";
@Injectable()
export class LookupsService {
  // need BehaviorSubject because we're caching the response and
  // need to be able serve the cache and not call API every time
  lookupsSource = new BehaviorSubject<Lookup[]>(new Array<Lookup>());
  lookups$ = this.lookupsSource.asObservable();
  lookupsAge = 0;
  storageKey = "machete.lookups";
  private lookups = new Array<Lookup>();

  constructor(private client: LookupsClient) {
    console.log(".ctor: LookupsService");
    const data = sessionStorage.getItem(this.storageKey);
    this.lookupsAge = Number(sessionStorage.getItem(this.storageKey + ".age"));

    if (data && this.isNotStale) {
      this.lookups = JSON.parse(data) as Lookup[];
      console.log(".ctor using sessionStorage", this.lookups);
      this.lookupsSource.next(this.lookups);
    } else {
      this.getAllLookups();
    }
  }

  isStale(): boolean {
    if (this.lookupsAge > Date.now() - 1800 * 1000) {
      return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getAllLookups(): void {
    // if (this.lookups != null && this.lookups.length > 0 && this.isNotStale()) {
    //   console.log('cache hit');
    //   return Observable.of(this.lookups);
    // }
    // TODO: set timer for refresh
    this.client.apiLookupsGet().subscribe((res) => {
      this.lookups = res["data"] as Lookup[];
      this.lookupsAge = Date.now();
      this.lookupsSource.next(this.lookups);
      this.storeLookups();

      return of(res["data"] as Lookup[]);
    });
  }

  storeLookups(): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.lookups));
    sessionStorage.setItem(
      this.storageKey + ".age",
      JSON.stringify(this.lookupsAge)
    );
  }

  getLookups(category: LCategory): Observable<Lookup[]> {
    return this.lookups$.pipe(
      map((res) => {
        console.log("getlookups", res);
        return res.filter((l) => l.category === category);
      })
    );
  }

  getLookup(id: number): Observable<Lookup> {
    return this.lookups$.pipe(
      mergeMap((a) => a.filter((ll) => ll.id === id)),
      first()
    ); // TODO is this a mistake or are we passing undefined?
  }
}
