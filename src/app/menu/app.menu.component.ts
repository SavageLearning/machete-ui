import { Component, Input, OnInit, Inject, forwardRef } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AppComponent } from "../app.component";
import { loadMenuRules } from "./load-menu-rules";
import { AuthService } from "../shared/index";
import { MenuRule } from "./menu-rule";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  @Input() reset: boolean;

  model: any[];

  constructor(
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    private auth: AuthService
  ) {
    console.log(".ctor: AppMenuComponent");
  }

  ngOnInit(): void {
    this.auth.authorize().subscribe(
      (user) => {
        this.model = loadMenuRules(user.profile.roles);
        return new Array<MenuRule>();
      },
      (unauthorized) => {
        console.log("Not signed in: ", unauthorized);
      }
    );
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "[app-submenu]",
  templateUrl: "./app.submenu.component.html",
  animations: [
    trigger("children", [
      state(
        "hidden",
        style({
          height: "0px",
        })
      ),
      state(
        "visible",
        style({
          height: "*",
        })
      ),
      transition(
        "visible => hidden",
        animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
      ),
      transition(
        "hidden => visible",
        animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
      ),
    ]),
  ],
})
export class AppSubMenuComponent {
  @Input() item: MenuItem;
  @Input() root: boolean;
  @Input() visible: boolean;

  _reset: boolean;
  activeIndex: number;

  constructor(
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    public router: Router,
    public location: Location
  ) {}

  itemClick(event: Event, item: MenuItem, index: number): void {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
    }

    //activate current item and deactivate active sibling if any
    this.activeIndex = this.activeIndex === index ? null : index;

    //execute command
    if (item.command) {
      item.command({ event, item });
    }

    //prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    //hide menu
    if (!item.items) {
      if (this.app.isHorizontal()) {
        this.app.resetMenu = true;
      } else {
        this.app.resetMenu = false;
      }

      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
    return this._reset;
  }

  set reset(val: boolean) {
    this._reset = val;

    if (this._reset && this.app.isHorizontal()) {
      this.activeIndex = null;
    }
  }
}
