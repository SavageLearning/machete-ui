import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ScheduleRule } from "./shared/index";
import { of } from "rxjs";
import { ScheduleRulesService as ScheduleRulesClient } from "machete-client";

@Injectable()
export class ScheduleRulesService {
  rules = new Array<ScheduleRule>();
  rulesAge = 0;
  constructor(private client: ScheduleRulesClient) {
    console.log(".ctor");
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
      return of(this.rules);
    }

    return this.client.apiScheduleRulesGet().pipe(
      map((res) => {
        this.rules = res["data"] as ScheduleRule[];
        this.rulesAge = Date.now();
        return res["data"] as ScheduleRule[];
      })
    );
  }
}
