import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-workers",
  templateUrl: "./workers.component.html",
  styleUrls: ["./workers.component.css"],
})
export class WorkersComponent implements OnInit {
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: "Workers",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Skills List",
            icon: "pi pi-list",
            routerLink: ["skills"],
            routerLinkActiveOptions: { exact: true },
          },
        ],
      },
    ];
  }
}
