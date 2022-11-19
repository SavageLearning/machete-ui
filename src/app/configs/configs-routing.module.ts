import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared";
import { ConfigsComponent } from "./configs.component";

const routes: Routes = [
  {
    path: "",
    component: ConfigsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "transport-providers",
        loadChildren: () =>
          import(`./transport-providers/transport-providers.module`).then(
            (m) => m.TransportProvidersModule
          ),
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./machete-settings/machete-settings.module").then(
        (m) => m.MacheteSettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigsRoutingModule {}
