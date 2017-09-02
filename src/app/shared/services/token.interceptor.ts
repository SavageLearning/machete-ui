import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Log, User } from "oidc-client";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService,
    private route: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo: call observable, then map to to httpevent
    return this.auth.getUser$()
      .mergeMap((user: User) => {
        Log.info('token.interceptor.currentUser: ');
        if (user === null || user === undefined) {
          this.auth.redirectUrl = this.route.url;
          this.route.navigate(['/unauthorized']);
        } else {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
          return next.handle(request);
      }
      });
  }
}
