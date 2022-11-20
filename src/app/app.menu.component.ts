import { Component, Input, OnInit, Inject, forwardRef } from "@angular/core";
import { AppComponent } from "./app.component";
import { loadMenuRules } from "./load-menu-rules";
import { AuthService } from "./shared/index";
import { MenuRule } from "./menu-rule";

@Component({
  selector: "app-menu",
  template: `
    <ul class="layout-menu">
      <li
        app-menuitem
        *ngFor="let item of model; let i = index"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
    </ul>
  `,
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
