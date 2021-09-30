import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigsService } from "../..//configs/configs.service";

@Injectable()
export class BannerGuard implements CanActivate {
  constructor(private configsService: ConfigsService, private router: Router) {
    console.log(".ctor");
  }

  canActivate(): Observable<boolean> {
    return combineLatest(
      this.configsService.getConfig("DisableOnlineOrders"),
      this.configsService.getConfig("DisableOnlineOrdersBanner")
    ).pipe(
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
