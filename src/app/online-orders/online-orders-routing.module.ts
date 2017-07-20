import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnlineOrdersComponent} from './online-orders.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {IntroConfirmComponent} from './intro-confirm/intro-confirm.component';
import {WorkOrderComponent} from './work-order/work-order.component';
import {WorkAssignmentsComponent} from './work-assignments/work-assignments.component';
import {FinalConfirmComponent} from './final-confirm/final-confirm.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';

const onlineOrderRoutes: Routes = [
  {
    path: 'online-orders',
    component: OnlineOrdersComponent,
    canLoad: [AuthGuardService],
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent,
        canLoad: [AuthGuardService]
      },
      {
        path: 'intro-confirm',
        component: IntroConfirmComponent,
        canLoad: [AuthGuardService]
      },
      {
        path: 'work-order',
        component: WorkOrderComponent,
        canLoad: [AuthGuardService]
      },
      {
        path: 'work-assignments',
        component: WorkAssignmentsComponent,
        canLoad: [AuthGuardService]
      },
      {
        path: 'final-confirm',
        component: FinalConfirmComponent,
        canLoad: [AuthGuardService]
      }
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(onlineOrderRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class OnlineOrdersRoutingModule { }
