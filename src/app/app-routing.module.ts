import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { UnauthorizedComponent, WelcomeComponent,
  AuthorizeComponent, DashboardComponent} from './auth/';

import { RegisterComponent } from './auth/register/register.component';
import { EmployersService } from './employers/employers.service';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

const appRoutes: Routes = [
  // lazy loaded feature modules
  {
    path: 'configuration',
    loadChildren: () => import('src/app/configs/configs.module').then(m => m.ConfigsModule)
  },
  // auth
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
      { preloadingStrategy: SelectivePreloadingStrategy, relativeLinkResolution: 'legacy' }
    ),
    DialogModule,
    ButtonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // here because used in router guards
    AuthGuardService,
    EmployersService,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {
  constructor() {
    console.log('.ctor: AppRoutingModule');
  }
}
