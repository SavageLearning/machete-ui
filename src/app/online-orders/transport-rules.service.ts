import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TransportRule } from './shared/index';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';

@Injectable()
export class TransportRulesService {
  uriBase = environment.dataUrl + '/api/transportrules';
  rules = new Array<TransportRule>();
  rulesAge = 0;
  constructor(private http: HttpClient) {
  }

  isStale(): boolean {
    if (this.rulesAge > Date.now() - 36000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportRules(): Observable<TransportRule[]> {
    if (this.isNotStale()) {
      return Observable.of(this.rules);
    }

    return this.http.get(this.uriBase)
      .map(res => {
        this.rules = res['data'] as TransportRule[];
        this.rulesAge = Date.now();
        return res['data'] as TransportRule[];
      })
      .catch(HandleError.error);
  }
}
