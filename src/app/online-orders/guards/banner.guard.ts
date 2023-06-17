import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppSettingsStoreService } from "../../shared/services/app-settings-store.service";

@Injectable()
export class BannerGuard implements CanActivate {
  constructor(
    private appSettingsStore: AppSettingsStoreService,
    private router: Router
  ) {
    console.log(".ctor");
  }

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.appSettingsStore.getConfig("DisableOnlineOrders"),
      this.appSettingsStore.getConfig("DisableOnlineOrdersBanner"),
    ]).pipe(
      map(
        ([toggle, banner]) => {
          const result = toggle.value !== "TRUE";

          console.log("BannerGuard:", result, toggle, banner);
          return result;
        },
        (error) => {
          console.error(error);
          return false;
        }
      )
    );
  }
}
