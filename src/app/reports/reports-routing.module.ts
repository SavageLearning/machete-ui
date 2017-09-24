import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';

const reportsRoutes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(reportsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class ReportsRoutingModule { }
