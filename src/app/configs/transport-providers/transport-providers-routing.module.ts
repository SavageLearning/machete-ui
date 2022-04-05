import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/shared/services/auth-guard.service";
import { TransportProviderListComponent } from "./tranport-providers-list/transport-provider-list.component";
import { TransportProvidersEditComponent } from "./transport-providers-edit/transport-providers-edit.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
  },
  {
    path: "list",
    component: TransportProviderListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "edit:id",
    component: TransportProvidersEditComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportProvidersRoutingModule {}
