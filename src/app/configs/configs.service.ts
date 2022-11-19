import { Observable, of, throwError } from "rxjs";

import { first, mergeMap, map, pluck, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Config, CCategory } from "../shared/models/config";
import { MessagesService } from "../shared/components/messages/messages.service";
import { MS_NON_EDITABLE_CONFIGS_LOWER_CASE } from "./machete-settings/shared/machete-settings-constants";

@Injectable()
export class ConfigsService {
  uriBase = environment.dataUrl + "/api/configs";
  configs = new Array<Config>();
  configsAge = 0;
  constructor(private http: HttpClient, private appMessages: MessagesService) {}

  // TODO simplify
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

    console.log("getAllConfigs: " + this.uriBase);
    // withCredentials: true is normally necessary, but configs are enabled for anonymous
    return this.http.get(this.uriBase).pipe(
      map((res) => {
        //console.log(res); // <~ outputs a configuration object
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

    return this.http
      .put(`${this.uriBase}/${config.id}`, config, { withCredentials: true })
      .pipe(
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
