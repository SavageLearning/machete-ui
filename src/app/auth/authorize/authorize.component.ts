import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // copy to local variable; https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
    let rtr = this.router;

    this.auth.authenticate().subscribe(user => {
      user.state = user.state ? user.state : environment.oidc_client_settings.redirect_uri;

      // get out of the auth loop (it doesn't matter, but it's a better experience)
      if (user.state === window.location.href) user.state = '/welcome';

      if (user.profile.roles.includes("Hirer") && user.state == "/welcome") {
        rtr.navigate(['/online-orders/introduction']);
        return;
      } else {
        rtr.navigate([user.state]);
      }
    }, err => {
      console.error('redirecting to login; endSigninMainWindow returned: ', err);
      //user.expired = true;
      //user.state = '/welcome';
      this.auth.removeUser();
      rtr.navigate(['/welcome']);
    });
  }
}
