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

  getUser(): Promise<User> {
    return new Promise((resolve) => {
      if (!this._user) this._user = new User();
      resolve(this._user);
    });
  }

  getUserSync(): User {
    if (!this._user) this._user = new User();
    return this._user;
  }

  getUserEmitter(): EventEmitter<User> {
    return this.userLoadedEvent;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    console.log(`auth.service.setRedirectUrl: ${this.redirectUrl}`);
  }

  isLoggedInObs(): Observable<boolean> {
    return observableOf(this.getUserSync()).pipe(map<User, boolean>((user) => {
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
    return observableFrom(new Promise((resolve, reject) => {
      this.getUser().then(user => {
        if (user.expired) {
          console.log('user not logged in; attempting to authenticate...');
          let authorizeUri = this._uriBase + '/id/authorize?redirect_uri=' + url;
          // https://angular.io/api/http/RequestOptions#withCredentials
          // https://stackoverflow.com/a/54680185/2496266
          this.http.get(authorizeUri, { observe: 'response', withCredentials: true }) // this is bad; it might not return before the outside observable completes
            .subscribe(
              response => {
                user.expired = false;
                user.state = url ? url : environment.oidc_client_settings.redirect_uri; // todo there may be no need to pass this around

                let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));

                user.profile.roles = claims['role'];
                user.profile.preferred_username = claims['preferredUserName'];

                resolve(user);
              },
              error => {
                user.expired = true;
                reject(user);
              }
            );
        } else {
          user.state = url;
          resolve(user);
        }
      })
    }));
  }

  startSignoutMainWindow() {
    let user = this.getUserSync();
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
