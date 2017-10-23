import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';

@Injectable()
export class WorkOrderGuard implements CanActivate {
  isConfirmed = false;

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
    onlineService.getInitialConfirmedStream().subscribe(
      confirm => {
        console.log('.ctor->initialConfirmed:', confirm)
        this.isConfirmed = confirm.map(a => a.confirmed).reduce((a,b) => a && b);
      }
    );
  }

  canActivate(): boolean {
    return this.isConfirmed;
  }
}
