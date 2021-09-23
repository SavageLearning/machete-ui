import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared';
import { ConfigsComponent } from './configs.component';
import { TransportProviderComponent } from './transport-provider/transport-provider.component';

const routes: Routes = [
  { path: '',
    component: ConfigsComponent,
    canActivate: [AuthGuardService],
    children: [
      { 
        path: 'transport-providers',
        component: TransportProviderComponent,
        canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
