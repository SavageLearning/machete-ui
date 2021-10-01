import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// scoped to app component (app-wide)
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { WelcomeComponent } from 'src/app/welcome/welcome.component';

import { CanLoadService } from './shared/services/can-load.service';

const lazyLoadedFeatureRoutes: Routes = [
  /**
   * !lazy loaded feature routes
   */
  {
    path: 'auth',
    // canLoad: [CanLoadService],
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'configuration',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/configs/configs.module').then(m => m.ConfigsModule)
  },
  {
    path: 'reports',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'workers',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/workers/workers.module').then(m => m.WorkersModule)
  },
  {
    path: 'exports',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/exports/exports.module').then(m => m.ExportsModule)
  },
  {
    path: 'my-work-orders',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/my-work-orders/my-work-orders.module').then(m => m.MyWorkOrdersModule)
  },
  {
    path: 'employers',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/employers/employers.module').then(m => m.EmployersModule)
  },
  {
    path: 'lookups',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/lookups/lookups.module').then(m => m.LookupsModule)
  },
  {
    path: 'online-orders',
    canLoad: [CanLoadService],
    loadChildren: () => import('src/app/online-orders/online-orders.module').then(m => m.OnlineOrdersModule)
  }
]
const appRoutes: Routes = [
  /**
   * !app-scoped, app-module-level components
   */
  {
    path: "",
    redirectTo: "/welcome",
    pathMatch: "full",
  },
  {
    path: "welcome",
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: '/auth/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'unauthorized',
    redirectTo: '/auth/unauthorized',
    pathMatch: 'full'
  },
  {
    path: 'authorize', // redirect from auth
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

const defaultRoutes: Routes = [
  //{ path: '**', component: PageNotFoundComponent }
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [...appRoutes, ...lazyLoadedFeatureRoutes, ...defaultRoutes],
      { preloadingStrategy: SelectivePreloadingStrategy, relativeLinkResolution: 'legacy' }
    )
  ],
  exports: [RouterModule],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {
  constructor() {
    console.log(".ctor: AppRoutingModule");
  }
}
