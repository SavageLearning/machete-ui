import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Skill } from "../../shared/models/skill";
import { WorkersService } from "../workers.service";

@Component({
  selector: "app-skills-list",
  templateUrl: "./skills-list.component.html",
  styleUrls: ["./skills-list.component.css"],
})
export class SkillsListComponent implements OnInit {
  //Skills List
  skills: Skill[];

  // table controls
  specialtyFilterOn = false;
  activeFilterOn = false;
  filterActiveOpt = {
    iconOn: "pi pi-check",
    iconOff: "pi pi-times",
    labelOn: "Active Filter On",
    labelOff: "Active Filter Off",
  };
  filterSepecialtyOpt = {
    iconOn: "pi pi-check",
    iconOff: "pi pi-times",
    labelOn: "Specialized Filter On",
    labelOff: "Specialized Filter Off",
  };

  // help dialog
  display = false;

  constructor(private workerService: WorkersService, private router: Router) {}

  loadSkills(): void {
    // this.workerService.getSkills().subscribe(
    //   //sucess
    //   (response: Skill[]) => {
    //     this.skills = response;
    //     // console.table(this.skills);
    //   },
    //   // error
    //   (err) => console.log(err)
    // );
  }

  navigateToWorkersInSKill(id: number): void {
    this.router
      .navigate([`/workers/in-skill/${id}`])
      .catch((e) => console.error(e));
  }

  showHelpDialog(): void {
    this.display = true;
  }

  // Lifecycle
  ngOnInit(): void {
    this.loadSkills();
  }
}
