import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';

@Injectable()
export class WorkAssignmentsGuard implements CanActivate {
  isConfirmed = false;

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
    onlineService.getWorkOrderConfirmedStream()
      .subscribe(
        confirm => {
          console.log('.ctor->workAssignmentsConfirmed:', confirm)
          this.isConfirmed = confirm;
        }
      );
  }

  canActivate(): boolean {
    return this.isConfirmed;
  }
}
