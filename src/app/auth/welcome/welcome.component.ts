import { Component, OnInit } from '@angular/core';
import { ConfigsService } from '../../configs/configs.service';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
    this.authService.authenticate().subscribe(value => {
      this.isLoggedIn = !value.expired;
    }, error => {
      console.log('welcome component: error; ', error);
      this.isLoggedIn = false; 
    });
  }

  // https://stackoverflow.com/a/49437170/2496266
  login() {
    window.location.href = environment.dataUrl + '/id/login?redirect_uri=' + environment.oidc_client_settings.redirect_uri;
  }

  // DEPRECATED
  register() {
    this.router.navigate(['/register']);
  }
}
