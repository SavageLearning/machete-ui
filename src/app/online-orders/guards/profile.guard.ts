import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';
import { EmployersService } from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';

@Injectable()
export class ProfileGuard implements CanActivate {
  exists = false;

  constructor(private employersService: EmployersService, private router: Router) {
    console.log('.ctor');

  }

  canActivate(): Observable<boolean> {
    return this.employersService.getEmployer()
      .mergeMap((em: Employer) => {
        console.log('.ctor->getEmployer:', em)
        this.exists = em ? true : false;
        if (!this.exists)
        {
          this.router.navigate(['/employers']);   
        }
        return Observable.of(this.exists);
        });
  }
}
