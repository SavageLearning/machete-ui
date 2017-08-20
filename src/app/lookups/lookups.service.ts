import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Lookup } from './models/lookup';
import { HandleError } from '../shared/handle-error';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LookupsService {
  uriBase = environment.dataUrl + '/api/lookups';
  constructor(private http: HttpClient) {
  }
  getLookups(category?: string): Observable<Lookup[]> {
    let uri = this.uriBase;
    if (category) {
      uri = uri + '?category=' + category;
    }
    console.log('lookupsService.getLookups: ' + uri);
    return this.http.get(uri)
      .map(res => res['data'] as Lookup[])
      .catch(HandleError.error);
  }
}
