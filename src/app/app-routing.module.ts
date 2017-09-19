import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { UnauthorizedComponent, WelcomeComponent, 
  AuthorizeComponent, DashboardComponent} from './auth/';
import { Log } from 'oidc-client';
import { RegisterComponent } from "./auth/register/register.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  declarations: [
    //AppComponent,
    UnauthorizedComponent,
    DashboardComponent,
    WelcomeComponent,
    RegisterComponent
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
