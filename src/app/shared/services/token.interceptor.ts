
import {mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './user-manager';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService,
    private route: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = this.route.url;
    return this.auth.getUser$().pipe(
      mergeMap((user: User) => {
        if (user === null || user === undefined) {
          this.auth.redirectUrl = url;
          this.route.navigate(['/welcome']);
          return next.handle(request);

        }
        if (user.expired) {
          this.auth.redirectUrl = url;
          // TODO: should go to login start, or silently renew?
          this.auth.startSigninMainWindow();
          //this.route.navigate(['/unauthorized']);
          return next.handle(request);

        }
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.access_token}`
          }
        });
        return next.handle(request);

      }));
  }
}
