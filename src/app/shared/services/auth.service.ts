import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Log } from 'oidc-client';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  mgr: UserManager = new UserManager(environment.oidc_client_settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  redirectUrl: string;
  authHeaders: Headers;

  // TODO:
  // need async way to call for auth password, then send intercept on its way
  constructor(private http: Http, private router: Router) {
    // Log.info('auth.service.ctor: called');
    // this.mgr.getUser()
    //   .then((user) => {
    //     if (user) {
    //       Log.debug('auth.service.ctor.getUser.callback user:' + JSON.stringify(user));
    //       this.loggedIn = true;
    //       this.currentUser = user;
    //       this.userLoadededEvent.emit(user);
    //     } else {
    //       this.loggedIn = false;
    //     }
    //   })
    //   .catch((err) => {
    //     this.loggedIn = false;
    //   });

    // this.mgr.events.addUserLoaded((user) => {
    //   this.currentUser = user;
    //   this.loggedIn = !(user === undefined);
    //     Log.debug('auth.service.ctor.event: addUserLoaded: ', user);
    //   });

    // this.mgr.events.addUserUnloaded((e) => {
    //   if (!environment.production) {
    //     Log.info('auth.service.ctor.event: addUserUnloaded');
    //   }
    //   this.loggedIn = false;
    // });

  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    Log.info(`auth.service.setRedirectUrl.url: ${this.redirectUrl}`);
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
      Log.info('auth.service.clearStateState success');
    }).catch(function (e) {
      Log.error('auth.service.clearStateState error', e.message);
    });
  }


  getUser$(): Observable<User> {
    return Observable.fromPromise(this.mgr.getUser());
  }
  
  getUserRoles$(): Observable<string[]> { 
    return this.getUser$() 
      .mergeMap((user: User)=> { 
        if (user === null || user === undefined) {
          return Observable.of(null);
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
      Log.info('auth.service.getUser returned: ' + JSON.stringify(user));
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      Log.error('auth.service.getUser returned: ' + JSON.stringify(err));
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      Log.info('auth.service.removeUser: user removed');
    }).catch(function (err) {
      Log.error('auth.service.removeUser returned: ' + JSON.stringify(err));
    });
  }

  startSigninMainWindow() {
    this.mgr.signinRedirect({ data: this.redirectUrl }).then(function () {
      Log.info('signinRedirect done');
    }).catch(function (err) {
      Log.error('auth.service.startSigninMainWindow returned: ' + JSON.stringify(err));
    });
  }

  endSigninMainWindow(url?: string): Observable<User> {
    return Observable.fromPromise(this.mgr.signinRedirectCallback(url));
    // .then(function (user) {
    //   Log.info('auth.service.endSigninMainWindow.user: ', user.profile.sub);
    //   if (user.state) {
    //     this.router.navigate(['dashboard']);
    //   }
    // }).catch(function (err) {
    //   Log.error('auth.service.endSigninMainWindow returned: ' + JSON.stringify(err));
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
        Log.error('auth.service.startSignoutMainWindow returned: ' + JSON.stringify(err));

      });
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      Log.error('auth.service.endSignoutMainWindow returned: ' + JSON.stringify(err));
    });
  };
}


