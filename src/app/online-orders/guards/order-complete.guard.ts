import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';

@Injectable()
export class OrderCompleteGuard implements CanActivate {
  isConfirmed = false;

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
    onlineService.getOrderCompleteStream().subscribe(
      confirm => {
        console.log('.ctor->Ordercompleted:', confirm)
        this.isConfirmed = confirm != null;
      }
    );
  }

  canActivate(): boolean {
    return this.isConfirmed;
  }
}
