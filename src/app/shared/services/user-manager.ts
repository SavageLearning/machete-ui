import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

// this should go away; it was a mock of the OIDC client,
// all methods here should be combined with their calling
// methods in auth.service.ts and removed
@Injectable()
export class UserManager {
  _uriBase = environment.dataUrl + '/id/logoff';
  _user: User;

    constructor(private http: HttpClient) { }


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

    signinRedirect(args) {
      return new Promise((res) => { res(); })
    }

    signinRedirectCallback(args): Promise<User> {
      return new Promise((res) => { res(); })
    }

    signoutRedirect(user: User) {
      return this.http.get(this._uriBase).subscribe(response => {
          if (response['status'] === 200) {
            this._user.isLoggedIn = false;
          }
          console.log("signoutRedirect: ", response);
          // TODO use rtr
          window.location.href = response['data'];
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
  role: string[];
  preferred_username: string;
}
