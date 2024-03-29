/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";
import { AuthService } from "../shared/index";
import { Router } from "@angular/router";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "inline-profile",
  templateUrl: "./app.profile.component.html",
  animations: [
    trigger("menu", [
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
export class InlineProfileComponent implements OnInit {
  username: string;
  active: boolean;

  constructor(private auth: AuthService, private router: Router) {
    console.log(".ctor: InlineProfileComponent");
  }

  ngOnInit(): void {
    this.auth.authorize().subscribe(
      (user) => {
        this.username = user.profile.preferred_username;
      },
      (error) => {
        console.log("InlineProfileComponent: ", error);
        this.username = "Not logged in!";
      }
    );
  }

  onClick(event: Event): void {
    this.active = !this.active;
    event.preventDefault();
  }

  startSignoutMainWindow(): void {
    const rtr = this.router;
    this.auth.signoutUser().subscribe(
      (response) => {
        console.log("signout success: ", response);
        rtr.navigate(["authorize"]).catch((e) => console.error(e));
      },
      (error) => {
        console.log("Error in signoutRedirect: ", error);
      }
    );
  }
}
