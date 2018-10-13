
import {of as observableOf,  Observable } from 'rxjs';

import {first, mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Config, CCategory } from '../shared/models/config';
@Injectable()
export class ConfigsService {
  uriBase = environment.dataUrl + '/api/configs';
  configs = new Array<Config>();
  configsAge = 0;
  constructor(private http: HttpClient) {
  }

  isStale(): boolean {
    if (this.configsAge > Date.now() - 36000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getAllConfigs(): Observable<Config[]> {
    if (this.isNotStale()) {
      return observableOf(this.configs);
    }

    console.log('getAllConfigs: ' + this.uriBase);
    return this.http.get(this.uriBase).pipe(
      map(res => {
        this.configs = res['data'] as Config[];
        this.configsAge = Date.now();
        return res['data'] as Config[];
      }));
  }

  getConfigs(category: CCategory): Observable<Config[]> {

    return this.getAllConfigs().pipe(
      map(res => res.filter(l => l.category == category)));
  }

  getConfig(key: string): Observable<Config> {
    return this.getAllConfigs().pipe(
    mergeMap(a => a.filter(ll => ll.key == key)),
    first(),);
  }
}
