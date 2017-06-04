import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Lookup } from './models/lookup';
import { HandleError } from '../shared/handle-error';
@Injectable()
export class LookupsService {
  uriBase = '/api/lookups';
  constructor(private http: Http) {
  }
  getLookups(category?: string): Observable<Lookup[]> {
    let uri = this.uriBase;
    if (category) {
      uri = uri + '?category=' + category;
    }
    console.log('lookupsService.getLookups: ' + uri);
    return this.http.get(uri)
      .map(res => res.json().data as string[])
      .catch(HandleError.error);
  }
}
