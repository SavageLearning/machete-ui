import { environment } from '../../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { from as observableFrom, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  userLoadedEvent: EventEmitter<User> = new EventEmitter<User>();
  _user: User;
  _uriBase: string = environment.dataUrl;
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  getUser(): User {
    if (!this._user) this._user = new User();
    return this._user;
  }

  getUserEmitter(): EventEmitter<User> {
    return this.userLoadedEvent;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  isLoggedInObs(): Observable<boolean> {
    return observableOf(this.getUser()).pipe(map<User, boolean>((user) => {
      return user && !user.expired;
    }));
  }

  removeUser() {
    this.getUserEmitter().emit(null);
  }

  startSigninMainWindow() {
    window.location.href = environment.dataUrl + '/id/login?redirect_uri=' + environment.oidc_client_settings.redirect_uri; // TODO Router
  }

  endSigninMainWindow(url?: string): Observable<User> {
    let user = this.getUser();
    let authorizeUri = this._uriBase + '/id/authorize';
    let redirectUri = url ? url : environment.oidc_client_settings.redirect_uri;

    if (!user.expired) {
      user.state = url;
      return Observable.of(user);
    } else {
      console.log('user not logged in; attempting to authenticate...');
      // https://angular.io/api/http/RequestOptions#withCredentials
      // https://stackoverflow.com/a/54680185/2496266
      return this.http.get(authorizeUri, { observe: 'response', withCredentials: true }).map(response => {
        let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));

        user.profile.roles = claims['role'];
        user.profile.preferred_username = claims['preferredUserName'];
        user.expired = false;
        user.state = redirectUri;

        return user;
      });
    }
  }

  endSignin(user, redirectUri, authorizeUri): User {
    this.http.get(authorizeUri, { observe: 'response', withCredentials: true }).subscribe(response => {
      user.expired = false;
      user.state = redirectUri; // todo there may be no need to pass this around

      let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));

      user.profile.roles = claims['role'];
      user.profile.preferred_username = claims['preferredUserName'];
    }, error => {
      user.expired = true;
      user.state = '/welcome';
    });
    return user;
  }

  startSignoutMainWindow() {
    let user = this.getUser();
    if (!user.expired) {
      return this.http.get(this._uriBase + '/id/logoff', {observe: 'response'}).subscribe(response => {
        user.expired = true;
        user.state = '/welcome';
        return;
      }, error => {
        console.log('Error in signoutRedirect: ', error);
      });
    } else console.log("Not logged in!");
  }
}
