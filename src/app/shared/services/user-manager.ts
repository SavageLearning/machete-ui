import { Injectable } from '@angular/core';

@Injectable()
export class UserManager {
    _user: User | PromiseLike<User>;

    clearStaleState() {
      return new Promise((res) => { res(); })
    }

    getUser(): Promise<User> {
      return new Promise((res) => { res(this._user); });
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

    signoutRedirect(args) {
      return new Promise((res) => { res(); })
    }

    signoutRedirectCallback() {
      return new Promise((res) => { res(); })
    }
}

export class User {
    access_token: string = '';
    expired: boolean = false;
    profile: UserProfile = new UserProfile();
    id_token: string = "deadbeefdeadbeefdeadbeefdeadbeef";
    scope: string = '';
    session_state: string = '';
    state: string = "/welcome";
    token_type: string = '';
    expires_at: number = 0;
    expires_in: number = 0;
    scopes: Array<string> = new Array<string>();

  constructor(expired: boolean, profile: UserProfile) {
    this.expired = expired;
    this.profile = profile;
  }
}

export class UserProfile {
  role
  preferred_username: string;
}
