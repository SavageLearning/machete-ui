import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Log } from 'oidc-client';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';



@Injectable()
export class AuthService {
  mgr: UserManager = new UserManager(environment.oidc_client_settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  redirectUrl: string;
  authHeaders: Headers;


  constructor(private http: Http) {
    Log.info('auth.serive.ctor: called');
    this.mgr.getUser()
      .then((user) => {
        if (user) {
          Log.info('auth.service.getUser.callback user:' + JSON.stringify(user));
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        }
        else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });

    this.mgr.events.addUserLoaded((user) => {
      this.currentUser = user;
      this.loggedIn = !(user === undefined);
        Log.info('auth.service.ctor.event: addUserLoaded: ', user);
      });

    this.mgr.events.addUserUnloaded((e) => {
      if (!environment.production) {
        Log.info('auth.service.ctor.event: addUserUnloaded');
      }
      this.loggedIn = false;
    });

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
    this.mgr.signinRedirect({ data: 'some data' }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      Log.error('auth.service.startSigninMainWindow returned: ' + JSON.stringify(err));
    });
  }
  endSigninMainWindow() {
    this.mgr.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);
    }).catch(function (err) {
      Log.error('auth.service.endSigninMainWindow returned: ' + JSON.stringify(err));
    });
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
  

  private _setAuthHeaders(user: any): void {
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
    if (this.authHeaders.get('Content-Type')) {

    } else {
      this.authHeaders.append('Content-Type', 'application/json');
    }
  }
  private _setRequestOptions(options?: RequestOptions) {
    if (this.loggedIn) {
      this._setAuthHeaders(this.currentUser);
    }
    if (options) {
      options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
    } else {
      options = new RequestOptions({ headers: this.authHeaders });
    }

    return options;
  }

}


