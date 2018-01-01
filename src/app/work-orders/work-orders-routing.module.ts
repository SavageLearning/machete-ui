import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkOrdersComponent} from './work-orders.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const woRoutes: Routes = [
  {
    path: 'work-orders',
    component: WorkOrdersComponent,
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
