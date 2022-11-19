import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/shared/services/auth-guard.service";
import { MacheteSettingsEditComponent } from "./machete-settings-edit/machete-settings-edit.component";
import { MacheteSettingsListComponent } from "./machete-settings-list/machete-settings-list.component";
import { MacheteSettingsComponent } from "./machete-settings.component";

const routes: Routes = [
  {
    path: "",
    component: MacheteSettingsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: MacheteSettingsListComponent,
      },
      {
        path: ":id",
        component: MacheteSettingsEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacheteSettingsRoutingModule {}
