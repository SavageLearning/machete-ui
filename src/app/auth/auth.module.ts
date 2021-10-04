import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthorizeComponent } from "./authorize/authorize.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { AuthComponent } from "./auth.component";
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [
    AuthorizeComponent,
    DashboardComponent,
    RegisterComponent,
    UnauthorizedComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ToastModule,
    ButtonModule,
    DialogModule,
  ],
  providers: [MessageService],
})
export class AuthModule {
  constructor() {
    console.log("ctor");
  }
}
