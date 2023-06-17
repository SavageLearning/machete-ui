import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OnlineOrdersService } from "../online-orders.service";
import { WorkOrderService } from "../work-order/work-order.service";
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { AppSettingsStoreService } from "../../shared/services/app-settings-store.service";
@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.css"],
})
export class IntroductionComponent implements OnInit {
  macheteOutage = false;
  outageMessage: string;
  outageVisible = false;
  stepOneIntro$ = this.appSettingsStore.getConfig("OnlineOrdersIntroMessage");
  constructor(
    private router: Router,
    private onlineService: OnlineOrdersService,
    private orderService: WorkOrderService,
    private assignmentService: WorkAssignmentsService,
    private appSettingsStore: AppSettingsStoreService
  ) {}

  ngOnInit(): void {
    this.appSettingsStore.all$.subscribe(
      (data) => {
        this.macheteOutage =
          data.find((config) => config.key === "DisableOnlineOrders").value ===
          "TRUE";
        this.outageMessage = data.find(
          (config) => config.key === "DisableOnlineOrdersBanner"
        ).value;
      },
      (error) => console.error(error)
    );
  }

  onClick(): void {
    if (this.macheteOutage) {
      this.outageVisible = true;
    } else {
      this.outageVisible = false;
      this.router
        .navigate(["/online-orders/intro-confirm"])
        .catch((e) => console.error(e));
    }
  }

  onClear(): void {
    this.onlineService.clearState();
    this.orderService.clearState();
    this.assignmentService.clearState();
  }
}
