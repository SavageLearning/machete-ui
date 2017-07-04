import {Component, OnInit}        from '@angular/core';
import { AuthService } from './auth.service';
import {Router, NavigationExtras} from '@angular/router';
import {Observable} from 'rxjs/Observable';
@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <input type="text" id="username" name="username" placeholder="username" [(ngModel)]="user.username">
    <input type="password" id="password" name="password" placeholder="password" [(ngModel)]="user.password">
    <button (click)="login(user)">Login</button>`
})
export class LoginComponent implements OnInit {
  message: string;
  user =    {
    username: '',
    password: ''
  };
  user$: Observable<any>;
  constructor(private authService: AuthService, private router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  ngOnInit() {
    this.user$ = this.authService.subscribeToService();
    this.user$.subscribe(
      user => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/reports';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
      }
      },
      error => {});
  }
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.user.username, this.user.password);
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
