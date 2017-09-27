import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  mgr: UserManager = new UserManager(environment.oidc_client_settings);
  userLoadedEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  redirectUrl: string;
  authHeaders: Headers;

  // TODO:
  // need async way to call for auth password, then send intercept on its way
  constructor(private http: Http, private router: Router) {
  }
  getUserEmitter(): EventEmitter<User> {
    return this.userLoadedEvent;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    console.log(`auth.service.setRedirectUrl.url: ${this.redirectUrl}`);
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
  isLoggedInObs(): Observable<boolean> {
    return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('auth.service.clearStateState success');
    }).catch(function (e) {
      console.error('auth.service.clearStateState error', e.message);
    });
  }


  getUser$(): Observable<User> {
    return Observable.fromPromise(this.mgr.getUser());
  }

  getUserRoles$(): Observable<string[]> {
    return this.getUser$()
      .mergeMap((user: User) => {
        console.log(user);
        if (user === null || user === undefined) {
          return Observable.of(new Array<string>());
        } else {
          return Observable.of(user.profile.role as string[]);
        }
      });
  }

  getUsername$(): Observable<string> {
    return this.getUser$()
      .mergeMap((user: User) => {
        // TODO: if user is null, disable menu
        if (user === null || user === undefined) {
          return Observable.of(null);
        } else {
          return Observable.of(user.profile.preferred_username as string);
        }
      });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      //console.log('auth.service.getUser returned: ' + JSON.stringify(user));
      this.getUserEmitter().emit(user);
    }).catch(function (err) {
      console.error('getUser: ', err);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.getUserEmitter().emit(null);
      console.log('auth.service.removeUser: user removed');
    }).catch(function (err) {
      console.error('auth.service.removeUser returned: ' + JSON.stringify(err));
    });
  }

  startSigninMainWindow() {
    this.mgr.signinRedirect({ data: this.redirectUrl }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.error('auth.service.startSigninMainWindow returned: ' + JSON.stringify(err));
    });
  }

  endSigninMainWindow(url?: string): Observable<User> {
    return Observable.fromPromise(this.mgr.signinRedirectCallback(url));
    // .then(function (user) {
    //   console.log('auth.service.endSigninMainWindow.user: ', user.profile.sub);
    //   if (user.state) {
    //     this.router.navigate(['dashboard']);
    //   }
    // }).catch(function (err) {
    //   console.error('auth.service.endSigninMainWindow returned: ' + JSON.stringify(err));
    // });
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then(user => {
      return this.mgr.signoutRedirect({ id_token_hint: user.id_token }).then(resp => {
        console.log('signed out', resp);
		      setTimeout(5000, () => {
          console.log('testing to see if fired...');
        });
      }).catch(function (err) {
        console.error('auth.service.startSignoutMainWindow returned: ' + JSON.stringify(err));

      });
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.error('auth.service.endSignoutMainWindow returned: ' + JSON.stringify(err));
    });
  };
}


