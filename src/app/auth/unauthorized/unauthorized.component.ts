import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: 'unauthorized.component.html',
  styleUrls: ['unauthorized.component.scss']
})
export class UnauthorizedComponent {

  constructor(private router: Router) {
  }

  login(): void {
    const rtr = this.router;
    rtr.navigate(['/authorize']).catch(e => console.error(e));
  }
}
