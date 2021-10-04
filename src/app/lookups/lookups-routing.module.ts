import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { LookupsComponent } from "./lookups.component";

const routes: Routes = [
  {
    path: "",
    component: LookupsComponent,
    canActivate: [AuthGuardService],
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupsRoutingModule {}
