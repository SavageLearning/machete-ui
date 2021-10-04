import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployersComponent } from "./employers.component";
import { AuthGuardService } from "../shared/index";

const employerRoutes: Routes = [
  {
    path: "",
    component: EmployersComponent,
    canActivate: [AuthGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(employerRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class EmployersRoutingModule {}
