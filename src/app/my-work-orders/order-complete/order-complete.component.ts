/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */

import { combineLatest as observableCombineLatest } from "rxjs";
import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { WorkOrder } from "../../shared/models/work-order";
import * as paypal from "paypal-checkout";
import { ActivatedRoute, Router } from "@angular/router";
import { MyWorkOrdersService } from "../my-work-orders.service";
import { TransportProvidersService } from "../../online-orders/transport-providers.service";
import { AppSettingsStoreService } from "../../shared/services/app-settings-store.service";

@Component({
  selector: "app-order-complete",
  templateUrl: "./order-complete.component.html",
  styleUrls: ["./order-complete.component.css"],
})
export class OrderCompleteComponent implements OnInit, AfterViewChecked {
  order = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost = 0;
  laborCost: number;
  // paypal values
  public didPaypalScriptLoad = false;
  public loading = true;

  public paypalConfig: any = {
    // The env (sandbox/production) tells the paypal client which URL to use.
    env: "",
    client: {
      sandbox: "",
      production: "",
    },
    commit: true,
    payment: (data, actions) =>
      actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.transportCost, currency: "USD" } },
          ],
        },
        experience: {
          input_fields: {
            no_shipping: 1,
          },
        },
      }),
    onAuthorize: (data, actions) => {
      console.log("Payment was successful!", data, actions);
      // TODO: add confirmation notice/spinner
      this.ordersService
        .executePaypal(
          this.order.id,
          data["payerID"],
          data["paymentID"],
          data["paymentToken"]
        )
        .subscribe(
          (res) => {
            console.log("execute paypal returned:", res);
            this.ordersService
              .getOrder(this.order.id)
              .subscribe((foo) => (this.order = foo));
          },
          (error) => console.error("execute paypal errored:", error)
        );
    },
    onCancel: (data) => {
      console.log("The payment was cancelled!", data);
    },
    onError: (err) => {
      console.log("There was an error:", err);
    },
  };

  constructor(
    private ordersService: MyWorkOrdersService,
    private transportProviderService: TransportProvidersService,
    private route: ActivatedRoute,
    private router: Router,
    private appSettingsStore: AppSettingsStoreService
  ) {
    console.log(".ctor");
  }

  ngOnInit(): void {
    console.log("order-complete.component:ngOnInit");
    const orderId = +this.route.snapshot.paramMap.get("id");
    observableCombineLatest([
      this.transportProviderService.getTransportProviders(),
      this.ordersService.getOrder(orderId),
      this.appSettingsStore.getConfig("PayPalClientID"),
      this.appSettingsStore.getConfig("PayPalEnvironment"),
    ]).subscribe(
      ([l, o, id, env]) => {
        console.log("ngOnInit:combineLatest received:", l, o, id, env);
        this.paypalConfig["env"] = env.value;
        this.paypalConfig.client[env.value] = id.value;
        console.log("paypalConfig", this.paypalConfig);
        this.order = o;
        if (o == null) {
          this.router
            .navigate(["/online-orders/order-not-found"])
            .catch((e) => console.log(e));
          return;
        }
        this.transportLabel = l.find(
          (ll) => ll.id === o.transportProviderID
        ).text;
        const wa = o.workAssignments;
        if (wa != null && wa.length > 0) {
          // sums up the transport  costs
          this.transportCost = wa
            .map((waItem) => waItem.transportCost)
            .reduce((a, b) => a + b);
          this.workerCount = wa.length;
          // sums up the labor costs
          this.laborCost = wa
            .map((waItem) => waItem.hourlyWage * waItem.hours)
            .reduce((a, b) => a + b);
        } else {
          this.workerCount = 0;
          this.transportCost = 0;
          this.laborCost = 0;
        }
      },
      (error) => console.error("error", error)
    );
  }

  public ngAfterViewChecked(): void {
    if (this.transportCost > 0 && !this.didPaypalScriptLoad) {
      //this.loadPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, "#paypal-button");
      this.loading = false;
      this.didPaypalScriptLoad = true;
      //});
    }
  }
}
