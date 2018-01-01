import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyWorkOrdersComponent} from './my-work-orders.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const woRoutes: Routes = [
  {
    path: 'my-work-orders',
    component: MyWorkOrdersComponent,
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
    children: [
      {
        path: ':id',
        component: OrderCompleteComponent,
        canLoad: [AuthGuardService]
      },
    ]
  }

];
@NgModule({
  imports: [
    RouterModule.forChild(woRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class WorkOrdersRoutingModule { }
