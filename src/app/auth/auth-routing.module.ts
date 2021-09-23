import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared";
import { AuthComponent } from "./auth.component";
import { AuthorizeComponent } from "./authorize/authorize.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { WelcomeComponent } from "../welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    component: AuthComponent,
    children: [
      {
        path: "register",
        component: RegisterComponent, // unused
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "unauthorized",
        component: UnauthorizedComponent,
      },
      // Used to receive redirect from Identity server
      {
        path: "authorize",
        component: AuthorizeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
