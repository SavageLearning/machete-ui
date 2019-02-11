import { Component, OnInit } from '@angular/core';
import { ConfigsService } from '../../configs/configs.service';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  welcome: string;
  isLoggedIn: boolean;

  constructor(private cfgService: ConfigsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.cfgService.getConfig('WorkCenterDescription_EN').subscribe(
        data => this.welcome = data.value,
        error => console.error('welcome.component.OnInit:' + error)
      );
    this.authService.isLoggedInObs().subscribe(
      value => this.isLoggedIn = value,
      error => console.error('welcome.component.OnInit::isLoggedIn: ', error)
    );
  }

  login() {
    this.authService.startSigninMainWindow();
  }

  // DEPRECATED
  register() {
    this.router.navigate(['/register']);
  }
}
