import { Observable, of } from "rxjs";

import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { TransportRule } from "./shared/index";
import { TransportRulesService as TransportRulesClient } from "machete-client";
@Injectable()
export class TransportRulesService {
  rules = new Array<TransportRule>();
  rulesAge = 0;
  constructor(private client: TransportRulesClient) {
    console.log(".ctor");
  }

  isStale(): boolean {
    if (this.rulesAge > Date.now() - 300 * 1000) {
      return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportRules(): Observable<TransportRule[]> {
    if (this.isNotStale()) {
      console.log("returning cache", this.rulesAge);
      return of(this.rules);
    }

    return this.client.apiTransportRulesGet().pipe(
      map((res) => {
        this.rules = res["data"] as TransportRule[];
        this.rulesAge = Date.now();
        return res["data"] as TransportRule[];
      })
    );
  }
}
