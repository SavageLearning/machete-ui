import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExportsComponent } from "./exports.component";
import { AuthGuardService } from "../shared/services/auth-guard.service";

const exportsRoutes: Routes = [
  {
    path: "",
    component: ExportsComponent,
    canActivate: [AuthGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(exportsRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class ExportsRoutingModule {}
