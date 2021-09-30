import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {

  _user: User;

  constructor(private authService: AuthService) {
  }

  authenticate(): void {
    this.authService.authorize().subscribe(user => { this._user = user; });
  }

  signoutUser(): void {
    this.authService.signoutUser().subscribe(response => response);
  }

  removeUser():void  {
    this.authService.removeUser();
  }

  verifyLogin(): void {
    this.authService.isLoggedIn().subscribe(response => response);
  }

}
