import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/shared/services/auth-guard.service";
import { TransportProviderListComponent } from "./tranport-providers-list/transport-provider-list.component";
import { TransportProvidersContainerComponent } from "./transport-providers-container.component";
import { TransportProvidersEditComponent } from "./transport-providers-edit/transport-providers-edit.component";

const routes: Routes = [
  {
    path: "",
    component: TransportProvidersContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: TransportProviderListComponent,
      },
      {
        path: ":id",
        component: TransportProvidersEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportProvidersRoutingModule {}
