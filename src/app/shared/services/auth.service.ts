import { environment } from '../../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { from as observableFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  userLoadedEvent: EventEmitter<User> = new EventEmitter<User>();
  _user: User;
  _uriBase: string = environment.dataUrl;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser(): Promise<User> {
    return new Promise((resolve) => {
      if (!this._user) this._user = new User();
      resolve(this._user);
    });
  }

  getUserEmitter(): EventEmitter<User> {
    return this.userLoadedEvent;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    console.log(`auth.service.setRedirectUrl: ${this.redirectUrl}`);
  }

  isLoggedInObs(): Observable<boolean> {
    return observableFrom(this.getUser()).pipe(map<User, boolean>((user) => {
      return user && !user.expired;
    }));
  }

  clearState() {
    this._user = null;
  }

  getUserLegacy() {
    this.getUser().then((user) => {
      console.log('auth.service.getUserLegacy returned: ', user);
      this.getUserEmitter().emit(user);
    });
  }

  removeUser() {
    this.getUserEmitter().emit(null);
    console.log('auth.service.removeUser: user removed');
  }

  startSigninMainWindow() {
    window.location.href = environment.dataUrl + '/id/login?redirect_uri=' + environment.oidc_client_settings.redirect_uri; // TODO Router
    console.log('signinRedirect done');
  }

  endSigninMainWindow(url?: string): Observable<User> {
    if (!url) { url = environment.oidc_client_settings.redirect_uri; }
    return observableFrom(new Promise((resolve, reject) => // TODO just make an observable
      this.getUser().then(user => {
        console.log('begin signinRedirectCallback: ', user);
        if (user.expired) {
          console.log('user not logged in; attempting to authenticate...');
          let authorizeUri = this._uriBase + '/id/authorize?redirect_uri=' + url /*+ '&nonce=' + nonce*/;
          this.http.get(authorizeUri, { observe: 'response' }) // this is bad; it might not return before the outside observable completes
            .subscribe(
              response => {
                console.log('signinRedirectCallback response: ', response);
                if (response.status === 200) {
                  user.expired = false;
                  user.state = url; // todo there may be no need to pass this around

                  let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));
                  console.log('claims: ', claims);

                  user.profile.roles = claims['role'];
                  user.profile.preferred_username = claims['preferredUserName'];

                  console.log('end signinRedirectCallback: ', user);
                  resolve(user);
                }
              },
              error => {
                console.log('signinRedirectCallback: ', error);
                if (error.status === 401) {
                  user.expired = true;
                  reject(user);
                }
              }
            );
          //window.location.href = environment.authUrl + "/login?redirect_uri=" + uri;
        } else {
          user.state = url;
          resolve(user);
        }
      })
    ));
  }

  startSignoutMainWindow() {
    this.getUser().then(user => { // todo observable/subscribe
      console.log('startSignoutMainWindow user: ', user);
      if (!user.expired) {
        return this.http.get(this._uriBase + '/id/logoff', {observe: 'response'}).subscribe(response => {
          console.log("signoutRedirect: ", response);

          if (response.status === 200) {
            console.log('here: ', response.body['data']);
            user.expired = true;
            window.location.href = response.body['data']; // moving on; TODO figure out router
            return;
          }
        }, error => {
          console.log('Error in signoutRedirect: ', error);
        });
      } else console.log("Not logged in!");
    });
  };
}
