/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from "@angular/core";
import { environment } from "../environments/environment";
import { ConfigsService } from "./configs/configs.service";
import { LookupsService } from "./lookups/lookups.service";
import { MessageService, PrimeNGConfig } from "primeng/api";
console.log("environment.name:", environment.name);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [LookupsService, ConfigsService, MessageService],
})
export class AppComponent implements OnInit {
  topbarTheme = "bluegrey";
  menuTheme = "bluegrey";
  layoutMode = "light";
  menuMode = "static";
  inlineMenuPosition = "top";
  inputStyle = "filled";
  ripple = true;
  isRTL = false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
