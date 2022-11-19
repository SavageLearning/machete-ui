import { Component, OnInit } from "@angular/core";
import { Lookup } from "../../../shared/models/lookup";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
  skills: Lookup[];
  selectedSkill: Lookup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.skills = this.config.data;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onRowSelect(event: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.ref.close(event.data);
  }
}
