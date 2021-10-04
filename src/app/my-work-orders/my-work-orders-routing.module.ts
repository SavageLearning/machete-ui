import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyWorkOrdersComponent } from "./my-work-orders.component";
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { OrderCompleteComponent } from "./order-complete/order-complete.component";
import { WorkOrderDatatableComponent } from "./work-order-datatable/work-order-datatable.component";
import { ProfileGuard } from "../online-orders/guards/profile.guard";

const woRoutes: Routes = [
  {
    path: "",
    component: MyWorkOrdersComponent,
    canActivate: [AuthGuardService, ProfileGuard],
    children: [
      {
        path: ":id",
        component: OrderCompleteComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "",
        component: WorkOrderDatatableComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(woRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class WorkOrdersRoutingModule {}
