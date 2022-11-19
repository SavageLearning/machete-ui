import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Config } from "src/app/shared/models/config";
import { ConfigsService } from "../../configs.service";
import { MS_NON_EDITABLE_CONFIGS } from "../shared/machete-settings-constants";

@Component({
  selector: "app-machete-settings-list",
  templateUrl: "./machete-settings-list.component.html",
  styleUrls: ["./machete-settings-list.component.css"],
})
export class MacheteSettingsListComponent implements OnInit {
  public configs$: Observable<Config[]>;
  public excludeCols: string[] = [
    "publicConfig",
    "datecreated",
    "createdby",
    "id",
  ];

  constructor(private service: ConfigsService, private router: Router) {}

  async onRowSelect(selectedRecord: Config): Promise<void> {
    await this.router.navigate([
      `configuration/settings/${selectedRecord.key}`,
    ]);
  }

  ngOnInit(): void {
    this.configs$ = this.service.getAllConfigs().pipe(
      map((configs: Config[]) => configs.filter((c) => c.publicConfig)),
      map((configs: Config[]) =>
        configs.filter((c) => !MS_NON_EDITABLE_CONFIGS.includes(c.key))
      )
    );
  }
}
