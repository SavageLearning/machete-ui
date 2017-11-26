import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ScheduleRule } from './shared/index';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';

@Injectable()
export class ScheduleRulesService {
  uriBase = environment.dataUrl + '/api/schedulerules';
  rules = new Array<ScheduleRule>();
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

  getScheduleRules(): Observable<ScheduleRule[]> {
    if (this.isNotStale()) {
      return Observable.of(this.rules);
    }

    return this.http.get(this.uriBase)
      .map(res => {
        this.rules = res['data'] as ScheduleRule[];
        this.rulesAge = Date.now();
        return res['data'] as ScheduleRule[];
      })
      .catch(HandleError.error);
  }
}
