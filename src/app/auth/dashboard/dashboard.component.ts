import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  _user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  authenticate() { // TODO untested
    this.authService.authenticate().subscribe(user => { this._user = user; });
  }

  signoutUser() {
    this.authService.signoutUser().subscribe(response => response);
  }

  removeUser() {
    this.authService.removeUser();
  }

  verifyLogin() {
    this.authService.isLoggedIn().subscribe(response => response);
  }

  ngOnDestroy() {
  }
}
