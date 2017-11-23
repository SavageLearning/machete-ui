import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ScheduleRule } from './shared/index';
import { environment } from '../../environments/environment';

@Injectable()
export class SchedulingService {
  uriBase = environment.dataUrl + '/api/schedulerules';
  constructor(private http: HttpClient) {
  }

  getScheduleRules(): Observable<ScheduleRule[]> {
    return this.http.get(this.uriBase)
      .map(res => res['data'] as ScheduleRule[]);
  }
}
