import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfigsService } from "../configs/configs.service";
import { AuthService } from "../shared/index";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Config } from "../shared/models/config";

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

  public roleState: DashboardState = DashboardState.None;
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
    private cfgService: ConfigsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cfgService.getAllConfigs().subscribe(
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
      (error) => console.error("welcome.component.OnInit:" + error)
    );
    this.authService.authorize().subscribe(
      (user) => {
        this.isLoggedIn = !user.expired;
        this.userState = user.state ? user.state : "/welcome";
      },
      (error) => {
        console.log("welcome component: error; ", error);
        this.isLoggedIn = false;
      }
    );
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

  // DEPRECATED
  register(): void {
    this.router.navigate(["/register"]);
  }
}
