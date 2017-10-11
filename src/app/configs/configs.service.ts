import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config, CCategory } from '../shared/models/config';
import { HandleError } from '../shared/handle-error';

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
      return Observable.of(this.configs);
    }

    console.log('getAllConfigs: ' + this.uriBase);
    return this.http.get(this.uriBase)
      .map(res => {
        this.configs = res['data'] as Config[];
        this.configsAge = Date.now();
        return res['data'] as Config[];
      })
      .catch(HandleError.error);
  }

  getConfigs(category: CCategory): Observable<Config[]> {

    return this.getAllConfigs()
      .map(res => res.filter(l => l.category == category))
      .catch(HandleError.error);
  }

  getConfig(key: string): Observable<Config> {
    return this.getAllConfigs()
    .mergeMap(a => a.filter(ll => ll.key == key))
    .first()
    .catch(HandleError.error);
  }
}
