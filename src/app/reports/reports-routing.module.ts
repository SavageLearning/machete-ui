import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportsComponent } from "./reports.component";
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { ReportDetailComponent } from "./report-detail/report-detail.component";
import { ReportsListComponent } from "./reports-list/reports-list.component";

const reportsRoutes: Routes = [
  {
    path: "",
    component: ReportsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: ReportsListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "view/:id",
        component: ReportDetailComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(reportsRoutes)],
  providers: [AuthGuardService],
})
export class ReportsRoutingModule {}
