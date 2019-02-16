import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

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

    this.auth.endSigninMainWindow().subscribe(user => {
      this.auth.getUserEmitter().emit(user);

      // get them out of the partial loop (it doesn't matter, but the interface is better)
      if (user.state === window.location.href) user.state = '/welcome';

      if (user.profile.roles.includes("Hirer") && user.state == "/welcome") {
          rtr.navigate(['/online-orders/introduction']);
          return;
      }

      rtr.navigate([user.state]);
    },
    err => {
      console.error('redirecting to login; endSigninMainWindow returned: ', err);
      //user.expired = true;
      //user.state = '/welcome';
      this.auth.removeUser();
      rtr.navigate(['/welcome']);
    });
  }
}
