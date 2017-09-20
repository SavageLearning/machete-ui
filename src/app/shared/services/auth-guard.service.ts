import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      console.log('.ctor');
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('canActivate on', state.url);
        let isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
            console.log('canActivate isLoggedInObs:',loggedin);
            if (!loggedin) {
                console.log('canActivate NOT loggedIn: url:',state.url)
                this.authService.setRedirectUrl(state.url);
                this.router.navigate(['unauthorized']);
            }
            });
        return isLoggedIn;

    }

}
