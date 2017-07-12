import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {ProtectedComponent} from './protected/protected.component';
import {LoginComponent} from './login/login.component';
import { Log } from 'oidc-client';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuardService]
    // TODO: add CanLoad as well
  },
  {
    path: 'employers',
    loadChildren: 'app/employers/employers.module#EmployersModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'online-orders',
    loadChildren: 'app/online-orders/online-orders.module#OnlineOrdersModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'reports',
    loadChildren: 'app/reports/reports.module#ReportsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'exports',
    loadChildren: 'app/exports/exports.module#ExportsModule',
    canActivate: [AuthGuardService]
  },
  //{ path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '/reports' }
];

@NgModule({
  declarations: [
    //AppComponent,
    UnauthorizedComponent,
    DashboardComponent,
    ProtectedComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {
  constructor() {
    Log.info('app-routing.module.ctor called');
  }
}
