import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { loadMenuRules } from "src/app/load-menu-rules";
import { MenuRule } from "src/app/menu-rule";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CanLoadService implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    segments: UrlSegment[]
  ): UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.authorize().pipe(
      map((user) =>
        this.inAuthorizedRoute(loadMenuRules(user.profile.roles), route)
      ),
      tap((res) => console.log(res, "canLoad Route"))
    );
  }

  private inAuthorizedRoute(menuRules: MenuRule[], route: Route): boolean {
    console.log(route, menuRules);
    let flatRules = this.flatten(menuRules);
    return (
      flatRules.find((mr) =>
        mr.routerLink?.find((rl) => rl.includes(route.path))
      ) !== undefined
    );
  }

  private flatten(menuRules: MenuRule[]): MenuRule[] {
    let result = new Array<MenuRule>();
    menuRules.forEach((rule) => {
      result.push(rule);
      if (Array.isArray(rule.items)) {
        result = result.concat(this.flatten(rule.items));
      }
    });
    return result;
  }
}
