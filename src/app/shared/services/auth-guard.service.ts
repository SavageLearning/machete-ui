import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {environment} from '../../../environments/environment';
import { Log } from 'oidc-client';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      Log.info('auth-guard.service.ctor called');
    }
    canActivate() {
        Log.info('auth-guard.service.canActivate: called');
        let isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
        Log.info('auth-guard.service.canActivate isLoggedInObs:' + JSON.stringify(loggedin));
        if (!loggedin) {
            Log.info('auth-guard.service.canActivate !loggedIn: url:' + this.router.url)
            this.authService.redirectUrl = this.router.url;
            this.router.navigate(['unauthorized']);
        }
        });
        return isLoggedIn;

    }

}
