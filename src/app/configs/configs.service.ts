import { Observable, of, throwError } from "rxjs";

import { first, mergeMap, map, pluck, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Config, CCategory } from "../shared/models/config";
import { ConfigsService as ConfigsClient } from "machete-client";
import { MS_NON_EDITABLE_CONFIGS_LOWER_CASE } from "./machete-settings/shared/machete-settings-constants";
import { MessagesService } from "../shared/components/messages/messages.service";
@Injectable()
export class ConfigsService {
  uriBase = environment.dataUrl + "/api/configs";
  configs = new Array<Config>();
  configsAge = 0;
  constructor(
    private client: ConfigsClient,
    private appMessages: MessagesService
  ) {
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
      pluck("data"),
      map((data) => data as Config[]),
      tap((data) => (this.configs = data)),
      tap(() => (this.configsAge = Date.now()))
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
      map((a) => ({ ...a })), // return a new object
      first()
    );
  }

  update(config: Config): Observable<Config> {
    if (MS_NON_EDITABLE_CONFIGS_LOWER_CASE.includes(config.key.toLowerCase())) {
      return this.getConfig(config.key).pipe(
        tap(() => {
          this.appMessages.showErrors({
            Error: "Action not allowed",
          });
        })
      );
    }

    return this.client.apiConfigsIdPut(config.id, config).pipe(
      catchError((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const errorAsText: string = error["statusText"] as string;
        this.appMessages.showErrors({
          Error: `${errorAsText}: Contact Machete support.`,
        });
        console.log(error);
        return throwError(error);
      }),
      pluck("data"),
      map((data) => data as Config),
      tap(() => {
        this.appMessages.showSuccess({
          label: "Success",
          message: "Record Saved",
        });
      })
    );
  }
}
