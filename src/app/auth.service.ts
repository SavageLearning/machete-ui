import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { OAuthService } from 'angular-oauth2-oidc';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Claim} from './auth/models/claim';
import {RequestOptions, Headers} from '@angular/http';
import {Header} from 'primeng/primeng';
@Injectable()
export class AuthService {
  isLoggedIn = false;
  discoveryDocument: string;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  user: any;
  user$: BehaviorSubject<Object>;
  dataUrl: string;
  authUrl: string;
  claim: Claim;

  constructor(private oAuthService: OAuthService) {
    this.initialize();
    // Load Discovery Document and then try to login the user
    this.oAuthService.loadDiscoveryDocument(this.discoveryDocument).then(() => {
      // Do what ever you want here
    });
  }

  initialize() {
    this.oAuthService.clientId = 'js.usermanager';
    this.oAuthService.scope = 'openid profile email roles read write';
    this.oAuthService.setStorage(sessionStorage);
    this.oAuthService.dummyClientSecret = 'geheim';
    this.dataUrl = 'https://test.machetessl.org';
    this.authUrl = 'https://test.machetessl.org';
    this.discoveryDocument = 'https://test.machetessl.org/core/.well-known/openid-configuration';
    if (!this.user$) {
      this.user$ = <BehaviorSubject<Object>> new BehaviorSubject(new Object());
    }
  }

  subscribeToService(): Observable<any> {
    return this.user$.asObservable();
  }

  hasValidAccessToken(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  login(username: string, password: string) {
    let o$ = Observable.fromPromise(
      this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password));

      o$.map(resp => resp as Claim)
        .subscribe(
        claim => this.loginHandler(claim),
        error => {
          console.error('error logging in', error);
        }
      );
  }
  getRequestOptions(): RequestOptions {
    const headers: Headers = new Headers();
    headers.append('Authorization', this.oAuthService.authorizationHeader());

    return new RequestOptions({ headers: headers });
  }

  getAuthHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Authorization', this.oAuthService.authorizationHeader());
    return headers;
  }

  loginHandler(claim: Claim) {
    if (this.oAuthService.hasValidAccessToken()) {
      this.redirectUrl = this.oAuthService.redirectUri;
      this.isLoggedIn = true;
    }
    this.claim = claim as Claim;

    localStorage.setItem('auth_token', this.oAuthService.getAccessToken());
    this.user = claim; // the token
    this.user$.next(claim);
    return this.isLoggedIn;
  }

  logout(): void {
    this.oAuthService.logOut();
    this.isLoggedIn = false;
  }
}
