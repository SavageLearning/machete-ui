import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineOrdersService } from '../online-orders.service';

@Injectable()
export class OrderConfirmGuard implements CanActivate {
  isConfirmed = false;

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
    onlineService.getWorkAssignmentConfirmedStream().subscribe(
      confirm => {
        console.log('.ctor->OrderConfirmed:', confirm)
        this.isConfirmed = confirm;
      }
    );
  }

  canActivate(): boolean {
    return this.isConfirmed;
  }
}
