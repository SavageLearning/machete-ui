import { Confirmation } from 'primeng/primeng';
import { OnlineOrdersComponent } from './online-orders.component';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { OnlineOrdersService } from './online-orders.service';

@Injectable()
export class SequenceGuardService implements CanActivate {
    isConfirmed = false;

    constructor(private onlineService: OnlineOrdersService, private router: Router) {
      console.log('.ctor');
      onlineService.initialConfirmed$.subscribe(
        confirm => {
          console.log('.ctor->initialConfirmed:', confirm)
          this.isConfirmed = confirm;
        }
      );
    }

    // how do i know what step (1-5) I am being called from?
    canActivate(): boolean {
        let foo = this.router.url;
        return this.isConfirmed;
    }
}
