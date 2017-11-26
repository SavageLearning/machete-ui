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
    console.log('.ctor');
  }

  isStale(): boolean {
    if (this.rulesAge > Date.now() - 3600 * 1000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportRules(): Observable<TransportRule[]> {
    if (this.isNotStale()) {
      console.log('returning cache', this.rulesAge);
      return Observable.of(this.rules);
    }

    return this.http.get(this.uriBase)
      .map(res => {
        console.log('returning from API', this.rulesAge);
        
        this.rules = res['data'] as TransportRule[];
        this.rulesAge = Date.now();
        return res['data'] as TransportRule[];
      })
      .catch(HandleError.error);
  }
}
