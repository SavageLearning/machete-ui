import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import {DashboardComponent} from './auth/dashboard/dashboard.component';
import {UnauthorizedComponent} from './auth/unauthorized/unauthorized.component';
import { Log } from 'oidc-client';
import { AuthorizeComponent } from './auth/authorize/authorize.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  // Used to receive redirect from Identity server
  {
    path: 'authorize',
    component: AuthorizeComponent
  },
  //{ path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [
    //AppComponent,
    UnauthorizedComponent,
    DashboardComponent
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
