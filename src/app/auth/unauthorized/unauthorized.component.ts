import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unauthorized',
  templateUrl: 'unauthorized.component.html',
  styleUrls: ['unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    let rtr = this.router;
    rtr.navigate(['/authorize']);
    //window.location.href = environment.dataUrl + '/id/login?redirect_uri=' + environment.oidc_client_settings.redirect_uri;
  }
}
