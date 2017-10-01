import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Lookup, LCategory } from './models/lookup';
import { HandleError } from '../shared/handle-error';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
@Injectable()
export class LookupsService {
  uriBase = environment.dataUrl + '/api/lookups';
  
  private lookups = new Array<Lookup>();
  private lookupsSource = new ReplaySubject<Lookup[]>(1);
  lookups$ = this.lookupsSource.asObservable();
  lookupsAge = 0;
  storageKey = 'machete.lookups';
  constructor(private http: HttpClient) {
    console.log('.ctor');
    let data = sessionStorage.getItem(this.storageKey);
    this.lookupsAge = Number(sessionStorage.getItem(this.storageKey + '.age'));

    if (data) {
      console.log('.ctor using sessionStorage');
      let lookups: Lookup[] = JSON.parse(data);
      this.lookups = lookups;
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

  getAllLookups(): Observable<Lookup[]> {
    if (this.lookups != null && this.lookups.length > 0 && this.isNotStale()) {
      return Observable.of(this.lookups);
    }
    // TODO: set timer for refresh
    console.log('getLookups: ', this.uriBase);
    this.http.get(this.uriBase)
      .subscribe(res => {
        this.lookups = res['data'] as Lookup[];
        this.lookupsAge = Date.now();
        this.lookupsSource.next(this.lookups);
        sessionStorage.setItem(this.storageKey, 
          JSON.stringify(this.lookups));
        sessionStorage.setItem(this.storageKey + '.age', 
          JSON.stringify(this.lookupsAge));
        return res['data'] as Lookup[];
      });
  }

  getLookups(category: LCategory): Observable<Lookup[]> {
    return this.lookups$
      .map(res => res.filter(l => l.category == category))
      .catch(HandleError.error);
  }

  getLookup(id: number): Observable<Lookup> {
    return this.lookups$
      .mergeMap(a => a.filter(ll => ll.id == id))
      .first()
      .catch(HandleError.error);
  }
}
