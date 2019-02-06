
import { of as observableOf, from as observableFrom } from 'rxjs';

import {map, mergeMap} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserManager, User } from './user-manager';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  userLoadedEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;
  redirectUrl: string;
  authHeaders: Headers;

  // TODO need async way to call for auth password, then send intercept on its way
  constructor(private http: Http, private router: Router, private mgr: UserManager) {
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
    return observableFrom(this.mgr.getUser()).pipe(map<User, boolean>((user) => {
      return user && !user.expired;
    }));
  }

  clearState() {
    this.mgr.clearStaleState().then(function () {
      console.log('auth.service.clearStateState success');
    });
  }

  getUser() {
    this.mgr.getUser().then((user) => {
      this.currentUser = user;
      //console.log('auth.service.getUser returned: ' + JSON.stringify(user));
      this.getUserEmitter().emit(user);
    });
  }

  removeUser() {
    this.mgr.removeUser().then(() => {
      this.getUserEmitter().emit(null);
      console.log('auth.service.removeUser: user removed');
    });
  }

  startSigninMainWindow() {
    this.mgr.signinRedirect({ data: this.redirectUrl }).then(function () {
      console.log('signinRedirect done');
    });
  }

  endSigninMainWindow(url?: string): Observable<User> {
    return observableFrom(this.mgr.signinRedirectCallback(url));
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then(user => {
      console.log(user);
      if (user.isLoggedIn) {
        return this.mgr.signoutRedirect(user);
      } else console.log("Not logged in!");
    });
  };

  endSignoutMainWindow() {
    this.mgr.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    });
  };
}


