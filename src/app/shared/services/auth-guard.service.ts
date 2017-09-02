import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Log } from 'oidc-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      Log.info('auth-guard.service.ctor called');
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        Log.info(`auth-guard.service.canActivate on: ${state.url}`);
        let isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
            Log.info('auth-guard.service.canActivate isLoggedInObs:' + loggedin);
            if (!loggedin) {
                Log.info('auth-guard.service.canActivate NOT loggedIn: url:' + state.url)
                this.authService.redirectUrl = state.url;
                this.router.navigate(['unauthorized']);
            }
            });
        return isLoggedIn;

    }

}
