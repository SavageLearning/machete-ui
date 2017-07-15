import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Lookup } from './models/lookup';
import { HandleError } from '../shared/handle-error';
import {AuthService} from "../shared/services/auth.service";
import {environment} from "../../environments/environment";
@Injectable()
export class LookupsService {
  uriBase = environment.dataUrl + '/api/lookups';
  constructor(private auth: AuthService) {
  }
  getLookups(category?: string): Observable<Lookup[]> {
    let uri = this.uriBase;
    if (category) {
      uri = uri + '?category=' + category;
    }
    console.log('lookupsService.getLookups: ' + uri);
    return this.auth.AuthGet(uri)
      .map(res => res.json().data as Lookup[])
      .catch(HandleError.error);
  }
}
