import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../shared/index";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Config } from "../shared/models/config";
import { User } from "../shared/models/user";
import { map, pluck, takeWhile, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { MessageService } from "primeng/api";
import { AppSettingsStoreService } from "../shared/services/app-settings-store.service";

enum DashboardState {
  None = "None",
  Hirer = "Hirer",
  CenterStaff = "CenterStaff",
}

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private alive = true;

  facebookAppId: string;
  googleClientId: string;
  macheteSessionId: string;
  welcome: string;
  isLoggedIn: boolean;
  userState: string;
  /// for overlay that shuts down GUI access to the app
  macheteOutage: boolean;
  outageMessage: string;
  serverData: Config[];
  query$: Observable<boolean>;

  roleState: DashboardState = DashboardState.None;
  public hirerLinks = [
    {
      text: "Hire a Worker",
      link: "/online-orders/introduction",
      auth: true,
      icon: "",
    },
    {
      text: "Update Employer Profile",
      link: "/employers",
      auth: true,
      icon: "",
    },
    { text: "Hiring History", link: "/my-work-orders", auth: true, icon: "" },
  ];

  public centerStaffLinks = [
    ...this.hirerLinks,
    { text: "Machete Reports", link: "/reports", auth: true },
  ];

  public welcomeLinks = [
    {
      text: "Log In / Sign Up",
      link: "/welcome",
      action: "login",
      auth: false,
    },
  ];

  public dashboards = [
    { title: "Employer", links: this.hirerLinks, s: DashboardState.Hirer },
    {
      title: "Center Staff",
      links: this.centerStaffLinks,
      s: DashboardState.CenterStaff,
    },
    { title: "", links: this.welcomeLinks, s: DashboardState.None },
  ];

  constructor(
    private appSettingsStore: AppSettingsStoreService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageServ: MessageService
  ) {}

  /**
   * Catches a query param passed by the api redirect result when login fails
   * Currently we are only expecting one type of failure from the FB login flow:
   * https://github.com/SavageLearning/Machete/issues/673
   */
  private handleQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        pluck("fb-fail"),
        map((fbFail: string) => /true/i.test(fbFail)),
        tap((fbFail: boolean) => {
          if (fbFail) {
            this.messageServ.add({
              life: 18000,
              key: "root-toast-notifications",
              severity: "error",
              summary: `Facebook login failed`,
              detail: `Machete was unable to confirm your email address via Facebook login.
              Please click on Login below to see alternate login methods.
              You may also check Facebook's instructions to confirm your email and try
              again when your email is confirmed`,
            });
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    //
    this.handleQueryParams();
    this.appSettingsStore.all$.subscribe(
      (data) => {
        this.serverData = data;
        console.log("configs: ", data); // TODO this was 2am madness, this isn"t great JS
        this.welcome = data.find(
          (config) => config.key === "WorkCenterDescription_EN"
        ).value;
        this.facebookAppId = data.find(
          (config) => config.key === "FacebookAppId"
        ).value;
        this.googleClientId = data.find(
          (config) => config.key === "GoogleClientId"
        ).value;
        this.macheteSessionId = data.find(
          (config) => config.key === "OAuthStateParameter"
        ).value;
        this.macheteOutage =
          data.find((config) => config.key === "DisableOnlineOrders").value ===
          "TRUE";
        this.outageMessage = data.find(
          (config) => config.key === "DisableOnlineOrdersBanner"
        ).value;
      },
      (error) => console.error(`welcome.component.OnInit:${error as string}`)
    );
    this.authService.authorize().subscribe(
      (user) => {
        this.isLoggedIn = !user.expired;
        this.userState = user.state ? user.state : "/welcome";
        this.roleState = this.defineRoleState(user);
      },
      (error) => {
        console.log("welcome component: error; ", error);
        this.isLoggedIn = false;
      }
    );
  }

  private defineRoleState(user: User): DashboardState {
    const roleState: DashboardState = user.expired
      ? DashboardState.None
      : user.profile.roles.includes("Hirer")
      ? DashboardState.Hirer
      : DashboardState.CenterStaff;
    return roleState;
  }

  // https://stackoverflow.com/a/49437170/2496266
  login(): void {
    window.location.href =
      environment.dataUrl +
      "/id/login?redirect_uri=" +
      environment.dataUrl +
      environment.redirect_uri +
      "&" + // should include above...
      "app_id=" +
      this.facebookAppId +
      "&" +
      "client_id=" +
      this.googleClientId +
      "&" +
      "state=" +
      this.macheteSessionId;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  // DEPRECATED
  async register(): Promise<void> {
    await this.router.navigate(["/register"]);
  }
}
