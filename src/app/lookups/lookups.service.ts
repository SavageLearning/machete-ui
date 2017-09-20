import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Lookup, LCategory } from './models/lookup';
import { HandleError } from '../shared/handle-error';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LookupsService {
  uriBase = environment.dataUrl + '/api/lookups';
  lookups = new Array<Lookup>();
  lookupsAge = 0;
  constructor(private http: HttpClient) {
    console.log('.ctor');
  }

  isStale(): boolean {
    if (this.lookupsAge > Date.now() - 1800) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getAllLookups(): Observable<Lookup[]> {
    if (this.isNotStale()) {
      console.log('getLookups cached');
      return Observable.of(this.lookups);
    }
    
    console.log('getLookups: ', this.uriBase);
    return this.http.get(this.uriBase)
      .map(res => { 
        this.lookups = res['data'] as Lookup[];
        this.lookupsAge = Date.now();
        return res['data'] as Lookup[];
      })
      .catch(HandleError.error);
  }

  getLookups(category: LCategory): Observable<Lookup[]> {
    return this.getAllLookups()
      .map(res => res.filter(l => l.category == category))
      .catch(HandleError.error);
  }

  getLookup(id: number): Observable<Lookup> {
    return this.getAllLookups()
      .mergeMap(a => a.filter(ll => ll.id == id))
      .first()
      .catch(HandleError.error);
  }
}
