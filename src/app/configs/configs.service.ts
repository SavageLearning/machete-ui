import { Observable, of } from "rxjs";

import { first, mergeMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Config, CCategory } from "../shared/models/config";
import { ConfigsService as ConfigsClient } from "machete-client";
@Injectable()
export class ConfigsService {
  uriBase = environment.dataUrl + "/api/configs";
  configs = new Array<Config>();
  configsAge = 0;
  constructor(private client: ConfigsClient) {
    client.configuration.withCredentials = false;
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
      return of(this.configs);
    }

    // withCredentials: true is normally necessary, but configs are enabled for anonymous
    return this.client.apiConfigsGet().pipe(
      map((res) => {
        this.configs = res["data"] as Config[];
        this.configsAge = Date.now();
        return res["data"] as Config[];
      })
    );
  }

  getConfigs(category: CCategory): Observable<Config[]> {
    return this.getAllConfigs().pipe(
      map((res) => res.filter((l) => l.category === category))
    );
  }

  getConfig(key: string): Observable<Config> {
    return this.getAllConfigs().pipe(
      mergeMap((a) => a.filter((ll) => ll.key === key)),
      first()
    );
  }
}
