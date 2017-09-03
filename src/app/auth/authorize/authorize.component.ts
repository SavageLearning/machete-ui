import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Log } from 'oidc-client';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.endSigninMainWindow()
      .subscribe(user => {
        let rtr = this.router;
        Log.info('authorize.component.endSigninMainWindow.user: ', user.profile.sub);
          if (user.state) {
            rtr.navigate([user.state]);
          }
        },
        err => {
          Log.error('authorize.component.endSigninMainWindow returned: ' + JSON.stringify(err));
        });
  }

}
