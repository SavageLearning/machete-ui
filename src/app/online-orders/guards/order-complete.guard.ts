import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from '../online-orders.service';

@Injectable()
export class OrderCompleteGuard implements CanActivate {
  isCompleted = false;

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    // console.log('.ctor');
    // onlineService.getOrderCompleteStream().subscribe(
    //   completeOrder => {
    //     console.log('.ctor->Ordercompleted:', completeOrder)
    //     if (completeOrder != null && completeOrder.id != null)
    //     {
    //       this.isCompleted = true;
    //       router.navigate([this.router.routerState.snapshot.url]);
    //     }
    //   }
    // );
  }

  canActivate(): boolean {
    return this.isCompleted;
  }
}
