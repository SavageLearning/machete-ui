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

  ngOnInit() { // TODO _still_ cannot get router shit to work
    this.auth.endSigninMainWindow(environment.authUrl + '/login')//this.route.snapshot.paramMap.get('redirect_uri'))
      .subscribe(user => {
        // copy to local variable? https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
        let rtr = this.router;
        console.log('endSigninMainWindow.user: ', user);
        this.auth.getUserEmitter().emit(user);

        // if (user.state && user.profile.role.includes("Hirer") && user.state == "/welcome") {
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
