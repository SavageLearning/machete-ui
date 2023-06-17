import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Optional, SkipSelf } from "@angular/core";
import { BehaviorSubject, iif, Observable, throwError } from "rxjs";
import { catchError, map, pluck, share, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ConfigsService as ConfigsClient } from "machete-client";
import { MS_NON_EDITABLE_CONFIGS_LOWER_CASE } from "../../configs/machete-settings/shared/machete-settings-constants";
import { MessagesService } from "../components/messages/messages.service";
import { CCategory, Config } from "../models/config";

/**
 * Singleton store service. Caches data based on a TTL.
 * Each config object represents an app setting
 */
@Injectable({
  providedIn: "root",
})
export class AppSettingsStoreService {
  private _configsAge = 0;
  private _CACHE_TIME_TO_LIVE = 300000; // 5 minutes
  private readonly _uriBase = environment.dataUrl + "/api/configs";
  private _appSettingsSubject = new BehaviorSubject<Config[]>([]);

  /**
   * All Configs as Observable. Cached based on a TTL
   */
  readonly all$ = iif(
    () => this.isStale(),
    this.getAllConfigs(),
    this._appSettingsSubject.asObservable()
  );

  constructor(
    private _configsClient: ConfigsClient,
    private _appMessages: MessagesService,
    @Optional() @SkipSelf() parentModule?: AppSettingsStoreService
  ) {
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        `Machete dev error: ${AppSettingsStoreService.name} is already loaded. Additional imports not needed`
      );
    }
  }

  private isStale = (): boolean =>
    this._configsAge < Date.now() - this._CACHE_TIME_TO_LIVE;

  private getAllConfigs(): Observable<Config[]> {
    return this._configsClient.apiConfigsGet().pipe(
      pluck("data"),
      map((data: Config[]) => data),
      tap(() => (this._configsAge = Date.now())),
      tap((configs: Config[]) => this._appSettingsSubject.next(configs)),
      share()
    );
  }

  private httpUpdate(config: Config): Observable<Config> {
    return this._configsClient.apiConfigsIdPut(config.id, config).pipe(
      catchError((error: HttpErrorResponse) => {
        const { statusText } = error;
        this._appMessages.showErrors({
          Error: `${statusText}: Contact Machete support.`,
        });
        console.log(error);
        return throwError(error);
      }),
      pluck("data"), // if no error
      map((data: Config) => data)
    );
  }

  private validateUserEditable = (configKey: string): boolean =>
    !MS_NON_EDITABLE_CONFIGS_LOWER_CASE.includes(configKey.toLowerCase());

  private getCacheWithNewVal(newConfig: Config, cache: Config[]) {
    const configIndex = cache.findIndex((x) => x.id == newConfig.id);
    cache.splice(configIndex, 1, newConfig); // side effect: changes the cache array
    return cache;
  }

  /**
   * filters the cached values on `CCategory`
   * @param category a `CCategory` type
   * @returns the filtered values from cache as Observable,
   * if the cache's TTL is reached,
   * the new values
   */
  getConfigsWith(category: CCategory): Observable<Config[]> {
    return this.all$.pipe(
      map((all) => all.filter((l) => l.category === category))
    );
  }

  /**
   * @param key the config key property to filter
   * @returns a single `Config` record from cache as Observable,
   * if the cache's TTL is reached, sourced from new values
   */
  getConfig(key: string): Observable<Config> {
    return this.all$.pipe(
      map((a) => a.filter((ll) => ll.key === key)),
      map(([first]) => first),
      map((a) => ({ ...a }))
    );
  }

  /**
   * makes an http PUT request and the cache is updated to reflect
   * @param config the `Config` to update
   * @returns the updated record returned from the http PUT request as Observable
   */
  update(config: Config): Observable<Config> {
    if (!this.validateUserEditable(config.key)) {
      return this.getConfig(config.key).pipe(
        tap(() => {
          this._appMessages.showErrors({
            Error: "Action not allowed",
          });
        })
      );
    }

    return this.httpUpdate(config).pipe(
      tap(() => {
        this._appMessages.showSuccess({
          label: "Success",
          message: "Record Saved",
        });
      }),
      // replace cache with new val
      tap((config) =>
        this._appSettingsSubject.next(
          this.getCacheWithNewVal(config, this._appSettingsSubject.value)
        )
      )
    );
  }

  /**
   * Flags cache as stale and new data will be fetched from http when requested
   */
  refreshCache(): void {
    this._configsAge = 0;
  }

  /**
   * optionally override the cache TTL, only recommended for testing
   * @param ttl ttl in milliseconds
   */
  setCacheTTL(ttl: number): void {
    this._CACHE_TIME_TO_LIVE = ttl;
  }
}
