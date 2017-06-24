import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginComponent }       from './login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    OAuthService
  ]
})
export class LoginRoutingModule {}
