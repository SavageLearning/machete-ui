import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.auth.endSigninMainWindow().subscribe(user => {
        // copy to local variable? https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
        let rtr = this.router;

        this.auth.getUserEmitter().emit(user);

        console.log('authorized user: ', user);
        console.log('user.state: ', user.state); // not working, empty

        // get them out of the loop
        //if (user.state === window.location.href) user.state = '/welcome';
        // if (user.profile.role.includes("Hirer") && user.state == "/welcome") {
        //     rtr.navigate(['/online-orders/introduction']);
        //     return;
        // }

        // if (user.state) {
        //     rtr.navigate([user.state]);
        // }
      },
      err => {
          console.error('endSigninMainWindow returned: ', err);
      });
  }

}
