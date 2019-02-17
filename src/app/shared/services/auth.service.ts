import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  private _user: User;
  _redirectRoute: string = '';

  constructor(private http: HttpClient) {
  }

  /** Returns an Observable stream of the _user field. */
  private getUser(): Observable<User> {
    if (!this._user) this._user = new User();
    return Observable.of(this._user);
  }

  /** Checks against the API to see if a user is authenticated. From the perspective of the API, this is an authorization check; this method does not log a user in. */
  authenticate(): Observable<User> {
    return this.getUser().flatMap(user => {
      if (!user.expired) {
        return Observable.of(user);
      } else {        
        console.log('user expired; attempting to authenticate...');
        // https://angular.io/api/http/RequestOptions#withCredentials
        // https://stackoverflow.com/a/54680185/2496266
        return this.http.get(environment.dataUrl + '/id/authorize', { observe: 'response', withCredentials: true })
          .map(response => {
            let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));
            user.profile.roles = claims['role'];
            user.profile.preferred_username = claims['preferredUserName'];
            user.expired = false;
      
            console.log('...success!');
            this._user = user;

            return user;
          });
      }
    });
  }

  /** Logs out the user. Returns an observable of the user being signed out, unless the user is already signed out, in which case it throws an exception. */
  signoutUser(): Observable<User> {
    return this.getUser().flatMap(user => {
      if (!user.expired) {
        return this.http.get(environment.dataUrl + '/id/logoff', { observe: 'response', withCredentials: true })
          .pipe(map(() => {
            user.expired = true;
            user.state = '/welcome';
            return user;
          }));
      } else {
        return Observable.throw('Not logged in!');
      }
    });
  }

  /** Returns an Observable stream indicating whether a user is still
   *  logged in. Can be used wherever a check vs.
   * 
   *  `authService.authenticate().subscribe(func => !func.expired)`
   * 
   * could otherwise be made. */
  isLoggedIn(): Observable<boolean> {
    return this.authenticate().pipe(map(user => {
      return !user.expired;
    }));
  }

  /** Deprecated. Set the redirect route for an unauthorized user. Going forward, should be part of the expired user's state. Synchronous method. */
  setRedirectRoute(route: string) {
    this._redirectRoute = route;
  }

  /** Deprecated. Dereference the user state. This probably means there has been an error. This method runs synchronously. */
  removeUser() {
    this._user = null;
  }
}
