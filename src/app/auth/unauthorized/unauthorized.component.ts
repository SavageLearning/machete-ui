import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unauthorized',
  templateUrl: 'unauthorized.component.html',
  styleUrls: ['unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  login() {
    window.location.href = environment.dataUrl + '/id/login?redirect_uri=' + environment.oidc_client_settings.redirect_uri;
  }
}
