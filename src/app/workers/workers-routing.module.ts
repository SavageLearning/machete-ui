import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { WorkersComponent } from "./workers.component";
import { AuthGuardService } from "../shared";
import { SkillsListComponent } from "./skills-list/skills-list.component";
import { WorkersInSkillComponent } from "./workers-in-skill/workers-in-skill.component";

// all routes in this module are prefixed by workers/
const workersRoute: Routes = [
  {
    path: "",
    component: WorkersComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "skills",
        component: SkillsListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "in-skill/:id",
        component: WorkersInSkillComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "**",
        redirectTo: "",
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(workersRoute)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class WorkersRoutingModule {}
