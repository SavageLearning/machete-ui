import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports.component';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';

const reportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canLoad: [AuthGuardService]
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
    AuthService,
    AuthGuardService
  ]
})
export class ReportsRoutingModule { }
