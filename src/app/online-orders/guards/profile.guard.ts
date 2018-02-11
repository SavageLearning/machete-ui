import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';
import { EmployersService } from '../../employers/employers.service';

@Injectable()
export class ProfileGuard implements CanActivate {
  exists = false;

  constructor(private employersService: EmployersService, private router: Router) {
    console.log('.ctor');
    employersService.getEmployer().subscribe(
      em => {
        console.log('.ctor->getEmployer:', em)
        this.exists = em ? true : false;
      }
    );
  }

  canActivate(): boolean {
      if (!this.exists)
      {
        this.router.navigate(['/employers']);   
      }
    return this.exists;
  }
}
