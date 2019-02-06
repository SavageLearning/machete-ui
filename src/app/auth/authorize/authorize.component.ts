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
    this.auth.endSigninMainWindow()
      .subscribe(user => {
        // not sure why i have to copy to local variable.
        // https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript
        let rtr = this.router;
        //console.log('endSigninMainWindow.user: ', user);
        this.auth.getUserEmitter().emit(user);

        if (user.state && user.profile.role.includes("Hirer") && user.state == "/welcome") {
            rtr.navigate(['/online-orders/introduction']);
            return;
        }
        if (user.state) {
            rtr.navigate([user.state]);
        }
      },
      err => {
          console.error('endSigninMainWindow returned: ', err);
      });
  }


}
