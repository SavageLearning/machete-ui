// import { Component, Inject, forwardRef } from "@angular/core";
// import { AppComponent } from "./app.component";
import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  AnimationEvent,
} from "@angular/animations";
import { MegaMenuItem } from "primeng/api";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
  animations: [
    trigger("topbarActionPanelAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scaleY(0.8)" }),
        animate(
          ".12s cubic-bezier(0, 0, 0.2, 1)",
          style({ opacity: 1, transform: "*" })
        ),
      ]),
      transition(":leave", [animate(".1s linear", style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppTopBarComponent {
  constructor(public appMain: AppMainComponent, public app: AppComponent) {}
  activeItem: number;

  model: MegaMenuItem[] = [];
}
