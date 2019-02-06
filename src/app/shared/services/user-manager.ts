import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

// this should go away; it was a mock of the OIDC client,
// all methods here should be combined with their calling
// methods in auth.service.ts and removed
@Injectable()
export class UserManager {
  _uriBase = environment.dataUrl + '/id/logoff';
  _user: User;

    constructor(private http: HttpClient, private router: Router) { }

    clearStaleState() {
      return new Promise((res) => { res(); })
    }

    getUser(): Promise<User> {
      return new Promise((resolve, reject) => {
        if (!this._user) this._user = new User();
        resolve(this._user);
      });
    }

    removeUser() {
      return new Promise((res) => { res(); })
    }

    signinRedirect(uri) {
      return new Promise((res) => {
        window.location.href = environment.oidc_client_settings.redirect_uri + '?redirect_uri=' + uri; // TODO Router
        res();
      })
    }

    signinRedirectCallback(uri): Promise<User> {
      return new Promise ((resolve, reject) =>
        this.getUser().then(user => {
          if (user.isLoggedIn) window.location.href = uri;
          else window.location.href = environment.authUrl + "/login?redirect_uri=" + uri;
          resolve(this._user);
        })
      );
    }

    signoutRedirect(user: User) {
      return this.http.get(this._uriBase, { observe: 'response' }).subscribe(response => {
        console.log("signoutRedirect: ", response);

        if (response.status === 200) {
          console.log('here: ', response.body['data']);
          this._user.isLoggedIn = false;
          window.location.href = response.body['data']; // moving on; struggled with Router for like 1.5 hrs.; TODO figure out router
          return;
        } // TODO and what if it's not?
      });
    }

    signoutRedirectCallback() {
      return new Promise((res) => { res(); })
    }
}

export class User {
    expired: boolean = false;
    profile: UserProfile = new UserProfile();
    scope: string = '';
    session_state: string = '';
    state: string = '';
    token_type: string = '';
    expires_at: number = 0;
    expires_in: number = 0;
    scopes: Array<string> = new Array<string>();
    isLoggedIn: boolean = false;
}

export class UserProfile {
  role: Array<string> = new Array<string>();
  preferred_username: string = '';
}
