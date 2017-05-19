import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PageNotFoundComponent }    from './not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard }    from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
  {
    path: 'employers',
    loadChildren: 'app/employers/employers.module#EmployersModule'
  },
  {
    path: 'reports',
    loadChildren: 'app/reports/reports.module#ReportsModule'
  },
  //{ path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '/reports' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
