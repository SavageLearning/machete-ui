import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnlineOrdersComponent} from './online-orders.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {IntroConfirmComponent} from './intro-confirm/intro-confirm.component';
import {WorkOrderComponent} from './work-order/work-order.component';
import {WorkAssignmentsComponent} from './work-assignments/work-assignments.component';
import {FinalConfirmComponent} from './final-confirm/final-confirm.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SequenceGuard } from "./sequence-guard.service";

const onlineOrderRoutes: Routes = [
  {
    path: 'online-orders',
    component: OnlineOrdersComponent,
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent,
        canActivate: [SequenceGuard]
      },
      {
        path: 'intro-confirm',
        component: IntroConfirmComponent,
        canActivate: [SequenceGuard]
      },
      {
        path: 'work-order',
        component: WorkOrderComponent,
        canActivate: [SequenceGuard]
        
      },
      {
        path: 'work-assignments',
        component: WorkAssignmentsComponent,
        canActivate: [SequenceGuard]
        
      },
      {
        path: 'final-confirm',
        component: FinalConfirmComponent,
        canActivate: [SequenceGuard]
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
