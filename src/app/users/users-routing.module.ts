import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { AuthGuardService } from "../shared/index";

const userRoutes: Routes = [
  {
    path: "",
    component: UsersComponent,
    canActivate: [AuthGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class UsersRoutingModule {}
