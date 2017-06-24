import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  providers: [OAuthService],
  template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <input type="text" id="username" name="username" placeholder="username" [(ngModel)]="user.username">
    <input type="password" id="password" name="password" placeholder="password" [(ngModel)]="user.password">
    <button (click)="login(user)">Login</button>`
})
export class LoginComponent {
  message: string;
  user =    {
    username: '',
    password: ''
  };

  constructor(private authService: OAuthService, private router: Router) {
    // Login-Url
    //this.oauthService.loginUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/authorize"; //Id-Provider?
    this.authService.tokenEndpoint = "http://192.168.1.193:4213/token";
    this.authService.userinfoEndpoint = "http://192.168.1.193:4213/auth/userinfo";
    // Url with user info endpoint
    // This endpont is described by OIDC and provides data about the loggin user
    // This sample uses it, because we don't get an id_token when we use the password flow
    // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
    //this.oauthService.userinfoEndpoint = "https://steyer-identity-server.azurewebsites.net/identity/connect/userinfo";

    // The SPA's id. Register SPA with this id at the auth-server
    this.authService.clientId = "";

    // set the scope for the permissions the client should request
    // The auth-server used here only returns a refresh token (see below), when the scope offline_access is requested
    //this.oauthService.scope = "openid profile email voucher offline_access";

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.authService.setStorage(sessionStorage);

    // Set a dummy secret
    // Please note that the auth-server used here demand the client to transmit a client secret, although
    // the standard explicitly cites that the password flow can also be used without it. Using a client secret
    // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
    // Using such a dummy secreat is as safe as using no secret.
    this.authService.dummyClientSecret = "geheim";

    // Load Discovery Document and then try to login the user
    // let url = 'https://steyer-identity-server.azurewebsites.net/identity/.well-known/openid-configuration';
    // this.oauthService.loadDiscoveryDocument(url).then(() => {
    //     // Do what ever you want here
    // });
  }

  login() {
    this.authService.fetchTokenUsingPasswordFlow(this.user.username, this.user.password)
      // .then((resp) => {
      //   return this.authService.loadUserProfile();
      // })
      .then((resp) => {
      let claims = this.authService.getIdentityClaims();
      if (claims) {
        console.log('given_name', claims.given_name);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUri ? this.authService.redirectUri : '/reports';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    }).catch((err) => {
        console.error('error logging in', err);
      });
  }

  logout() {
    this.authService.logOut();
  }
}
