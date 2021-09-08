import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsService } from './reports.service';

const reportsRoutes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ReportsListComponent,
        canLoad: [AuthGuardService],
        canActivate: [AuthGuardService]
      },
      {
        path: 'view/:id',
        component: ReportDetailComponent,
        canLoad: [AuthGuardService],
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
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
    AuthGuardService,
    ReportsService
  ]
})
export class ReportsRoutingModule { }
