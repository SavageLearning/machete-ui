import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-authorize",
  templateUrl: "./authorize.component.html",
  styleUrls: ["./authorize.component.css"],
})
export class AuthorizeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // copy to local; https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
    const rtr = this.router;

    this.auth.authorize().subscribe(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (user) => {
        user.state = user.state ? user.state : "/welcome";

        // get out of the auth loop (no hanging 'authorize works!')
        if (user.state.endsWith("authorize")) {
          user.state = "/welcome";
        }

        if (user.profile.roles.includes("Hirer") && user.state === "/welcome") {
          await rtr.navigate(["/online-orders/introduction"]);
        } else {
          await rtr.navigate([user.state]);
        }
      },
      (err) => {
        console.error(
          "redirecting to login; endSigninMainWindow returned: ",
          err
        );
        this.auth.removeUser();
        rtr.navigate(["/welcome"]).catch((e) => console.error(e));
      }
    );
  }
}
